import "server-only";

import { asc, desc, eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { inquiries, sections, siteSettings } from "@/db/schema";
import { assertDatabaseConfigured, shouldUseMemoryStore } from "@/lib/db-policy";
import {
  getAllSectionsMemory,
  getSiteSettingsMemory,
  listInquiriesMemory,
} from "@/lib/memory-store";

/** @param {string[]} sectionIds */
export async function buildJsonExport(sectionIds) {
  /** @type {Record<string, unknown>} */
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    app: "makuzo",
    sections: sectionIds,
  };

  if (sectionIds.includes("sections")) {
    payload.landingSections = await loadSections();
  }
  if (sectionIds.includes("settings")) {
    payload.settings = await loadSettings();
  }
  if (sectionIds.includes("inquiries")) {
    payload.inquiries = await loadInquiries();
  }

  return payload;
}

async function loadSections() {
  if (shouldUseMemoryStore()) {
    return getAllSectionsMemory().map((s) => ({
      key: s.key,
      visible: s.visible,
      contentRu: s.contentRu,
      contentLv: s.contentLv,
      contentEn: s.contentEn,
    }));
  }

  assertDatabaseConfigured();
  const db = getDb();
  const rows = await db.select().from(sections).orderBy(asc(sections.id));
  return rows.map((s) => ({
    key: s.key,
    visible: s.visible,
    contentRu: s.contentRu,
    contentLv: s.contentLv,
    contentEn: s.contentEn,
  }));
}

async function loadSettings() {
  if (shouldUseMemoryStore()) {
    const s = getSiteSettingsMemory();
    return serializeSettings(s);
  }

  assertDatabaseConfigured();
  const db = getDb();
  const row = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).then((r) => r[0]);
  return serializeSettings(row || {});
}

async function loadInquiries() {
  if (shouldUseMemoryStore()) {
    return listInquiriesMemory().map(serializeInquiry);
  }

  assertDatabaseConfigured();
  const db = getDb();
  const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  return rows.map(serializeInquiry);
}

function serializeSettings(s) {
  return {
    logoUrl: s.logoUrl ?? "",
    seoTitleRu: s.seoTitleRu ?? "",
    seoTitleLv: s.seoTitleLv ?? "",
    seoTitleEn: s.seoTitleEn ?? "",
    seoDescRu: s.seoDescRu ?? "",
    seoDescLv: s.seoDescLv ?? "",
    seoDescEn: s.seoDescEn ?? "",
    sectionSpacing: s.sectionSpacing ?? { defaultGap: 80, overrides: {} },
  };
}

function serializeInquiry(row) {
  return {
    name: row.name,
    phone: row.phone,
    email: row.email ?? null,
    message: row.message ?? null,
    isRead: Boolean(row.isRead),
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
  };
}
