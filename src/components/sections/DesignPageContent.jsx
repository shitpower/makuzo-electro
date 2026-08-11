"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiX } from "react-icons/fi";

import { DesignGalleryGrid } from "@/components/sections/DesignGalleryGrid";
import { ButtonLabel } from "@/components/ui/ButtonLabel";
import { withLocale } from "@/lib/site-locale";

function DesignDetailModal({ open, onClose, content, locale }) {
  const closeLabel = locale === "en" ? "Close" : locale === "lv" ? "Aizvērt" : "Закрыть";

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !content) return null;

  const paragraphs = content.paragraphs || [];
  const processSteps = content.processSteps || [];
  const advantages = content.advantages || [];

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-black/65" aria-label={closeLabel} onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-[1] flex max-h-[min(92dvh,820px)] w-full max-w-2xl flex-col overflow-hidden rounded-t-[12px] border border-[var(--line)] bg-white sm:rounded-[8px]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-5 py-4 sm:px-7">
          <div className="flex min-w-0 flex-col gap-2">
            <span className="h-[2px] w-8 bg-[var(--signal)]" aria-hidden />
            <h3 className="font-[family-name:var(--font-display)] text-[20px] font-bold text-[var(--ink)] sm:text-[22px]">
              {content.title}
            </h3>
            {content.subtitle ? (
              <p className="font-[family-name:var(--font-display)] text-[14px] font-medium text-[var(--signal)] sm:text-[15px]">
                {content.subtitle}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring grid size-10 shrink-0 place-items-center rounded-lg text-[var(--mute)] transition hover:bg-[var(--mist)] hover:text-[var(--ink)]"
            aria-label={closeLabel}
          >
            <FiX size={20} aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {content.intro ? (
            <p className="font-[family-name:var(--font-body)] text-[15px] leading-[1.65] text-[var(--ink)] sm:text-[16px]">
              {content.intro}
            </p>
          ) : null}

          {content.sectionTitle ? (
            <h4 className="font-[family-name:var(--font-display)] text-[18px] font-bold text-[var(--ink)]">
              {content.sectionTitle}
            </h4>
          ) : null}

          {paragraphs.map((text) => (
            <p key={text.slice(0, 48)} className="font-[family-name:var(--font-body)] text-[15px] leading-[1.65] text-[var(--mute)] sm:text-[16px]">
              {text}
            </p>
          ))}

          {processSteps.length ? (
            <div className="space-y-3 border-t border-[var(--line)] pt-5">
              {content.processLabel ? (
                <p className="font-[family-name:var(--font-display)] text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--signal)]">
                  {content.processLabel}
                </p>
              ) : null}
              <p className="font-[family-name:var(--font-display)] text-[15px] font-medium leading-relaxed text-[var(--ink)]">
                {processSteps.join(" → ")}
              </p>
              {content.processNote ? (
                <p className="font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[var(--mute)]">
                  {content.processNote}
                </p>
              ) : null}
            </div>
          ) : null}

          {advantages.length ? (
            <div className="space-y-3 border-t border-[var(--line)] pt-5">
              {content.advantagesTitle ? (
                <h4 className="font-[family-name:var(--font-display)] text-[17px] font-bold text-[var(--ink)]">
                  {content.advantagesTitle}
                </h4>
              ) : null}
              <ul className="flex flex-col gap-2.5">
                {advantages.map((item) => (
                  <li key={item} className="flex gap-3 font-[family-name:var(--font-body)] text-[15px] leading-[1.45] text-[var(--mute)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {(content.cultureTitle || content.cultureIntro) && (
            <div className="space-y-2 border-t border-[var(--line)] pt-5">
              {content.cultureTitle ? (
                <h4 className="font-[family-name:var(--font-display)] text-[17px] font-bold text-[var(--ink)]">
                  {content.cultureTitle}
                </h4>
              ) : null}
              {content.cultureIntro ? (
                <p className="font-[family-name:var(--font-body)] text-[15px] leading-[1.55] text-[var(--mute)]">
                  {content.cultureIntro}
                </p>
              ) : null}
            </div>
          )}

          {content.closing ? (
            <p className="border-l-2 border-[var(--signal)] pl-4 font-[family-name:var(--font-body)] text-[15px] leading-[1.6] text-[var(--ink)]">
              {content.closing}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function DesignPageContent({ content, locale }) {
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const [openDetail, setOpenDetail] = useState(false);

  const advantages = content.advantages || [];
  const paragraphs = content.paragraphs || [];
  const cultureItems = content.cultureItems || [];
  const gallery = content.gallery || [];
  const previewCount = Math.min(content.galleryPreviewCount || 3, gallery.length);
  const preview = gallery.slice(0, previewCount);

  const detail = content.detail || null;
  const hasDetail = Boolean(detail?.title || detail?.intro || detail?.paragraphs?.length);

  return (
    <>
      {content.intro ? (
        <p className="max-w-[720px] font-[family-name:var(--font-body)] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.55] text-[var(--ink)]">
          {content.intro}
        </p>
      ) : null}

      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          {paragraphs.map((text) => (
            <p key={text.slice(0, 40)} className="font-[family-name:var(--font-body)] text-[16px] leading-[1.6] text-[var(--mute)]">
              {text}
            </p>
          ))}

          <div className="mt-2 flex flex-wrap gap-3">
            {hasDetail ? (
              <button type="button" className="btn-ghost" onClick={() => setOpenDetail(true)}>
                {content.detailCta || (isEn ? "Learn more" : isLv ? "Uzzināt vairāk" : "Узнать подробнее")}
              </button>
            ) : null}
            <Link href={withLocale(locale, "/#contacts")} className="btn-primary inline-flex items-center justify-center gap-2">
              <ButtonLabel arrow>
                {isEn ? "Discuss a project" : isLv ? "Apspriest projektu" : "Обсудить проект"}
              </ButtonLabel>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {advantages.length ? (
            <div className="flex flex-col gap-5 rounded-[2px] border border-[var(--line)] p-6 md:p-8">
              <h2 className="font-[family-name:var(--font-display)] text-[22px] font-bold text-[var(--ink)]">
                {content.advantagesTitle || (isEn ? "Our advantages" : isLv ? "Mūsu priekšrocības" : "Наши преимущества")}
              </h2>
              <ul className="flex flex-col gap-3">
                {advantages.map((item) => (
                  <li key={item} className="flex gap-3 font-[family-name:var(--font-body)] text-[15px] leading-[1.45] text-[var(--mute)]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {(content.cultureTitle || content.cultureIntro || cultureItems.length > 0) && (
            <div className="flex flex-col gap-4 border-t border-[var(--line)] pt-6">
              {content.cultureTitle ? (
                <h2 className="font-[family-name:var(--font-display)] text-[18px] font-bold text-[var(--ink)]">
                  {content.cultureTitle}
                </h2>
              ) : null}
              {content.cultureIntro ? (
                <p className="font-[family-name:var(--font-body)] text-[15px] leading-[1.55] text-[var(--mute)]">
                  {content.cultureIntro}
                </p>
              ) : null}
              {cultureItems.length ? (
                <ul className="flex flex-col gap-2.5">
                  {cultureItems.map((item) => (
                    <li key={item} className="flex gap-3 font-[family-name:var(--font-body)] text-[14px] leading-[1.45] text-[var(--mute)]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {content.closing ? (
        <p className="max-w-[720px] border-l-2 border-[var(--signal)] pl-5 font-[family-name:var(--font-body)] text-[16px] leading-[1.6] text-[var(--ink)]">
          {content.closing}
        </p>
      ) : null}

      {preview.length ? (
        <section className="flex flex-col gap-6 border-t border-[var(--line)] pt-10 md:pt-14">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">
                {content.galleryLabel || (isEn ? "GALLERY" : isLv ? "GALERIJA" : "ГАЛЕРЕЯ")}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold text-[var(--ink)]">
                {content.galleryTitle ||
                  (isEn ? "Work in photos" : isLv ? "Darbs fotogrāfijās" : "Как это выглядит")}
              </h2>
            </div>
            <Link href={withLocale(locale, "/design/gallery")} className="btn-ghost w-fit">
              {content.galleryCta ||
                (isEn ? "View full gallery" : isLv ? "Skatīt visu galeriju" : "Смотреть всю галерею")}
            </Link>
          </div>

          <DesignGalleryGrid
            images={gallery}
            displayImages={preview}
            locale={locale}
            alt={content.pageTitle || content.title || ""}
            columns="preview"
          />
        </section>
      ) : null}

      <DesignDetailModal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        content={detail}
        locale={locale}
      />
    </>
  );
}
