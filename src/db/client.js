import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";
import { getDatabaseUrl } from "@/lib/database-url";

export { isDatabaseConfigured, shouldUseMemoryStore } from "@/lib/db-policy";

export function getDb() {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error("DATABASE_URL (or POSTGRES_URL) is not configured.");
  }

  const sql = neon(url);
  return drizzle(sql, { schema });
}
