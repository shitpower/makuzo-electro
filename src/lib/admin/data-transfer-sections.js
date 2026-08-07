export const DATA_TRANSFER_SECTIONS = [
  {
    id: "sections",
    label: "Секции лендинга",
    description: "hero, services, cases, cta, contacts, footer и др. (RU/LV)",
  },
  {
    id: "settings",
    label: "SEO / настройки сайта",
    description: "логотип, title и description RU/LV",
  },
  {
    id: "inquiries",
    label: "Заявки",
    description: "обращения с формы (без медиафайлов)",
  },
];

/** @type {Set<string>} */
export const VALID_SECTION_IDS = new Set(DATA_TRANSFER_SECTIONS.map((s) => s.id));

/** @param {unknown} raw */
export function normalizeSectionList(raw) {
  if (!Array.isArray(raw)) return [...VALID_SECTION_IDS];
  const picked = raw.filter((id) => typeof id === "string" && VALID_SECTION_IDS.has(id));
  return picked.length ? picked : [...VALID_SECTION_IDS];
}
