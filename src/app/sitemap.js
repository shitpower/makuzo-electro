const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://makuzo.lv";

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          ru: `${siteUrl}?lang=ru`,
          lv: `${siteUrl}?lang=lv`,
          en: `${siteUrl}?lang=en`,
        },
      },
    },
    {
      url: `${siteUrl}/design`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          ru: `${siteUrl}/design?lang=ru`,
          lv: `${siteUrl}/design?lang=lv`,
          en: `${siteUrl}/design?lang=en`,
        },
      },
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
      alternates: {
        languages: {
          ru: `${siteUrl}/privacy?lang=ru`,
          lv: `${siteUrl}/privacy?lang=lv`,
          en: `${siteUrl}/privacy?lang=en`,
        },
      },
    },
  ];
}
