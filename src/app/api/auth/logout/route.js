import { NextResponse } from "next/server";

import { destroyAdminSession } from "@/lib/session";

export async function POST() {
  try {
    await destroyAdminSession();
    return NextResponse.json({ success: true, message: "Session destroyed" });
  } catch {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
