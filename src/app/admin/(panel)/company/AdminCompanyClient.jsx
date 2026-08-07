"use client";

import { useState } from "react";
import { toast } from "sonner";

import { FormSection } from "@/components/admin/ui/FormSection";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SectionCard } from "@/components/admin/ui/SectionCard";
import { normalizeCompanyProfile } from "@/lib/company-profile";

function Field({ label, value, onChange, type = "text", helper }) {
  return (
    <label className="admin-label">
      <span>{label}</span>
      <input
        type={type}
        className="admin-input"
        value={value ?? ""}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
      />
      {helper ? <span className="admin-helper">{helper}</span> : null}
    </label>
  );
}

export function AdminCompanyClient({ initialCompany }) {
  const [company, setCompany] = useState(() => normalizeCompanyProfile(initialCompany));
  const [saving, setSaving] = useState(false);

  function update(field, value) {
    setCompany((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyProfile: company }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Ошибка сохранения");
        return;
      }
      const data = await res.json();
      if (data.settings?.companyProfile) {
        setCompany(normalizeCompanyProfile(data.settings.companyProfile));
      }
      toast.success("Реквизиты сохранены");
    } catch {
      toast.error("Ошибка соединения");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5 p-4 lg:p-6">
      <PageHeader
        title="Компания"
        subtitle="Глобальные реквизиты: используются в футере, политике конфиденциальности, SEO JSON-LD и контактах."
      />

      <SectionCard
        elevated
        title="Юридические данные"
        description="Один источник правды — правки здесь подтягиваются на весь сайт."
        footer={
          <button type="button" onClick={handleSave} disabled={saving} className="btn-primary min-h-11">
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
        }
      >
        <div className="space-y-6">
          <FormSection title="Реквизиты">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Юридическое название" value={company.legalName} onChange={(v) => update("legalName", v)} />
              <Field label="Рег. номер" value={company.regNumber} onChange={(v) => update("regNumber", v)} />
              <Field
                label="Būvkomersants Nr."
                value={company.builderRegNumber}
                onChange={(v) => update("builderRegNumber", v)}
              />
              <Field label="Email" value={company.email} onChange={(v) => update("email", v)} type="email" />
              <Field label="Телефон" value={company.phone} onChange={(v) => update("phone", v)} />
            </div>
          </FormSection>

          <FormSection title="Адрес">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Улица / дом"
                value={company.streetAddress}
                onChange={(v) => update("streetAddress", v)}
              />
              <Field label="Индекс" value={company.postalCode} onChange={(v) => update("postalCode", v)} />
              <Field label="Город (RU)" value={company.cityRu} onChange={(v) => update("cityRu", v)} />
              <Field label="Город (LV)" value={company.cityLv} onChange={(v) => update("cityLv", v)} />
              <Field label="Город (EN)" value={company.cityEn} onChange={(v) => update("cityEn", v)} />
              <Field label="Страна (код)" value={company.country} onChange={(v) => update("country", v)} />
              <Field
                label="Страна (RU)"
                value={company.countryNameRu}
                onChange={(v) => update("countryNameRu", v)}
              />
              <Field
                label="Страна (LV)"
                value={company.countryNameLv}
                onChange={(v) => update("countryNameLv", v)}
              />
              <Field
                label="Страна (EN)"
                value={company.countryNameEn}
                onChange={(v) => update("countryNameEn", v)}
              />
              <Field
                label="Широта"
                value={company.latitude}
                onChange={(v) => update("latitude", v)}
                type="number"
              />
              <Field
                label="Долгота"
                value={company.longitude}
                onChange={(v) => update("longitude", v)}
                type="number"
              />
            </div>
          </FormSection>

          <FormSection title="Видимость на сайте">
            <label className="flex min-h-11 items-center gap-3 text-sm text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={company.footerCompanyVisible}
                onChange={(e) => update("footerCompanyVisible", e.target.checked)}
              />
              Показывать блок «Компания» в футере (название, рег. №, Būvkomersants)
            </label>
          </FormSection>

          <FormSection title="Instagram">
            <label className="flex min-h-11 items-center gap-3 text-sm text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={company.instagramVisible}
                onChange={(e) => update("instagramVisible", e.target.checked)}
              />
              Показывать ссылку Instagram в футере
            </label>
            <Field
              label="URL Instagram"
              value={company.instagramUrl}
              onChange={(v) => update("instagramUrl", v)}
              helper="Ссылка появится в футере только если включена видимость и URL заполнен."
            />
          </FormSection>
        </div>
      </SectionCard>
    </div>
  );
}
