"use client";

import { FiArrowDown } from "react-icons/fi";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SiteImage } from "@/components/ui/SiteImage";

function HighlightedTitle({ title, highlight }) {
  if (!title) return null;
  if (!highlight || !title.includes(highlight)) {
    return <span className="text-white">{title}</span>;
  }

  const [before, ...rest] = title.split(highlight);
  const after = rest.join(highlight);
  return (
    <>
      <span className="text-white">{before}</span>
      <span className="text-[var(--signal)]">{highlight}</span>
      {after ? <span className="text-white">{after}</span> : null}
    </>
  );
}

export function HeroSection({ content, locale, phone }) {
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : content.ctaHref || "#contacts";

  return (
    <AnimatedSection className="relative flex min-h-[560px] items-center bg-[#111111] py-14 sm:py-16 lg:min-h-[1050px] lg:py-20">
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(102.53deg, #111111 0%, #1F1F1F 50%, #2E2424 90.91%)",
        }}
        aria-hidden
      >
        {content.bgImageUrl ? (
          <SiteImage
            src={content.bgImageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-60"
          />
        ) : null}
        <div className="absolute inset-0 bg-[rgba(51,51,51,0.35)]" />
      </div>

      <div className="container-site relative z-10 lg:-mt-14">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/45 sm:text-[11px] sm:tracking-[0.14em]">
          {content.locationTag}
        </p>

        <h1 className="mt-5 max-w-[701px] text-[clamp(1.75rem,5.35vw,4.8rem)] font-bold leading-[1.12] tracking-[-0.01em] sm:mt-8 sm:leading-[1.14] sm:tracking-[-0.015em] lg:leading-[1.18]">
          <HighlightedTitle title={content.title} highlight={content.titleHighlight} />
        </h1>

        <p className="mt-4 max-w-[701px] font-[family-name:var(--font-body)] text-[0.875rem] leading-[1.35] text-white sm:mt-[34px] sm:text-[clamp(1.0625rem,1.4vw,1.25rem)] sm:leading-[1.25]">
          {content.subtitle}
        </p>

        <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-[34px] sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-[28px]">
          <a
            href={content.ctaHref || telHref}
            className="btn-primary inline-flex min-h-12 w-full sm:h-[42px] sm:min-h-0 sm:w-auto sm:!px-7 sm:!py-0 sm:text-[13px]"
          >
            {content.ctaText}
          </a>
          <a
            href="#services"
            className="btn-ghost inline-flex min-h-12 w-full sm:h-[42px] sm:min-h-0 sm:w-auto sm:!px-7 sm:!py-0 sm:text-[13px]"
          >
            {content.ctaSecondaryText}
          </a>
        </div>
      </div>

      {/* Wave sits flush at the hero bottom (Figma "Vector": 1440x109.9). The notch reveals the photo. */}
      <div className="absolute inset-x-0 -bottom-px z-10 h-[calc(clamp(2rem,7.64vw,6.875rem)+1px)]" aria-hidden>
        <svg
          className="block h-full w-full"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 5.72629e-05L574.464 6.14041e-06C612.572 2.74915e-06 640.123 36.0603 667.211 62.8639C680.944 76.4524 699.534 83.8816 720 83.8816C740.466 83.8816 759.056 76.4524 772.789 62.8639C799.877 36.0603 827.428 2.74916e-06 865.536 6.14042e-06L1440 5.72629e-05V109.9H0V5.72629e-05Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Scroll button — white circle, copper arrow */}
      <a
        href="#design"
        className="scroll-arrow absolute bottom-6 left-1/2 z-20 grid size-12 place-items-center rounded-full bg-white sm:bottom-[48px] sm:size-[59px]"
        aria-label={locale === "en" ? "Scroll down" : locale === "lv" ? "Ritināt lejup" : "Прокрутить"}
      >
        <FiArrowDown strokeWidth={2.5} className="text-[18px] text-[var(--signal)] sm:text-[23px]" aria-hidden />
      </a>
    </AnimatedSection>
  );
}
