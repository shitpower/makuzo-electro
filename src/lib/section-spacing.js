/** Default gap between homepage blocks (px). Makuzo sections are self-padded. */
export const DEFAULT_SECTION_GAP = 0;

/** Homepage blocks that support individual spacing overrides. */
export const SPACING_SECTION_KEYS = [
  "hero",
  "design",
  "services",
  "projects",
  "about",
  "careers",
  "contacts",
];

export const SPACING_SECTION_LABELS = {
  hero: "Hero → Дизайн",
  design: "Дизайн → Услуги",
  services: "Услуги → Проекты",
  projects: "Проекты → О компании",
  about: "О компании → Карьера",
  careers: "Карьера → Контакты",
  contacts: "Контакты",
};

export const DEFAULT_SECTION_SPACING = {
  defaultGap: DEFAULT_SECTION_GAP,
  overrides: {},
};

/**
 * @param {unknown} raw
 * @returns {{ defaultGap: number; overrides: Record<string, number> }}
 */
export function parseSectionSpacing(raw) {
  if (!raw || typeof raw !== "object") {
    return structuredClone(DEFAULT_SECTION_SPACING);
  }

  const value = /** @type {Record<string, unknown> } */ (raw);
  const defaultGap =
    typeof value.defaultGap === "number" && Number.isFinite(value.defaultGap)
      ? Math.max(0, Math.round(value.defaultGap))
      : DEFAULT_SECTION_GAP;

  /** @type {Record<string, number>} */
  const overrides = {};
  const rawOverrides = value.overrides;
  if (rawOverrides && typeof rawOverrides === "object") {
    for (const [key, gap] of Object.entries(rawOverrides)) {
      if (typeof gap === "number" && Number.isFinite(gap)) {
        overrides[key] = Math.max(0, Math.round(gap));
      }
    }
  }

  return { defaultGap, overrides };
}

/**
 * @param {{ defaultGap: number; overrides: Record<string, number> }} spacing
 * @param {string} sectionKey
 */
export function getGapAfter(spacing, sectionKey) {
  if (spacing?.overrides?.[sectionKey] != null) return spacing.overrides[sectionKey];
  return spacing?.defaultGap ?? DEFAULT_SECTION_GAP;
}

/** @deprecated Use getGapAfter */
export function getSectionGap(spacing, sectionKey) {
  return getGapAfter(spacing, sectionKey);
}
