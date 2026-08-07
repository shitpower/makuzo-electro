/**
 * Resolve Neon/Vercel Postgres connection string from common env names.
 * @returns {string}
 */
export function getDatabaseUrl() {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.POSTGRES_URL_NON_POOLING,
  ];
  for (const value of candidates) {
    const trimmed = value?.trim();
    if (trimmed) return trimmed;
  }
  return "";
}

/** @returns {boolean} */
export function isDatabaseUrlConfigured() {
  return Boolean(getDatabaseUrl());
}
