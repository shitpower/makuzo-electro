"use client";

import clsx from "clsx";

/**
 * @param {{
 *   icon?: import("react").ReactNode;
 *   title: string;
 *   description?: string;
 *   action?: import("react").ReactNode;
 *   className?: string;
 * }} props
 */
export function EmptyState({ icon, title, description, action, className }) {
  return (
    <div
      className={clsx(
        "admin-card flex flex-col items-center justify-center px-6 py-14 text-center",
        className,
      )}
      role="status"
    >
      {icon ? (
        <div className="mb-4 grid size-12 place-items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--accent)]">
          {icon}
        </div>
      ) : null}
      <h3 className="text-sm font-bold text-[var(--text-primary)]">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-[var(--text-primary)]/90">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
