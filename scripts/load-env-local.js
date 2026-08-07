import { readFileSync, existsSync, appendFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { resolve } from "node:path";

export function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const text = readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}

export function loadProjectEnv() {
  loadEnvFile(resolve(process.cwd(), ".env.local"));
  loadEnvFile(resolve(process.cwd(), ".env"));
  if (!process.env.DATABASE_URL && process.env.POSTGRES_URL) {
    process.env.DATABASE_URL = process.env.POSTGRES_URL;
  }
}

export function ensureLocalAuthEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) {
    appendFileSync(envPath, "", "utf8");
  }
  loadEnvFile(envPath);

  const additions = [];

  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32) {
    const secret = randomBytes(32).toString("base64");
    additions.push(`SESSION_SECRET=${secret}`);
    process.env.SESSION_SECRET = secret;
  }

  if (additions.length > 0) {
    appendFileSync(envPath, `\n# Added by npm run db:setup\n${additions.join("\n")}\n`, "utf8");
    console.log(`Updated ${envPath}: ${additions.map((l) => l.split("=")[0]).join(", ")}`);
  }
}
