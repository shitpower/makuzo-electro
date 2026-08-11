import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { DesignGalleryGrid } from "@/components/sections/DesignGalleryGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getSectionByKey } from "@/db/queries";
import {
  getSectionContent,
  resolveLocaleParam,
  siteLocaleStaticParams,
  withLocale,
} from "@/lib/site-locale";

export const revalidate = 300;

export function generateStaticParams() {
  return siteLocaleStaticParams();
}

export async function generateMetadata({ params }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocaleParam(localeParam);
  const copy =
    locale === "en"
      ? {
          title: "Design gallery — Makuzo",
          description: "Photos of 1:1 electrical planning templates and installation.",
        }
      : locale === "lv"
        ? {
            title: "Dizaina galerija — Makuzo",
            description: "Foto no elektroinstalācijas plānošanas veidnēm 1:1 un montāžas.",
          }
        : {
            title: "Галерея дизайн-сопровождения — Makuzo",
            description: "Фото шаблонов 1:1 и монтажа при комплексном планировании электрики.",
          };
  return {
    ...copy,
    alternates: {
      canonical: withLocale(locale, "/design/gallery"),
      languages: {
        ru: "/ru/design/gallery",
        lv: "/lv/design/gallery",
        en: "/en/design/gallery",
      },
    },
  };
}

export default async function DesignGalleryPage({ params }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocaleParam(localeParam);
  const section = await getSectionByKey("design");
  const content = getSectionContent(section, locale) || {};
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const gallery = content.gallery || [];

  return (
    <div className="bg-white">
      <AnimatedSection className="border-b border-[var(--line)] bg-[var(--mist)] pb-12 pt-10 md:pb-16 md:pt-14">
        <div className="container-site flex flex-col gap-6">
          <Link
            href={withLocale(locale, "/design")}
            className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[var(--mute)] transition hover:text-[var(--ink)]"
          >
            <FiArrowLeft aria-hidden />
            {isEn ? "Back to design support" : isLv ? "Atpakaļ pie dizaina atbalsta" : "К дизайнерскому сопровождению"}
          </Link>
          <p className="section-label">
            {content.galleryLabel || (isEn ? "GALLERY" : isLv ? "GALERIJA" : "ГАЛЕРЕЯ")}
          </p>
          <h1 className="section-title max-w-[900px]">
            {content.galleryPageTitle ||
              (isEn
                ? "Design support gallery"
                : isLv
                  ? "Dizaina atbalsta galerija"
                  : "Галерея дизайнерского сопровождения")}
          </h1>
          <p className="max-w-[640px] font-[family-name:var(--font-body)] text-[16px] leading-[1.55] text-[var(--mute)]">
            {content.galleryPageIntro ||
              (isEn
                ? "Templates, marking and installation — click any photo to open it larger."
                : isLv
                  ? "Veidnes, atzīmēšana un montāža — noklikšķiniet uz foto, lai apskatītu lielākā izmērā."
                  : "Шаблоны, разметка и монтаж — нажмите на фото, чтобы открыть крупнее.")}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="container-site">
          {gallery.length ? (
            <DesignGalleryGrid
              images={gallery}
              locale={locale}
              alt={content.pageTitle || content.title || ""}
            />
          ) : (
            <p className="font-[family-name:var(--font-body)] text-[15px] text-[var(--mute)]">
              {isEn ? "Gallery is empty for now." : isLv ? "Galerija pagaidām tukša." : "Галерея пока пуста."}
            </p>
          )}
        </div>
      </AnimatedSection>
    </div>
  );
}
