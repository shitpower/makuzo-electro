import { createAuditEvent } from "@/db/audit-queries";
import { getSiteSettings, updateSiteSettings } from "@/db/queries";
import { apiError, apiJson } from "@/lib/api-response";
import { getRequestId } from "@/lib/request-utils";
import { requireAdminSession } from "@/lib/session";
import { siteSettingsSchema } from "@/lib/validation";

export async function GET(request) {
  const requestId = getRequestId(request);

  try {
    await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const settings = await getSiteSettings();
  return apiJson({ settings }, {}, { requestId });
}

export async function PUT(request) {
  const requestId = getRequestId(request);

  let session;
  try {
    session = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = siteSettingsSchema.safeParse(body);

  if (!parsed.success) {
    return apiJson(
      { error: "Invalid data", issues: parsed.error.flatten() },
      { status: 400 },
      { requestId },
    );
  }

  const settings = await updateSiteSettings(parsed.data);

  await createAuditEvent({
    actorEmail: session.email,
    action: "update",
    entityType: "settings",
    entityId: "1",
    metadata: { keys: Object.keys(parsed.data) },
  });

  return apiJson({ settings }, {}, { requestId });
}
