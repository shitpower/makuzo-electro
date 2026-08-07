import { getOsmOpenUrl, resolveMapConfig } from "@/lib/map-config";
import {
  formatCompanyAddressShort,
  getCompanyCity,
  normalizeCompanyProfile,
} from "@/lib/company-profile";

export function LocalBusinessJsonLd({ locale, contacts, settings, company }) {
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://makuzo.lv";
  const profile = normalizeCompanyProfile(company);
  const map = resolveMapConfig(contacts?.map);
  const locality = getCompanyCity(profile, locale);
  const description = isLv
    ? settings?.seoDescLv
    : isEn
      ? settings?.seoDescEn
      : settings?.seoDescRu;

  const phones = contacts?.phones?.length ? contacts.phones : [profile.phone].filter(Boolean);
  const email = contacts?.email || profile.email;
  const addressText = contacts?.address || formatCompanyAddressShort(profile, locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: map.placeName || profile.legalName || "Makuzo",
    url: siteUrl,
    image: `${siteUrl}/img/logo-on-light.webp`,
    telephone: phones,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: profile.streetAddress,
      addressLocality: locality,
      postalCode: profile.postalCode,
      addressCountry: profile.country,
      streetAddressFull: addressText,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: map.latitude || profile.latitude,
      longitude: map.longitude || profile.longitude,
    },
    hasMap: getOsmOpenUrl(map),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    description,
    areaServed: "Latvia",
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
