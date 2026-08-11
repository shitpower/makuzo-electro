import { SITE_LOCALES } from "@/lib/site-locale";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://makuzo.lv";

const PAGES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/design", changeFrequency: "monthly", priority: 0.8 },
  { path: "/design/gallery", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/smart-home", changeFrequency: "monthly", priority: 0.8 },
];

export default function sitemap() {
  const now = new Date();
  return PAGES.flatMap((page) =>
    SITE_LOCALES.map((locale) => {
      const suffix = page.path;
      const url = `${siteUrl}/${locale}${suffix}`;
      return {
        url,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            SITE_LOCALES.map((l) => [l, `${siteUrl}/${l}${suffix}`]),
          ),
        },
      };
    }),
  );
}
