import "server-only";

import { eq, sql } from "drizzle-orm";

import { getDb } from "@/db/client";
import { rateLimits } from "@/db/schema";
import { assertDatabaseConfigured, shouldUseMemoryStore } from "@/lib/db-policy";

/** @type {Map<string, { count: number; blockedUntil: Date | null; updatedAt: Date }>} */
const memoryCounters = new Map();

const CLEANUP_INTERVAL_MS = 60 * 60 * 1000;
let lastCleanupAt = 0;

function cleanupMemoryCounters() {
  const now = Date.now();
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;
  for (const [key, row] of memoryCounters.entries()) {
    if (row.blockedUntil && row.blockedUntil.getTime() < now) {
      memoryCounters.delete(key);
    }
  }
}

function getMemoryCounter(key) {
  cleanupMemoryCounters();
  return memoryCounters.get(key) ?? { count: 0, blockedUntil: null, updatedAt: new Date() };
}

function setMemoryCounter(key, row) {
  memoryCounters.set(key, row);
}

/**
 * @param {string} key
 * @param {{ maxAttempts: number; windowMs: number; blockMs: number }} options
 */
export async function consumeRateLimit(key, options) {
  const now = new Date();

  if (shouldUseMemoryStore()) {
    const current = getMemoryCounter(key);
    if (current.blockedUntil && current.blockedUntil.getTime() > now.getTime()) {
      return {
        allowed: false,
        retryAfterSec: Math.ceil((current.blockedUntil.getTime() - now.getTime()) / 1000),
      };
    }

    const windowStart = current.updatedAt.getTime();
    const withinWindow = now.getTime() - windowStart <= options.windowMs;
    const nextCount = withinWindow ? current.count + 1 : 1;
    const blockedUntil =
      nextCount > options.maxAttempts ? new Date(now.getTime() + options.blockMs) : null;

    setMemoryCounter(key, {
      count: nextCount,
      blockedUntil,
      updatedAt: now,
    });

    if (blockedUntil) {
      return {
        allowed: false,
        retryAfterSec: Math.ceil(options.blockMs / 1000),
      };
    }

    return { allowed: true, retryAfterSec: 0 };
  }

  assertDatabaseConfigured();
  const db = getDb();

  const existing = await db
    .select()
    .from(rateLimits)
    .where(eq(rateLimits.key, key))
    .then((rows) => rows[0]);

  if (existing?.blockedUntil && existing.blockedUntil.getTime() > now.getTime()) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((existing.blockedUntil.getTime() - now.getTime()) / 1000),
    };
  }

  const withinWindow =
    existing?.updatedAt && now.getTime() - existing.updatedAt.getTime() <= options.windowMs;
  const nextCount = withinWindow ? (existing?.count ?? 0) + 1 : 1;
  const blockedUntil =
    nextCount > options.maxAttempts ? new Date(now.getTime() + options.blockMs) : null;

  if (existing) {
    await db
      .update(rateLimits)
      .set({
        count: nextCount,
        blockedUntil,
        updatedAt: now,
      })
      .where(eq(rateLimits.id, existing.id));
  } else {
    await db.insert(rateLimits).values({
      key,
      count: nextCount,
      blockedUntil,
      updatedAt: now,
    });
  }

  if (blockedUntil) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil(options.blockMs / 1000),
    };
  }

  return { allowed: true, retryAfterSec: 0 };
}

export async function resetRateLimit(key) {
  if (shouldUseMemoryStore()) {
    memoryCounters.delete(key);
    return;
  }

  assertDatabaseConfigured();
  const db = getDb();
  await db.delete(rateLimits).where(eq(rateLimits.key, key));
}

export async function cleanupExpiredRateLimits() {
  if (shouldUseMemoryStore()) {
    cleanupMemoryCounters();
    return;
  }

  assertDatabaseConfigured();
  const db = getDb();
  await db
    .delete(rateLimits)
    .where(sql`${rateLimits.blockedUntil} IS NOT NULL AND ${rateLimits.blockedUntil} < NOW()`);
}
