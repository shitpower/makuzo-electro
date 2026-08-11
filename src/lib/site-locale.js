export const SITE_LOCALES = /** @type {const} */ (["ru", "lv", "en"]);
export const DEFAULT_LOCALE = "ru";

/** ISR window for public CMS pages (seconds). */
export const SITE_REVALIDATE_SECONDS = 300;

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

/** @param {unknown} value @returns {value is 'ru' | 'lv' | 'en'} */
export function isSiteLocale(value) {
  return value === "ru" || value === "lv" || value === "en";
}

/**
 * Resolve `[locale]` route param without cookies()/headers() — keeps pages static/ISR.
 * @param {string | string[] | undefined} param
 * @returns {'ru' | 'lv' | 'en'}
 */
export function resolveLocaleParam(param) {
  const raw = Array.isArray(param) ? param[0] : param;
  if (isSiteLocale(raw)) return raw;
  return DEFAULT_LOCALE;
}

/**
 * Prefix an internal path with locale. Leaves hashes, tel:, mailto:, absolute URLs alone.
 * @param {'ru' | 'lv' | 'en'} locale
 * @param {string} href
 */
export function withLocale(locale, href) {
  if (!href) return `/${locale}`;
  if (
    href.startsWith("#") ||
    href.startsWith("tel:") ||
    href.startsWith("mailto:") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("blob:") ||
    href.startsWith("data:")
  ) {
    return href;
  }

  const [pathPart, hash = ""] = href.split("#");
  const hashSuffix = hash ? `#${hash}` : "";
  let path = pathPart || "/";

  const stripped = path.match(/^\/(ru|lv|en)(?=\/|$)/);
  if (stripped) {
    path = path.slice(stripped[0].length) || "/";
  }

  if (!path.startsWith("/")) path = `/${path}`;
  if (path === "/") return `/${locale}${hashSuffix}`;
  return `/${locale}${path}${hashSuffix}`;
}

/** @returns {{ locale: string }[]} */
export function siteLocaleStaticParams() {
  return SITE_LOCALES.map((locale) => ({ locale }));
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
    const gallery = Array.isArray(primary?.gallery)
      ? primary.gallery
      : Array.isArray(fallback?.gallery)
        ? fallback.gallery
        : [];
    return {
      ...primary,
      imageUrl: pickMediaUrl(primary?.imageUrl) || pickMediaUrl(fallback?.imageUrl) || "",
      heroImageUrl: pickMediaUrl(primary?.heroImageUrl) || pickMediaUrl(fallback?.heroImageUrl) || "",
      featureImageUrl:
        pickMediaUrl(primary?.featureImageUrl) || pickMediaUrl(fallback?.featureImageUrl) || "",
      gallery: gallery.map((url) => pickMediaUrl(url)).filter(Boolean),
    };
  }

  if (section.key === "smartHome") {
    const ruCategories = section.contentRu?.categories || [];
    const categories = primary?.categories?.length ? primary.categories : ruCategories;
    return {
      ...primary,
      imageUrl: pickMediaUrl(primary?.imageUrl) || pickMediaUrl(fallback?.imageUrl) || "",
      categories: categories.map((cat, index) => ({
        ...cat,
        imageUrl: pickMediaUrl(cat?.imageUrl) || pickMediaUrl(ruCategories[index]?.imageUrl) || "",
      })),
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
