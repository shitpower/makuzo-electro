"use client";

import { MediaPickerField } from "@/components/admin/MediaPickerField";
import { FormSection } from "@/components/admin/ui/FormSection";

export const SECTION_LABELS = {
  hero: "Hero",
  design: "Дизайнерское сопровождение",
  services: "Услуги",
  projects: "Проекты",
  about: "О компании",
  careers: "Карьера",
  contacts: "Контакты",
  footer: "Футер",
};

export const SECTION_HELPERS = {
  hero: "Первый экран: заголовок, кнопки, фон.",
  design: "Короткий блок на главной + полный текст на /design.",
  services: "Список услуг с раскрывающимися пунктами.",
  projects: "Карточки проектов с фотографиями.",
  about: "Блок «О компании»: статистика, фото и три преимущества.",
  careers: "Вакансии и призыв присоединиться.",
  contacts: "Тёмный блок контактов и CTA.",
  footer: "Бренд, разделы, реквизиты компании.",
};

function Field({ label, value, onChange, multiline = false, helper }) {
  return (
    <label className="admin-label">
      {label}
      {helper ? <span className="admin-helper font-normal">{helper}</span> : null}
      {multiline ? (
        <textarea
          rows={3}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input focus-ring"
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input focus-ring"
        />
      )}
    </label>
  );
}

