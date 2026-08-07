"use client";

import clsx from "clsx";

import { EmptyState } from "@/components/admin/ui/EmptyState";
import { LoadingSkeleton } from "@/components/admin/ui/LoadingSkeleton";

/**
 * @typedef {{ key: string; label: string; className?: string; hideOnMobile?: boolean }} AdminTableColumn
 */

/**
 * @param {{
 *   columns: AdminTableColumn[];
 *   rows: Array<{ id: string | number; cells: Record<string, import("react").ReactNode>; className?: string; mobileTitle?: import("react").ReactNode; mobileMeta?: import("react").ReactNode }>;
 *   loading?: boolean;
 *   emptyTitle?: string;
 *   emptyDescription?: string;
 *   emptyAction?: import("react").ReactNode;
 *   emptyIcon?: import("react").ReactNode;
 *   page?: number;
 *   totalPages?: number;
 *   onPageChange?: (page: number) => void;
 *   className?: string;
 * }} props
 */
export function AdminTable({
  columns,
  rows,
  loading = false,
  emptyTitle = "Нет данных",
  emptyDescription,
  emptyAction,
  emptyIcon,
  page = 1,
  totalPages = 1,
  onPageChange,
  className,
}) {
  if (loading) {
    return <LoadingSkeleton rows={5} className={className} />;
  }

  if (!rows.length) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
        className={className}
      />
    );
  }

  return (
    <div className={clsx("space-y-4", className)}>
      <div className="admin-card hidden overflow-hidden md:block">
        <div className="max-h-[70vh] overflow-auto">
          <table className="w-full min-w-[640px] text-left text-sm text-[var(--text-primary)]">
            <thead className="sticky top-0 z-10 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)]">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={clsx(
                      "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-primary)]",
                      col.className,
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className={clsx(
                    "border-b border-[var(--border-subtle)] text-[var(--text-primary)] transition hover:bg-[var(--bg-elevated)]/60",
                    row.className,
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={clsx("px-4 py-3 align-middle text-[var(--text-primary)]", col.className)}
                    >
                      {row.cells[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <article key={row.id} className={clsx("admin-card space-y-2 p-4", row.className)}>
            {row.mobileTitle ? (
              <div className="font-semibold text-[var(--text-primary)]">{row.mobileTitle}</div>
            ) : null}
            {row.mobileMeta ? (
              <div className="text-xs text-[var(--text-primary)]/80">{row.mobileMeta}</div>
            ) : null}
            <dl className="space-y-2">
              {columns
                .filter((col) => !col.hideOnMobile)
                .map((col) => (
                  <div key={col.key} className="flex items-start justify-between gap-3 text-sm">
                    <dt className="shrink-0 text-[var(--text-primary)]/80">{col.label}</dt>
                    <dd className="min-w-0 text-right text-[var(--text-primary)]">{row.cells[col.key]}</dd>
                  </div>
                ))}
            </dl>
          </article>
        ))}
      </div>

      {totalPages > 1 && onPageChange ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className="admin-btn focus-ring text-xs"
          >
            Назад
          </button>
          <span className="admin-muted text-xs" aria-live="polite">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="admin-btn focus-ring text-xs"
          >
            Вперёд
          </button>
        </div>
      ) : null}
    </div>
  );
}
