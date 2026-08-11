import "server-only";

import { put, del } from "@vercel/blob";

import { createMedia, deleteMedia, getMediaById } from "@/db/inquiries-queries";

function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

/**
 * Storage adapter for landing media.
 * Prefer Vercel Blob when BLOB_READ_WRITE_TOKEN is set; otherwise legacy Postgres base64.
 */
export async function saveMediaFile({ filename, mimeType, size, buffer, altRu, altLv, altEn }) {
  if (blobConfigured()) {
    const blob = await put(`media/${Date.now()}-${filename}`, buffer, {
      access: "public",
      contentType: mimeType || "application/octet-stream",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return createMedia({
      filename,
      mimeType,
      size,
      data: null,
      githubUrl: blob.url,
      altRu,
      altLv,
      altEn,
    });
  }

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
  if (!item) return null;

  if (item.githubUrl && /^https?:\/\//i.test(item.githubUrl) && !item.data) {
    const res = await fetch(item.githubUrl, { cache: "force-cache" });
    if (!res.ok) return null;
    return {
      item,
      buffer: Buffer.from(await res.arrayBuffer()),
      redirectUrl: item.githubUrl,
    };
  }

  if (!item.data) return null;
  return {
    item,
    buffer: Buffer.from(item.data, "base64"),
  };
}

export async function removeMediaFile(id) {
  const item = await getMediaById(id);
  if (!item) return null;

  if (blobConfigured() && item.githubUrl?.includes("blob.vercel-storage.com")) {
    try {
      await del(item.githubUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });
    } catch {
      // Blob may already be gone — still drop DB row.
    }
  }

  return deleteMedia(id);
}
