"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiDownload, FiLoader, FiShield } from "react-icons/fi";

import { AdminSelect } from "@/components/admin/ui/AdminSelect";
import { AdminTable } from "@/components/admin/ui/AdminTable";
import { SearchBar } from "@/components/admin/ui/SearchBar";
import { StatusPill } from "@/components/admin/ui/StatusPill";
import { Toolbar } from "@/components/admin/ui/Toolbar";
import { downloadAdminFile } from "@/lib/admin/download-file";

const ENTITY_FILTERS = [
  { value: "", label: "Все сущности" },
  { value: "section", label: "Секции" },
  { value: "settings", label: "Настройки" },
  { value: "media", label: "Медиа" },
  { value: "inquiry", label: "Заявки" },
  { value: "audit", label: "Журнал" },
  { value: "backup", label: "Бэкап" },
  { value: "admin_user", label: "Админ" },
];

export function AdminAuditTable() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [entityType, setEntityType] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), pageSize: "30" });
        if (entityType) params.set("entityType", entityType);
        if (q) params.set("q", q);
        const res = await fetch(`/api/audit?${params.toString()}`);
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Не удалось загрузить журнал");
        }
        const data = await res.json();
        if (!cancelled) {
          setItems(data.items || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch (error) {
        if (!cancelled) toast.error(error?.message || "Не удалось загрузить журнал");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, entityType, q]);

  async function handleExport() {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (entityType) params.set("entityType", entityType);
      if (q) params.set("q", q);
      const qs = params.toString();
      await downloadAdminFile(
        `/api/admin/export/audit${qs ? `?${qs}` : ""}`,
        "makuzo-audit.xlsx",
      );
      toast.success("Журнал экспортирован");
    } catch (error) {
      toast.error(error?.message || "Не удалось экспортировать журнал");
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="space-y-4">
      <Toolbar>
        <SearchBar
          value={q}
          onChange={(value) => {
            setPage(1);
            setQ(value);
          }}
        />
        <AdminSelect
          value={entityType}
          onChange={(value) => {
            setPage(1);
            setEntityType(value);
          }}
          aria-label="Тип сущности"
          options={ENTITY_FILTERS}
          className="min-w-[11.5rem]"
        />
        <button
          type="button"
          disabled={exporting}
          onClick={handleExport}
          className="admin-btn focus-ring ml-auto text-sm"
        >
          {exporting ? <FiLoader size={16} className="animate-spin" /> : <FiDownload size={16} />}
          Excel
        </button>
      </Toolbar>

      <AdminTable
        loading={loading}
        emptyIcon={<FiShield size={20} />}
        emptyTitle="Событий пока нет"
        emptyDescription="Изменения контента, медиа и настроек появятся в журнале автоматически."
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        columns={[
          { key: "date", label: "Дата" },
          { key: "user", label: "Пользователь" },
          { key: "action", label: "Действие" },
          { key: "entity", label: "Сущность" },
          { key: "id", label: "ID", hideOnMobile: true },
        ]}
        rows={items.map((item) => ({
          id: item.id,
          mobileTitle: item.action,
          mobileMeta: item.actorEmail || "—",
          cells: {
            date: new Date(item.createdAt).toLocaleString("ru-RU"),
            user: item.actorEmail || "—",
            action: <StatusPill tone="info">{item.action}</StatusPill>,
            entity: item.entityType,
            id: item.entityId || "—",
          },
        }))}
      />
    </div>
  );
}
