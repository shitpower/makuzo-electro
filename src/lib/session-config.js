/**
 * Единые настройки iron-session для админки (App Router + middleware).
 */

export const ADMIN_SESSION_COOKIE_NAME = "admin-session";
export const ADMIN_SESSION_MIN_SECRET_LENGTH = 32;

const DEV_FALLBACK_PASSWORD = "dev-only-session-secret-min-32-chars!!";

export class AdminSessionConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = "AdminSessionConfigError";
  }
}

const ADMIN_SESSION_TTL_SEC = 60 * 60 * 24 * 7;

/** @returns {import("iron-session").SessionOptions} */
export function getAdminSessionOptions() {
  const isProd = process.env.NODE_ENV === "production";
  const raw =
    process.env.SESSION_SECRET?.trim() ||
    process.env.AUTH_SECRET?.trim() ||
    "";

  if (isProd && raw.length < ADMIN_SESSION_MIN_SECRET_LENGTH) {
    throw new AdminSessionConfigError("SESSION_SECRET must be at least 32 characters in production.");
  }

  const password =
    raw.length >= ADMIN_SESSION_MIN_SECRET_LENGTH ? raw : DEV_FALLBACK_PASSWORD;

  if (!isProd && raw.length < ADMIN_SESSION_MIN_SECRET_LENGTH) {
    console.warn(
      "[admin-session] SESSION_SECRET отсутствует или короче 32 символов -используется dev fallback.",
    );
  }

  return {
    cookieName: ADMIN_SESSION_COOKIE_NAME,
    password,
    ttl: ADMIN_SESSION_TTL_SEC,
    cookieOptions: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: isProd,
    },
  };
}
