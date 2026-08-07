import { DEFAULT_COMPANY_PROFILE } from "@/lib/company-profile";

/** @deprecated Prefer company profile from site settings via getCompanyProfile(). */
export const SITE_LOCATION = {
  streetAddress: DEFAULT_COMPANY_PROFILE.streetAddress,
  locality: {
    ru: DEFAULT_COMPANY_PROFILE.cityRu,
    lv: DEFAULT_COMPANY_PROFILE.cityLv,
    en: DEFAULT_COMPANY_PROFILE.cityEn,
  },
  country: DEFAULT_COMPANY_PROFILE.country,
  postalCode: DEFAULT_COMPANY_PROFILE.postalCode,
  latitude: DEFAULT_COMPANY_PROFILE.latitude,
  longitude: DEFAULT_COMPANY_PROFILE.longitude,
};

export function formatSiteAddress(locale = "ru") {
  const city =
    locale === "lv"
      ? SITE_LOCATION.locality.lv
      : locale === "en"
        ? SITE_LOCATION.locality.en
        : SITE_LOCATION.locality.ru;
  return `${city}, ${SITE_LOCATION.streetAddress}`;
}
