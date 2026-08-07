import { createAuditEvent } from "@/db/audit-queries";
import { getSectionByKey, updateSection } from "@/db/queries";
import { apiError, apiJson } from "@/lib/api-response";
import { getRequestId } from "@/lib/request-utils";
import { requireAdminSession } from "@/lib/session";
import { sectionUpdateSchema } from "@/lib/validation";

export async function GET(request, { params }) {
  const requestId = getRequestId(request);

  try {
    await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const { key } = await params;
  const section = await getSectionByKey(key);
  if (!section) {
    return apiError("Section not found", 404, { requestId });
  }
  return apiJson({ section }, {}, { requestId });
}

export async function PUT(request, { params }) {
  const requestId = getRequestId(request);

  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const { key } = await params;
  const body = await request.json().catch(() => ({}));
  const parsed = sectionUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return apiJson(
      { error: "Invalid data", issues: parsed.error.flatten() },
      { status: 400 },
      { requestId },
    );
  }

  const updated = await updateSection(key, parsed.data);
  if (!updated) {
    return apiError("Section not found", 404, { requestId });
  }

  await createAuditEvent({
    actorEmail: session.email,
    action: "update",
    entityType: "section",
    entityId: key,
    metadata: { visible: updated.visible },
  });

  return apiJson({ section: updated }, {}, { requestId });
}
