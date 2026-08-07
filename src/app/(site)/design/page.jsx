import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SiteImage } from "@/components/ui/SiteImage";
import { getSectionByKey } from "@/db/queries";
import { getSectionContent, getSiteLocaleServer } from "@/lib/site-locale";

export async function generateMetadata() {
  const locale = await getSiteLocaleServer();
  const copy =
    locale === "en"
      ? {
          title: "Design support — Makuzo",
          description: "End-to-end electrical planning with 1:1 visualization.",
        }
      : locale === "lv"
        ? {
            title: "Dizaina atbalsts — Makuzo",
            description: "Kompleksā elektroinstalācijas plānošana ar vizualizāciju 1:1.",
          }
        : {
            title: "Дизайнерское сопровождение — Makuzo",
            description: "Комплексное планирование электрики с визуализацией в масштабе 1:1.",
          };
  return copy;
}

export default async function DesignPage() {
  const locale = await getSiteLocaleServer();
  const section = await getSectionByKey("design");
  const content = getSectionContent(section, locale) || {};
  const isLv = locale === "lv";
  const isEn = locale === "en";

  const advantages = content.advantages || [];
  const cultureItems = content.cultureItems || [];
  const paragraphs = content.paragraphs || [];

  return (
    <div className="bg-white">
      <AnimatedSection className="border-b border-[var(--line)] bg-[var(--mist)] pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="container-site flex flex-col gap-6">
          <Link
            href="/#design"
            className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[var(--mute)] transition hover:text-[var(--ink)]"
          >
            <FiArrowLeft aria-hidden />
            {isEn ? "Back" : isLv ? "Atpakaļ" : "На главную"}
          </Link>
          <h1 className="section-title max-w-[900px]">{content.pageTitle || content.title}</h1>
          {content.subtitle ? (
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium text-[var(--signal)]">
              {content.subtitle}
            </p>
          ) : null}
        </div>
      </AnimatedSection>

      {content.imageUrl ? (
        <div className="container-site py-10 md:py-14">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2px] bg-[var(--mist)]">
            <SiteImage
              src={content.imageUrl}
              alt={content.title || ""}
              fill
              priority
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <AnimatedSection className="pb-16 md:pb-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            {content.intro ? (
              <p className="font-[family-name:var(--font-body)] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.55] text-[var(--ink)]">
                {content.intro}
              </p>
            ) : null}
            {paragraphs.map((text) => (
              <p
                key={text.slice(0, 40)}
                className="font-[family-name:var(--font-body)] text-[16px] leading-[1.6] text-[var(--mute)]"
              >
                {text}
              </p>
            ))}
            {content.closing ? (
              <p className="mt-2 border-l-2 border-[var(--signal)] pl-5 font-[family-name:var(--font-body)] text-[16px] leading-[1.6] text-[var(--ink)]">
                {content.closing}
              </p>
            ) : null}
            <Link href="/#contacts" className="btn-primary mt-4 inline-flex w-fit">
              {isEn ? "Discuss a project" : isLv ? "Apspriest projektu" : "Обсудить проект"}
            </Link>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5 rounded-[2px] border border-[var(--line)] p-6 md:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-[22px] font-bold text-[var(--ink)]">
                {content.advantagesTitle}
              </h2>
              <ul className="flex flex-col gap-3">
                {advantages.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-[family-name:var(--font-body)] text-[15px] leading-[1.45] text-[var(--mute)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="font-[family-name:var(--font-display)] text-[22px] font-bold text-[var(--ink)]">
                {content.cultureTitle}
              </h2>
              {content.cultureIntro ? (
                <p className="font-[family-name:var(--font-body)] text-[15px] leading-[1.5] text-[var(--mute)]">
                  {content.cultureIntro}
                </p>
              ) : null}
              <ul className="flex flex-col gap-3">
                {cultureItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-[family-name:var(--font-body)] text-[15px] leading-[1.45] text-[var(--mute)]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
