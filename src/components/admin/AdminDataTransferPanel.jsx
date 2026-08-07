"use client";

import { useMemo, useRef, useState } from "react";
import { FiDownload, FiLoader, FiUpload } from "react-icons/fi";
import { toast } from "sonner";

import { DATA_TRANSFER_SECTIONS } from "@/lib/admin/data-transfer-sections";

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function parseFilenameFromDisposition(header) {
  if (!header) return null;
  const match = /filename="([^"]+)"/.exec(header);
  return match?.[1] ?? null;
}

export function AdminDataTransferPanel() {
  const fileRef = useRef(null);
  const [exportSections, setExportSections] = useState(() =>
    DATA_TRANSFER_SECTIONS.map((s) => s.id),
  );
  const [importSections, setImportSections] = useState(() =>
    DATA_TRANSFER_SECTIONS.map((s) => s.id),
  );
  const [detectedSections, setDetectedSections] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const sectionLabel = useMemo(() => {
    const map = Object.fromEntries(DATA_TRANSFER_SECTIONS.map((s) => [s.id, s.label]));
    return (id) => map[id] ?? id;
  }, []);

  function toggleSection(list, setList, id) {
    setList((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function handleExport(selectedOnly) {
    if (!exportSections.length) {
      toast.error("Выберите хотя бы одну секцию");
      return;
    }

    setExporting(true);
    try {
      const res = selectedOnly
        ? await fetch("/api/admin/export", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sections: exportSections }),
          })
        : await fetch("/api/admin/export");

      if (!res.ok) {
        toast.error("Ошибка экспорта");
        return;
      }

      const blob = await res.blob();
      const fallback = `makuzo-backup-${Date.now()}.json`;
      const filename = parseFilenameFromDisposition(res.headers.get("Content-Disposition")) ?? fallback;
      downloadBlob(blob, filename);
      toast.success("Бэкап скачан");
    } catch {
      toast.error("Ошибка сети");
    } finally {
      setExporting(false);
    }
  }

  async function handleFilePick(file) {
    if (!file) return;

    setPreviewing(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("preview", "1");

      const res = await fetch("/api/admin/import", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Не удалось прочитать файл");
        return;
      }

      const detected = data.detectedSections ?? [];
      setDetectedSections(detected);
      if (detected.length) {
        setImportSections(detected);
        toast.message(`В файле: ${detected.map(sectionLabel).join(", ")}`);
      }
    } catch {
      toast.error("Ошибка чтения файла");
    } finally {
      setPreviewing(false);
    }
  }

  async function handleImport() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      toast.error("Выберите JSON файл");
      return;
    }
    if (!importSections.length) {
      toast.error("Выберите секции для импорта");
      return;
    }

    const ok = window.confirm(
      "Импорт перезапишет выбранные данные в базе. Продолжить?",
    );
    if (!ok) return;

    setImporting(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("sections", JSON.stringify(importSections));

      const res = await fetch("/api/admin/import", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Импорт не выполнен");
        return;
      }

      const parts = Object.entries(data.counts ?? {}).map(
        ([key, n]) => `${sectionLabel(key)}: ${n}`,
      );
      if (parts.length) toast.success(`Импортировано — ${parts.join("; ")}`);
      else toast.message("Нечего импортировать для выбранных секций");

      if (data.errors?.length) {
        data.errors.forEach((err) => toast.error(err));
      }
    } catch {
      toast.error("Ошибка сети");
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="w-full space-y-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
        <div>
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Экспорт / бэкап</h2>
          <p className="admin-muted mt-1 text-sm">
            JSON-бэкап контента. Медиафайлы в бэкап не входят — храните их отдельно.
          </p>
        </div>

        <ul className="space-y-2">
          {DATA_TRANSFER_SECTIONS.map((section) => (
            <li key={section.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[var(--border-subtle)] px-3 py-2.5 hover:border-[var(--border-default)]">
                <input
                  type="checkbox"
                  className="mt-1 accent-[var(--accent)]"
                  checked={exportSections.includes(section.id)}
                  onChange={() => toggleSection(exportSections, setExportSections, section.id)}
                />
                <span>
                  <span className="block text-sm font-medium text-[var(--text-primary)]">{section.label}</span>
                  <span className="admin-muted block text-xs">{section.description}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={exporting}
            onClick={() => handleExport(true)}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
          >
            {exporting ? <FiLoader size={16} className="animate-spin" /> : <FiDownload size={16} />}
            Скачать выбранное
          </button>
          <button
            type="button"
            disabled={exporting}
            onClick={() => handleExport(false)}
            className="admin-btn focus-ring text-sm"
          >
            <FiDownload size={16} />
            Полный бэкап
          </button>
        </div>
      </div>

      <div className="w-full space-y-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
        <div>
          <h2 className="text-sm font-bold text-[var(--text-primary)]">Импорт / восстановление</h2>
          <p className="admin-muted mt-1 text-sm">
            Загрузите ранее скачанный JSON. Существующие секции и настройки будут обновлены.
          </p>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          className="block w-full text-sm text-[var(--text-secondary)] file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--bg-elevated)] file:px-3 file:py-2 file:text-sm file:text-[var(--text-primary)]"
          onChange={(e) => handleFilePick(e.target.files?.[0] ?? null)}
        />

        {previewing ? (
          <p className="admin-muted flex items-center gap-2 text-xs">
            <FiLoader className="animate-spin" /> Анализ файла…
          </p>
        ) : null}

        {detectedSections.length > 0 ? (
          <p className="text-xs text-[var(--accent)]">
            Обнаружено: {detectedSections.map(sectionLabel).join(", ")}
          </p>
        ) : null}

        <p className="admin-muted text-xs font-bold uppercase tracking-wide">
          Импортировать секции
        </p>
        <ul className="space-y-2">
          {DATA_TRANSFER_SECTIONS.map((section) => (
            <li key={`import-${section.id}`}>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[var(--border-subtle)] px-3 py-2 hover:border-[var(--border-default)]">
                <input
                  type="checkbox"
                  className="accent-[var(--accent)]"
                  checked={importSections.includes(section.id)}
                  onChange={() => toggleSection(importSections, setImportSections, section.id)}
                />
                <span className="text-sm text-[var(--text-primary)]">{section.label}</span>
              </label>
            </li>
          ))}
        </ul>

        <button
          type="button"
          disabled={importing}
          onClick={handleImport}
          className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
        >
          {importing ? <FiLoader size={16} className="animate-spin" /> : <FiUpload size={16} />}
          Импортировать
        </button>
      </div>
    </div>
  );
}
