import "server-only";

import { eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { sections, siteSettings } from "@/db/schema";
import { assertDatabaseConfigured, shouldUseMemoryStore } from "@/lib/db-policy";
import {
  getAllSectionsMemory,
  getSectionByKeyMemory,
  getSiteSettingsMemory,
  updateSectionMemory,
  updateSiteSettingsMemory,
} from "@/lib/memory-store";

export async function listSections() {
  if (shouldUseMemoryStore()) {
    return getAllSectionsMemory();
  }
  assertDatabaseConfigured();
  const db = getDb();
  return db.select().from(sections).orderBy(sections.id);
}

export async function getSectionByKey(key) {
  if (shouldUseMemoryStore()) {
    return getSectionByKeyMemory(key);
  }
  assertDatabaseConfigured();
  const db = getDb();
  return db
    .select()
    .from(sections)
    .where(eq(sections.key, key))
    .then((rows) => rows[0] ?? null);
}

export async function getVisibleSectionsMap() {
  const all = await listSections();
  const map = {};
  for (const section of all) {
    if (section.visible) {
      map[section.key] = section;
    }
  }
  return map;
}

/**
 * @param {string} key
 * @param {{ visible?: boolean; contentRu?: object; contentLv?: object; contentEn?: object }} patch
 */
export async function updateSection(key, patch) {
  if (shouldUseMemoryStore()) {
    return updateSectionMemory(key, patch);
  }
  assertDatabaseConfigured();
  const db = getDb();
  const updated = await db
    .update(sections)
    .set({
      ...(patch.visible !== undefined ? { visible: patch.visible } : {}),
      ...(patch.contentRu !== undefined ? { contentRu: patch.contentRu } : {}),
      ...(patch.contentLv !== undefined ? { contentLv: patch.contentLv } : {}),
      ...(patch.contentEn !== undefined ? { contentEn: patch.contentEn } : {}),
      updatedAt: new Date(),
    })
    .where(eq(sections.key, key))
    .returning();
  return updated[0] ?? null;
}

export async function getSiteSettings() {
  if (shouldUseMemoryStore()) {
    return getSiteSettingsMemory();
  }
  assertDatabaseConfigured();
  const db = getDb();
  const row = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).then((r) => r[0]);
  if (row) return row;
  const inserted = await db.insert(siteSettings).values({ id: 1 }).returning();
  return inserted[0];
}

/**
 * @param {Partial<import("@/db/schema").siteSettings.$inferInsert>} patch
 */
export async function updateSiteSettings(patch) {
  if (shouldUseMemoryStore()) {
    return updateSiteSettingsMemory(patch);
  }
  assertDatabaseConfigured();
  const db = getDb();
  const existing = await getSiteSettings();
  if (!existing) {
    const inserted = await db.insert(siteSettings).values({ id: 1, ...patch }).returning();
    return inserted[0];
  }
  const updated = await db
    .update(siteSettings)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(siteSettings.id, 1))
    .returning();
  return updated[0];
}
