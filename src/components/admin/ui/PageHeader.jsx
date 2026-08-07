"use client";

/**
 * @param {{
 *   title: string;
 *   subtitle?: string;
 *   actions?: import("react").ReactNode;
 *   className?: string;
 * }} props
 */
export function PageHeader({ title, subtitle, actions, className = "" }) {
  return (
    <header
      className={`flex flex-wrap items-start justify-between gap-4 ${className}`.trim()}
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">{title}</h1>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-sm text-[var(--text-primary)]/90">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </header>
  );
}
