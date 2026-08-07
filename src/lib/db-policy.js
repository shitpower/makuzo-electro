import "server-only";

import { isDatabaseUrlConfigured } from "@/lib/database-url";

/** Memory fallback is allowed only in local dev / automated tests. */
export function isMemoryFallbackAllowed() {
  return process.env.NODE_ENV !== "production";
}

export function isDatabaseConfigured() {
  return isDatabaseUrlConfigured();
}

export function assertDatabaseConfigured() {
  if (!isDatabaseConfigured()) {
    const error = new Error("DATABASE_URL is not configured.");
    error.code = "DATABASE_NOT_CONFIGURED";
    throw error;
  }
}

export function shouldUseMemoryStore() {
  return !isDatabaseConfigured() && isMemoryFallbackAllowed();
}

export function databaseUnavailableResponse() {
  return {
    status: 503,
    body: {
      error: "База данных недоступна. Проверьте DATABASE_URL.",
      code: "DATABASE_NOT_CONFIGURED",
    },
  };
}
