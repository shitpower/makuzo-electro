"use client";

import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import clsx from "clsx";
import { toast } from "sonner";

import { renderSectionFields, SECTION_LABELS, SECTION_HELPERS } from "@/components/admin/section-field-registry";
import { AdminSectionSpacingPanel } from "@/components/admin/AdminSectionSpacingPanel";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SectionCard } from "@/components/admin/ui/SectionCard";
import { StatusPill } from "@/components/admin/ui/StatusPill";
import { useAdminStore } from "@/stores/admin-store";

const LOCALES = ["ru", "lv", "en"];

function SectionEditor({ section }) {
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
  const helper = SECTION_HELPERS[section.key] || "Поля этой секции отображаются на публичном сайте.";

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
      toast.success("Секция сохранена");
    } catch {
      toast.error("Ошибка соединения");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionCard
      elevated
      title={SECTION_LABELS[section.key] || section.key}
      description={helper}
      badge={<StatusPill tone={visible ? "accent" : "neutral"}>{visible ? "Видима" : "Скрыта"}</StatusPill>}
      headerActions={
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border-subtle)] px-3 text-xs text-[var(--text-secondary)]">
            <input
              type="checkbox"
              checked={visible}
              onChange={(e) => setVisible(e.target.checked)}
              aria-label="Видимость секции"
            />
            На сайте
          </label>
          <div className="flex rounded-lg border border-[var(--border-default)] p-0.5" role="group" aria-label="Язык">
            {LOCALES.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setActiveLocale(loc)}
                aria-pressed={activeLocale === loc}
                className={clsx(
                  "focus-ring min-h-9 rounded-md px-3 text-xs font-medium uppercase",
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
      }
      footer={
        <>
          <a
            href={`/?lang=${activeLocale}`}
            target="_blank"
            rel="noreferrer"
            className="admin-btn-ghost focus-ring inline-flex min-h-11 items-center gap-2 text-xs"
          >
            <FiExternalLink size={14} />
            Превью ({activeLocale.toUpperCase()})
          </a>
          <button type="button" onClick={handleSave} disabled={saving} className="btn-primary min-h-11">
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
        </>
      }
    >
      {renderSectionFields(section.key, content, handleContentChange)}
    </SectionCard>
  );
}

const SPACING_TAB_KEY = "__spacing__";

export function AdminContentClient({ sections, sectionSpacing }) {
  const [openKey, setOpenKey] = useState(sections[0]?.key || "hero");
  const { activeLocale } = useAdminStore();

  return (
    <div className="space-y-5 p-4 lg:p-6">
      <PageHeader
        title="Контент"
        subtitle="Управление секциями лендинга. Каждая карточка соответствует блоку на сайте."
        actions={
          <a
            href={`/?lang=${activeLocale}`}
            target="_blank"
            rel="noreferrer"
            className="admin-btn focus-ring text-xs"
          >
            <FiExternalLink size={14} />
            Превью сайта
          </a>
        }
      />

      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            key={section.key}
            type="button"
            onClick={() => setOpenKey(section.key)}
            className={clsx(
              "focus-ring rounded-full px-3 py-1.5 text-xs font-semibold",
              openKey === section.key
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]",
            )}
          >
            {SECTION_LABELS[section.key] || section.key}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setOpenKey(SPACING_TAB_KEY)}
          className={clsx(
            "focus-ring rounded-full px-3 py-1.5 text-xs font-semibold",
            openKey === SPACING_TAB_KEY
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--bg-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)]",
          )}
        >
          Отступы
        </button>
      </div>

      {openKey === SPACING_TAB_KEY ? (
        <AdminSectionSpacingPanel initialSpacing={sectionSpacing} />
      ) : (
        sections
          .filter((s) => s.key === openKey)
          .map((section) => <SectionEditor key={section.key} section={section} />)
      )}
    </div>
  );
}
