import { pgTable, serial, text, boolean, jsonb, timestamp, integer, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const sections = pgTable("sections", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  visible: boolean("visible").notNull().default(true),
  contentRu: jsonb("content_ru").notNull().default(sql`'{}'::jsonb`),
  contentLv: jsonb("content_lv").notNull().default(sql`'{}'::jsonb`),
  contentEn: jsonb("content_en").notNull().default(sql`'{}'::jsonb`),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type"),
  size: integer("size"),
  /** Base64-encoded file bytes (legacy). Prefer githubUrl / Vercel Blob when set. */
  data: text("data"),
  /** Legacy / optional GitHub mirror path. */
  githubPath: text("github_path"),
  /** Public CDN URL (Vercel Blob or GitHub raw). */
  githubUrl: text("github_url"),
  altRu: text("alt_ru"),
  altLv: text("alt_lv"),
  altEn: text("alt_en"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const inquiries = pgTable(
  "inquiries",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    message: text("message"),
    isRead: boolean("is_read").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("inquiries_created_at_idx").on(table.createdAt),
    index("inquiries_is_read_idx").on(table.isRead),
  ],
);

export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  logoUrl: text("logo_url"),
  seoTitleRu: text("seo_title_ru"),
  seoTitleLv: text("seo_title_lv"),
  seoTitleEn: text("seo_title_en"),
  seoDescRu: text("seo_desc_ru"),
  seoDescLv: text("seo_desc_lv"),
  seoDescEn: text("seo_desc_en"),
  sectionSpacing: jsonb("section_spacing").notNull().default(sql`'{"defaultGap":80,"overrides":{}}'::jsonb`),
  companyProfile: jsonb("company_profile").notNull().default(sql`'{}'::jsonb`),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Persistent rate-limit / lockout counters for serverless instances. */
export const rateLimits = pgTable(
  "rate_limits",
  {
    id: serial("id").primaryKey(),
    key: text("key").notNull().unique(),
    count: integer("count").notNull().default(0),
    blockedUntil: timestamp("blocked_until", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("rate_limits_key_idx").on(table.key)],
);

/** Admin audit trail for content/settings/media/inquiry changes. */
export const auditEvents = pgTable(
  "audit_events",
  {
    id: serial("id").primaryKey(),
    actorEmail: text("actor_email"),
    action: text("action").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id"),
    metadata: jsonb("metadata").notNull().default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("audit_events_created_at_idx").on(table.createdAt),
    index("audit_events_entity_idx").on(table.entityType, table.entityId),
  ],
);
