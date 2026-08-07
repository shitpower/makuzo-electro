import { getIronSession } from "iron-session";
import { NextResponse } from "next/server";

import { getEdgeSessionOptions } from "@/lib/session-edge";

const LOCALE_COOKIE = "locale";
const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * @param {import("next/server").NextRequest} request
 * @param {import("next/server").NextResponse} res
 */
function applyPublicLocale(request, res) {
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
    return;
  }
  const c = request.cookies.get(LOCALE_COOKIE)?.value;
  const resolved = c === "lv" || c === "ro" ? "lv" : c === "en" ? "en" : "ru";
  res.headers.set("x-lang", resolved);
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const res = NextResponse.next();
  const sessionOptions = getEdgeSessionOptions();

  if (pathname.startsWith("/admin")) {
    if (!sessionOptions) {
      if (pathname !== "/admin/login") {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } else {
      const session = await getIronSession(request, res, sessionOptions);

      if (pathname === "/admin/login") {
        if (session.userId) {
          const target = request.nextUrl.searchParams.get("callbackUrl") || "/admin/content";
          const safe =
            target.startsWith("/admin") && !target.startsWith("/admin/login")
              ? target
              : "/admin/content";
          return NextResponse.redirect(new URL(safe, request.url));
        }
      } else if (!session.userId) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  applyPublicLocale(request, res);
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
