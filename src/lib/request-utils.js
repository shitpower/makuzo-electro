import "server-only";

import { createHash, randomUUID } from "node:crypto";

export function getRequestId(request) {
  return request.headers.get("x-request-id") || randomUUID();
}

export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

export function hashKey(value) {
  return createHash("sha256").update(String(value)).digest("hex");
}
