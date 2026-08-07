import { sql } from "drizzle-orm";

import { getDb } from "@/db/client";
import { apiJson } from "@/lib/api-response";
import { isDatabaseConfigured } from "@/lib/db-policy";
import { getRequestId } from "@/lib/request-utils";

export async function GET(request) {
  const requestId = getRequestId(request);
  const startedAt = Date.now();

  if (!isDatabaseConfigured()) {
    return apiJson(
      {
        status: "degraded",
        database: "not_configured",
        uptimeSec: Math.floor(process.uptime()),
        responseMs: Date.now() - startedAt,
      },
      { status: 503 },
      { requestId },
    );
  }

  try {
    const db = getDb();
    await db.execute(sql`select 1`);
    return apiJson(
      {
        status: "ok",
        database: "connected",
        uptimeSec: Math.floor(process.uptime()),
        responseMs: Date.now() - startedAt,
      },
      {},
      { requestId },
    );
  } catch {
    return apiJson(
      {
        status: "degraded",
        database: "unreachable",
        uptimeSec: Math.floor(process.uptime()),
        responseMs: Date.now() - startedAt,
      },
      { status: 503 },
      { requestId },
    );
  }
}
