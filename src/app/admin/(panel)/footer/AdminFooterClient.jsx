"use client";

import { useState } from "react";
import { FiExternalLink, FiPlus, FiTrash2 } from "react-icons/fi";
import clsx from "clsx";
import { toast } from "sonner";

import { FormSection } from "@/components/admin/ui/FormSection";
import { PageHeader } from "@/components/admin/ui/PageHeader";
import { SectionCard } from "@/components/admin/ui/SectionCard";
import { StatusPill } from "@/components/admin/ui/StatusPill";
import { useAdminStore } from "@/stores/admin-store";

const LOCALES = ["ru", "lv", "en"];

function Field({ label, value, onChange, multiline = false, helper, placeholder }) {
  return (
    <label className="admin-label">
      <span>{label}</span>
      {multiline ? (
        <textarea
          className="admin-input min-h-[88px]"
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className="admin-input"
          value={value ?? ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {helper ? <span className="admin-helper">{helper}</span> : null}
    </label>
  );
}

export function AdminFooterClient({ section }) {
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

  function update(field, value) {
    setContent((prev) => ({ ...prev, [field]: value }));
  }

  function updateNavLink(index, patch) {
    const navLinks = [...(content.navLinks || [])];
    navLinks[index] = { ...navLinks[index], ...patch };
    update("navLinks", navLinks);
  }

  function addNavLink() {
    update("navLinks", [...(content.navLinks || []), { label: "", href: "#" }]);
  }

  function removeNavLink(index) {
    update(
      "navLinks",
      (content.navLinks || []).filter((_, i) => i !== index),
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/sections/footer`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visible,
          contentRu,
          contentLv,
          contentEn,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Ошибка сохранения");
        return;
      }
      toast.success("Футер сохранён");
    } catch {
      toast.error("Ошибка соединения");
    } finally {
      setSaving(false);
    }
  }

  const navLinks = content.navLinks || [];

  return (
    <div className="space-y-5 p-4 lg:p-6">
      <PageHeader
        title="Футер"
        subtitle="Тексты и меню подвала. Юр. реквизиты и Instagram — во вкладке «Компания»."
        actions={
          <a href="/admin/company" className="admin-btn focus-ring text-xs">
            → Компания / реквизиты
          </a>
        }
      />

      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 px-4 py-3 text-sm text-[var(--text-secondary)]">
        <p className="font-medium text-[var(--text-primary)]">Что где настраивается</p>
        <ul className="mt-2 grid gap-1.5 text-xs sm:grid-cols-2">
          <li>
            <span className="text-[var(--text-muted)]">Эта вкладка:</span> бренд, меню, копирайт, политика
          </li>
          <li>
            <span className="text-[var(--text-muted)]">Компания:</span> SIA, рег. №, адрес, Instagram, видимость блока
          </li>
        </ul>
      </div>

      <SectionCard
        elevated
        title="Содержимое футера"
        description={`Язык: ${activeLocale.toUpperCase()}. Переключите локаль, чтобы править тексты отдельно.`}
        badge={<StatusPill tone={visible ? "accent" : "neutral"}>{visible ? "На сайте" : "Скрыт"}</StatusPill>}
        headerActions={
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex min-h-11 items-center gap-2 rounded-lg border border-[var(--border-subtle)] px-3 text-xs text-[var(--text-secondary)]">
              <input
                type="checkbox"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
                aria-label="Видимость футера"
              />
              Показывать футер
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
              Превью сайта
            </a>
            <button type="button" onClick={handleSave} disabled={saving} className="btn-primary min-h-11">
              {saving ? "Сохранение..." : "Сохранить"}
            </button>
          </>
        }
      >
        <div className="space-y-5">
          <FormSection
            title="1. Бренд"
            helper="Текст под логотипом слева в футере."
          >
            <Field
              label="Описание компании"
              value={content.brandText}
              onChange={(v) => update("brandText", v)}
              multiline
              placeholder="Кратко, чем занимается компания…"
            />
          </FormSection>

          <FormSection
            title="2. Меню «Разделы»"
            helper="Колонка со ссылками по сайту."
            actions={
              <button
                type="button"
                onClick={addNavLink}
                className="admin-btn-ghost focus-ring inline-flex min-h-9 items-center gap-1.5 text-xs"
              >
                <FiPlus size={14} />
                Ссылка
              </button>
            }
          >
            <Field
              label="Заголовок колонки"
              value={content.navTitle}
              onChange={(v) => update("navTitle", v)}
              placeholder="РАЗДЕЛЫ"
            />
            <div className="space-y-3">
              {navLinks.length === 0 ? (
                <p className="text-xs text-[var(--text-muted)]">Ссылок пока нет — добавьте первую.</p>
              ) : (
                navLinks.map((link, i) => (
                  <div
                    key={i}
                    className="grid gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 sm:grid-cols-[1fr_1fr_auto]"
                  >
                    <Field
                      label={`Текст ${i + 1}`}
                      value={link.label}
                      onChange={(v) => updateNavLink(i, { label: v })}
                      placeholder="Услуги"
                    />
                    <Field
                      label="Ссылка (href)"
                      value={link.href}
                      onChange={(v) => updateNavLink(i, { href: v })}
                      placeholder="#services"
                    />
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeNavLink(i)}
                        className="admin-btn-ghost focus-ring inline-flex min-h-11 min-w-11 items-center justify-center text-[var(--text-muted)] hover:text-red-500"
                        aria-label={`Удалить ссылку ${i + 1}`}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </FormSection>

          <FormSection
            title="3. Колонка «Компания»"
            helper="Заголовок колонки. Сами строки (SIA, рег. №) берутся из вкладки «Компания». Показ/скрытие блока — тоже там."
          >
            <Field
              label="Заголовок колонки"
              value={content.companyTitle}
              onChange={(v) => update("companyTitle", v)}
              placeholder="КОМПАНИЯ"
              helper="Видно только если в «Компания» включена видимость блока."
            />
            <a
              href="/admin/company"
              className="inline-flex text-xs text-[var(--accent)] underline underline-offset-2"
            >
              Открыть реквизиты и видимость блока →
            </a>
          </FormSection>

          <FormSection
            title="4. Низ футера"
            helper="Строка © и ссылка на политику конфиденциальности."
            tone="seo"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Текст после © год"
                value={content.copyrightLocation}
                onChange={(v) => update("copyrightLocation", v)}
                placeholder="Все права защищены."
              />
              <Field
                label="Текст ссылки на политику"
                value={content.privacyLabel}
                onChange={(v) => update("privacyLabel", v)}
                placeholder="Политика конфиденциальности"
              />
              <Field
                label="URL политики"
                value={content.privacyHref}
                onChange={(v) => update("privacyHref", v)}
                placeholder="/privacy"
                helper="Обычно /privacy"
              />
            </div>
          </FormSection>
        </div>
      </SectionCard>
    </div>
  );
}
