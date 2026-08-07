"use client";

import clsx from "clsx";

/**
 * @param {{ rows?: number; className?: string }} props
 */
export function LoadingSkeleton({ rows = 4, className }) {
  return (
    <div className={clsx("space-y-3", className)} aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-11 animate-pulse rounded-lg bg-[var(--bg-elevated)]"
          style={{ opacity: 1 - i * 0.12 }}
        />
      ))}
      <span className="sr-only">Загрузка…</span>
    </div>
  );
}
