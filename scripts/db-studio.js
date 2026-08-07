import { spawnSync } from "node:child_process";

import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Add it to .env.local and retry.");
  process.exit(1);
}

console.log("Opening Drizzle Studio…\n");

const result = spawnSync("npx", ["drizzle-kit", "studio", "--config=drizzle.config.js"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: process.env,
});

process.exit(result.status ?? 1);
