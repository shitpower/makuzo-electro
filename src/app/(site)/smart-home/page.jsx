import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLabel } from "@/components/ui/ButtonLabel";
import { SiteImage } from "@/components/ui/SiteImage";
import { getSectionByKey } from "@/db/queries";
import { getSectionContent, getSiteLocaleServer } from "@/lib/site-locale";

function IconZap({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13.2 2L4 13.2H11L10.2 22L20 9.5H13L13.2 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWifi({ className }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 8.5C8.5 4.2 15.5 4.2 21 8.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.5 12C10.2 9.2 13.8 9.2 17.5 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 15.5C11.3 14.6 12.7 14.6 14 15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="19" r="1.3" fill="currentColor" />
    </svg>
  );
}

function IconPhone({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" stroke="currentColor" strokeWidth="2" />
      <path d="M10 5.5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="18.2" r="1.1" fill="currentColor" />
    </svg>
  );
}

export async function generateMetadata() {
  const locale = await getSiteLocaleServer();
  if (locale === "en") {
    return {
      title: "Smart home — Makuzo",
      description: "Wi‑Fi smart home solutions: power + Wi‑Fi. We recommend and install.",
    };
  }
  if (locale === "lv") {
    return {
      title: "Viedā māja — Makuzo",
      description: "Wi‑Fi viedās mājas risinājumi: barošana + Wi‑Fi. Iesakām un uzstādām.",
    };
  }
  return {
    title: "Умный дом — Makuzo",
    description: "Решения умного дома на Wi‑Fi: питание + Wi‑Fi. Рекомендуем и внедряем.",
  };
}

export default async function SmartHomePage() {
  const locale = await getSiteLocaleServer();
  const section = await getSectionByKey("smartHome");
  const content = getSectionContent(section, locale) || {};
  const isLv = locale === "lv";
  const isEn = locale === "en";

  const steps = content.steps || [];
  const categories = content.categories || [];
  const rooms = content.rooms || [];
  const stepIcons = [IconZap, IconWifi, IconPhone];

  return (
    <div className="bg-white">
      <AnimatedSection className="border-b border-[var(--line)] bg-[var(--mist)] pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="container-site flex flex-col gap-6">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[var(--mute)] transition hover:text-[var(--ink)]"
          >
            <FiArrowLeft aria-hidden />
            {isEn ? "Back" : isLv ? "Atpakaļ" : "На главную"}
          </Link>
          {content.label ? <p className="section-label">{content.label}</p> : null}
          <h1 className="section-title max-w-[920px]">{content.pageTitle || content.title}</h1>
          {content.subtitle ? (
            <p className="max-w-[640px] font-[family-name:var(--font-body)] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.5] text-[var(--mute)]">
              {content.subtitle}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-3 pt-1 font-[family-name:var(--font-display)] text-[13px] font-medium tracking-[0.04em] text-[var(--signal)]">
            <span className="inline-flex items-center gap-2">
              <IconZap className="size-5" />
              {content.pillPower || (isEn ? "Power" : isLv ? "Barošana" : "Питание")}
            </span>
            <span className="text-[var(--mute)]" aria-hidden>
              +
            </span>
            <span className="inline-flex items-center gap-2">
              <IconWifi className="size-5" />
              Wi‑Fi
            </span>
          </div>
          <Link href="/#contacts" className="btn-primary mt-2 inline-flex w-fit items-center justify-center gap-2">
            <ButtonLabel arrow>
              {content.ctaText || (isEn ? "Discuss a project" : isLv ? "Apspriest projektu" : "Обсудить проект")}
            </ButtonLabel>
          </Link>
        </div>
      </AnimatedSection>

      {content.imageUrl ? (
        <div className="container-site py-10 md:py-14">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2px] bg-[var(--mist)]">
            <SiteImage
              src={content.imageUrl}
              alt={content.pageTitle || content.title || ""}
              fill
              priority
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      {steps.length > 0 ? (
        <AnimatedSection className="border-b border-[var(--line)] pb-16 pt-6 md:pb-24 md:pt-10">
          <div className="container-site flex flex-col gap-10 md:gap-14">
            <div className="flex max-w-[640px] flex-col gap-3">
              <p className="section-label">
                {content.stepsLabel || (isEn ? "HOW IT WORKS" : isLv ? "KĀ TAS STRĀDĀ" : "КАК ЭТО РАБОТАЕТ")}
              </p>
              <h2 className="section-title text-[clamp(1.75rem,3vw,2.25rem)]">
                {content.stepsTitle ||
                  (isEn ? "Three steps to a smart space" : isLv ? "Trīs soļi līdz viedai telpai" : "Три шага до умного пространства")}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3 md:gap-10">
              {steps.map((step, i) => {
                const Icon = stepIcons[i] || IconZap;
                return (
                  <div key={step.title || i} className="flex flex-col gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[2px] bg-[var(--mist)] text-[var(--signal)]">
                      <Icon className="size-[22px]" />
                    </div>
                    <p className="font-[family-name:var(--font-display)] text-[13px] font-medium tracking-[0.08em] text-[var(--signal)]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium leading-[1.3] text-[var(--ink)]">
                      {step.title}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-[15px] leading-[1.5] text-[var(--mute)]">
                      {step.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      ) : null}

      {categories.length > 0 ? (
        <AnimatedSection className="border-b border-[var(--line)] bg-[var(--mist)] pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="container-site flex flex-col gap-10 md:gap-14">
            <div className="flex max-w-[680px] flex-col gap-3">
              <p className="section-label">
                {content.categoriesLabel || (isEn ? "CATEGORIES" : isLv ? "KATEGORIJAS" : "КАТЕГОРИИ")}
              </p>
              <h2 className="section-title text-[clamp(1.75rem,3vw,2.25rem)]">
                {content.categoriesTitle ||
                  (isEn
                    ? "What we recommend and install"
                    : isLv
                      ? "Ko iesakām un uzstādām"
                      : "Что рекомендуем и внедряем")}
              </h2>
              {content.categoriesIntro ? (
                <p className="font-[family-name:var(--font-body)] text-[16px] leading-[1.5] text-[var(--mute)]">
                  {content.categoriesIntro}
                </p>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <div
                  key={cat.title}
                  className="flex flex-col gap-4 border border-[var(--line)] bg-white p-6 md:p-7"
                >
                  {cat.imageUrl ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-[var(--mist)]">
                      <SiteImage
                        src={cat.imageUrl}
                        alt={cat.title || ""}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-[3px] w-10 bg-[var(--signal)]" />
                  )}
                  <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium text-[var(--ink)]">
                    {cat.title}
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-[15px] leading-[1.45] text-[var(--mute)]">
                    {cat.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      ) : null}

      {rooms.length > 0 ? (
        <AnimatedSection className="border-b border-[var(--line)] pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="container-site flex flex-col gap-10 md:gap-14">
            <div className="flex max-w-[680px] flex-col gap-3">
              <p className="section-label">
                {content.roomsLabel || (isEn ? "WHERE IT WORKS" : isLv ? "KUR TAS STRĀDĀ" : "ГДЕ ЭТО РАБОТАЕТ")}
              </p>
              <h2 className="section-title text-[clamp(1.75rem,3vw,2.25rem)]">
                {content.roomsTitle ||
                  (isEn ? "Scenarios for real spaces" : isLv ? "Scenāriji reālām telpām" : "Сценарии для реальных объектов")}
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {rooms.map((room) => (
                <div key={room.title} className="flex flex-col gap-3 border-t border-[var(--line)] pt-6">
                  <h3 className="font-[family-name:var(--font-display)] text-[22px] font-medium text-[var(--ink)]">
                    {room.title}
                  </h3>
                  <p className="font-[family-name:var(--font-body)] text-[15px] leading-[1.5] text-[var(--mute)]">
                    {room.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      ) : null}

      <AnimatedSection className="border-t border-[var(--line)] bg-[var(--careers-dark)] pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="container-site flex flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-1 flex-col gap-6">
            <p className="section-label !text-[var(--signal)]">
              {content.closingPill?.trim() ||
                (isEn ? "Power + Wi‑Fi" : isLv ? "Barošana + Wi‑Fi" : "Питание + Wi‑Fi")}
            </p>
            <h2 className="max-w-[520px] font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-white">
              {content.closingTitle ||
                (isEn
                  ? "Shall we make your facility smarter?"
                  : isLv
                    ? "Padarīsim jūsu objektu viedāku?"
                    : "Сделаем объект умнее?")}
            </h2>
            {content.closingText ? (
              <p className="max-w-[520px] font-[family-name:var(--font-body)] text-[17px] leading-[1.5] text-[var(--on-dark-mute)]">
                {content.closingText}
              </p>
            ) : null}
            <Link href="/#contacts" className="btn-primary mt-1 inline-flex w-fit items-center justify-center gap-2">
              <ButtonLabel arrow>
                {content.ctaText || (isEn ? "Discuss a project" : isLv ? "Apspriest projektu" : "Обсудить проект")}
              </ButtonLabel>
            </Link>
          </div>

          <div
            className="flex flex-1 flex-col justify-center gap-6 rounded-[2px] bg-[var(--careers-panel)] px-7 py-8 md:px-10 md:py-10"
            aria-hidden
          >
            <div className="flex items-center gap-4 text-[var(--signal)]">
              <IconZap className="size-7 shrink-0" />
              <span className="font-[family-name:var(--font-display)] text-[22px] font-medium text-white md:text-[26px]">
                {content.pillPower || (isEn ? "Power" : isLv ? "Barošana" : "Питание")}
              </span>
            </div>
            <div className="h-px w-full bg-[var(--on-dark-line)]" />
            <div className="flex items-center gap-4 text-[var(--signal)]">
              <IconWifi className="size-7 shrink-0" />
              <span className="font-[family-name:var(--font-display)] text-[22px] font-medium text-white md:text-[26px]">
                Wi‑Fi
              </span>
            </div>
            <p className="pt-1 font-[family-name:var(--font-body)] text-[14px] leading-[1.45] text-[var(--on-dark-mute)]">
              {isEn
                ? "Plug in → connect → scenes ready."
                : isLv
                  ? "Pieslēdz → savieno → scenāriji gatavi."
                  : "Подключил → связал → сценарии готовы."}
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
