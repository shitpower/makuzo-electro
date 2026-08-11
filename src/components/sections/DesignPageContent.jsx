"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { FiX } from "react-icons/fi";

import { ButtonLabel } from "@/components/ui/ButtonLabel";
import { SiteImage } from "@/components/ui/SiteImage";
import { withLocale } from "@/lib/site-locale";

function DesignDetailModal({ open, onClose, title, body, locale }) {
  const titleId = useId();
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

  if (!open) return null;

  const paragraphs = Array.isArray(body) ? body : String(body || "").split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-black/65" aria-label={closeLabel} onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] flex max-h-[min(92dvh,780px)] w-full max-w-2xl flex-col overflow-hidden rounded-t-[12px] border border-[var(--line)] bg-white sm:rounded-[8px]"
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--line)] px-5 py-4 sm:px-7">
          <div className="flex flex-col gap-2">
            <span className="h-[2px] w-8 bg-[var(--signal)]" aria-hidden />
            <h3 id={titleId} className="font-[family-name:var(--font-display)] text-[20px] font-bold text-[var(--ink)] sm:text-[22px]">
              {title}
            </h3>
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
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-7 sm:py-6">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="font-[family-name:var(--font-body)] text-[15px] leading-[1.65] text-[var(--mute)] sm:text-[16px]">
              {p}
            </p>
          ))}
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
  const processSteps = content.processSteps || [];
  const gallery = content.gallery?.length
    ? content.gallery
    : content.imageUrl
      ? [content.imageUrl]
      : [];
  const detailBody = content.detailBody || paragraphs;

  return (
    <>
      {content.intro ? (
        <p className="max-w-[720px] font-[family-name:var(--font-body)] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.55] text-[var(--ink)]">
          {content.intro}
        </p>
      ) : null}

      {gallery.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((src, i) => (
            <div
              key={src}
              className={`relative overflow-hidden rounded-[2px] bg-[var(--mist)] ${
                i === 0 ? "aspect-[4/3] sm:col-span-2 lg:col-span-2 lg:aspect-[16/10]" : "aspect-[4/3]"
              }`}
            >
              <SiteImage
                src={src}
                alt={content.sectionTitle || content.pageTitle || content.title || ""}
                fill
                priority={i < 2}
                sizes={i === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div className="flex flex-col gap-5">
          {content.sectionTitle ? (
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-bold text-[var(--ink)]">
              {content.sectionTitle}
            </h2>
          ) : null}
          {paragraphs.map((text) => (
            <p key={text.slice(0, 40)} className="font-[family-name:var(--font-body)] text-[16px] leading-[1.6] text-[var(--mute)]">
              {text}
            </p>
          ))}

          {processSteps.length ? (
            <div className="mt-2 flex flex-col gap-4 rounded-[2px] border border-[var(--line)] bg-[var(--mist)] p-5 md:p-6">
              {content.processLabel ? (
                <p className="font-[family-name:var(--font-display)] text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--signal)]">
                  {content.processLabel}
                </p>
              ) : null}
              <ol className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-1 sm:gap-y-2">
                {processSteps.map((step, i) => (
                  <li key={step} className="flex items-baseline gap-2 font-[family-name:var(--font-display)] text-[15px] font-medium text-[var(--ink)]">
                    {i > 0 ? (
                      <span className="text-[var(--mute)]" aria-hidden>
                        →
                      </span>
                    ) : null}
                    <span>
                      <span className="mr-1.5 tabular-nums text-[12px] text-[var(--signal)]">{String(i + 1).padStart(2, "0")}</span>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              {content.processNote ? (
                <p className="font-[family-name:var(--font-body)] text-[14px] leading-[1.55] text-[var(--mute)]">
                  {content.processNote}
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-2 flex flex-wrap gap-3">
            {(content.detailBody || content.detailTitle) && (
              <button type="button" className="btn-ghost" onClick={() => setOpenDetail(true)}>
                {content.detailCta || (isEn ? "Read more" : isLv ? "Lasīt vairāk" : "Подробнее")}
              </button>
            )}
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
                {content.advantagesTitle || (isEn ? "What you get" : isLv ? "Ko tas dod" : "Что это даёт")}
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

          {(content.cultureTitle || content.cultureIntro) && (
            <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-6">
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
            </div>
          )}
        </div>
      </div>

      {content.closing ? (
        <p className="mt-4 max-w-[720px] border-l-2 border-[var(--signal)] pl-5 font-[family-name:var(--font-body)] text-[16px] leading-[1.6] text-[var(--ink)]">
          {content.closing}
        </p>
      ) : null}

      <DesignDetailModal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        title={content.detailTitle || content.sectionTitle || content.pageTitle || ""}
        body={detailBody}
        locale={locale}
      />
    </>
  );
}
