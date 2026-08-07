import { NextResponse } from "next/server";

import { createAuditEvent } from "@/db/audit-queries";
import { listInquiries } from "@/db/inquiries-queries";
import {
  buildExcelBuffer,
  excelFilename,
  formatExcelDate,
} from "@/lib/admin/excel-export";
import { apiError } from "@/lib/api-response";
import { getRequestId } from "@/lib/request-utils";
import { requireAdminSession } from "@/lib/session";
import { paginationSchema } from "@/lib/validation";

export const runtime = "nodejs";

/** Excel-экспорт заявок (с учётом фильтров). */
export async function GET(request) {
  const requestId = getRequestId(request);

  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = paginationSchema.safeParse(params);
  if (!parsed.success) {
    return apiError("Invalid query", 400, { requestId });
  }

  try {
    const result = await listInquiries({
      page: 1,
      pageSize: 10000,
      maxPageSize: 10000,
      q: parsed.data.q,
      isRead: parsed.data.isRead === undefined ? undefined : parsed.data.isRead === "true",
    });

    const rows = result.items.map((item) => ({
      Дата: formatExcelDate(item.createdAt),
      Имя: item.name,
      Телефон: item.phone,
      Email: item.email || "",
      Сообщение: item.message || "",
      Статус: item.isRead ? "Прочитано" : "Новая",
      ID: item.id,
    }));

    const buffer = await buildExcelBuffer("Заявки", rows);
    const filename = excelFilename("makuzo-inquiries");

    await createAuditEvent({
      actorEmail: session.email,
      action: "export",
      entityType: "inquiry",
      entityId: "excel",
      metadata: {
        count: rows.length,
        isRead: parsed.data.isRead || null,
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
    return apiError(error?.message || "Failed to export inquiries", 500, { requestId });
  }
}
