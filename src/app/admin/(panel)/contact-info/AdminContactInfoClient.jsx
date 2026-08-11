"use client";

import { useState } from "react";
import { FiExternalLink, FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import clsx from "clsx";
import { toast } from "sonner";

import { FormSection } from "@/components/admin/ui/FormSection";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SectionCard } from "@/components/admin/ui/SectionCard";
import { StatusPill } from "@/components/admin/ui/StatusPill";
import {
  DEFAULT_DETAIL_VISIBILITY,
  normalizeDetailVisibility,
} from "@/lib/contact-details";
import { useAdminStore } from "@/stores/admin-store";

const LOCALES = ["ru", "lv", "en"];

function Field({ label, value, onChange, helper, placeholder }) {
  return (
    <label className="admin-label">
      <span>{label}</span>
      <input
        className="admin-input"
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {helper ? <span className="admin-helper">{helper}</span> : null}
    </label>
  );
}

function VisibilityRow({ icon: Icon, title, checked, onChange, children }) {
  return (
    <div
      className={clsx(
        "rounded-xl border p-4 transition",
        checked
          ? "border-[var(--accent)]/40 bg-[var(--accent)]/[0.04]"
          : "border-[var(--border-subtle)] opacity-80",
      )}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-[var(--bg-elevated)] text-[var(--accent)]">
            <Icon size={16} aria-hidden />
          </span>
          <p className="text-sm font-bold text-[var(--text-primary)]">{title}</p>
        </div>
        <label className="flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border-subtle)] px-3 text-xs text-[var(--text-secondary)]">
          <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
          На сайте
        </label>
      </div>
      <div className={clsx("space-y-3", !checked && "pointer-events-none opacity-50")}>{children}</div>
    </div>
  );
}

function withSharedVisibility(content, detailsVisible, detailVisibility) {
  return {
    ...content,
    detailsVisible,
    detailVisibility: normalizeDetailVisibility(detailVisibility),
  };
}

