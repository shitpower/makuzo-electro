"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMinus, FiPlus, FiX } from "react-icons/fi";

import { SiteImage } from "@/components/ui/SiteImage";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

export function DesignGalleryLightbox({ images, index, onClose, onChange, locale, alt = "" }) {
  const titleId = useId();
  const closeLabel = locale === "en" ? "Close" : locale === "lv" ? "Aizvērt" : "Закрыть";
  const prevLabel = locale === "en" ? "Previous" : locale === "lv" ? "Iepriekšējā" : "Предыдущее";
  const nextLabel = locale === "en" ? "Next" : locale === "lv" ? "Nākamā" : "Следующее";
  const zoomInLabel = locale === "en" ? "Zoom in" : locale === "lv" ? "Palielināt" : "Увеличить";
  const zoomOutLabel = locale === "en" ? "Zoom out" : locale === "lv" ? "Samazināt" : "Уменьшить";
  const resetLabel = locale === "en" ? "Reset zoom" : locale === "lv" ? "Atiestatīt" : "Сбросить";

  const open = index != null && index >= 0 && images.length > 0;
  const current = open ? images[index] : null;

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [index]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
      if (e.key === "-" || e.key === "_") {
        setZoom((z) => {
          const next = Math.max(MIN_ZOOM, z - ZOOM_STEP);
          if (next === MIN_ZOOM) setOffset({ x: 0, y: 0 });
          return next;
        });
      }
      if (e.key === "0") {
        setZoom(1);
        setOffset({ x: 0, y: 0 });
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, index, images.length, onClose, onChange]);

  useEffect(() => {
    const el = stageRef.current;
    if (!open || !el) return undefined;
    function onWheel(e) {
      e.preventDefault();
      if (e.deltaY < 0) {
        setZoom((z) => Math.min(MAX_ZOOM, Math.round((z + ZOOM_STEP) * 10) / 10));
      } else {
        setZoom((z) => {
          const next = Math.max(MIN_ZOOM, Math.round((z - ZOOM_STEP) * 10) / 10);
          if (next === MIN_ZOOM) setOffset({ x: 0, y: 0 });
          return next;
        });
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open]);

  function zoomIn() {
    setZoom((z) => Math.min(MAX_ZOOM, Math.round((z + ZOOM_STEP) * 10) / 10));
  }

  function zoomOut() {
    setZoom((z) => {
      const next = Math.max(MIN_ZOOM, Math.round((z - ZOOM_STEP) * 10) / 10);
      if (next === MIN_ZOOM) setOffset({ x: 0, y: 0 });
      return next;
    });
  }

  function resetZoom() {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }

  function onPointerDown(e) {
    if (zoom <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  }

  function onPointerMove(e) {
    if (!dragRef.current || zoom <= 1) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setOffset({ x: dragRef.current.ox + dx, y: dragRef.current.oy + dy });
  }

  function onPointerUp() {
    dragRef.current = null;
  }

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
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={zoomOut}
              disabled={zoom <= MIN_ZOOM}
              className="focus-ring grid size-10 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={zoomOutLabel}
              title={zoomOutLabel}
            >
              <FiMinus size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={resetZoom}
              className="focus-ring min-w-14 rounded-lg bg-white/10 px-2 py-2.5 text-[12px] font-semibold tabular-nums text-white transition hover:bg-white/20"
              aria-label={resetLabel}
              title={resetLabel}
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={zoomIn}
              disabled={zoom >= MAX_ZOOM}
              className="focus-ring grid size-10 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={zoomInLabel}
              title={zoomInLabel}
            >
              <FiPlus size={18} aria-hidden />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="focus-ring ml-1 grid size-10 place-items-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
              aria-label={closeLabel}
            >
              <FiX size={20} aria-hidden />
            </button>
          </div>
        </div>

        <div
          ref={stageRef}
          className={`relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-black/40 sm:aspect-[16/10] ${
            zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
          }`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="absolute inset-0 transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              transformOrigin: "center center",
            }}
          >
            <SiteImage src={current} alt={alt} fill sizes="100vw" className="object-contain" priority />
          </div>
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
