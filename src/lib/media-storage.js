import "server-only";

import { createMedia, getMediaById } from "@/db/inquiries-queries";

/**
 * Storage adapter for landing media.
 * Current implementation: PostgreSQL base64 column (fits Vercel + 2-4 images).
 * Future: swap implementation to object storage without changing API/UI.
 */
export async function saveMediaFile({ filename, mimeType, size, buffer, altRu, altLv, altEn }) {
  return createMedia({
    filename,
    mimeType,
    size,
    data: buffer.toString("base64"),
    altRu,
    altLv,
    altEn,
  });
}

export async function loadMediaFile(id) {
  const item = await getMediaById(id);
  if (!item?.data) return null;
  return {
    item,
    buffer: Buffer.from(item.data, "base64"),
  };
}
