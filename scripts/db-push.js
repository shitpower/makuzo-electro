import { spawnSync } from "node:child_process";

import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Add it to .env.local and retry.");
  process.exit(1);
}

console.log("Applying schema (drizzle-kit push)…\n");

const result = spawnSync("npx", ["drizzle-kit", "push", "--force"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: process.env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log("\nSchema sync complete.");
