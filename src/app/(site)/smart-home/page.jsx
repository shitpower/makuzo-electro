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

function SectionEyebrow({ children, index }) {
  return (
    <div className="flex flex-col gap-3">
      {index ? (
        <p className="font-[family-name:var(--font-display)] text-[12px] font-medium tabular-nums tracking-[0.14em] text-[var(--signal)]">
          {index}
        </p>
      ) : null}
      <p className="font-[family-name:var(--font-display)] text-[12px] font-medium uppercase leading-[1.3] tracking-[0.15em] text-[var(--signal)]">
        {children}
      </p>
      <span className="h-[2px] w-8 bg-[var(--signal)]" aria-hidden />
    </div>
  );
}

function highlightLastWord(title) {
  const parts = String(title || "")
    .trim()
    .split(/\s+/);
  if (parts.length < 2) return title;
  const last = parts.pop();
  return (
    <>
      {parts.join(" ")} <span className="text-[var(--signal)]">{last}</span>
    </>
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

  const closingTitle =
    content.closingTitle ||
    (isEn
      ? "Shall we make your facility smarter."
      : isLv
        ? "Padarīsim jūsu objektu viedāku."
        : "Сделаем объект умнее.");
  const closingText =
    content.closingText ||
    (isEn
      ? "We will pick devices for your electrics, install them and set up scenes — from power-up to automation."
      : isLv
        ? "Izvēlēsimies ierīces atbilstoši jūsu elektroinstalācijai, uzstādīsim un noskaņosim scenārijus — no pieslēguma līdz automatizācijai."
        : "Подберём устройства под вашу электрику, смонтируем и настроим сценарии — от подключения до автоматизации.");
  const connected = isEn ? "Connected" : isLv ? "Pieslēgts" : "Подключено";

  const pageTitle = content.pageTitle || content.title || (isEn ? "Smart home on Wi‑Fi" : isLv ? "Viedā māja ar Wi‑Fi" : "Умный дом на Wi‑Fi");
  const lead =
    content.lead ||
    (isEn
      ? "Smart home without unnecessary complexity."
      : isLv
        ? "Viedā māja bez liekas sarežģītības."
        : "Умный дом без лишней сложности.");
  const subtitle =
    content.subtitle ||
    (isEn
      ? "We select and install Wi‑Fi devices for lighting, climate, security and automation."
      : isLv
        ? "Atlasām un uzstādām Wi‑Fi ierīces apgaismojumam, klimatam, drošībai un automatizācijai."
        : "Подбираем и внедряем Wi‑Fi устройства для освещения, климата, безопасности и автоматизации.");
  const noHub = isEn ? "No hub required" : isLv ? "Hubs nav vajadzīgs" : "Хаб не требуется";

  return (
    <div className="bg-white">
      <AnimatedSection className="border-b border-[var(--line)] bg-[var(--mist)] pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[0.9fr_1.2fr] lg:gap-12">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[var(--mute)] transition hover:text-[var(--ink)]"
            >
              <FiArrowLeft aria-hidden />
              {isEn ? "Back" : isLv ? "Atpakaļ" : "На главную"}
            </Link>
            <SectionEyebrow index="01 / 04">{content.label || (isEn ? "SMART HOME" : isLv ? "VIEDĀ MĀJA" : "УМНЫЙ ДОМ")}</SectionEyebrow>
            <h1 className="section-title max-w-[560px] whitespace-pre-line">
              {String(pageTitle).includes("Wi") || String(pageTitle).includes("Wi‑")
                ? String(pageTitle)
                    .replace(/\s+на\s+/i, "\nна ")
                    .replace(/\s+on\s+/i, "\non ")
                    .replace(/\s+ar\s+/i, "\nar ")
                : pageTitle}
            </h1>
            <div className="flex max-w-[520px] flex-col gap-3">
              <p className="font-[family-name:var(--font-display)] text-[clamp(1.125rem,2vw,1.375rem)] font-medium leading-[1.35] text-[var(--ink)]">
                {lead}
              </p>
              <p className="font-[family-name:var(--font-body)] text-[16px] leading-[1.55] text-[var(--mute)]">
                {subtitle}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 font-[family-name:var(--font-display)] text-[13px] font-medium tracking-[0.04em]">
              <span className="inline-flex items-center gap-2 text-[var(--signal)]">
                <IconZap className="size-5" />
                {content.pillPower || (isEn ? "Power" : isLv ? "Barošana" : "Питание")}
              </span>
              <span className="text-[var(--mute)]" aria-hidden>
                +
              </span>
              <span className="inline-flex items-center gap-2 text-[var(--signal)]">
                <IconWifi className="size-5" />
                Wi‑Fi
              </span>
              <span className="text-[var(--mute)]" aria-hidden>
                ×
              </span>
              <span className="text-[var(--mute)]">{noHub}</span>
            </div>
            <Link href="/#contacts" className="btn-primary mt-2 inline-flex w-fit items-center justify-center gap-2">
              <ButtonLabel arrow>
                {content.ctaText || (isEn ? "Discuss a project" : isLv ? "Apspriest projektu" : "Обсудить проект")}
              </ButtonLabel>
            </Link>
          </div>

          <div className="relative overflow-visible rounded-[2px] lg:origin-center lg:scale-[1.08]">
            <SiteImage
              src="/img/smart-homes.png"
              alt={
                isEn
                  ? "Makuzo smart home system"
                  : isLv
                    ? "Makuzo viedās mājas sistēma"
                    : "Умный дом Makuzo"
              }
              width={1536}
              height={1024}
              className="block h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
            />
          </div>
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
              <SectionEyebrow index="02 / 04">
                {content.stepsLabel || (isEn ? "HOW IT WORKS" : isLv ? "KĀ TAS STRĀDĀ" : "КАК ЭТО РАБОТАЕТ")}
              </SectionEyebrow>
              <h2 className="section-title text-[clamp(1.75rem,3vw,2.25rem)]">
                {content.stepsTitle ||
                  (isEn
                    ? "Three steps to a smart space"
                    : isLv
                      ? "Trīs soļi līdz viedai telpai"
                      : "Три шага до умного пространства")}
              </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3 md:gap-10">
              {steps.map((step, i) => (
                <div key={step.title || i} className="flex flex-col gap-4">
                  <div className="h-[3px] w-10 bg-[var(--signal)]" />
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
              ))}
            </div>
          </div>
        </AnimatedSection>
      ) : null}

      {categories.length > 0 ? (
        <AnimatedSection className="border-b border-[var(--line)] bg-[var(--mist)] pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="container-site flex flex-col gap-10 md:gap-14">
            <div className="flex max-w-[680px] flex-col gap-3">
              <SectionEyebrow index="03 / 04">
                {content.categoriesLabel || (isEn ? "CATEGORIES" : isLv ? "KATEGORIJAS" : "КАТЕГОРИИ")}
              </SectionEyebrow>
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
                <article
                  key={cat.title}
                  className="group flex flex-col overflow-hidden rounded-[2px] bg-white transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(17,17,17,0.10)]"
                >
                  {cat.imageUrl ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--mist)]">
                      <SiteImage
                        src={cat.imageUrl}
                        alt={cat.title || ""}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="px-6 pt-6 md:px-7 md:pt-7">
                      <div className="h-[3px] w-10 bg-[var(--signal)]" />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 px-6 py-5 md:px-7 md:py-6">
                    <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium text-[var(--ink)]">
                      {cat.title}
                    </h3>
                    <p className="font-[family-name:var(--font-body)] text-[15px] leading-[1.45] text-[var(--mute)]">
                      {cat.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>
      ) : null}

      {rooms.length > 0 ? (
        <AnimatedSection className="border-b border-[var(--line)] pb-16 pt-14 md:pb-24 md:pt-20">
          <div className="container-site flex flex-col gap-10 md:gap-14">
            <div className="flex max-w-[680px] flex-col gap-3">
              <SectionEyebrow index="04 / 04">
                {content.roomsLabel || (isEn ? "WHERE IT WORKS" : isLv ? "KUR TAS STRĀDĀ" : "ГДЕ ЭТО РАБОТАЕТ")}
              </SectionEyebrow>
              <h2 className="section-title text-[clamp(1.75rem,3vw,2.25rem)]">
                {content.roomsTitle ||
                  (isEn
                    ? "Scenarios for real spaces"
                    : isLv
                      ? "Scenāriji reālām telpām"
                      : "Сценарии для реальных объектов")}
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

      <AnimatedSection className="bg-[var(--careers-dark)] pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="container-site grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex max-w-[500px] flex-col gap-6">
            <SectionEyebrow>
              {content.closingPill?.trim() ||
                (isEn ? "Power + Wi‑Fi" : isLv ? "Barošana + Wi‑Fi" : "Питание + Wi‑Fi")}
            </SectionEyebrow>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-white">
              {highlightLastWord(closingTitle)}
            </h2>
            <p className="font-[family-name:var(--font-body)] text-[17px] leading-[1.55] text-[#c4c4c4]">
              {closingText}
            </p>
            <Link
              href="/#contacts"
              className="btn-primary mt-1 inline-flex h-auto min-h-0 w-fit items-center justify-center gap-2 !rounded-full !px-[26px] !py-[14px]"
            >
              <ButtonLabel arrow>
                {content.ctaText || (isEn ? "Discuss a project" : isLv ? "Apspriest projektu" : "Обсудить проект")}
              </ButtonLabel>
            </Link>
          </div>

          <div
            className="relative flex flex-col rounded-[2px] border border-[#414141] bg-[#353535] px-7 py-8 md:px-9 md:py-9"
            aria-hidden
          >
            <span className="absolute left-7 top-0 h-[2px] w-14 bg-[var(--signal)] md:left-9" />

            <div className="flex items-start gap-[18px]">
              <IconZap className="mt-0.5 size-6 shrink-0 text-[var(--signal)]" />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[20px] font-medium text-white md:text-[22px]">
                    {content.pillPower || (isEn ? "Power" : isLv ? "Barošana" : "Питание")}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 pt-1 font-[family-name:var(--font-display)] text-[11px] font-medium uppercase tracking-[0.12em] text-[#c4c4c4]">
                    <span className="size-1.5 rounded-full bg-[var(--signal)]" />
                    {connected}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-body)] text-[14px] leading-[1.45] text-[#a8a8a8]">
                  {isEn
                    ? "Power control for your loads"
                    : isLv
                      ? "Elektrobaršanas vadība"
                      : "Управление электропитанием"}
                </p>
              </div>
            </div>

            <div className="ml-3 flex h-8 items-stretch py-1">
              <span className="w-px bg-[#4a4a4a]" />
            </div>

            <div className="flex items-start gap-[18px]">
              <IconWifi className="mt-0.5 size-6 shrink-0 text-[var(--signal)]" />
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-[family-name:var(--font-display)] text-[20px] font-medium text-white md:text-[22px]">
                    Wi‑Fi
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-2 pt-1 font-[family-name:var(--font-display)] text-[11px] font-medium uppercase tracking-[0.12em] text-[#c4c4c4]">
                    <span className="size-1.5 rounded-full bg-[var(--signal)]" />
                    {connected}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-body)] text-[14px] leading-[1.45] text-[#a8a8a8]">
                  {isEn
                    ? "Device link and scenes"
                    : isLv
                      ? "Ierīču un scenāriju savienojums"
                      : "Связь устройств и сценариев"}
                </p>
              </div>
            </div>

            <div className="mt-7 border-t border-[#414141] pt-5">
              <p className="font-[family-name:var(--font-body)] text-[14px] leading-[1.45] text-[#a8a8a8]">
                {isEn
                  ? "Power → link → scenes ready."
                  : isLv
                    ? "Barošana → savienojums → scenāriji gatavi."
                    : "Питание → связь → сценарии готовы."}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
