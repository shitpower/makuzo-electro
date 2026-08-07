import "server-only";

const ALLOWED_IMAGE_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

const SIGNATURES = [
  { mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { mime: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { mime: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46], extra: [0x57, 0x45, 0x42, 0x50], extraOffset: 8 },
  { mime: "image/avif", bytes: [0x00, 0x00, 0x00], extra: [0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x69, 0x66], extraOffset: 4 },
];

function matchesSignature(buffer, signature) {
  if (buffer.length < signature.bytes.length) return false;
  for (let i = 0; i < signature.bytes.length; i += 1) {
    if (buffer[i] !== signature.bytes[i]) return false;
  }
  if (!signature.extra || signature.extraOffset === undefined) return true;
  for (let i = 0; i < signature.extra.length; i += 1) {
    if (buffer[signature.extraOffset + i] !== signature.extra[i]) return false;
  }
  return true;
}

export function detectImageMime(buffer) {
  for (const signature of SIGNATURES) {
    if (matchesSignature(buffer, signature)) {
      return signature.mime;
    }
  }
  return null;
}

/**
 * @param {File} file
 * @param {Buffer} buffer
 * @param {{ maxBytes?: number }} [options]
 */
export function validateImageUpload(file, buffer, options = {}) {
  const maxBytes = options.maxBytes ?? (Number(process.env.UPLOAD_MAX_BYTES) || 5 * 1024 * 1024);

  if (!file || !(file instanceof File)) {
    return { ok: false, error: "File is required" };
  }

  if (file.size > maxBytes || buffer.length > maxBytes) {
    return { ok: false, error: "File too large" };
  }

  const detectedMime = detectImageMime(buffer);
  if (!detectedMime || !ALLOWED_IMAGE_MIME.has(detectedMime)) {
    return { ok: false, error: "Unsupported image format" };
  }

  if (file.type && file.type !== detectedMime && !ALLOWED_IMAGE_MIME.has(file.type)) {
    return { ok: false, error: "MIME type mismatch" };
  }

  return {
    ok: true,
    mimeType: detectedMime,
    safeFilename: sanitizeFilename(file.name, detectedMime),
  };
}

function sanitizeFilename(filename, mimeType) {
  const extByMime = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
  };
  const ext = extByMime[mimeType] || "img";
  const base = String(filename || "upload")
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return `${base || "upload"}.${ext}`;
}
