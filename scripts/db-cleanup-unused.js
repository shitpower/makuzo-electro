import { loadProjectEnv } from "./load-env-local.js";
import { auditTables, dropUnusedTables } from "./db-table-audit.js";

loadProjectEnv();

const dryRun = process.argv.includes("--dry-run");

console.log("=== Table audit ===");
const { actual, unused, missing } = await auditTables();
console.log("Present:", actual.join(", ") || "(none)");
console.log("Unused (not in schema):", unused.length ? unused.join(", ") : "(none)");
console.log("Missing (in schema, not in DB):", missing.length ? missing.join(", ") : "(none)");

if (missing.length) {
  console.error("\nMissing tables — run npm run db:migrate / db:push first.");
  process.exit(1);
}

await dropUnusedTables({ dryRun });

if (dryRun) {
  console.log("\nDry run complete. Re-run without --dry-run to drop.");
} else {
  console.log("\nCleanup complete.");
}
