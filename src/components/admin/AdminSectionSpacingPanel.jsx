"use client";

import { useState } from "react";
import { toast } from "sonner";

import { FormSection } from "@/components/admin/ui/FormSection";
import { SectionCard } from "@/components/admin/ui/SectionCard";
import {
  DEFAULT_SECTION_GAP,
  SPACING_SECTION_KEYS,
  SPACING_SECTION_LABELS,
  parseSectionSpacing,
} from "@/lib/section-spacing";

function GapField({ label, value, onChange, helper }) {
  return (
    <label className="admin-label">
      {label}
      {helper ? <span className="admin-helper font-normal">{helper}</span> : null}
      <input
        type="number"
        min={0}
        max={400}
        step={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="admin-input focus-ring max-w-[140px]"
      />
    </label>
  );
}

export function AdminSectionSpacingPanel({ initialSpacing }) {
  const parsed = parseSectionSpacing(initialSpacing);
  const [defaultGap, setDefaultGap] = useState(String(parsed.defaultGap));
  const [overrides, setOverrides] = useState(
    () =>
      Object.fromEntries(
        SPACING_SECTION_KEYS.map((key) => [key, parsed.overrides[key] != null ? String(parsed.overrides[key]) : ""]),
      ),
  );
  const [saving, setSaving] = useState(false);

  function parseGapInput(value) {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const num = Number(trimmed);
    if (!Number.isFinite(num) || num < 0) return null;
    return Math.round(num);
  }

  async function handleSave() {
    const parsedDefault = parseGapInput(defaultGap);
    if (parsedDefault === null) {
      toast.error("Укажите корректное значение по умолчанию");
      return;
    }

    /** @type {Record<string, number>} */
    const parsedOverrides = {};
    for (const key of SPACING_SECTION_KEYS) {
      const gap = parseGapInput(overrides[key] ?? "");
      if (gap !== null) {
        parsedOverrides[key] = gap;
      }
    }

    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sectionSpacing: {
            defaultGap: parsedDefault,
            overrides: parsedOverrides,
          },
        }),
      });
      if (!res.ok) {
        toast.error("Ошибка сохранения");
        return;
      }
      toast.success("Расстояния сохранены");
    } catch {
      toast.error("Ошибка соединения");
    } finally {
      setSaving(false);
    }
  }

  return (
    <SectionCard
      elevated
      title="Расстояния между блоками"
      description="Каждое значение — отступ до следующего блока. Для «Специализация / бегущая» это расстояние до карточек статистики. Пустое поле — значение по умолчанию."
      footer={
        <button type="button" onClick={handleSave} disabled={saving} className="btn-primary min-h-11">
          {saving ? "Сохранение..." : "Сохранить"}
        </button>
      }
    >
      <div className="space-y-6">
        <FormSection title="По умолчанию" helper={`По умолчанию ${DEFAULT_SECTION_GAP}px между блоками.`}>
          <GapField
            label="Отступ (px)"
            value={defaultGap}
            onChange={setDefaultGap}
            helper="Применяется ко всем блокам, если не задано своё значение"
          />
        </FormSection>

        <FormSection
          title="Для каждого блока"
          helper="Отступ после этого блока до следующего. Пусто = по умолчанию."
        >          <div className="grid gap-4 sm:grid-cols-2">
            {SPACING_SECTION_KEYS.map((key) => (
              <GapField
                key={key}
                label={SPACING_SECTION_LABELS[key] || key}
                value={overrides[key] ?? ""}
                onChange={(v) => setOverrides((prev) => ({ ...prev, [key]: v }))}
              />
            ))}
          </div>
        </FormSection>
      </div>
    </SectionCard>
  );
}
