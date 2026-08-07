import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { getDb } from "@/db/client";
import { adminUsers } from "@/db/schema";
import { isDatabaseConfigured } from "@/lib/db-policy";
import { adminLoginSchema } from "@/lib/validation";

export const ADMIN_LOGIN_INVALID_MSG = "Неверный email или пароль";

const DEV_FALLBACK_EMAIL = "admin@makuzo.local";
const DEV_FALLBACK_PASSWORD = "admin12345";

export function normalizeAdminEmail(email) {
  return String(email ?? "")
    .trim()
    .toLowerCase();
}

/**
 * @param {string} email
 * @param {string} password
 */
export async function tryAdminLogin(email, password) {
  const normalizedEmail = normalizeAdminEmail(email);

  const parsed = adminLoginSchema.safeParse({ email: normalizedEmail, password });
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      error: "Некорректные данные",
      exposeDetails: process.env.NODE_ENV !== "production",
      issues: parsed.error.flatten(),
    };
  }

  if (!isDatabaseConfigured()) {
    if (process.env.NODE_ENV === "production") {
      return {
        ok: false,
        status: 503,
        error: "База данных не настроена. Укажите DATABASE_URL или POSTGRES_URL.",
        code: "DATABASE_NOT_CONFIGURED",
      };
    }
    if (
      parsed.data.email === DEV_FALLBACK_EMAIL &&
      parsed.data.password === DEV_FALLBACK_PASSWORD
    ) {
      return { ok: true, user: { id: 1, email: DEV_FALLBACK_EMAIL, name: "Admin" } };
    }
    return { ok: false, status: 401, error: ADMIN_LOGIN_INVALID_MSG };
  }

  let row;
  try {
    const db = getDb();
    row = await db
      .select({
        id: adminUsers.id,
        email: adminUsers.email,
        name: adminUsers.name,
        passwordHash: adminUsers.passwordHash,
      })
      .from(adminUsers)
      .where(eq(adminUsers.email, parsed.data.email))
      .then((rows) => rows[0]);
  } catch (err) {
    console.error("[admin-login] database", err);
    return {
      ok: false,
      status: 503,
      error: "Не удалось подключиться к базе данных. Проверьте DATABASE_URL.",
      code: "DATABASE_CONNECTION",
    };
  }

  if (!row) {
    return { ok: false, status: 401, error: ADMIN_LOGIN_INVALID_MSG };
  }

  const match = await bcrypt.compare(parsed.data.password, row.passwordHash);
  if (!match) {
    return { ok: false, status: 401, error: ADMIN_LOGIN_INVALID_MSG };
  }

  return {
    ok: true,
    user: { id: row.id, email: row.email, name: row.name ?? null },
  };
}
