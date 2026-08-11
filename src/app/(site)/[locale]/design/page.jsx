import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { DesignPageContent } from "@/components/sections/DesignPageContent";
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
          title: "Design support — Makuzo",
          description: "See your electrical layout at 1:1 scale before installation.",
        }
      : locale === "lv"
        ? {
            title: "Dizaina atbalsts — Makuzo",
            description: "Ieraugiet elektroinstalācijas izvietojumu mērogā 1:1 pirms montāžas.",
          }
        : {
            title: "Дизайнерское сопровождение — Makuzo",
            description: "Увидите электрику в масштабе 1:1 ещё до монтажа.",
          };
  return {
    ...copy,
    alternates: {
      canonical: withLocale(locale, "/design"),
      languages: {
        ru: "/ru/design",
        lv: "/lv/design",
        en: "/en/design",
      },
    },
  };
}

export default async function DesignPage({ params }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocaleParam(localeParam);
  const section = await getSectionByKey("design");
  const content = getSectionContent(section, locale) || {};
  const isLv = locale === "lv";
  const isEn = locale === "en";

  return (
    <div className="bg-white">
      <AnimatedSection className="border-b border-[var(--line)] bg-[var(--mist)] pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="container-site flex flex-col gap-6">
          <Link
            href={withLocale(locale, "/#design")}
            className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[var(--mute)] transition hover:text-[var(--ink)]"
          >
            <FiArrowLeft aria-hidden />
            {isEn ? "Back" : isLv ? "Atpakaļ" : "На главную"}
          </Link>
          <p className="section-label">{content.label || (isEn ? "DESIGN" : isLv ? "DIZAINS" : "ДИЗАЙН")}</p>
          <h1 className="section-title max-w-[900px]">{content.title}</h1>
          {content.pageTitle && content.pageTitle !== content.title ? (
            <p className="max-w-[720px] font-[family-name:var(--font-display)] text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-snug text-[var(--ink)]">
              {content.pageTitle}
            </p>
          ) : null}
          {content.subtitle ? (
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.125rem,2vw,1.5rem)] font-medium text-[var(--signal)]">
              {content.subtitle}
            </p>
          ) : null}
        </div>
      </AnimatedSection>

      <AnimatedSection className="pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="container-site flex flex-col gap-12 md:gap-16">
          <DesignPageContent content={content} locale={locale} />
        </div>
      </AnimatedSection>
    </div>
  );
}
