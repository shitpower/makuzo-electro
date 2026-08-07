"use client";

import clsx from "clsx";

/**
 * @param {{
 *   tone?: "neutral" | "success" | "warning" | "error" | "accent" | "info";
 *   children: import("react").ReactNode;
 *   className?: string;
 * }} props
 */
export function StatusPill({ tone = "neutral", children, className }) {
  const tones = {
    neutral: "bg-white/12 text-[var(--text-primary)]",
    success: "bg-[var(--status-success)]/15 text-[var(--status-success)]",
    warning: "bg-[var(--status-warning)]/15 text-[var(--status-warning)]",
    error: "bg-[var(--status-error)]/15 text-[var(--status-error)]",
    accent: "bg-[var(--accent)]/15 text-[var(--accent-bright)]",
    info: "bg-[var(--status-info)]/20 text-[var(--status-info)]",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide",
        tones[tone] || tones.neutral,
        className,
      )}
    >
      {children}
    </span>
  );
}
