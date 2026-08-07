"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { FiImage, FiUpload, FiX } from "react-icons/fi";

import { SiteImage } from "@/components/ui/SiteImage";

/**
 * Text field for an image URL + a button to pick (or upload) an image
 * from the media library. Selecting an item sets the field to
 * `/api/media/{id}/file`, which is served directly from Postgres.
 */
export function MediaPickerField({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/media?pageSize=48");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setMedia(data.items || data.media || []);
    } catch {
      toast.error("Не удалось загрузить медиатеку");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleOpen() {
    setOpen(true);
    loadMedia();
  }

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
      const data = await res.json();
      toast.success("Файл загружен");
      onChange(`/api/media/${data.media.id}/file`);
      setOpen(false);
    } catch {
      toast.error("Ошибка соединения");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="admin-label">
      <span>{label}</span>
      <div className="flex gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input focus-ring"
          placeholder="/api/media/12/file или внешний URL"
        />
        <button
          type="button"
          onClick={handleOpen}
          className="admin-btn focus-ring shrink-0 text-xs font-medium"
        >
          <FiImage size={14} />
          Выбрать
        </button>
      </div>

      {value ? (
        <div className="relative mt-2 h-24 w-40 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
          <SiteImage src={value} alt="" fill className="object-cover" />
        </div>
      ) : null}

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Медиатека"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-bold text-[var(--text-primary)]">Медиатека</h4>
              <div className="flex items-center gap-2">
                <label className="btn-primary inline-flex cursor-pointer gap-2 text-xs">
                  <FiUpload size={14} />
                  {uploading ? "Загрузка..." : "Загрузить новое"}
                  <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
                <button type="button" onClick={() => setOpen(false)} className="admin-btn-ghost focus-ring rounded p-1">
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {loading ? (
              <p className="admin-muted text-sm">Загрузка...</p>
            ) : media.length === 0 ? (
              <p className="admin-muted text-sm">Медиафайлов пока нет. Загрузите первый.</p>
            ) : (
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {media.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onChange(`/api/media/${item.id}/file`);
                      setOpen(false);
                    }}
                    className="focus-ring group relative aspect-video overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[var(--accent)]"
                    title={item.filename}
                  >
                    <SiteImage src={`/api/media/${item.id}/file`} alt={item.filename} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
