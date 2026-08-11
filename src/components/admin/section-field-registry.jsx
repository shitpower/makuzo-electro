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
  smartHome: "Умный дом",
  footer: "Футер",
};

export const SECTION_HELPERS = {
  hero: "Первый экран: заголовок, кнопки, фон.",
  design: "Короткий блок на главной + полный текст на /design.",
  services: "Список услуг с пунктами. Каждую услугу можно скрыть тумблером «На сайте».",
  projects: "Карточки проектов с фотографиями.",
  about: "Блок «О компании»: статистика, фото и три преимущества.",
  careers: "Вакансии и призыв присоединиться.",
  contacts: "Заголовок и CTA секции. Список телефон/email/адрес/часы — вкладка «Контакты».",
  smartHome: "Страница /smart-home: питание + Wi‑Fi, категории и сценарии. CTA → контакты.",
  footer: "Бренд, навигация и копирайт. Реквизиты и Instagram — во вкладке «Компания».",
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
              label="Лейбл (eyebrow)"
              value={content.pageTitle}
              onChange={(v) => onChange({ pageTitle: v })}
            />
            <Field label="Заголовок H1" value={content.headline} onChange={(v) => onChange({ headline: v })} />
            <Field label="Вступление" value={content.intro} onChange={(v) => onChange({ intro: v })} multiline />
            <MediaPickerField
              label="Hero-фото (справа от H1)"
              value={content.heroImageUrl}
              onChange={(v) => onChange({ heroImageUrl: v })}
            />
            <Field
              label="Блок шаблонов — лейбл"
              value={content.featureEyebrow}
              onChange={(v) => onChange({ featureEyebrow: v })}
            />
            <Field
              label="Блок шаблонов — заголовок"
              value={content.featureTitle}
              onChange={(v) => onChange({ featureTitle: v })}
            />
            <Field
              label="Блок шаблонов — текст"
              value={content.featureText}
              onChange={(v) => onChange({ featureText: v })}
              multiline
            />
            <Field
              label="Абзацы под блоком (через пустую строку)"
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
              label="Фраза про дизайнера"
              value={content.designerNote}
              onChange={(v) => onChange({ designerNote: v })}
              multiline
            />
            <MediaPickerField
              label="Фото блока шаблонов"
              value={content.featureImageUrl}
              onChange={(v) => onChange({ featureImageUrl: v })}
            />
            <Field
              label="Лейбл процесса"
              value={content.processLabel}
              onChange={(v) => onChange({ processLabel: v })}
            />
            <Field
              label="Шаги процесса (по строке)"
              value={(content.processSteps || []).join("\n")}
              onChange={(v) =>
                onChange({
                  processSteps: v
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              multiline
            />
            <Field
              label="Галерея (URL по строке)"
              value={(content.gallery || []).join("\n")}
              onChange={(v) =>
                onChange({
                  gallery: v
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              multiline
              helper="Например /img/design-template-mount.jpg"
            />
            <Field
              label="Сколько фото в превью на /design"
              value={String(content.galleryPreviewCount ?? 3)}
              onChange={(v) => onChange({ galleryPreviewCount: Math.max(1, Number(v) || 3) })}
            />
            <Field label="Лейбл галереи" value={content.galleryLabel} onChange={(v) => onChange({ galleryLabel: v })} />
            <Field label="Заголовок превью галереи" value={content.galleryTitle} onChange={(v) => onChange({ galleryTitle: v })} />
            <Field label="Кнопка «Вся галерея»" value={content.galleryCta} onChange={(v) => onChange({ galleryCta: v })} />
            <Field
              label="Заголовок страницы /design/gallery"
              value={content.galleryPageTitle}
              onChange={(v) => onChange({ galleryPageTitle: v })}
            />
            <Field
              label="Вступление страницы галереи"
              value={content.galleryPageIntro}
              onChange={(v) => onChange({ galleryPageIntro: v })}
              multiline
            />
            <Field
              label="Заголовок преимуществ"
              value={content.advantagesTitle}
              onChange={(v) => onChange({ advantagesTitle: v })}
            />
            <Field
              label="Карточки преимуществ (Заголовок | текст, по строке)"
              value={(content.advantageCards || []).map((c) => `${c.title || ""} | ${c.text || ""}`).join("\n")}
              onChange={(v) =>
                onChange({
                  advantageCards: v
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((line) => {
                      const [title, ...rest] = line.split("|");
                      return { title: (title || "").trim(), text: rest.join("|").trim() };
                    }),
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
            <Field label="Заключение" value={content.closing} onChange={(v) => onChange({ closing: v })} multiline />
            <Field label="Текст кнопки «Узнать подробнее»" value={content.detailCta} onChange={(v) => onChange({ detailCta: v })} />
          </FormSection>
          <FormSection title="Окно «Узнать подробнее»">
            <Field
              label="Заголовок"
              value={content.detail?.title}
              onChange={(v) => onChange({ detail: { ...(content.detail || {}), title: v } })}
            />
            <Field
              label="Подзаголовок"
              value={content.detail?.subtitle}
              onChange={(v) => onChange({ detail: { ...(content.detail || {}), subtitle: v } })}
            />
            <Field
              label="Вступление"
              value={content.detail?.intro}
              onChange={(v) => onChange({ detail: { ...(content.detail || {}), intro: v } })}
              multiline
            />
            <Field
              label="Заголовок блока"
              value={content.detail?.sectionTitle}
              onChange={(v) => onChange({ detail: { ...(content.detail || {}), sectionTitle: v } })}
            />
            <Field
              label="Абзацы (через пустую строку)"
              value={(content.detail?.paragraphs || []).join("\n\n")}
              onChange={(v) =>
                onChange({
                  detail: {
                    ...(content.detail || {}),
                    paragraphs: v
                      .split(/\n\s*\n/)
                      .map((s) => s.trim())
                      .filter(Boolean),
                  },
                })
              }
              multiline
            />
            <Field
              label="Лейбл процесса"
              value={content.detail?.processLabel}
              onChange={(v) => onChange({ detail: { ...(content.detail || {}), processLabel: v } })}
            />
            <Field
              label="Шаги процесса (по строке)"
              value={(content.detail?.processSteps || []).join("\n")}
              onChange={(v) =>
                onChange({
                  detail: {
                    ...(content.detail || {}),
                    processSteps: v
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  },
                })
              }
              multiline
            />
            <Field
              label="Примечание процесса"
              value={content.detail?.processNote}
              onChange={(v) => onChange({ detail: { ...(content.detail || {}), processNote: v } })}
              multiline
            />
            <Field
              label="Заголовок «Что это даёт»"
              value={content.detail?.advantagesTitle}
              onChange={(v) => onChange({ detail: { ...(content.detail || {}), advantagesTitle: v } })}
            />
            <Field
              label="Пункты «Что это даёт» (по строке)"
              value={(content.detail?.advantages || []).join("\n")}
              onChange={(v) =>
                onChange({
                  detail: {
                    ...(content.detail || {}),
                    advantages: v
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  },
                })
              }
              multiline
            />
            <Field
              label="Заголовок «Работаем аккуратно»"
              value={content.detail?.cultureTitle}
              onChange={(v) => onChange({ detail: { ...(content.detail || {}), cultureTitle: v } })}
            />
            <Field
              label="Текст «Работаем аккуратно»"
              value={content.detail?.cultureIntro}
              onChange={(v) => onChange({ detail: { ...(content.detail || {}), cultureIntro: v } })}
              multiline
            />
            <Field
              label="Заключение в окне"
              value={content.detail?.closing}
              onChange={(v) => onChange({ detail: { ...(content.detail || {}), closing: v } })}
              multiline
            />
          </FormSection>
        </div>
      );

    case "about":
      return (
        <div className="space-y-4">
          <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
          <Field label="Заголовок" value={content.title} onChange={(v) => onChange({ title: v })} />
          <Field label="Описание" value={content.description} onChange={(v) => onChange({ description: v })} multiline />
          <label className="flex min-h-11 items-center gap-3 text-sm text-[var(--text-secondary)]">
            <input
              type="checkbox"
              checked={Boolean(content.statsVisible)}
              onChange={(e) => onChange({ statsVisible: e.target.checked })}
            />
            Показывать блок статистики (15+, 500+, …)
          </label>
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
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs font-bold text-[var(--accent)]">Услуга {item.num || i + 1}</p>
                <label className="flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border-subtle)] px-3 text-xs text-[var(--text-secondary)]">
                  <input
                    type="checkbox"
                    checked={item.visible !== false}
                    onChange={(e) => {
                      const items = [...content.items];
                      items[i] = { ...items[i], visible: e.target.checked };
                      onChange({ items });
                    }}
                  />
                  На сайте
                </label>
              </div>
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

    case "smartHome":
      return (
        <div className="space-y-4">
          <FormSection title="Hero">
            <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
            <Field label="Заголовок (короткий)" value={content.title} onChange={(v) => onChange({ title: v })} />
            <Field
              label="Заголовок страницы"
              value={content.pageTitle}
              onChange={(v) => onChange({ pageTitle: v })}
            />
            <Field label="Lead (акцент)" value={content.lead} onChange={(v) => onChange({ lead: v })} />
            <Field label="Подзаголовок" value={content.subtitle} onChange={(v) => onChange({ subtitle: v })} multiline />
            <Field label="Pill «Питание»" value={content.pillPower} onChange={(v) => onChange({ pillPower: v })} />
            <Field label="Текст CTA" value={content.ctaText} onChange={(v) => onChange({ ctaText: v })} />
            <MediaPickerField label="Фото" value={content.imageUrl} onChange={(v) => onChange({ imageUrl: v })} />
          </FormSection>
          <FormSection title="Как это работает">
            <Field label="Лейбл" value={content.stepsLabel} onChange={(v) => onChange({ stepsLabel: v })} />
            <Field label="Заголовок" value={content.stepsTitle} onChange={(v) => onChange({ stepsTitle: v })} />
            {(content.steps || []).map((step, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-[var(--border-subtle)] p-4">
                <p className="text-xs font-bold text-[var(--accent)]">Шаг {i + 1}</p>
                <Field
                  label="Заголовок"
                  value={step.title}
                  onChange={(v) => {
                    const steps = [...content.steps];
                    steps[i] = { ...steps[i], title: v };
                    onChange({ steps });
                  }}
                />
                <Field
                  label="Текст"
                  value={step.text}
                  onChange={(v) => {
                    const steps = [...content.steps];
                    steps[i] = { ...steps[i], text: v };
                    onChange({ steps });
                  }}
                  multiline
                />
              </div>
            ))}
          </FormSection>
          <FormSection title="Категории">
            <Field
              label="Лейбл"
              value={content.categoriesLabel}
              onChange={(v) => onChange({ categoriesLabel: v })}
            />
            <Field
              label="Заголовок"
              value={content.categoriesTitle}
              onChange={(v) => onChange({ categoriesTitle: v })}
            />
            <Field
              label="Вступление"
              value={content.categoriesIntro}
              onChange={(v) => onChange({ categoriesIntro: v })}
              multiline
            />
            {(content.categories || []).map((cat, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-[var(--border-subtle)] p-4">
                <p className="text-xs font-bold text-[var(--accent)]">Категория {i + 1}</p>
                <MediaPickerField
                  label="Фото"
                  value={cat.imageUrl}
                  onChange={(v) => {
                    const categories = [...content.categories];
                    categories[i] = { ...categories[i], imageUrl: v };
                    onChange({ categories });
                  }}
                />
                <Field
                  label="Заголовок"
                  value={cat.title}
                  onChange={(v) => {
                    const categories = [...content.categories];
                    categories[i] = { ...categories[i], title: v };
                    onChange({ categories });
                  }}
                />
                <Field
                  label="Текст"
                  value={cat.text}
                  onChange={(v) => {
                    const categories = [...content.categories];
                    categories[i] = { ...categories[i], text: v };
                    onChange({ categories });
                  }}
                  multiline
                />
              </div>
            ))}
          </FormSection>
          <FormSection title="Где работает">
            <Field label="Лейбл" value={content.roomsLabel} onChange={(v) => onChange({ roomsLabel: v })} />
            <Field label="Заголовок" value={content.roomsTitle} onChange={(v) => onChange({ roomsTitle: v })} />
            {(content.rooms || []).map((room, i) => (
              <div key={i} className="space-y-2 rounded-lg border border-[var(--border-subtle)] p-4">
                <p className="text-xs font-bold text-[var(--accent)]">Сценарий {i + 1}</p>
                <Field
                  label="Заголовок"
                  value={room.title}
                  onChange={(v) => {
                    const rooms = [...content.rooms];
                    rooms[i] = { ...rooms[i], title: v };
                    onChange({ rooms });
                  }}
                />
                <Field
                  label="Текст"
                  value={room.text}
                  onChange={(v) => {
                    const rooms = [...content.rooms];
                    rooms[i] = { ...rooms[i], text: v };
                    onChange({ rooms });
                  }}
                  multiline
                />
              </div>
            ))}
          </FormSection>
          <FormSection title="Закрывающий CTA">
            <Field label="Pill" value={content.closingPill} onChange={(v) => onChange({ closingPill: v })} />
            <Field label="Заголовок" value={content.closingTitle} onChange={(v) => onChange({ closingTitle: v })} />
            <Field
              label="Текст"
              value={content.closingText}
              onChange={(v) => onChange({ closingText: v })}
              multiline
            />
          </FormSection>
        </div>
      );

    case "contacts":
      return (
        <>
          <p className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 px-3 py-2 text-xs text-[var(--text-muted)]">
            Список «телефон / email / адрес / часы» и видимость пунктов — во вкладке{" "}
            <a href="/admin/contact-info" className="text-[var(--accent)] underline">
              Контакты
            </a>
            .
          </p>
          <Field label="Лейбл" value={content.label} onChange={(v) => onChange({ label: v })} />
          <Field label="Заголовок" value={content.title} onChange={(v) => onChange({ title: v })} />
          <Field label="Описание" value={content.description} onChange={(v) => onChange({ description: v })} multiline />
          <Field label="Кнопка «Написать»" value={content.primaryCta} onChange={(v) => onChange({ primaryCta: v })} />
          <Field label="Кнопка «Позвонить»" value={content.secondaryCta} onChange={(v) => onChange({ secondaryCta: v })} />
        </>
      );

    case "footer":
      return (
        <>
          <p className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/50 px-3 py-2 text-xs text-[var(--text-muted)]">
            Реквизиты (рег. номер, адрес) и Instagram управляются в{" "}
            <a href="/admin/company" className="text-[var(--accent)] underline">
              Компания
            </a>
            .
          </p>
          <Field label="Текст о бренде" value={content.brandText} onChange={(v) => onChange({ brandText: v })} multiline />
          <Field label="Заголовок разделов" value={content.navTitle} onChange={(v) => onChange({ navTitle: v })} />
          <Field label="Заголовок компании" value={content.companyTitle} onChange={(v) => onChange({ companyTitle: v })} />
          <Field
            label="Копирайт (после © год.)"
            value={content.copyrightLocation}
            onChange={(v) => onChange({ copyrightLocation: v })}
          />
          <Field
            label="Текст ссылки на политику"
            value={content.privacyLabel}
            onChange={(v) => onChange({ privacyLabel: v })}
          />
          <Field
            label="Href политики"
            value={content.privacyHref}
            onChange={(v) => onChange({ privacyHref: v })}
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
