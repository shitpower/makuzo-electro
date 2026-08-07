import { neon } from "@neondatabase/serverless";
import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

/** Tables defined in src/db/schema.js — keep in sync. */
export const EXPECTED_TABLES = [
  "sections",
  "admin_users",
  "media",
  "inquiries",
  "site_settings",
  "rate_limits",
  "audit_events",
];

/** System / drizzle tables that must not be dropped. */
const PROTECTED_PREFIXES = ["pg_", "sql_"];
const PROTECTED_NAMES = new Set(["drizzle_migrations", "__drizzle_migrations"]);

/**
 * @param {string} name
 */
function isProtected(name) {
  if (PROTECTED_NAMES.has(name)) return true;
  return PROTECTED_PREFIXES.some((p) => name.startsWith(p));
}

export async function listPublicTables(sql = neon(process.env.DATABASE_URL)) {
  const rows = await sql.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `);
  return rows.map((r) => r.table_name);
}

/**
 * @returns {Promise<{ expected: string[]; actual: string[]; unused: string[]; missing: string[] }>}
 */
export async function auditTables() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
  }
  const sql = neon(process.env.DATABASE_URL);
  const actual = await listPublicTables(sql);
  const unused = actual.filter((n) => !EXPECTED_TABLES.includes(n) && !isProtected(n));
  const missing = EXPECTED_TABLES.filter((n) => !actual.includes(n));
  return { expected: EXPECTED_TABLES, actual, unused, missing };
}

/**
 * Drop tables that exist in DB but are not in schema.js.
 * @param {{ dryRun?: boolean }} opts
 */
export async function dropUnusedTables({ dryRun = false } = {}) {
  const sql = neon(process.env.DATABASE_URL);
  const { unused } = await auditTables();

  if (!unused.length) {
    console.log("No unused tables to drop.");
    return [];
  }

  for (const name of unused) {
    if (!/^[a-z][a-z0-9_]*$/i.test(name)) {
      console.warn(`Skip suspicious table name: ${name}`);
      continue;
    }
    if (dryRun) {
      console.log(`[dry-run] Would DROP TABLE IF EXISTS "${name}" CASCADE`);
    } else {
      await sql.query(`DROP TABLE IF EXISTS "${name}" CASCADE`);
      console.log(`Dropped unused table: ${name}`);
    }
  }
  return unused;
}
