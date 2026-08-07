"use client";

import { useState } from "react";
import { toast } from "sonner";

import { AdminDataTransferPanel } from "@/components/admin/AdminDataTransferPanel";
import { MediaPickerField } from "@/components/admin/MediaPickerField";
import { FormSection } from "@/components/admin/ui/FormSection";
import { PageHeader } from "@/components/admin/ui/PageHeader";

export function AdminSettingsClient({ initialSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);

  function updateField(field, value) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logoUrl: settings.logoUrl,
          seoTitleRu: settings.seoTitleRu,
          seoTitleLv: settings.seoTitleLv,
          seoTitleEn: settings.seoTitleEn,
          seoDescRu: settings.seoDescRu,
          seoDescLv: settings.seoDescLv,
          seoDescEn: settings.seoDescEn,
        }),
      });
      if (!res.ok) {
        toast.error("Ошибка сохранения");
        return;
      }
      toast.success("Настройки сохранены");
    } catch {
      toast.error("Ошибка соединения");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4 py-8 lg:py-12">
      <PageHeader
        title="Настройки"
        subtitle="SEO сайта и резервное копирование данных"
        className="text-center [&_div]:mx-auto [&_div]:text-center"
      />

      <div className="mt-8 w-full space-y-8">
        <FormSection title="Сайт / SEO" helper="Title и description для поисковиков (RU/LV/EN)." tone="seo">
          <MediaPickerField label="Логотип" value={settings.logoUrl} onChange={(v) => updateField("logoUrl", v)} />
          <label className="admin-label">
            SEO Title RU
            <input
              className="admin-input focus-ring"
              value={settings.seoTitleRu || ""}
              onChange={(e) => updateField("seoTitleRu", e.target.value)}
            />
          </label>
          <label className="admin-label">
            SEO Title LV
            <input
              className="admin-input focus-ring"
              value={settings.seoTitleLv || ""}
              onChange={(e) => updateField("seoTitleLv", e.target.value)}
            />
          </label>
          <label className="admin-label">
            SEO Title EN
            <input
              className="admin-input focus-ring"
              value={settings.seoTitleEn || ""}
              onChange={(e) => updateField("seoTitleEn", e.target.value)}
            />
          </label>
          <label className="admin-label">
            SEO Description RU
            <textarea
              rows={3}
              className="admin-input focus-ring"
              value={settings.seoDescRu || ""}
              onChange={(e) => updateField("seoDescRu", e.target.value)}
            />
          </label>
          <label className="admin-label">
            SEO Description LV
            <textarea
              rows={3}
              className="admin-input focus-ring"
              value={settings.seoDescLv || ""}
              onChange={(e) => updateField("seoDescLv", e.target.value)}
            />
          </label>
          <label className="admin-label">
            SEO Description EN
            <textarea
              rows={3}
              className="admin-input focus-ring"
              value={settings.seoDescEn || ""}
              onChange={(e) => updateField("seoDescEn", e.target.value)}
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={handleSave} disabled={saving} className="btn-primary min-h-11">
              {saving ? "Сохранение..." : "Сохранить SEO"}
            </button>
          </div>
        </FormSection>

        <div>
          <h2 className="mb-3 text-center text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Бэкап
          </h2>
          <AdminDataTransferPanel />
        </div>
      </div>
    </div>
  );
}
