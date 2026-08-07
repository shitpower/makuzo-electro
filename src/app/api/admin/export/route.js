import { NextResponse } from "next/server";

import { createAuditEvent } from "@/db/audit-queries";
import { buildJsonExport } from "@/lib/admin/data-transfer-export";
import { normalizeSectionList } from "@/lib/admin/data-transfer-sections";
import { apiError } from "@/lib/api-response";
import { getRequestId } from "@/lib/request-utils";
import { requireAdminSession } from "@/lib/session";

export const runtime = "nodejs";

/** Полный JSON-бэкап. */
export async function GET(request) {
  const requestId = getRequestId(request);

  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const payload = await buildJsonExport([...normalizeSectionList(null)]);

  await createAuditEvent({
    actorEmail: session.email,
    action: "export",
    entityType: "backup",
    entityId: "full",
    metadata: { sections: payload.sections },
  });

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="makuzo-backup-${Date.now()}.json"`,
    },
  });
}

/** Экспорт выбранных секций. */
export async function POST(request) {
  const requestId = getRequestId(request);

  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    return apiError("Invalid JSON body", 400, { requestId });
  }

  const sections = normalizeSectionList(body.sections);
  const payload = await buildJsonExport(sections);

  await createAuditEvent({
    actorEmail: session.email,
    action: "export",
    entityType: "backup",
    entityId: "partial",
    metadata: { sections },
  });

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="makuzo-backup-${Date.now()}.json"`,
    },
  });
}