export function AdminContactInfoClient({ section, company }) {
  const { activeLocale, setActiveLocale } = useAdminStore();
  const [contentRu, setContentRu] = useState(section.contentRu || {});
  const [contentLv, setContentLv] = useState(section.contentLv || {});
  const [contentEn, setContentEn] = useState(section.contentEn || {});
  const [saving, setSaving] = useState(false);

  const content =
    activeLocale === "lv" ? contentLv : activeLocale === "en" ? contentEn : contentRu;
  const setContent =
    activeLocale === "lv" ? setContentLv : activeLocale === "en" ? setContentEn : setContentRu;

  const detailsVisible = Boolean(content.detailsVisible);
  const visibility = normalizeDetailVisibility(content.detailVisibility || DEFAULT_DETAIL_VISIBILITY);
  const labels = content.detailLabels || {};

  function setDetailsVisible(value) {
    setContentRu((prev) => ({ ...prev, detailsVisible: value }));
    setContentLv((prev) => ({ ...prev, detailsVisible: value }));
    setContentEn((prev) => ({ ...prev, detailsVisible: value }));
  }

  function setVisibility(key, value) {
    const next = { ...visibility, [key]: value };
    setContentRu((prev) => ({ ...prev, detailVisibility: next }));
    setContentLv((prev) => ({ ...prev, detailVisibility: next }));
    setContentEn((prev) => ({ ...prev, detailVisibility: next }));
  }

  function updateField(field, value) {
    setContent((prev) => ({ ...prev, [field]: value }));
  }

  function updateLabel(key, value) {
    setContent((prev) => ({
      ...prev,
      detailLabels: { ...(prev.detailLabels || {}), [key]: value },
    }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const sharedVis = normalizeDetailVisibility(
        contentRu.detailVisibility || content.detailVisibility,
      );
      const sharedBlock = Boolean(
        contentRu.detailsVisible ?? contentLv.detailsVisible ?? contentEn.detailsVisible,
      );

      const res = await fetch(`/api/sections/contacts`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentRu: withSharedVisibility(contentRu, sharedBlock, sharedVis),
          contentLv: withSharedVisibility(contentLv, sharedBlock, sharedVis),
          contentEn: withSharedVisibility(contentEn, sharedBlock, sharedVis),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Ошибка сохранения");
        return;
      }
      toast.success("Контактные данные сохранены");
    } catch {
      toast.error("Ошибка соединения");
    } finally {
      setSaving(false);
    }
  }

  const phonePreview = (content.phones || [])[0] || company?.phone || "";
  const emailPreview = content.email || company?.email || "";
  const addressPreview = content.address || "";
  const anyItemOn = visibility.phone || visibility.email || visibility.address || visibility.hours;

  return (
    <div className="space-y-5 p-4 lg:p-6">
      <PageHeader
        title="Контактные данные"
        subtitle="Телефон, email, адрес и график в секции «Контакты». Включайте пункты по одному — пустые поля подтянут данные из «Компания»."
        actions={
          <a href="/admin/company" className="admin-btn focus-ring text-xs">
            → Реквизиты компании
          </a>
        }
      />

      <SectionCard
        elevated
        title="Список на сайте"
        description="Так выглядит колонка рядом с формой заявки. Пустые override подтягивают данные из «Компания»."
        badge={
          <StatusPill tone={detailsVisible && anyItemOn ? "accent" : "neutral"}>
            {detailsVisible && anyItemOn ? "Есть видимые пункты" : "Скрыто"}
          </StatusPill>
        }
        headerActions={
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border-subtle)] px-3 text-xs text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={detailsVisible}
                onChange={(e) => setDetailsVisible(e.target.checked)}
              />
              Показать весь список
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
              href={`/${activeLocale}#contacts`}
              target="_blank"
              rel="noreferrer"
              className="admin-btn-ghost focus-ring inline-flex min-h-11 items-center gap-2 text-xs"
            >
              <FiExternalLink size={14} />
              Превью #contacts
            </a>
            <button type="button" onClick={handleSave} disabled={saving} className="btn-primary min-h-11">
              {saving ? "Сохранение..." : "Сохранить"}
            </button>
          </>
        }
      >
        <div className="space-y-5">
          <FormSection
            title="Видимость списка"
            helper="Главный выключатель колонки. Даже при включённых пунктах список скрыт, если выключатель выкл."
          >
            <label className="flex min-h-11 items-center gap-3 text-sm text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={detailsVisible}
                onChange={(e) => setDetailsVisible(e.target.checked)}
              />
              Показывать колонку «телефон / email / адрес / часы»
            </label>
          </FormSection>

          <div className="grid gap-4 lg:grid-cols-2">
            <VisibilityRow
              icon={FiPhone}
              title="Телефон"
              checked={visibility.phone}
              onChange={(v) => setVisibility("phone", v)}
            >
              <Field
                label="Лейбл"
                value={labels.phone}
                onChange={(v) => updateLabel("phone", v)}
                placeholder="ТЕЛЕФОН"
              />
              <Field
                label="Номер (override)"
                value={(content.phones || []).join(", ")}
                onChange={(v) =>
                  updateField(
                    "phones",
                    v
                      .split(",")
                      .map((p) => p.trim())
                      .filter(Boolean),
                  )
                }
                helper={`Сейчас на сайте: ${phonePreview || "—"} (из Компании, если пусто)`}
                placeholder={company?.phone || "+371 …"}
              />
            </VisibilityRow>

            <VisibilityRow
              icon={FiMail}
              title="Email"
              checked={visibility.email}
              onChange={(v) => setVisibility("email", v)}
            >
              <Field
                label="Лейбл"
                value={labels.email}
                onChange={(v) => updateLabel("email", v)}
                placeholder="EMAIL"
              />
              <Field
                label="Email (override)"
                value={content.email || ""}
                onChange={(v) => updateField("email", v)}
                helper={`Сейчас на сайте: ${emailPreview || "—"}`}
                placeholder={company?.email || "info@…"}
              />
            </VisibilityRow>

            <VisibilityRow
              icon={FiMapPin}
              title="Адрес"
              checked={visibility.address}
              onChange={(v) => setVisibility("address", v)}
            >
              <Field
                label="Лейбл"
                value={labels.address}
                onChange={(v) => updateLabel("address", v)}
                placeholder="АДРЕС"
              />
              <Field
                label="Адрес (override)"
                value={content.address || ""}
                onChange={(v) => updateField("address", v)}
                helper={
                  addressPreview
                    ? `Сейчас: ${addressPreview}`
                    : "Если пусто — берётся из вкладки «Компания»"
                }
                placeholder="Kaibalas iela 25, Rīga"
              />
            </VisibilityRow>

            <VisibilityRow
              icon={FiClock}
              title="Часы работы"
              checked={visibility.hours}
              onChange={(v) => setVisibility("hours", v)}
            >
              <Field
                label="Лейбл"
                value={labels.hours}
                onChange={(v) => updateLabel("hours", v)}
                placeholder="ЧАСЫ"
              />
              <Field
                label="Часы"
                value={content.hoursWeekday || ""}
                onChange={(v) => updateField("hoursWeekday", v)}
                placeholder="Пн.–Пт. 8:00–17:00"
              />
            </VisibilityRow>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
