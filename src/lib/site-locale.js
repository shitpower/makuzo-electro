import { cookies } from "next/headers";

const CASES_DEFAULT_IMAGES = {
  stats: "/img/Background.png",
  bullets: "/img/DSC00956.png",
};

/** @param {unknown} value @returns {'ru' | 'lv' | 'en'} */
export function parseSiteLocale(value) {
  if (value === "lv" || value === "ro") return "lv";
  if (value === "en") return "en";
  return "ru";
}

function pickMediaUrl(value) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function normalizeCaseImageUrl(value) {
  const url = pickMediaUrl(value);
  if (url === "/img/DSC00956.jpg") return "/img/DSC00956.png";
  return url;
}

function resolveCaseItems(content, ruContent) {
  const ruItems = ruContent?.items || [];
  const items = content?.items?.length ? content.items : ruItems;

  if (!items?.length) return content || {};

  return {
    ...content,
    items: items.map((item, index) => {
      const ruItem = ruItems[index] || {};
      const variant =
        ruItem.variant || item.variant || (index === 0 ? "stats" : "bullets");
      const imageUrl =
        normalizeCaseImageUrl(ruItem.imageUrl) ||
        CASES_DEFAULT_IMAGES[variant] ||
        "";

      return { ...item, variant, imageUrl };
    }),
  };
}

function pickLocaleFromSearchParams(searchParams) {
  if (!searchParams) return null;

  if (typeof searchParams.get === "function") {
    const fromQuery = searchParams.get("lang") ?? searchParams.get("locale");
    return fromQuery ? parseSiteLocale(fromQuery) : null;
  }

  if (typeof searchParams === "object") {
    const fromQuery =
      typeof searchParams.lang === "string"
        ? searchParams.lang
        : typeof searchParams.locale === "string"
          ? searchParams.locale
          : null;
    return fromQuery ? parseSiteLocale(fromQuery) : null;
  }

  return null;
}

export async function getSiteLocaleServer(searchParams) {
  const localeFromQuery = pickLocaleFromSearchParams(searchParams);
  if (localeFromQuery) return localeFromQuery;

  const store = await cookies();
  return parseSiteLocale(store.get("locale")?.value);
}

/** @param {object} section @param {'ru' | 'lv' | 'en'} locale */
function pickLocalizedContent(section, locale) {
  if (locale === "lv") return section.contentLv || section.contentRu || {};
  if (locale === "en") return section.contentEn || section.contentRu || {};
  return section.contentRu || {};
}

/**
 * @param {object} section
 * @param {'ru' | 'lv' | 'en'} locale
 */
export function getSectionContent(section, locale) {
  if (!section) return {};

  const primary = pickLocalizedContent(section, locale);
  const fallback = section.contentRu || {};

  if (section.key === "cases") {
    return resolveCaseItems(primary, section.contentRu);
  }

  if (section.key === "hero") {
    return {
      ...primary,
      bgImageUrl: pickMediaUrl(primary?.bgImageUrl) || pickMediaUrl(fallback?.bgImageUrl) || "",
    };
  }

  if (section.key === "about" || section.key === "design") {
    return {
      ...primary,
      imageUrl: pickMediaUrl(primary?.imageUrl) || pickMediaUrl(fallback?.imageUrl) || "",
    };
  }

  if (section.key === "projects") {
    const ruItems = section.contentRu?.items || [];
    const items = primary?.items?.length ? primary.items : ruItems;
    return {
      ...primary,
      items: items.map((item, index) => ({
        ...item,
        imageUrl: pickMediaUrl(ruItems[index]?.imageUrl) || pickMediaUrl(item.imageUrl) || "",
      })),
    };
  }

  if (section.key === "footer") {
    return {
      ...primary,
      logoUrl: pickMediaUrl(primary?.logoUrl) || pickMediaUrl(fallback?.logoUrl) || "",
      navLinks: primary?.navLinks?.length ? primary.navLinks : fallback?.navLinks || [],
    };
  }

  return primary || {};
}
