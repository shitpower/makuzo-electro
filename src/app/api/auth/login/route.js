import { NextResponse } from "next/server";

import { tryAdminLogin } from "@/lib/admin-login-core";
import { apiError, apiJson } from "@/lib/api-response";
import { consumeRateLimit, resetRateLimit } from "@/lib/rate-limit";
import { getClientIp, getRequestId, hashKey } from "@/lib/request-utils";
import { createSessionInRouteHandler } from "@/lib/session";
import { AdminSessionConfigError, getAdminSessionOptions } from "@/lib/session-config";

export const runtime = "nodejs";

const LOGIN_LIMIT = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000,
  blockMs: 15 * 60 * 1000,
};

export async function POST(request) {
  const requestId = getRequestId(request);

  try {
    getAdminSessionOptions();
  } catch (error) {
    if (error instanceof AdminSessionConfigError) {
      return apiError("SESSION_SECRET не задан или короче 32 символов.", 503, {
        requestId,
        code: "SESSION_CONFIG",
      });
    }
    throw error;
  }

  const raw = await request.json().catch(() => ({}));
  const email = String(raw.email ?? "")
    .trim()
    .toLowerCase();
  const ip = getClientIp(request);
  const limitKey = hashKey(`login:${ip}:${email}`);

  const limit = await consumeRateLimit(limitKey, LOGIN_LIMIT);
  if (!limit.allowed) {
    return apiError("Слишком много попыток входа. Попробуйте позже.", 429, {
      requestId,
      code: "RATE_LIMITED",
    });
  }

  try {
    const result = await tryAdminLogin(raw.email, raw.password);

    if (!result.ok) {
      const dev = process.env.NODE_ENV !== "production";
      return apiJson(
        {
          error: result.error,
          ...(result.code ? { code: result.code } : {}),
          ...(dev && result.issues ? { issues: result.issues } : {}),
        },
        { status: result.status },
        { requestId },
      );
    }

    await resetRateLimit(limitKey);

    const response = apiJson(
      {
        success: true,
        user: { id: result.user.id, email: result.user.email },
      },
      {},
      { requestId },
    );

    await createSessionInRouteHandler(request, response, result.user.id, {
      email: result.user.email,
    });

    return response;
  } catch (err) {
    return apiError("Внутренняя ошибка сервера", 500, {
      requestId,
      message: err instanceof Error ? err.message : "login_failed",
    });
  }
}
