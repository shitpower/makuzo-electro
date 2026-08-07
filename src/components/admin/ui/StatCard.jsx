"use client";

import Link from "next/link";
import clsx from "clsx";

/**
 * @param {{
 *   href?: string;
 *   icon?: import("react").ReactNode;
 *   title: string;
 *   value: import("react").ReactNode;
 *   description?: string;
 *   trend?: string;
 *   className?: string;
 * }} props
 */
export function StatCard({ href, icon, title, value, description, trend, className }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[var(--text-primary)]/80">
          {title}
        </p>
        {icon ? <span className="text-[var(--accent)]">{icon}</span> : null}
      </div>
      <p className="mt-3 text-3xl font-extrabold text-[var(--text-primary)]">{value}</p>
      {trend ? <p className="mt-1 text-xs font-medium text-[var(--accent-bright)]">{trend}</p> : null}
      {description ? <p className="mt-2 text-xs text-[var(--text-primary)]/80">{description}</p> : null}
    </>
  );

  const classes = clsx(
    "admin-card block p-4 transition hover:border-[var(--accent)] hover:bg-[var(--bg-elevated)]",
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
