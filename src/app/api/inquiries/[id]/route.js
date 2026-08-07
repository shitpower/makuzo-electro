import { createAuditEvent } from "@/db/audit-queries";
import { deleteInquiry, updateInquiry } from "@/db/inquiries-queries";
import { apiError, apiJson } from "@/lib/api-response";
import { getRequestId } from "@/lib/request-utils";
import { requireAdminSession } from "@/lib/session";
import { z } from "zod";

const patchSchema = z.object({
  isRead: z.boolean().optional(),
});

export async function PATCH(request, { params }) {
  const requestId = getRequestId(request);

  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const { id } = await params;
  const inquiryId = Number(id);
  const body = await request.json().catch(() => ({}));
  const parsed = patchSchema.safeParse(body);

  if (!parsed.success) {
    return apiError("Invalid data", 400, { requestId });
  }

  const updated = await updateInquiry(inquiryId, parsed.data);
  if (!updated) {
    return apiError("Not found", 404, { requestId });
  }

  await createAuditEvent({
    actorEmail: session.email,
    action: "update",
    entityType: "inquiry",
    entityId: inquiryId,
    metadata: parsed.data,
  });

  return apiJson({ inquiry: updated }, {}, { requestId });
}

export async function DELETE(request, { params }) {
  const requestId = getRequestId(request);

  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const { id } = await params;
  const inquiryId = Number(id);
  const deleted = await deleteInquiry(inquiryId);
  if (!deleted) {
    return apiError("Not found", 404, { requestId });
  }

  await createAuditEvent({
    actorEmail: session.email,
    action: "delete",
    entityType: "inquiry",
    entityId: inquiryId,
  });

  return apiJson({ success: true }, {}, { requestId });
}
