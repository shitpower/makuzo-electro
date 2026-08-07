import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { neon } from "@neondatabase/serverless";

import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const drizzleDir = path.join(__dirname, "..", "drizzle");

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

const files = fs
  .readdirSync(drizzleDir)
  .filter((name) => /^\d+_.+\.sql$/i.test(name))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (!files.length) {
  console.error("No migration SQL files found in drizzle/");
  process.exit(1);
}

for (const file of files) {
  const sqlPath = path.join(drizzleDir, file);
  const migration = fs.readFileSync(sqlPath, "utf8");
  const statements = migration
    .split(";")
    .map((part) => part.replace(/--.*$/gm, "").trim())
    .filter(Boolean);

  for (const statement of statements) {
    await sql.query(`${statement};`);
  }

  console.log("Applied migration:", file, `(${statements.length} statements)`);
}
