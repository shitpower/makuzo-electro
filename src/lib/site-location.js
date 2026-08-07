/** Default location: Kaibalas iela 25, Rīga, Latvia. */
export const SITE_LOCATION = {
  streetAddress: "Kaibalas iela 25",
  locality: { ru: "Рига", lv: "Rīga", en: "Riga" },
  country: "LV",
  postalCode: "LV-1035",
  latitude: 56.9678,
  longitude: 24.1725,
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
