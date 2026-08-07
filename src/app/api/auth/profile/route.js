import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { createAuditEvent } from "@/db/audit-queries";
import { getDb } from "@/db/client";
import { adminUsers } from "@/db/schema";
import { normalizeAdminEmail } from "@/lib/admin-login-core";
import { apiError, apiJson } from "@/lib/api-response";
import { assertDatabaseConfigured, shouldUseMemoryStore } from "@/lib/db-policy";
import { getRequestId } from "@/lib/request-utils";
import { getAdminIronSession, requireAdminSession } from "@/lib/session";
import { adminProfileSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET(request) {
  const requestId = getRequestId(request);

  try {
    const user = await requireAdminSession();
    return apiJson({ user }, {}, { requestId });
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }
}

export async function PUT(request) {
  const requestId = getRequestId(request);

  let sessionUser;
  try {
    sessionUser = await requireAdminSession();
  } catch {
    return apiError("Unauthorized", 401, { requestId });
  }

  if (shouldUseMemoryStore()) {
    return apiError("Смена профиля доступна только при подключённой базе данных", 503, {
      requestId,
      code: "DATABASE_NOT_CONFIGURED",
    });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = adminProfileSchema.safeParse(body);
  if (!parsed.success) {
    return apiJson(
      { error: "Некорректные данные", issues: parsed.error.flatten() },
      { status: 400 },
      { requestId },
    );
  }

  assertDatabaseConfigured();
  const db = getDb();
  const row = await db
    .select({
      id: adminUsers.id,
      email: adminUsers.email,
      name: adminUsers.name,
      passwordHash: adminUsers.passwordHash,
    })
    .from(adminUsers)
    .where(eq(adminUsers.id, sessionUser.id))
    .then((rows) => rows[0]);

  if (!row) {
    return apiError("Пользователь не найден", 404, { requestId });
  }

  const match = await bcrypt.compare(parsed.data.currentPassword, row.passwordHash);
  if (!match) {
    return apiError("Неверный текущий пароль", 401, { requestId, code: "INVALID_PASSWORD" });
  }

  /** @type {Partial<{ name: string | null; email: string; passwordHash: string }>} */
  const patch = {};
  if (parsed.data.name !== undefined) {
    patch.name = parsed.data.name.trim() || null;
  }

  if (parsed.data.email) {
    const nextEmail = normalizeAdminEmail(parsed.data.email);
    if (nextEmail !== row.email) {
      const clash = await db
        .select({ id: adminUsers.id })
        .from(adminUsers)
        .where(eq(adminUsers.email, nextEmail))
        .then((rows) => rows[0]);
      if (clash && clash.id !== row.id) {
        return apiError("Этот email уже занят", 409, { requestId, code: "EMAIL_TAKEN" });
      }
      patch.email = nextEmail;
    }
  }

  if (parsed.data.newPassword) {
    patch.passwordHash = await bcrypt.hash(parsed.data.newPassword, 10);
  }

  if (!Object.keys(patch).length) {
    return apiJson(
      { user: { id: row.id, email: row.email, name: row.name } },
      {},
      { requestId },
    );
  }

  const updated = await db
    .update(adminUsers)
    .set(patch)
    .where(eq(adminUsers.id, row.id))
    .returning({ id: adminUsers.id, email: adminUsers.email, name: adminUsers.name })
    .then((rows) => rows[0]);

  const iron = await getAdminIronSession();
  iron.userId = updated.id;
  iron.email = updated.email;
  await iron.save();

  await createAuditEvent({
    actorEmail: updated.email,
    action: "update",
    entityType: "admin_user",
    entityId: String(updated.id),
    metadata: {
      changed: Object.keys(patch).filter((k) => k !== "passwordHash"),
      passwordChanged: Boolean(patch.passwordHash),
    },
  });

  return apiJson({ user: updated }, {}, { requestId });
}
