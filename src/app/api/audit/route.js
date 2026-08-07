import { listAuditEvents } from "@/db/audit-queries";
import { apiError, apiJson } from "@/lib/api-response";
import { getRequestId } from "@/lib/request-utils";
import { requireAdminSession } from "@/lib/session";
import { auditListSchema } from "@/lib/validation";

export async function GET(request) {
  const requestId = getRequestId(request);

  try {
    await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const parsed = auditListSchema.safeParse(params);
  if (!parsed.success) {
    return apiError("Invalid query", 400, { requestId });
  }

  try {
    const result = await listAuditEvents(parsed.data);
    return apiJson(result, {}, { requestId });
  } catch (error) {
    return apiError(error?.message || "Failed to load audit log", 500, { requestId });
  }
}
