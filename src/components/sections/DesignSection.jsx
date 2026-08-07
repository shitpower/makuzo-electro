"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SiteImage } from "@/components/ui/SiteImage";

export function DesignSection({ content }) {
  return (
    <AnimatedSection id="design" className="bg-white pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <p className="section-label">{content.label}</p>
          <h2 className="section-title">{content.title}</h2>
          {content.subtitle ? (
            <p className="font-[family-name:var(--font-display)] text-[clamp(1.125rem,2vw,1.375rem)] font-medium text-[var(--signal)]">
              {content.subtitle}
            </p>
          ) : null}
          <p className="max-w-[520px] font-[family-name:var(--font-body)] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.5] text-[var(--mute)]">
            {content.teaser}
          </p>
          <Link href={content.ctaHref || "/design"} className="btn-primary mt-2 inline-flex w-fit gap-2">
            {content.ctaText || "Подробнее"}
            <FiArrowRight aria-hidden />
          </Link>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[var(--mist)]">
          {content.imageUrl ? (
            <SiteImage
              src={content.imageUrl}
              alt={content.title || ""}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : null}
        </div>
      </div>
    </AnimatedSection>
  );
}
