import { createAuditEvent } from "@/db/audit-queries";
import { createInquiry, listInquiries } from "@/db/inquiries-queries";
import { apiError, apiJson } from "@/lib/api-response";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getClientIp, getRequestId, hashKey } from "@/lib/request-utils";
import { requireAdminSession } from "@/lib/session";
import { inquirySchema, paginationSchema } from "@/lib/validation";

const INQUIRY_LIMIT = {
  maxAttempts: 5,
  windowMs: 10 * 60 * 1000,
  blockMs: 30 * 60 * 1000,
};

export async function GET(request) {
  const requestId = getRequestId(request);

  try {
    await requireAdminSession();
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
      page: parsed.data.page,
      pageSize: parsed.data.pageSize,
      q: parsed.data.q,
      isRead: parsed.data.isRead === undefined ? undefined : parsed.data.isRead === "true",
    });

    return apiJson(result, {}, { requestId });
  } catch (error) {
    return apiError(error?.message || "Failed to load inquiries", 500, { requestId });
  }
}

export async function POST(request) {
  const requestId = getRequestId(request);
  const ip = getClientIp(request);
  const limitKey = hashKey(`inquiry:${ip}`);

  const limit = await consumeRateLimit(limitKey, INQUIRY_LIMIT);
  if (!limit.allowed) {
    return apiError("Слишком много заявок. Попробуйте позже.", 429, {
      requestId,
      code: "RATE_LIMITED",
    });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = inquirySchema.safeParse({
    ...body,
    email: body.email || undefined,
    website: body.website || "",
  });

  if (!parsed.success) {
    return apiJson(
      { error: "Invalid data", issues: parsed.error.flatten() },
      { status: 400 },
      { requestId },
    );
  }

  if (parsed.data.website) {
    return apiJson({ success: true }, { status: 201 }, { requestId });
  }

  const inquiry = await createInquiry({
    name: parsed.data.name,
    phone: parsed.data.phone,
    email: parsed.data.email || undefined,
    message: parsed.data.message,
  });

  await createAuditEvent({
    action: "create",
    entityType: "inquiry",
    entityId: inquiry.id,
    metadata: { source: "public_form", ip },
  });

  return apiJson({ success: true, inquiry }, { status: 201 }, { requestId });
}
