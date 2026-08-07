import Link from "next/link";
import { FiExternalLink, FiLayout, FiMail, FiShield } from "react-icons/fi";

import { SECTION_LABELS } from "@/components/admin/section-field-registry";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { StatCard } from "@/components/admin/ui/StatCard";
import { StatusPill } from "@/components/admin/ui/StatusPill";
import { listAuditEvents } from "@/db/audit-queries";
import { listInquiries } from "@/db/inquiries-queries";
import { listSections } from "@/db/queries";

export default async function AdminDashboardPage() {
  const [unread, recentAudit, sections] = await Promise.all([
    listInquiries({ page: 1, pageSize: 1, isRead: false }),
    listAuditEvents({ page: 1, pageSize: 6 }),
    listSections(),
  ]);

  const visibleCount = sections.filter((s) => s.visible).length;

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader
        title="Обзор"
        subtitle="Сводка по заявкам, контенту и последним изменениям"
        actions={
          <>
            <a
              href="/?lang=ru"
              target="_blank"
              rel="noreferrer"
              className="admin-btn focus-ring text-xs"
            >
              <FiExternalLink size={14} />
              Сайт RU
            </a>
            <a
              href="/?lang=lv"
              target="_blank"
              rel="noreferrer"
              className="admin-btn focus-ring text-xs"
            >
              <FiExternalLink size={14} />
              Сайт LV
            </a>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard
          href="/admin/inquiries?isRead=false"
          icon={<FiMail size={18} />}
          title="Непрочитанные заявки"
          value={unread.total}
          description="Требуют ответа"
          trend={unread.total > 0 ? "Есть новые" : "Всё прочитано"}
        />
        <StatCard
          href="/admin/content"
          icon={<FiLayout size={18} />}
          title="Видимые секции"
          value={
            <>
              {visibleCount}
              <span className="admin-muted text-lg">/{sections.length}</span>
            </>
          }
          description="Опубликовано на сайте"
        />
        <StatCard
          href="/admin/audit"
          icon={<FiShield size={18} />}
          title="События аудита"
          value={recentAudit.total}
          description="История изменений"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="admin-card-elevated p-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Быстрые действия</h2>
          <p className="admin-helper mt-1">Частые задачи админ-панели</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/admin/content" className="btn-primary min-h-11 text-xs">
              Редактировать контент
            </Link>
            <Link href="/admin/inquiries" className="admin-btn focus-ring text-xs">
              Заявки
            </Link>
            <Link href="/admin/settings" className="admin-btn focus-ring text-xs">
              Бэкап / SEO
            </Link>
          </div>
          <ul className="mt-4 space-y-2">
            {sections.slice(0, 6).map((s) => (
              <li
                key={s.key}
                className="flex items-center justify-between gap-2 rounded-lg border border-[var(--border-subtle)] px-3 py-2 text-xs"
              >
                <span className="text-[var(--text-secondary)]">{SECTION_LABELS[s.key] || s.key}</span>
                <StatusPill tone={s.visible ? "accent" : "neutral"}>{s.visible ? "on" : "off"}</StatusPill>
              </li>
            ))}
          </ul>
        </div>

        <div className="admin-card-elevated p-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Последние изменения</h2>
          <p className="admin-helper mt-1">Журнал аудита</p>
          <ul className="mt-4 space-y-2">
            {recentAudit.items.length === 0 ? (
              <li className="admin-muted text-sm">Пока нет событий</li>
            ) : (
              recentAudit.items.map((event) => (
                <li key={event.id} className="rounded-lg border border-[var(--border-subtle)] px-3 py-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusPill tone="info">{event.action}</StatusPill>
                    <span className="text-xs text-[var(--text-primary)]">{event.entityType}</span>
                    {event.entityId ? (
                      <span className="admin-muted text-xs">#{event.entityId}</span>
                    ) : null}
                  </div>
                  <p className="admin-muted mt-1 text-[0.65rem]">
                    {event.actorEmail || "—"} ·{" "}
                    {event.createdAt ? new Date(event.createdAt).toLocaleString("ru-RU") : ""}
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
