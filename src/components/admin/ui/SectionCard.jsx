"use client";

import clsx from "clsx";

/**
 * @param {{
 *   title: string;
 *   description?: string;
 *   badge?: import("react").ReactNode;
 *   headerActions?: import("react").ReactNode;
 *   footer?: import("react").ReactNode;
 *   children: import("react").ReactNode;
 *   elevated?: boolean;
 *   className?: string;
 * }} props
 */
export function SectionCard({
  title,
  description,
  badge,
  headerActions,
  footer,
  children,
  elevated = false,
  className,
}) {
  return (
    <article
      className={clsx(
        elevated ? "admin-card-elevated" : "admin-card",
        "overflow-hidden",
        className,
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 px-4 py-3.5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-[var(--text-primary)]">{title}</h3>
            {badge}
          </div>
          {description ? <p className="admin-helper mt-1">{description}</p> : null}
        </div>
        {headerActions ? <div className="flex flex-wrap items-center gap-2">{headerActions}</div> : null}
      </header>
      <div className="space-y-4 p-4">{children}</div>
      {footer ? (
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]/40 px-4 py-3">
          {footer}
        </footer>
      ) : null}
    </article>
  );
}
