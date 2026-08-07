"use client";

import clsx from "clsx";

/**
 * @param {{
 *   title: string;
 *   helper?: string;
 *   children: import("react").ReactNode;
 *   actions?: import("react").ReactNode;
 *   tone?: "default" | "media" | "list" | "seo";
 *   className?: string;
 * }} props
 */
export function FormSection({ title, helper, children, actions, tone = "default", className }) {
  const toneClass = {
    default: "border-[var(--border-subtle)]",
    media: "border-[var(--accent)]/25 bg-[var(--accent)]/[0.03]",
    list: "border-[var(--border-default)]",
    seo: "border-[var(--status-info)]/20",
  }[tone];

  return (
    <section className={clsx("rounded-xl border p-4", toneClass, className)}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">{title}</h3>
          {helper ? <p className="admin-helper mt-1">{helper}</p> : null}
        </div>
        {actions}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
