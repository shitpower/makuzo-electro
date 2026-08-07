import { getOsmOpenUrl, resolveMapConfig } from "@/lib/map-config";
import { SITE_LOCATION } from "@/lib/site-location";

export function LocalBusinessJsonLd({ locale, contacts, settings }) {
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://makuzo.lv";
  const map = resolveMapConfig(contacts?.map);
  const addressText = contacts?.address || "";
  const locality = isLv
    ? SITE_LOCATION.locality.lv
    : isEn
      ? SITE_LOCATION.locality.en
      : SITE_LOCATION.locality.ru;
  const description = isLv
    ? settings?.seoDescLv
    : isEn
      ? settings?.seoDescEn
      : settings?.seoDescRu;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: map.placeName || "Makuzo",
    url: siteUrl,
    image: `${siteUrl}/img/logo-on-light.webp`,
    telephone: contacts?.phones || [],
    email: contacts?.email || "info@makuzo.lv",
    address: {
      "@type": "PostalAddress",
      streetAddress: addressText.includes(",")
        ? addressText.split(",").slice(1).join(",").trim()
        : SITE_LOCATION.streetAddress,
      addressLocality: locality,
      postalCode: SITE_LOCATION.postalCode,
      addressCountry: SITE_LOCATION.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: map.latitude,
      longitude: map.longitude,
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
