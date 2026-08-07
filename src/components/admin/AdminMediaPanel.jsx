"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiGrid, FiImage, FiList, FiTrash2, FiUpload } from "react-icons/fi";
import clsx from "clsx";

import { SiteImage } from "@/components/ui/SiteImage";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { LoadingSkeleton } from "@/components/admin/ui/LoadingSkeleton";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SearchBar } from "@/components/admin/ui/SearchBar";
import { Toolbar } from "@/components/admin/ui/Toolbar";

function formatSize(size) {
  if (!size) return "—";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(0)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function AdminMediaPanel() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState("");
  const [view, setView] = useState("grid");

  async function reloadMedia() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: "24" });
      if (q) params.set("q", q);
      const res = await fetch(`/api/media?${params.toString()}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMedia(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      toast.error("Не удалось загрузить медиа");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(page), pageSize: "24" });
        if (q) params.set("q", q);
        const res = await fetch(`/api/media?${params.toString()}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (!cancelled) {
          setMedia(data.items || []);
          setTotalPages(data.totalPages || 1);
        }
      } catch {
        if (!cancelled) toast.error("Не удалось загрузить медиа");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, q]);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/media", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Ошибка загрузки");
        return;
      }
      toast.success("Файл загружен");
      await reloadMedia();
    } catch {
      toast.error("Ошибка соединения");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleDelete(id) {
    if (!confirm("Удалить файл?")) return;
    try {
      const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
      if (!res.ok) {
        toast.error("Ошибка удаления");
        return;
      }
      toast.success("Удалено");
      setMedia((prev) => prev.filter((m) => m.id !== id));
    } catch {
      toast.error("Ошибка соединения");
    }
  }

  function copyPath(path) {
    navigator.clipboard.writeText(path);
    toast.success("Путь скопирован");
  }

  const uploadButton = (
    <label className="btn-primary inline-flex min-h-11 cursor-pointer items-center gap-2">
      <FiUpload size={16} />
      {uploading ? "Загрузка..." : "Загрузить"}
      <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
    </label>
  );

  return (
    <div className="space-y-5 p-4 lg:p-6">
      <PageHeader
        title="Медиа"
        subtitle="Библиотека загруженных изображений для секций сайта"
        actions={uploadButton}
      />

      <Toolbar>
        <SearchBar
          value={q}
          onChange={(value) => {
            setPage(1);
            setQ(value);
          }}
          placeholder="Поиск по имени…"
        />
        <div className="flex rounded-lg border border-[var(--border-default)] p-0.5" role="group" aria-label="Вид">
          <button
            type="button"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
            className={clsx(
              "focus-ring admin-touch grid place-items-center rounded-md px-3",
              view === "grid"
                ? "bg-[var(--accent)] text-[var(--text-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
            )}
          >
            <FiGrid size={16} />
          </button>
          <button
            type="button"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
            className={clsx(
              "focus-ring admin-touch grid place-items-center rounded-md px-3",
              view === "list"
                ? "bg-[var(--accent)] text-[var(--text-primary)]"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
            )}
          >
            <FiList size={16} />
          </button>
        </div>
      </Toolbar>

      {loading ? <LoadingSkeleton rows={6} /> : null}

      {!loading && media.length === 0 ? (
        <EmptyState
          icon={<FiImage size={20} />}
          title="Медиафайлов пока нет"
          description="Загрузите изображения для hero, блоков о компании и футера."
          action={uploadButton}
        />
      ) : null}

      {!loading && media.length > 0 && view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <article key={item.id} className="admin-card overflow-hidden transition hover:border-[var(--border-default)]">
              <div className="relative aspect-video overflow-hidden bg-[var(--bg-elevated)]">
                <SiteImage src={`/api/media/${item.id}/file`} alt={item.filename} fill className="object-cover" />
              </div>
              <div className="space-y-2 p-3">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]" title={item.filename}>
                  {item.filename}
                </p>
                <p className="admin-muted text-xs">
                  {formatSize(item.size)} · {item.mimeType || "image"}
                </p>
                <p className="admin-muted text-[0.65rem]">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString("ru-RU") : ""}
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => copyPath(`/api/media/${item.id}/file`)}
                    className="admin-btn focus-ring flex-1 text-xs"
                  >
                    Копировать URL
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    aria-label={`Удалить ${item.filename}`}
                    className="focus-ring admin-touch grid place-items-center rounded-lg border border-[var(--status-error)]/30 text-[var(--status-error)]"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {!loading && media.length > 0 && view === "list" ? (
        <div className="admin-card divide-y divide-[var(--border-subtle)] overflow-hidden">
          {media.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 hover:bg-[var(--bg-elevated)]/50">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-[var(--bg-elevated)]">
                <SiteImage src={`/api/media/${item.id}/file`} alt="" fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">{item.filename}</p>
                <p className="admin-muted text-xs">
                  {formatSize(item.size)} · {item.mimeType || "image"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyPath(`/api/media/${item.id}/file`)}
                className="admin-btn focus-ring text-xs"
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                aria-label={`Удалить ${item.filename}`}
                className="focus-ring admin-touch grid place-items-center text-[var(--status-error)]"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {totalPages > 1 ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
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
            onClick={() => setPage((p) => p + 1)}
            className="admin-btn focus-ring text-xs"
          >
            Вперёд
          </button>
        </div>
      ) : null}
    </div>
  );
}
