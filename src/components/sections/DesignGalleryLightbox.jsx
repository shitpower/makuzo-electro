"use client";

import { useEffect, useId } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

import { SiteImage } from "@/components/ui/SiteImage";

export function DesignGalleryLightbox({ images, index, onClose, onChange, locale, alt = "" }) {
  const titleId = useId();
  const closeLabel = locale === "en" ? "Close" : locale === "lv" ? "Aizvērt" : "Закрыть";
  const prevLabel = locale === "en" ? "Previous" : locale === "lv" ? "Iepriekšējā" : "Предыдущее";
  const nextLabel = locale === "en" ? "Next" : locale === "lv" ? "Nākamā" : "Следующее";

  const open = index != null && index >= 0 && images.length > 0;
  const current = open ? images[index] : null;

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, index, images.length, onClose, onChange]);

  if (!open || !current) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6">
      <button type="button" className="absolute inset-0 bg-black/80" aria-label={closeLabel} onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[1] flex w-full max-w-5xl flex-col gap-3"
      >
        <div className="flex items-center justify-between gap-3 text-white">
          <p id={titleId} className="font-[family-name:var(--font-display)] text-[13px] font-medium tracking-wide">
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring grid size-10 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
            aria-label={closeLabel}
          >
            <FiX size={20} aria-hidden />
          </button>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-black/40 sm:aspect-[16/10]">
          <SiteImage src={current} alt={alt} fill sizes="100vw" className="object-contain" priority />
        </div>

        {images.length > 1 ? (
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onChange((index - 1 + images.length) % images.length)}
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-white/20"
              aria-label={prevLabel}
            >
              <FiChevronLeft size={18} aria-hidden />
              {prevLabel}
            </button>
            <button
              type="button"
              onClick={() => onChange((index + 1) % images.length)}
              className="focus-ring inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-white/20"
              aria-label={nextLabel}
            >
              {nextLabel}
              <FiChevronRight size={18} aria-hidden />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
