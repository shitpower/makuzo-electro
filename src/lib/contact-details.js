/** Visibility of the contact details list (phone / email / address / hours). */

export const DEFAULT_DETAIL_VISIBILITY = {
  phone: false,
  email: false,
  address: false,
  hours: false,
};

/**
 * @param {unknown} raw
 * @returns {typeof DEFAULT_DETAIL_VISIBILITY}
 */
export function normalizeDetailVisibility(raw) {
  const base = { ...DEFAULT_DETAIL_VISIBILITY };
  if (!raw || typeof raw !== "object") return base;
  const src = /** @type {Record<string, unknown>} */ (raw);
  return {
    phone: Boolean(src.phone),
    email: Boolean(src.email),
    address: Boolean(src.address),
    hours: Boolean(src.hours),
  };
}

/** @param {Record<string, unknown> | null | undefined} content */
export function getDetailVisibility(content) {
  return normalizeDetailVisibility(content?.detailVisibility);
}