export function renderSectionFields(key, content, onChange) {
  switch (key) {
    case "hero":
      return (
        <div className="space-y-4">
          <FormSection title="Тексты">
            <Field label="Тег локации" value={content.locationTag} onChange={(v) => onChange({ locationTag: v })} />
            <Field label="Заголовок" value={content.title} onChange={(v) => onChange({ title: v })} multiline />
            <Field
              label="Выделение в заголовке"
              value={content.titleHighlight}
              onChange={(v) => onChange({ titleHighlight: v })}
            />
            <Field label="Подзаголовок" value={content.subtitle} onChange={(v) => onChange({ subtitle: v })} multiline />
          </FormSection>
          <FormSection title="Кнопки">
            <Field label="Текст кнопки" value={content.ctaText} onChange={(v) => onChange({ ctaText: v })} />
            <Field
              label="Текст второй кнопки"
              value={content.ctaSecondaryText}
              onChange={(v) => onChange({ ctaSecondaryText: v })}
            />
            <Field label="Ссылка CTA" value={content.ctaHref} onChange={(v) => onChange({ ctaHref: v })} />
          </FormSection>
          <FormSection title="Медиа" helper="Фоновое фото hero (поверх градиента)." tone="media">
            <MediaPickerField label="Фон" value={content.bgImageUrl} onChange={(v) => onChange({ bgImageUrl: v })} />
          </FormSection>
        </div>
      );

    case "design":
      return (
        <div className="space-y-4">
          <FormSection title="Главная (кратко)">
            <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
            <Field label="Заголовок на главной" value={content.title} onChange={(v) => onChange({ title: v })} />
            <Field label="Подзаголовок" value={content.subtitle} onChange={(v) => onChange({ subtitle: v })} />
            <Field label="Тизер" value={content.teaser} onChange={(v) => onChange({ teaser: v })} multiline />
            <Field label="Текст кнопки" value={content.ctaText} onChange={(v) => onChange({ ctaText: v })} />
            <Field label="Ссылка кнопки" value={content.ctaHref} onChange={(v) => onChange({ ctaHref: v })} />
            <MediaPickerField label="Фото" value={content.imageUrl} onChange={(v) => onChange({ imageUrl: v })} />
          </FormSection>
          <FormSection title="Страница /design (полный текст)">
            <Field
              label="Заголовок страницы"
              value={content.pageTitle}
              onChange={(v) => onChange({ pageTitle: v })}
            />
            <Field label="Вступление" value={content.intro} onChange={(v) => onChange({ intro: v })} multiline />
            <Field
              label="Абзацы (каждый с новой строки)"
              value={(content.paragraphs || []).join("\n\n")}
              onChange={(v) =>
                onChange({
                  paragraphs: v
                    .split(/\n\s*\n/)
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              multiline
            />
            <Field
              label="Заголовок преимуществ"
              value={content.advantagesTitle}
              onChange={(v) => onChange({ advantagesTitle: v })}
            />
            <Field
              label="Преимущества (по строке)"
              value={(content.advantages || []).join("\n")}
              onChange={(v) =>
                onChange({
                  advantages: v
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              multiline
            />
            <Field
              label="Заголовок культуры работ"
              value={content.cultureTitle}
              onChange={(v) => onChange({ cultureTitle: v })}
            />
            <Field
              label="Вступление культуры"
              value={content.cultureIntro}
              onChange={(v) => onChange({ cultureIntro: v })}
              multiline
            />
            <Field
              label="Пункты культуры (по строке)"
              value={(content.cultureItems || []).join("\n")}
              onChange={(v) =>
                onChange({
                  cultureItems: v
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              multiline
            />
            <Field label="Заключение" value={content.closing} onChange={(v) => onChange({ closing: v })} multiline />
          </FormSection>
        </div>
      );

    case "about":
      return (
        <div className="space-y-4">
          <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
          <Field label="Заголовок" value={content.title} onChange={(v) => onChange({ title: v })} />
          <Field label="Описание" value={content.description} onChange={(v) => onChange({ description: v })} multiline />
          <MediaPickerField
            label="Фото секции (между статистикой и преимуществами)"
            value={content.imageUrl}
            onChange={(v) => onChange({ imageUrl: v })}
          />
          {(content.stats || []).map((stat, i) => (
            <div key={i} className="space-y-2 rounded-lg border border-[var(--border-subtle)] p-4">
              <p className="text-xs font-bold text-[var(--accent)]">Стат {i + 1}</p>
              <Field
                label="Значение"
                value={stat.value}
                onChange={(v) => {
                  const stats = [...content.stats];
                  stats[i] = { ...stats[i], value: v };
                  onChange({ stats });
                }}
              />
              <Field
                label="Подпись"
                value={stat.label}
                onChange={(v) => {
                  const stats = [...content.stats];
                  stats[i] = { ...stats[i], label: v };
                  onChange({ stats });
                }}
              />
            </div>
          ))}
          {(content.features || []).map((feature, i) => (
            <div key={i} className="space-y-2 rounded-lg border border-[var(--border-subtle)] p-4">
              <p className="text-xs font-bold text-[var(--accent)]">Преимущество {i + 1}</p>
              <Field
                label="Заголовок"
                value={feature.title}
                onChange={(v) => {
                  const features = [...content.features];
                  features[i] = { ...features[i], title: v };
                  onChange({ features });
                }}
              />
              <Field
                label="Текст"
                value={feature.text}
                onChange={(v) => {
                  const features = [...content.features];
                  features[i] = { ...features[i], text: v };
                  onChange({ features });
                }}
                multiline
              />
            </div>
          ))}
        </div>
      );

    case "services":
      return (
        <>
          <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
          <Field label="Заголовок" value={content.title} onChange={(v) => onChange({ title: v })} />
          <Field
            label="Описание справа"
            value={content.description}
            onChange={(v) => onChange({ description: v })}
            multiline
          />
          {(content.items || []).map((item, i) => (
            <div key={i} className="space-y-3 rounded-lg border border-[var(--border-subtle)] p-4">
              <p className="text-xs font-bold text-[var(--accent)]">Услуга {item.num || i + 1}</p>
              <Field
                label="Номер"
                value={item.num}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], num: v };
                  onChange({ items });
                }}
              />
              <Field
                label="Название"
                value={item.title}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], title: v };
                  onChange({ items });
                }}
              />
              <Field
                label="Описание"
                value={item.description}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], description: v };
                  onChange({ items });
                }}
                multiline
              />
              <Field
                label="Пункты (по строке)"
                value={(item.bullets || []).join("\n")}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = {
                    ...items[i],
                    bullets: v
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  };
                  onChange({ items });
                }}
                multiline
              />
            </div>
          ))}
        </>
      );

    case "projects":
      return (
        <>
          <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
          <Field label="Заголовок" value={content.title} onChange={(v) => onChange({ title: v })} />
          <Field
            label="Описание справа"
            value={content.description}
            onChange={(v) => onChange({ description: v })}
            multiline
          />
          {(content.items || []).map((item, i) => (
            <div key={i} className="space-y-3 rounded-lg border border-[var(--border-subtle)] p-4">
              <p className="text-xs font-bold text-[var(--accent)]">Проект {i + 1}</p>
              <MediaPickerField
                label="Фото"
                value={item.imageUrl}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], imageUrl: v };
                  onChange({ items });
                }}
              />
              <Field
                label="Тег (на фото)"
                value={item.tag}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], tag: v };
                  onChange({ items });
                }}
              />
              <Field
                label="Название"
                value={item.title}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], title: v };
                  onChange({ items });
                }}
              />
              <Field
                label="Место · год"
                value={item.meta}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], meta: v };
                  onChange({ items });
                }}
              />
              <Field
                label="Описание"
                value={item.description}
                onChange={(v) => {
                  const items = [...content.items];
                  items[i] = { ...items[i], description: v };
                  onChange({ items });
                }}
                multiline
              />
            </div>
          ))}
        </>
      );

    case "careers":
      return (
        <>
          <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
          <Field label="Заголовок" value={content.title} onChange={(v) => onChange({ title: v })} />
          <Field label="Описание" value={content.description} onChange={(v) => onChange({ description: v })} multiline />
          <Field label="Текст кнопки" value={content.buttonText} onChange={(v) => onChange({ buttonText: v })} />
          <Field label="Ссылка кнопки" value={content.buttonHref} onChange={(v) => onChange({ buttonHref: v })} />
          {(content.roles || []).map((role, i) => (
            <div key={i} className="space-y-2 rounded-lg border border-[var(--border-subtle)] p-4">
              <p className="text-xs font-bold text-[var(--accent)]">Вакансия {i + 1}</p>
              <Field
                label="Должность"
                value={role.title}
                onChange={(v) => {
                  const roles = [...content.roles];
                  roles[i] = { ...roles[i], title: v };
                  onChange({ roles });
                }}
              />
              <Field
                label="Мета"
                value={role.meta}
                onChange={(v) => {
                  const roles = [...content.roles];
                  roles[i] = { ...roles[i], meta: v };
                  onChange({ roles });
                }}
              />
            </div>
          ))}
        </>
      );

    case "contacts":
      return (
        <>
          <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
          <Field label="Заголовок" value={content.title} onChange={(v) => onChange({ title: v })} />
          <Field label="Описание" value={content.description} onChange={(v) => onChange({ description: v })} multiline />
          <Field label="Кнопка «Написать»" value={content.primaryCta} onChange={(v) => onChange({ primaryCta: v })} />
          <Field label="Кнопка «Позвонить»" value={content.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} />
          <Field label="Адрес" value={content.address} onChange={(v) => onChange({ address: v })} />
          <Field
            label="Телефоны (через запятую)"
            value={(content.phones || []).join(", ")}
            onChange={(v) => onChange({ phones: v.split(",").map((p) => p.trim()).filter(Boolean) })}
          />
          <Field label="Email" value={content.email} onChange={(v) => onChange({ email: v })} />
          <Field label="Часы работы" value={content.hoursWeekday} onChange={(v) => onChange({ hoursWeekday: v })} />
        </>
      );

    case "footer":
      return (
        <>
          <Field label="Текст о бренде" value={content.brandText} onChange={(v) => onChange({ brandText: v })} multiline />
          <Field label="Заголовок разделов" value={content.navTitle} onChange={(v) => onChange({ navTitle: v })} />
          <Field label="Заголовок компании" value={content.companyTitle} onChange={(v) => onChange({ companyTitle: v })} />
          <Field
            label="Строки компании (каждая с новой строки)"
            value={(content.companyLines || []).join("\n")}
            onChange={(v) => onChange({ companyLines: v.split("\n").map((s) => s.trim()).filter(Boolean) })}
            multiline
          />
          <Field
            label="Копирайт (после © год MAKUZO.)"
            value={content.copyrightLocation}
            onChange={(v) => onChange({ copyrightLocation: v })}
          />
          {(content.navLinks || []).map((link, i) => (
            <div key={i} className="space-y-2 rounded-lg border border-[var(--border-subtle)] p-4">
              <p className="text-xs font-bold text-[var(--accent)]">Ссылка {i + 1}</p>
              <Field
                label="Текст"
                value={link.label}
                onChange={(v) => {
                  const navLinks = [...content.navLinks];
                  navLinks[i] = { ...navLinks[i], label: v };
                  onChange({ navLinks });
                }}
              />
              <Field
                label="Href"
                value={link.href}
                onChange={(v) => {
                  const navLinks = [...content.navLinks];
                  navLinks[i] = { ...navLinks[i], href: v };
                  onChange({ navLinks });
                }}
              />
            </div>
          ))}
        </>
      );

    default:
      return <p className="text-sm text-[var(--text-secondary)]">Нет полей для этой секции</p>;
  }
}
