import { NextResponse } from "next/server";

import { createAuditEvent, listAuditEvents } from "@/db/audit-queries";
import {
  buildExcelBuffer,
  excelFilename,
  formatExcelDate,
} from "@/lib/admin/excel-export";
import { apiError } from "@/lib/api-response";
import { getRequestId } from "@/lib/request-utils";
import { requireAdminSession } from "@/lib/session";
import { auditListSchema } from "@/lib/validation";

export const runtime = "nodejs";

/** Excel-экспорт журнала (с учётом фильтров). */
export async function GET(request) {
  const requestId = getRequestId(request);

  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = auditListSchema.safeParse(params);
  if (!parsed.success) {
    return apiError("Invalid query", 400, { requestId });
  }

  try {
    const result = await listAuditEvents({
      page: 1,
      pageSize: 10000,
      maxPageSize: 10000,
      entityType: parsed.data.entityType,
      action: parsed.data.action,
      q: parsed.data.q,
    });

    const rows = result.items.map((item) => ({
      Дата: formatExcelDate(item.createdAt),
      Пользователь: item.actorEmail || "",
      Действие: item.action,
      Сущность: item.entityType,
      ID: item.entityId || "",
      Метаданные:
        item.metadata && typeof item.metadata === "object"
          ? JSON.stringify(item.metadata)
          : "",
    }));

    const buffer = await buildExcelBuffer("Журнал", rows);
    const filename = excelFilename("makuzo-audit");

    await createAuditEvent({
      actorEmail: session.email,
      action: "export",
      entityType: "audit",
      entityId: "excel",
      metadata: {
        count: rows.length,
        entityType: parsed.data.entityType || null,
        q: parsed.data.q || null,
      },
    });

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return apiError(error?.message || "Failed to export audit log", 500, { requestId });
  }
}
