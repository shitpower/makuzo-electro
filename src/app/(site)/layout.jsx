import { Toaster } from "sonner";

import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { getSectionByKey, getSiteSettings } from "@/db/queries";
import { getSectionContent, getSiteLocaleServer } from "@/lib/site-locale";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://makuzo.lv";

export async function generateMetadata() {
  const locale = await getSiteLocaleServer();
  const settings = await getSiteSettings();
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const title = isLv ? settings.seoTitleLv : isEn ? settings.seoTitleEn : settings.seoTitleRu;
  const description = isLv ? settings.seoDescLv : isEn ? settings.seoDescEn : settings.seoDescRu;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: "/",
      languages: {
        ru: `${siteUrl}?lang=ru`,
        lv: `${siteUrl}?lang=lv`,
        en: `${siteUrl}?lang=en`,
      },
    },
    openGraph: {
      type: "website",
      locale: isLv ? "lv_LV" : isEn ? "en_LV" : "ru_LV",
      url: siteUrl,
      title,
      description,
      images: [{ url: "/img/logo-on-light.webp", width: 560, height: 178, alt: "Makuzo" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/img/logo-on-light.webp"],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/img/logo-on-light.webp" },
  };
}

export default async function SiteLayout({ children }) {
  const locale = await getSiteLocaleServer();
  const settings = await getSiteSettings();
  const contactsSection = await getSectionByKey("contacts");
  const footerSection = await getSectionByKey("footer");
  const contacts = getSectionContent(contactsSection, locale) || {};
  const footer = getSectionContent(footerSection, locale) || {};
  const phone = contacts.phones?.[0] || "";

  return (
    <>
      <LocalBusinessJsonLd locale={locale} contacts={contacts} settings={settings} />
      <Toaster position="top-right" />
      <SiteHeader locale={locale} phone={phone} />
      <main className="min-h-screen bg-white">{children}</main>
      <SiteFooter content={footer} locale={locale} />
    </>
  );
}
