"use client";

import Link from "next/link";
import clsx from "clsx";

/**
 * @param {{
 *   name?: string | null;
 *   email?: string | null;
 *   href?: string;
 *   collapsed?: boolean;
 *   className?: string;
 * }} props
 */
export function UserChip({ name, email, href = "/admin/profile", collapsed = false, className }) {
  const initials = (name || email || "A")
    .split(/\s+|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  if (collapsed) {
    return (
      <Link
        href={href}
        title={name || email || "Профиль"}
        aria-label="Открыть профиль"
        className={clsx(
          "focus-ring mx-auto grid size-10 place-items-center rounded-lg bg-[var(--bg-elevated)] text-xs font-bold text-[var(--accent)] hover:bg-[var(--bg-elevated-hover)]",
          className,
        )}
      >
        {initials || "A"}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-label="Открыть профиль"
      className={clsx(
        "focus-ring flex min-h-11 items-center gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-2 transition hover:border-[var(--border-default)] hover:bg-[var(--bg-elevated-hover)]",
        className,
      )}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[var(--accent)]/15 text-xs font-bold text-[var(--accent)]">
        {initials || "A"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-semibold text-[var(--text-primary)]">
          {name || "Администратор"}
        </span>
        <span className="admin-muted block truncate text-[0.65rem]">{email || "Профиль"}</span>
      </span>
    </Link>
  );
}
