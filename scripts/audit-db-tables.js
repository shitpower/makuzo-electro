import { loadProjectEnv } from "./load-env-local.js";
import { EXPECTED_TABLES, auditTables, listPublicTables } from "./db-table-audit.js";
import { neon } from "@neondatabase/serverless";

loadProjectEnv();

const sql = neon(process.env.DATABASE_URL);
const tables = await listPublicTables(sql);

console.log("=== ALL TABLES ===");
for (const name of tables) console.log(name);

for (const name of tables) {
  const cols = await sql.query(
    `
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = $1
    ORDER BY ordinal_position
  `,
    [name],
  );
  console.log("\n---", name, "---");
  for (const c of cols) {
    console.log(" ", c.column_name, c.data_type, c.is_nullable === "YES" ? "NULL" : "NOT NULL");
  }
}

const { unused, missing } = await auditTables();
console.log("\n=== DIFF vs schema.js ===");
console.log("expected:", EXPECTED_TABLES.join(", "));
console.log("unused:", unused.length ? unused.join(", ") : "(none)");
console.log("missing:", missing.length ? missing.join(", ") : "(none)");
