import { spawnSync } from "node:child_process";

import { ensureLocalAuthEnv, loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();
ensureLocalAuthEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Add it to .env.local and retry.");
  process.exit(1);
}

const steps = [
  ["node", ["scripts/db-push.js"]],
  ["node", ["scripts/apply-security-migration.js"]],
  ["node", ["scripts/verify-db.js"]],
  ["node", ["scripts/create-admin-user.js"]],
];

for (const [cmd, args] of steps) {
  console.log(`\n> ${cmd} ${args.join(" ")}`);
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("\nDB setup complete.");
