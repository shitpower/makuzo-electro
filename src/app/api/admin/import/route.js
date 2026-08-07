import { createAuditEvent } from "@/db/audit-queries";
import { importJsonData, previewJsonImport } from "@/lib/admin/data-transfer-import";
import { normalizeSectionList } from "@/lib/admin/data-transfer-sections";
import { apiError, apiJson } from "@/lib/api-response";
import { getRequestId } from "@/lib/request-utils";
import { requireAdminSession } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request) {
  const requestId = getRequestId(request);

  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const form = await request.formData();
  const file = form.get("file");
  const previewOnly = form.get("preview") === "1";
  const sectionsRaw = form.get("sections");

  if (!(file instanceof File)) {
    return apiError("Файл JSON не передан", 400, { requestId });
  }

  let payload;
  try {
    payload = JSON.parse(await file.text());
  } catch {
    return apiError("Не удалось разобрать JSON", 400, { requestId });
  }

  if (previewOnly) {
    return apiJson({ detectedSections: previewJsonImport(payload) }, {}, { requestId });
  }

  let sections = [...normalizeSectionList(null)];
  if (typeof sectionsRaw === "string" && sectionsRaw.trim()) {
    try {
      sections = normalizeSectionList(JSON.parse(sectionsRaw));
    } catch {
      return apiError("Некорректный список sections", 400, { requestId });
    }
  }

  const result = await importJsonData(payload, sections);

  await createAuditEvent({
    actorEmail: session.email,
    action: "import",
    entityType: "backup",
    entityId: "restore",
    metadata: { sections, counts: result.counts, errors: result.errors },
  });

  return apiJson(result, {}, { requestId });
}
