import { NextResponse } from "next/server";

import { DEFAULT_LOCALE, isSiteLocale, parseSiteLocale } from "./lib/site-locale";

const LOCALE_COOKIE = "locale";
const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

/** Legacy public paths (no locale prefix) that must redirect into /[locale]/… */
const LEGACY_PAGE_PATHS = new Set(["/", "/design", "/design/gallery", "/privacy", "/smart-home"]);

/**
 * @param {string} pathname
 * @returns {{ locale: 'ru' | 'lv' | 'en'; rest: string } | null}
 */
function matchLocalePath(pathname) {
  const m = pathname.match(/^\/(ru|lv|en)(\/.*)?$/);
  if (!m || !isSiteLocale(m[1])) return null;
  return { locale: m[1], rest: m[2] || "/" };
}

/**
 * Public locale routing — no iron-session (auth lives in admin/(panel)/layout).
 * Cookie only drives redirects to locale-prefixed URLs so RSC never calls cookies().
 *
 * @param {import("next/server").NextRequest} request
 */
export function proxy(request) {
  const url = request.nextUrl.clone();
  const qpRaw = url.searchParams.get("lang") || url.searchParams.get("locale");
  const qpLocale = qpRaw ? parseSiteLocale(qpRaw) : null;
  const cookieRaw = request.cookies.get(LOCALE_COOKIE)?.value;
  const cookieLocale = cookieRaw ? parseSiteLocale(cookieRaw) : null;

  const localized = matchLocalePath(url.pathname);

  if (localized) {
    const res = NextResponse.next();
    res.cookies.set(LOCALE_COOKIE, localized.locale, {
      path: "/",
      maxAge: LOCALE_MAX_AGE,
      sameSite: "lax",
      httpOnly: false,
    });
    res.headers.set("x-lang", localized.locale);

    if (qpRaw) {
      url.searchParams.delete("lang");
      url.searchParams.delete("locale");
      return NextResponse.redirect(url, 308);
    }
    return res;
  }

  if (!LEGACY_PAGE_PATHS.has(url.pathname)) {
    return NextResponse.next();
  }

  const locale = qpLocale || cookieLocale || DEFAULT_LOCALE;
  const rest = url.pathname === "/" ? "" : url.pathname;
  url.pathname = `/${locale}${rest}`;
  url.searchParams.delete("lang");
  url.searchParams.delete("locale");

  const res = NextResponse.redirect(url, 308);
  res.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_MAX_AGE,
    sameSite: "lax",
    httpOnly: false,
  });
  res.headers.set("x-lang", locale);
  return res;
}

/**
 * Only HTML pages that need locale cookie / redirects.
 * Admin auth is NOT here — see admin/(panel)/layout.jsx (Node session).
 */
export const config = {
  matcher: [
    "/",
    "/design",
    "/design/gallery",
    "/privacy",
    "/smart-home",
    "/ru",
    "/ru/:path*",
    "/lv",
    "/lv/:path*",
    "/en",
    "/en/:path*",
  ],
};
