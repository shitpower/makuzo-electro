import { createAuditEvent } from "@/db/audit-queries";
import { deleteMedia, getMediaById } from "@/db/inquiries-queries";
import { apiError, apiJson } from "@/lib/api-response";
import { getRequestId } from "@/lib/request-utils";
import { requireAdminSession } from "@/lib/session";

export async function DELETE(request, { params }) {
  const requestId = getRequestId(request);

  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const { id } = await params;
  const mediaId = Number(id);
  const item = await getMediaById(mediaId);

  if (!item) {
    return apiError("Not found", 404, { requestId });
  }

  await deleteMedia(mediaId);

  await createAuditEvent({
    actorEmail: session.email,
    action: "delete",
    entityType: "media",
    entityId: mediaId,
    metadata: { filename: item.filename },
  });

  return apiJson({ success: true }, {}, { requestId });
}
