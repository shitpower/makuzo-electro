import "server-only";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { adminUsers } from "@/db/schema";
import { shouldUseMemoryStore } from "@/lib/db-policy";
import { getAdminSessionOptions } from "@/lib/session-config";

/**
 * @typedef {{ userId?: number; email?: string }} AdminSessionData
 */

/** @returns {Promise<import("iron-session").IronSession<AdminSessionData>>} */
export async function getAdminIronSession() {
  const cookieStore = await cookies();
  return getIronSession(cookieStore, getAdminSessionOptions());
}

export async function isAdminAuthenticated() {
  const session = await getAdminIronSession();
  return Boolean(session.userId);
}

/**
 * @returns {Promise<{ id: number; email: string; name: string | null } | null>}
 */
export async function getSession() {
  try {
    const session = await getAdminIronSession();
    if (!session.userId) return null;

    if (shouldUseMemoryStore()) {
      return {
        id: session.userId,
        email: session.email ?? "admin@local",
        name: "Admin",
      };
    }

    const db = getDb();
    const row = await db
      .select({ id: adminUsers.id, email: adminUsers.email, name: adminUsers.name })
      .from(adminUsers)
      .where(eq(adminUsers.id, session.userId))
      .then((rows) => rows[0]);

    if (!row) {
      session.destroy();
      await session.save();
      return null;
    }

    return row;
  } catch {
    return null;
  }
}

/**
 * @returns {Promise<{ id: number; email: string; name: string | null }>}
 */
export async function requireAdminSession() {
  const user = await getSession();
  if (!user) {
    throw new UnauthorizedError("No active admin session");
  }
  return user;
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * @param {number} userId
 * @param {{ email?: string }} [extras]
 */
export async function createAdminSession(userId, extras = {}) {
  const session = await getAdminIronSession();
  session.userId = userId;
  if (typeof extras.email === "string") {
    session.email = extras.email.trim().toLowerCase() || undefined;
  }
  await session.save();
}

/**
 * @param {import("next/server").NextRequest} request
 * @param {import("next/server").NextResponse} response
 * @param {number} userId
 * @param {{ email?: string }} [extras]
 */
export async function createSessionInRouteHandler(request, response, userId, extras = {}) {
  const session = await getIronSession(request, response, getAdminSessionOptions());
  session.userId = userId;
  if (typeof extras.email === "string") {
    session.email = extras.email.trim().toLowerCase() || undefined;
  }
  await session.save();
}

export async function destroyAdminSession() {
  const session = await getAdminIronSession();
  session.destroy();
  await session.save();
}
