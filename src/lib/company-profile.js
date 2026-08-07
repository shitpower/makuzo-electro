/** Global company profile — single source of truth for legal/contact details. */

export const DEFAULT_COMPANY_PROFILE = {
  legalName: "SIA MAKUZO",
  regNumber: "40103386423",
  builderRegNumber: "13248",
  email: "info@makuzo.lv",
  phone: "+371 23887028",
  streetAddress: "Kaibalas iela 25",
  cityRu: "Рига",
  cityLv: "Rīga",
  cityEn: "Riga",
  country: "LV",
  countryNameRu: "Латвия",
  countryNameLv: "Latvija",
  countryNameEn: "Latvia",
  postalCode: "LV-1035",
  latitude: 56.9678,
  longitude: 24.1725,
  instagramUrl: "",
  instagramVisible: false,
  /** Show «КОМПАНИЯ» block (legal name / reg numbers) in footer */
  footerCompanyVisible: false,
};

/**
 * @param {unknown} raw
 * @returns {typeof DEFAULT_COMPANY_PROFILE}
 */
export function normalizeCompanyProfile(raw) {
  const base = { ...DEFAULT_COMPANY_PROFILE };
  if (!raw || typeof raw !== "object") return base;
  const src = /** @type {Record<string, unknown>} */ (raw);
  return {
    legalName: String(src.legalName ?? base.legalName),
    regNumber: String(src.regNumber ?? base.regNumber),
    builderRegNumber: String(src.builderRegNumber ?? base.builderRegNumber),
    email: String(src.email ?? base.email),
    phone: String(src.phone ?? base.phone),
    streetAddress: String(src.streetAddress ?? base.streetAddress),
    cityRu: String(src.cityRu ?? base.cityRu),
    cityLv: String(src.cityLv ?? base.cityLv),
    cityEn: String(src.cityEn ?? base.cityEn),
    country: String(src.country ?? base.country),
    countryNameRu: String(src.countryNameRu ?? base.countryNameRu),
    countryNameLv: String(src.countryNameLv ?? base.countryNameLv),
    countryNameEn: String(src.countryNameEn ?? base.countryNameEn),
    postalCode: String(src.postalCode ?? base.postalCode),
    latitude: Number(src.latitude ?? base.latitude) || base.latitude,
    longitude: Number(src.longitude ?? base.longitude) || base.longitude,
    instagramUrl: String(src.instagramUrl ?? base.instagramUrl),
    instagramVisible: Boolean(src.instagramVisible),
    footerCompanyVisible: src.footerCompanyVisible === undefined ? base.footerCompanyVisible : Boolean(src.footerCompanyVisible),
  };
}

/** @param {typeof DEFAULT_COMPANY_PROFILE} company @param {string} locale */
export function getCompanyCity(company, locale = "ru") {
  if (locale === "lv") return company.cityLv;
  if (locale === "en") return company.cityEn;
  return company.cityRu;
}

/** @param {typeof DEFAULT_COMPANY_PROFILE} company @param {string} locale */
export function getCompanyCountryName(company, locale = "ru") {
  if (locale === "lv") return company.countryNameLv;
  if (locale === "en") return company.countryNameEn;
  return company.countryNameRu;
}

/** @param {typeof DEFAULT_COMPANY_PROFILE} company @param {string} locale */
export function formatCompanyAddress(company, locale = "ru") {
  const city = getCompanyCity(company, locale);
  const country = getCompanyCountryName(company, locale);
  return `${company.streetAddress}, ${city}, ${country}`;
}

/** @param {typeof DEFAULT_COMPANY_PROFILE} company @param {string} locale */
export function formatCompanyAddressShort(company, locale = "ru") {
  return `${company.streetAddress}, ${getCompanyCity(company, locale)}`;
}

/** Footer / UI lines built from globals (not edited per-locale in footer CMS). */
export function formatCompanyLines(company, locale = "ru") {
  const reg =
    locale === "en"
      ? `Reg. No. ${company.regNumber}`
      : locale === "lv"
        ? `Reģ. Nr. ${company.regNumber}`
        : `Рег. № ${company.regNumber}`;
  const builder = `Būvkomersants Nr. ${company.builderRegNumber}`;
  return [company.legalName, reg, builder].filter(Boolean);
}

/** @param {typeof DEFAULT_COMPANY_PROFILE} company @param {string} locale */
export function formatRegLabel(company, locale = "ru") {
  if (locale === "en") return `Reg. No. ${company.regNumber}, Būvkomersants Nr. ${company.builderRegNumber}`;
  if (locale === "lv") return `reģ. Nr. ${company.regNumber}, Būvkomersants Nr. ${company.builderRegNumber}`;
  return `рег. № ${company.regNumber}, Būvkomersants Nr. ${company.builderRegNumber}`;
}
