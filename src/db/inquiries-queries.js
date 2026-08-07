import "server-only";

import { and, desc, eq, ilike, or, sql } from "drizzle-orm";

import { getDb } from "@/db/client";
import { inquiries, media } from "@/db/schema";
import { assertDatabaseConfigured, shouldUseMemoryStore } from "@/lib/db-policy";
import {
  createInquiryMemory,
  createMediaMemory,
  deleteInquiryMemory,
  deleteMediaMemory,
  getMediaByIdMemory,
  listInquiriesMemory,
  listMediaMemory,
  updateInquiryMemory,
} from "@/lib/memory-store";

/**
 * @param {{ page?: number; pageSize?: number; maxPageSize?: number; q?: string; isRead?: boolean }} [options]
 */
export async function listInquiries(options = {}) {
  const page = Math.max(1, options.page ?? 1);
  const maxPageSize = Math.min(10000, Math.max(1, options.maxPageSize ?? 100));
  const pageSize = Math.min(maxPageSize, Math.max(1, options.pageSize ?? 20));
  const offset = (page - 1) * pageSize;

  if (shouldUseMemoryStore()) {
    let items = listInquiriesMemory();
    if (options.isRead !== undefined) {
      items = items.filter((item) => item.isRead === options.isRead);
    }
    if (options.q) {
      const q = options.q.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.phone.toLowerCase().includes(q) ||
          item.email?.toLowerCase().includes(q) ||
          item.message?.toLowerCase().includes(q),
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
  if (options.isRead !== undefined) filters.push(eq(inquiries.isRead, options.isRead));
  if (options.q) {
    const pattern = `%${options.q}%`;
    filters.push(
      or(
        ilike(inquiries.name, pattern),
        ilike(inquiries.phone, pattern),
        ilike(inquiries.email, pattern),
        ilike(inquiries.message, pattern),
      ),
    );
  }
  const whereClause = filters.length ? and(...filters) : undefined;

  const items = await db
    .select()
    .from(inquiries)
    .where(whereClause)
    .orderBy(desc(inquiries.createdAt))
    .limit(pageSize)
    .offset(offset);

  const totalRow = await db
    .select({ count: sql`count(*)::int` })
    .from(inquiries)
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

/**
 * @param {{ name: string; phone: string; email?: string; message?: string }} data
 */
export async function createInquiry(data) {
  if (shouldUseMemoryStore()) {
    return createInquiryMemory(data);
  }
  assertDatabaseConfigured();
  const db = getDb();
  const inserted = await db
    .insert(inquiries)
    .values({
      name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      message: data.message ?? null,
    })
    .returning();
  return inserted[0];
}

/**
 * @param {number} id
 * @param {{ isRead?: boolean }} patch
 */
export async function updateInquiry(id, patch) {
  if (shouldUseMemoryStore()) {
    return updateInquiryMemory(id, patch);
  }
  assertDatabaseConfigured();
  const db = getDb();
  const updated = await db
    .update(inquiries)
    .set(patch)
    .where(eq(inquiries.id, id))
    .returning();
  return updated[0] ?? null;
}

export async function deleteInquiry(id) {
  if (shouldUseMemoryStore()) {
    return deleteInquiryMemory(id);
  }
  assertDatabaseConfigured();
  const db = getDb();
  const deleted = await db.delete(inquiries).where(eq(inquiries.id, id)).returning();
  return deleted[0] ?? null;
}

const MEDIA_LIST_COLUMNS = {
  id: media.id,
  filename: media.filename,
  mimeType: media.mimeType,
  size: media.size,
  githubPath: media.githubPath,
  githubUrl: media.githubUrl,
  altRu: media.altRu,
  altLv: media.altLv,
  altEn: media.altEn,
  createdAt: media.createdAt,
};

/**
 * @param {{ page?: number; pageSize?: number; q?: string }} [options]
 */
export async function listMedia(options = {}) {
  const page = Math.max(1, options.page ?? 1);
  const pageSize = Math.min(100, Math.max(1, options.pageSize ?? 24));
  const offset = (page - 1) * pageSize;

  if (shouldUseMemoryStore()) {
    let items = listMediaMemory();
    if (options.q) {
      const q = options.q.toLowerCase();
      items = items.filter((item) => item.filename.toLowerCase().includes(q));
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
  const whereClause = options.q ? ilike(media.filename, `%${options.q}%`) : undefined;

  const items = await db
    .select(MEDIA_LIST_COLUMNS)
    .from(media)
    .where(whereClause)
    .orderBy(desc(media.createdAt))
    .limit(pageSize)
    .offset(offset);

  const totalRow = await db
    .select({ count: sql`count(*)::int` })
    .from(media)
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

/**
 * @param {{ filename: string; mimeType?: string; size?: number; data?: string; githubPath?: string; githubUrl?: string; altRu?: string; altLv?: string; altEn?: string }} data
 */
export async function createMedia(data) {
  if (shouldUseMemoryStore()) {
    return createMediaMemory(data);
  }
  assertDatabaseConfigured();
  const db = getDb();
  const inserted = await db.insert(media).values(data).returning(MEDIA_LIST_COLUMNS);
  return inserted[0];
}

export async function getMediaById(id) {
  if (shouldUseMemoryStore()) {
    return getMediaByIdMemory(id);
  }
  assertDatabaseConfigured();
  const db = getDb();
  return db
    .select()
    .from(media)
    .where(eq(media.id, id))
    .then((rows) => rows[0] ?? null);
}

export async function deleteMedia(id) {
  if (shouldUseMemoryStore()) {
    return deleteMediaMemory(id);
  }
  assertDatabaseConfigured();
  const db = getDb();
  const deleted = await db.delete(media).where(eq(media.id, id)).returning();
  return deleted[0] ?? null;
}
