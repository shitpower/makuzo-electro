"use client";

import { useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";

import { renderSectionFields, SECTION_LABELS } from "@/components/admin/section-field-registry";
import { useAdminStore } from "@/stores/admin-store";

const LOCALES = ["ru", "lv", "en"];

export function AdminSectionEditor({ section, onSaved }) {
  const { activeLocale, setActiveLocale } = useAdminStore();
  const [visible, setVisible] = useState(section.visible);
  const [contentRu, setContentRu] = useState(section.contentRu || {});
  const [contentLv, setContentLv] = useState(section.contentLv || {});
  const [contentEn, setContentEn] = useState(section.contentEn || {});
  const [saving, setSaving] = useState(false);

  const content =
    activeLocale === "lv" ? contentLv : activeLocale === "en" ? contentEn : contentRu;
  const setContent =
    activeLocale === "lv" ? setContentLv : activeLocale === "en" ? setContentEn : setContentRu;

  function syncCasesItems(prev, patchItems, isActiveLocale) {
    return (isActiveLocale ? patchItems : prev.items || []).map((item, i) => {
      const prevItem = (prev.items || [])[i] || {};
      const patchItem = patchItems[i] || {};
      return {
        ...(isActiveLocale ? item : prevItem),
        imageUrl: patchItem.imageUrl ?? prevItem.imageUrl,
        variant: patchItem.variant ?? prevItem.variant ?? (i === 0 ? "stats" : "bullets"),
      };
    });
  }

  function handleContentChange(patch) {
    if (section.key === "contacts" && patch.map) {
      setContentRu((prev) => ({ ...prev, map: patch.map }));
      setContentLv((prev) => ({ ...prev, map: patch.map }));
      setContentEn((prev) => ({ ...prev, map: patch.map }));
      return;
    }
    if (section.key === "footer" && patch.logoUrl !== undefined) {
      setContentRu((prev) => ({ ...prev, logoUrl: patch.logoUrl }));
      setContentLv((prev) => ({ ...prev, logoUrl: patch.logoUrl }));
      setContentEn((prev) => ({ ...prev, logoUrl: patch.logoUrl }));
      return;
    }
    if (section.key === "cases" && patch.items) {
      const patchItems = patch.items;
      setContentRu((prev) => ({
        ...prev,
        ...(activeLocale === "ru" ? patch : {}),
        items: syncCasesItems(prev, patchItems, activeLocale === "ru"),
      }));
      setContentLv((prev) => ({
        ...prev,
        ...(activeLocale === "lv" ? patch : {}),
        items: syncCasesItems(prev, patchItems, activeLocale === "lv"),
      }));
      setContentEn((prev) => ({
        ...prev,
        ...(activeLocale === "en" ? patch : {}),
        items: syncCasesItems(prev, patchItems, activeLocale === "en"),
      }));
      return;
    }
    setContent((prev) => ({ ...prev, ...patch }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      let payloadRu = contentRu;
      let payloadLv = contentLv;
      let payloadEn = contentEn;

      if (section.key === "cases") {
        const ruItems = contentRu?.items || [];
        const syncFromRu = (items) =>
          (items || []).map((item, i) => ({
            ...item,
            imageUrl: ruItems[i]?.imageUrl ?? item.imageUrl,
            variant: ruItems[i]?.variant ?? item.variant,
          }));
        payloadLv = { ...contentLv, items: syncFromRu(contentLv?.items) };
        payloadEn = { ...contentEn, items: syncFromRu(contentEn?.items) };
      }

      const res = await fetch(`/api/sections/${section.key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visible,
          contentRu: payloadRu,
          contentLv: payloadLv,
          contentEn: payloadEn,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Ошибка сохранения");
        return;
      }
      toast.success("Сохранено");
      onSaved?.();
    } catch {
      toast.error("Ошибка соединения");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] p-4">
        <h3 className="font-bold text-[var(--text-primary)]">{SECTION_LABELS[section.key] || section.key}</h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
            Видима
          </label>
          <div className="flex rounded-lg border border-[var(--border-default)] p-0.5">
            {LOCALES.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setActiveLocale(loc)}
                className={clsx(
                  "rounded-md px-3 py-1 text-xs font-medium uppercase",
                  activeLocale === loc
                    ? "bg-[var(--accent)] text-[var(--text-primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
                )}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4 p-4">{renderSectionFields(section.key, content, handleContentChange)}</div>
      <div className="border-t border-[var(--border-subtle)] p-4">
        <button type="button" onClick={handleSave} disabled={saving} className="btn-primary">
          {saving ? "Сохранение..." : "Сохранить"}
        </button>
      </div>
    </div>
  );
}
