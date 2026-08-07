import { NextResponse } from "next/server";

import { loadMediaFile } from "@/lib/media-storage";
import { getRequestId } from "@/lib/request-utils";

/** Public route — serves DB-stored image bytes for <img>/next/image. */
export async function GET(request, { params }) {
  const requestId = getRequestId(request);
  const { id } = await params;
  const mediaId = Number(id);
  if (!Number.isFinite(mediaId)) {
    return NextResponse.json({ error: "Invalid id", requestId }, { status: 400 });
  }

  const loaded = await loadMediaFile(mediaId);
  if (!loaded) {
    return NextResponse.json({ error: "Not found", requestId }, { status: 404 });
  }

  const { item, buffer } = loaded;
  const safeMime = item.mimeType?.startsWith("image/") ? item.mimeType : "application/octet-stream";

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": safeMime,
      "Content-Length": String(buffer.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "X-Request-Id": requestId,
    },
  });
}
