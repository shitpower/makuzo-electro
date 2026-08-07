import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";

export const runtime = "nodejs";

export async function GET() {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name ?? null } });
}
