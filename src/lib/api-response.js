import "server-only";

import { NextResponse } from "next/server";

import { logEvent } from "@/lib/logger";

function withSecurityHeaders(response, requestId) {
  response.headers.set("X-Request-Id", requestId);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export function apiJson(body, init = {}, meta = {}) {
  const requestId = meta.requestId || "unknown";
  const status = init.status ?? 200;
  const response = withSecurityHeaders(NextResponse.json(body, init), requestId);

  if (status >= 500) {
    logEvent("error", meta.message || "API error", { requestId, status, ...meta });
  }

  return response;
}

export function apiError(message, status = 400, meta = {}) {
  return apiJson({ error: message, ...(meta.code ? { code: meta.code } : {}) }, { status }, meta);
}
