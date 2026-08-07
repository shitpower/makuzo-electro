import "server-only";

import { eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { inquiries, sections, siteSettings } from "@/db/schema";
import { assertDatabaseConfigured, shouldUseMemoryStore } from "@/lib/db-policy";
import {
  createInquiryMemory,
  getAllSectionsMemory,
  updateSectionMemory,
  updateSiteSettingsMemory,
} from "@/lib/memory-store";
import { VALID_SECTION_IDS } from "@/lib/admin/data-transfer-sections";

/**
 * @param {unknown} payload
 * @returns {string[]}
 */
export function previewJsonImport(payload) {
  if (!payload || typeof payload !== "object") return [];
  /** @type {string[]} */
  const detected = [];
  const data = /** @type {Record<string, unknown>} */ (payload);
  if (Array.isArray(data.landingSections) || Array.isArray(data.sectionsData)) detected.push("sections");
  if (data.settings && typeof data.settings === "object") detected.push("settings");
  if (Array.isArray(data.inquiries)) detected.push("inquiries");
  return detected.filter((id) => VALID_SECTION_IDS.has(id));
}

/**
 * @param {unknown} payload
 * @param {string[]} sectionIds
 */
export async function importJsonData(payload, sectionIds) {
  /** @type {Record<string, number>} */
  const counts = {};
  /** @type {string[]} */
  const errors = [];

  if (!payload || typeof payload !== "object") {
    return { counts, errors: ["Некорректный JSON"] };
  }

  const data = /** @type {Record<string, unknown>} */ (payload);

  if (sectionIds.includes("sections")) {
    try {
      counts.sections = await importSections(data.landingSections ?? data.sectionsData);
    } catch (err) {
      errors.push(err instanceof Error ? err.message : "Ошибка импорта секций");
    }
  }

  if (sectionIds.includes("settings")) {
    try {
      counts.settings = await importSettings(data.settings);
    } catch (err) {
      errors.push(err instanceof Error ? err.message : "Ошибка импорта настроек");
    }
  }

  if (sectionIds.includes("inquiries")) {
    try {
      counts.inquiries = await importInquiries(data.inquiries);
    } catch (err) {
      errors.push(err instanceof Error ? err.message : "Ошибка импорта заявок");
    }
  }

  return { counts, errors };
}

/** @param {unknown} raw */
async function importSections(raw) {
  if (!Array.isArray(raw)) throw new Error("В файле нет массива секций");

  let updated = 0;
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = /** @type {Record<string, unknown>} */ (item);
    const key = typeof row.key === "string" ? row.key.trim() : "";
    if (!key) continue;

    const patch = {
      ...(typeof row.visible === "boolean" ? { visible: row.visible } : {}),
      ...(row.contentRu && typeof row.contentRu === "object" ? { contentRu: row.contentRu } : {}),
      ...(row.contentLv && typeof row.contentLv === "object" ? { contentLv: row.contentLv } : {}),
      ...(row.contentEn && typeof row.contentEn === "object" ? { contentEn: row.contentEn } : {}),
    };

    if (shouldUseMemoryStore()) {
      const existing = getAllSectionsMemory().find((s) => s.key === key);
      if (!existing) continue;
      updateSectionMemory(key, patch);
      updated += 1;
      continue;
    }

    assertDatabaseConfigured();
    const db = getDb();
    const existing = await db
      .select({ id: sections.id })
      .from(sections)
      .where(eq(sections.key, key))
      .then((r) => r[0]);
    if (!existing) continue;

    await db
      .update(sections)
      .set({ ...patch, updatedAt: new Date() })
      .where(eq(sections.key, key));
    updated += 1;
  }

  return updated;
}

/** @param {unknown} raw */
async function importSettings(raw) {
  if (!raw || typeof raw !== "object") throw new Error("В файле нет настроек");
  const row = /** @type {Record<string, unknown>} */ (raw);
  const patch = {
    ...(typeof row.logoUrl === "string" ? { logoUrl: row.logoUrl } : {}),
    ...(typeof row.seoTitleRu === "string" ? { seoTitleRu: row.seoTitleRu } : {}),
    ...(typeof row.seoTitleLv === "string" ? { seoTitleLv: row.seoTitleLv } : {}),
    ...(typeof row.seoTitleEn === "string" ? { seoTitleEn: row.seoTitleEn } : {}),
    ...(typeof row.seoDescRu === "string" ? { seoDescRu: row.seoDescRu } : {}),
    ...(typeof row.seoDescLv === "string" ? { seoDescLv: row.seoDescLv } : {}),
    ...(typeof row.seoDescEn === "string" ? { seoDescEn: row.seoDescEn } : {}),
    ...(row.sectionSpacing && typeof row.sectionSpacing === "object"
      ? { sectionSpacing: row.sectionSpacing }
      : {}),
  };

  if (shouldUseMemoryStore()) {
    updateSiteSettingsMemory(patch);
    return 1;
  }

  assertDatabaseConfigured();
  const db = getDb();
  const existing = await db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.id, 1)).then((r) => r[0]);
  if (existing) {
    await db.update(siteSettings).set({ ...patch, updatedAt: new Date() }).where(eq(siteSettings.id, 1));
  } else {
    await db.insert(siteSettings).values({ id: 1, ...patch });
  }
  return 1;
}

/** @param {unknown} raw */
async function importInquiries(raw) {
  if (!Array.isArray(raw)) throw new Error("В файле нет массива заявок");

  let created = 0;
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = /** @type {Record<string, unknown>} */ (item);
    const name = typeof row.name === "string" ? row.name.trim() : "";
    const phone = typeof row.phone === "string" ? row.phone.trim() : "";
    if (!name || !phone) continue;

    const payload = {
      name,
      phone,
      email: typeof row.email === "string" ? row.email : null,
      message: typeof row.message === "string" ? row.message : null,
      isRead: Boolean(row.isRead),
    };

    if (shouldUseMemoryStore()) {
      createInquiryMemory(payload);
      created += 1;
      continue;
    }

    assertDatabaseConfigured();
    const db = getDb();
    await db.insert(inquiries).values({
      ...payload,
      createdAt: row.createdAt ? new Date(String(row.createdAt)) : new Date(),
    });
    created += 1;
  }

  return created;
}
