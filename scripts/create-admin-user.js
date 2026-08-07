import * as readline from "node:readline/promises";
import { pathToFileURL } from "node:url";
import { stdin as input, stdout as output } from "node:process";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { adminUsers } from "../src/db/schema.js";
import { loadProjectEnv } from "./load-env-local.js";

loadProjectEnv();

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required. Add it to .env.local");
  }
  return drizzle(neon(process.env.DATABASE_URL));
}

export async function upsertAdminUser(email, password) {
  const db = getDb();
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await db
    .select({ id: adminUsers.id })
    .from(adminUsers)
    .where(eq(adminUsers.email, normalizedEmail))
    .then((rows) => rows[0]);

  if (existing) {
    await db.update(adminUsers).set({ passwordHash }).where(eq(adminUsers.id, existing.id));
    return { action: "updated", id: existing.id, email: normalizedEmail };
  }

  const inserted = await db
    .insert(adminUsers)
    .values({ email: normalizedEmail, passwordHash })
    .returning({ id: adminUsers.id });

  return { action: "created", id: inserted[0]?.id, email: normalizedEmail };
}

async function promptAdminCredentials() {
  const rl = readline.createInterface({ input, output });

  console.log("\nАдминистратор -введите логин и пароль.\n");

  try {
    for (;;) {
      const emailRaw = await rl.question("Email (логин): ");
      const email = emailRaw.trim().toLowerCase();
      if (!email || !isValidEmail(email)) {
        console.log("   Укажите корректный email.");
        continue;
      }

      let password = "";
      for (;;) {
        password = await rl.question("Пароль (минимум 8 символов): ");
        if (password.length < 8) {
          console.log("   Пароль слишком короткий.");
          continue;
        }
        const password2 = await rl.question("Повторите пароль: ");
        if (password !== password2) {
          console.log("   Пароли не совпадают.");
          continue;
        }
        break;
      }

      return { email, password };
    }
  } finally {
    rl.close();
  }
}

async function main() {
  const fromEnv = process.env.ADMIN_EMAIL?.trim() && process.env.ADMIN_PASSWORD;
  let email;
  let password;

  if (fromEnv) {
    email = process.env.ADMIN_EMAIL.trim().toLowerCase();
    password = process.env.ADMIN_PASSWORD;
  } else {
    ({ email, password } = await promptAdminCredentials());
  }

  const result = await upsertAdminUser(email, password);
  console.log(result.action === "created" ? `✓ Создан: ${result.email}` : `✓ Обновлён: ${result.email}`);
}

const isDirectRun =
  process.argv[1] &&
  (import.meta.url === pathToFileURL(process.argv[1]).href ||
    process.argv[1].replace(/\\/g, "/").endsWith("scripts/create-admin-user.js"));

if (isDirectRun) {
  main().catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
}
