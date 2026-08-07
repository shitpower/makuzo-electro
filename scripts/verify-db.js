import { neon } from "@neondatabase/serverless";
import { desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import { auditEvents, inquiries, media, rateLimits, sections, siteSettings } from "../src/db/schema.js";
import { SECTION_KEYS } from "../src/lib/seed-data.js";
import { loadProjectEnv } from "./load-env-local.js";
import { EXPECTED_TABLES, auditTables } from "./db-table-audit.js";

loadProjectEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const db = drizzle(neon(process.env.DATABASE_URL));
const sqlClient = neon(process.env.DATABASE_URL);

let failed = false;

console.log("=== Tables ===");
const { actual, unused, missing } = await auditTables();

for (const table of EXPECTED_TABLES) {
  try {
    const rows = await sqlClient.query(`SELECT count(*)::int AS c FROM "${table}"`);
    console.log(`${table}: ${rows[0]?.c ?? 0} rows`);
  } catch (e) {
    failed = true;
    console.log(`${table}: MISSING or error - ${e.message}`);
  }
}

if (unused.length) {
  failed = true;
  console.log("\nUnused tables (run npm run db:cleanup):", unused.join(", "));
} else {
  console.log("\nUnused tables: (none)");
}

if (missing.length) {
  failed = true;
  console.log("Missing tables:", missing.join(", "));
}

console.log("\nAll public tables:", actual.join(", "));

console.log("\n=== Schema columns smoke ===");
try {
  const settings = await db
    .select({
      id: siteSettings.id,
      sectionSpacing: siteSettings.sectionSpacing,
    })
    .from(siteSettings)
    .limit(1);
  console.log("site_settings.section_spacing: OK", settings[0]?.sectionSpacing ? "present" : "empty");
} catch (e) {
  failed = true;
  console.error("site_settings.section_spacing: FAIL", e.message);
}

try {
  const sectionRows = await db.select({ key: sections.key }).from(sections);
  const keys = sectionRows.map((s) => s.key);
  const extra = keys.filter((k) => !SECTION_KEYS.includes(k));
  const absent = SECTION_KEYS.filter((k) => !keys.includes(k));
  console.log("sections keys:", keys.join(", "));
  if (extra.length) console.log("  extra section keys:", extra.join(", "));
  if (absent.length) {
    failed = true;
    console.log("  missing section keys:", absent.join(", "));
  }
} catch (e) {
  failed = true;
  console.error("sections: FAIL", e.message);
}

console.log("\n=== Query smoke tests ===");
try {
  const mediaRows = await db.select({ id: media.id }).from(media).limit(1);
  console.log("listMedia select: OK", mediaRows.length);
} catch (e) {
  failed = true;
  console.error("listMedia select: FAIL", e.message);
}

try {
  const inquiryRows = await db.select({ id: inquiries.id }).from(inquiries).limit(1);
  console.log("listInquiries select: OK", inquiryRows.length);
} catch (e) {
  failed = true;
  console.error("listInquiries select: FAIL", e.message);
}

try {
  const auditRows = await db
    .select({ id: auditEvents.id })
    .from(auditEvents)
    .orderBy(desc(auditEvents.createdAt))
    .limit(1);
  console.log("listAudit select: OK", auditRows.length);
} catch (e) {
  failed = true;
  console.error("listAudit select: FAIL", e.message);
}

try {
  const count = await db.select({ count: sql`count(*)::int` }).from(rateLimits);
  console.log("rateLimits count: OK", count[0]?.count);
} catch (e) {
  failed = true;
  console.error("rateLimits count: FAIL", e.message);
}

if (failed) {
  console.error("\nVerify FAILED");
  process.exit(1);
}

console.log("\nVerify OK");
