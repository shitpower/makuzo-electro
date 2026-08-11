/**
 * Apply Round-3 performance indexes for inquiries listing/filters.
 * Safe to re-run (IF NOT EXISTS).
 *
 * Usage: npm run db:indexes
 */
import { neon } from "@neondatabase/serverless";

import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
  console.error("DATABASE_URL (or POSTGRES_URL) is required.");
  process.exit(1);
}

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const sql = neon(url);

await sql`CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at)`;
await sql`CREATE INDEX IF NOT EXISTS inquiries_is_read_idx ON inquiries (is_read)`;

console.log("OK: inquiries_created_at_idx, inquiries_is_read_idx");
