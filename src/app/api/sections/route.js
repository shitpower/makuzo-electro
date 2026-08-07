import { NextResponse } from "next/server";

import { listSections } from "@/db/queries";
import { requireAdminSession } from "@/lib/session";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get("admin") === "1";

  if (isAdmin) {
    try {
      await requireAdminSession();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const sections = await listSections();
  if (isAdmin) {
    return NextResponse.json({ sections });
  }
  return NextResponse.json({
    sections: sections.filter((s) => s.visible),
  });
}
