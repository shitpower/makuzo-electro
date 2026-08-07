import "server-only";

import { desc, eq, and, ilike, or, sql } from "drizzle-orm";

import { getDb } from "@/db/client";
import { auditEvents } from "@/db/schema";
import { assertDatabaseConfigured, shouldUseMemoryStore } from "@/lib/db-policy";

/** @type {Array<import("@/db/schema").auditEvents.$inferSelect>} */
const memoryAuditEvents = [];

/**
 * @param {{ actorEmail?: string | null; action: string; entityType: string; entityId?: string | number | null; metadata?: Record<string, unknown> }} input
 */
export async function createAuditEvent(input) {
  const row = {
    actorEmail: input.actorEmail ?? null,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId != null ? String(input.entityId) : null,
    metadata: input.metadata ?? {},
    createdAt: new Date(),
  };

  if (shouldUseMemoryStore()) {
    const event = { id: memoryAuditEvents.length + 1, ...row };
    memoryAuditEvents.unshift(event);
    return event;
  }

  assertDatabaseConfigured();
  const db = getDb();
  const inserted = await db.insert(auditEvents).values(row).returning();
  return inserted[0];
}

/**
 * @param {{ page?: number; pageSize?: number; maxPageSize?: number; entityType?: string; action?: string; q?: string }} [options]
 */
export async function listAuditEvents(options = {}) {
  const page = Math.max(1, options.page ?? 1);
  const maxPageSize = Math.min(10000, Math.max(1, options.maxPageSize ?? 100));
  const pageSize = Math.min(maxPageSize, Math.max(1, options.pageSize ?? 20));
  const offset = (page - 1) * pageSize;

  if (shouldUseMemoryStore()) {
    let items = [...memoryAuditEvents];
    if (options.entityType) {
      items = items.filter((item) => item.entityType === options.entityType);
    }
    if (options.action) {
      items = items.filter((item) => item.action === options.action);
    }
    if (options.q) {
      const q = options.q.toLowerCase();
      items = items.filter(
        (item) =>
          item.actorEmail?.toLowerCase().includes(q) ||
          item.entityId?.toLowerCase().includes(q) ||
          item.action.toLowerCase().includes(q),
      );
    }
    const total = items.length;
    return {
      items: items.slice(offset, offset + pageSize),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  }

  assertDatabaseConfigured();
  const db = getDb();
  const filters = [];
  if (options.entityType) filters.push(eq(auditEvents.entityType, options.entityType));
  if (options.action) filters.push(eq(auditEvents.action, options.action));
  if (options.q) {
    const pattern = `%${options.q}%`;
    filters.push(
      or(
        ilike(auditEvents.actorEmail, pattern),
        ilike(auditEvents.entityId, pattern),
        ilike(auditEvents.action, pattern),
      ),
    );
  }

  const whereClause = filters.length ? and(...filters) : undefined;

  const items = await db
    .select()
    .from(auditEvents)
    .where(whereClause)
    .orderBy(desc(auditEvents.createdAt))
    .limit(pageSize)
    .offset(offset);

  const totalRow = await db
    .select({ count: sql`count(*)::int` })
    .from(auditEvents)
    .where(whereClause)
    .then((rows) => rows[0]);

  const total = totalRow?.count ?? 0;
  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}
