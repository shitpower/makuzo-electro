import { saveMediaFile } from "@/lib/media-storage";
import { validateImageUpload } from "@/lib/media-validation";
import { createAuditEvent } from "@/db/audit-queries";
import { listMedia } from "@/db/inquiries-queries";
import { apiError, apiJson } from "@/lib/api-response";
import { logEvent } from "@/lib/logger";
import { getRequestId } from "@/lib/request-utils";
import { requireAdminSession } from "@/lib/session";
import { paginationSchema } from "@/lib/validation";

const UPLOAD_MAX_BYTES = Number(process.env.UPLOAD_MAX_BYTES) || 5 * 1024 * 1024;

export async function GET(request) {
  const requestId = getRequestId(request);

  try {
    await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  try {
    const params = Object.fromEntries(request.nextUrl.searchParams.entries());
    const parsed = paginationSchema.safeParse(params);
    if (!parsed.success) {
      return apiError("Invalid query", 400, { requestId });
    }

    const result = await listMedia({
      page: parsed.data.page,
      pageSize: parsed.data.pageSize,
      q: parsed.data.q,
    });

    return apiJson(result, {}, { requestId });
  } catch (error) {
    logEvent("error", "listMedia failed", { requestId, error: error?.message });
    return apiError("Failed to load media", 500, { requestId });
  }
}

export async function POST(request) {
  const requestId = getRequestId(request);

  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const altRu = String(formData.get("altRu") || "");
  const altLv = String(formData.get("altLv") || "");
  const altEn = String(formData.get("altEn") || "");

  if (!(file instanceof File)) {
    return apiError("File is required", 400, { requestId });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const validation = validateImageUpload(file, buffer, { maxBytes: UPLOAD_MAX_BYTES });
  if (!validation.ok) {
    return apiError(validation.error, 400, { requestId });
  }

  const mediaItem = await saveMediaFile({
    filename: validation.safeFilename,
    mimeType: validation.mimeType,
    size: buffer.length,
    buffer,
    altRu,
    altLv,
    altEn,
  });

  await createAuditEvent({
    actorEmail: session.email,
    action: "upload",
    entityType: "media",
    entityId: mediaItem.id,
    metadata: { filename: mediaItem.filename, size: mediaItem.size },
  });

  return apiJson({ media: mediaItem }, { status: 201 }, { requestId });
}
