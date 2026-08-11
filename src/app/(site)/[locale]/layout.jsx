import { notFound } from "next/navigation";
import { Toaster } from "sonner";

import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { HtmlLang } from "@/components/ui/HtmlLang";
import { getSiteSettings, getVisibleSectionsMap } from "@/db/queries";
import {
  getSectionContent,
  isSiteLocale,
  resolveLocaleParam,
  siteLocaleStaticParams,
  withLocale,
} from "@/lib/site-locale";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://makuzo.lv";

export const revalidate = 300;

export function generateStaticParams() {
  return siteLocaleStaticParams();
}

export async function generateMetadata({ params }) {
  const { locale: localeParam } = await params;
  if (!isSiteLocale(localeParam)) return {};

  const locale = resolveLocaleParam(localeParam);
  const settings = await getSiteSettings();
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const title = isLv ? settings.seoTitleLv : isEn ? settings.seoTitleEn : settings.seoTitleRu;
  const description = isLv ? settings.seoDescLv : isEn ? settings.seoDescEn : settings.seoDescRu;
  const homePath = withLocale(locale, "/");

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: homePath,
      languages: {
        ru: `${siteUrl}/ru`,
        lv: `${siteUrl}/lv`,
        en: `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: "website",
      locale: isLv ? "lv_LV" : isEn ? "en_LV" : "ru_LV",
      url: `${siteUrl}${homePath}`,
      title,
      description,
      images: [{ url: "/img/logo-on-light.webp", width: 1120, height: 305, alt: "Makuzo" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/img/logo-on-light.webp"],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: "/icon/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icon/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon/Makuzo-ico.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/icon/favicon-32.png",
      apple: [{ url: "/icon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default async function SiteLocaleLayout({ children, params }) {
  const { locale: localeParam } = await params;
  if (!isSiteLocale(localeParam)) notFound();

  const locale = resolveLocaleParam(localeParam);
  const [sectionsMap, settings] = await Promise.all([getVisibleSectionsMap(), getSiteSettings()]);
  const contactsSection = sectionsMap.contacts ?? null;
  const footerSection = sectionsMap.footer ?? null;
  const contacts = getSectionContent(contactsSection, locale) || {};
  const footer = getSectionContent(footerSection, locale) || {};
  const phone = contacts.phones?.[0] || settings.companyProfile?.phone || "";

  return (
    <>
      <HtmlLang locale={locale} />
      <LocalBusinessJsonLd
        locale={locale}
        contacts={contacts}
        settings={settings}
        company={settings.companyProfile}
      />
      <Toaster position="top-right" />
      <SiteHeader locale={locale} phone={phone} />
      <main className="min-h-screen bg-white">{children}</main>
      {footerSection ? (
        <SiteFooter content={footer} locale={locale} company={settings.companyProfile} />
      ) : null}
    </>
  );
}
