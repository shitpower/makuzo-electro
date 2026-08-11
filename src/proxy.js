import { NextResponse } from "next/server";

const LOCALE_COOKIE = "locale";
const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Public locale only — no iron-session (auth lives in admin/(panel)/layout).
 * Keeps the proxy bundle small for homepage TTFB.
 *
 * @param {import("next/server").NextRequest} request
 */
export function proxy(request) {
  const res = NextResponse.next();
  const qp = request.nextUrl.searchParams.get("lang") || request.nextUrl.searchParams.get("locale");

  if (qp === "ru" || qp === "lv" || qp === "en" || qp === "ro") {
    const locale = qp === "ro" ? "lv" : qp;
    res.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: LOCALE_MAX_AGE,
      sameSite: "lax",
      httpOnly: false,
    });
    res.headers.set("x-lang", locale);
    return res;
  }

  const c = request.cookies.get(LOCALE_COOKIE)?.value;
  const resolved = c === "lv" || c === "ro" ? "lv" : c === "en" ? "en" : "ru";
  res.headers.set("x-lang", resolved);
  return res;
}

/**
 * Only HTML pages that need locale cookie / x-lang.
 * Admin auth is NOT here — see admin/(panel)/layout.jsx (Node session).
 * API / static / images never hit this proxy.
 */
export const config = {
  matcher: ["/", "/design", "/privacy", "/smart-home"],
};
