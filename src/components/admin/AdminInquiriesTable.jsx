"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { FiCheck, FiDownload, FiInbox, FiLoader, FiTrash2 } from "react-icons/fi";

import { AdminSelect } from "@/components/admin/ui/AdminSelect";
import { AdminTable } from "@/components/admin/ui/AdminTable";
import { SearchBar } from "@/components/admin/ui/SearchBar";
import { StatusPill } from "@/components/admin/ui/StatusPill";
import { Toolbar } from "@/components/admin/ui/Toolbar";
import { downloadAdminFile } from "@/lib/admin/download-file";

const READ_FILTERS = [
  { value: "", label: "Все" },
  { value: "false", label: "Непрочитанные" },
  { value: "true", label: "Прочитанные" },
];

export function AdminInquiriesTable() {
  const searchParams = useSearchParams();
  const initialRead =
    searchParams.get("isRead") === "false"
      ? "false"
      : searchParams.get("isRead") === "true"
        ? "true"
        : "";
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState("");
  const [isRead, setIsRead] = useState(initialRead);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), pageSize: "20" });
        if (q) params.set("q", q);
        if (isRead) params.set("isRead", isRead);
        const res = await fetch(`/api/inquiries?${params.toString()}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (!cancelled) {
          setInquiries(data.items || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch {
        if (!cancelled) toast.error("Не удалось загрузить заявки");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, q, isRead]);

  async function markRead(id) {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: true }),
    });
    if (res.ok) {
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, isRead: true } : i)));
    }
  }

  async function handleDelete(id) {
    if (!confirm("Удалить заявку?")) return;
    const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    if (res.ok) {
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      toast.success("Удалено");
    }
  }

  async function handleExport() {
    setExporting(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (isRead) params.set("isRead", isRead);
      const qs = params.toString();
      await downloadAdminFile(
        `/api/admin/export/inquiries${qs ? `?${qs}` : ""}`,
        "makuzo-inquiries.xlsx",
      );
      toast.success("Заявки экспортированы");
    } catch (error) {
      toast.error(error?.message || "Не удалось экспортировать заявки");
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
          placeholder="Поиск по имени, телефону…"
        />
        <AdminSelect
          value={isRead}
          onChange={(value) => {
            setPage(1);
            setIsRead(value);
          }}
          aria-label="Фильтр прочтения"
          options={READ_FILTERS}
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
        emptyIcon={<FiInbox size={20} />}
        emptyTitle="Заявок пока нет"
        emptyDescription="Когда клиент отправит форму на сайте, заявка появится здесь."
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        columns={[
          { key: "date", label: "Дата" },
          { key: "name", label: "Имя" },
          { key: "phone", label: "Телефон" },
          { key: "email", label: "Email", hideOnMobile: true },
          { key: "message", label: "Сообщение", hideOnMobile: true },
          { key: "status", label: "Статус" },
          { key: "actions", label: "Действия" },
        ]}
        rows={inquiries.map((item) => ({
          id: item.id,
          className: !item.isRead ? "bg-[var(--accent)]/5" : undefined,
          mobileTitle: item.name,
          mobileMeta: new Date(item.createdAt).toLocaleString("ru-RU"),
          cells: {
            date: new Date(item.createdAt).toLocaleString("ru-RU"),
            name: <span className="font-medium">{item.name}</span>,
            phone: item.phone,
            email: item.email || "—",
            message: <span className="line-clamp-2 max-w-xs">{item.message || "—"}</span>,
            status: (
              <StatusPill tone={item.isRead ? "neutral" : "accent"}>
                {item.isRead ? "Прочитано" : "Новая"}
              </StatusPill>
            ),
            actions: (
              <div className="flex justify-end gap-1 md:justify-start">
                {!item.isRead ? (
                  <button
                    type="button"
                    onClick={() => markRead(item.id)}
                    className="focus-ring admin-touch grid place-items-center rounded-lg text-[var(--status-success)]"
                    aria-label="Отметить прочитанным"
                  >
                    <FiCheck size={16} />
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="focus-ring admin-touch grid place-items-center rounded-lg text-[var(--status-error)]"
                  aria-label="Удалить заявку"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ),
          },
        }))}
      />
    </div>
  );
}
