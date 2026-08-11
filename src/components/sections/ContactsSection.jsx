"use client";

import { useState } from "react";
import { toast } from "sonner";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLabel } from "@/components/ui/ButtonLabel";
import { getDetailVisibility } from "@/lib/contact-details";
import {
  formatCompanyAddressShort,
  normalizeCompanyProfile,
} from "@/lib/company-profile";

function ContactsSchematic({ locale }) {
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const lines = isEn
    ? ["ELECTRICAL", "ENGINEERING", "AUTOMATION"]
    : isLv
      ? ["ELEKTRĪBA", "INŽENIERIJA", "AUTOMĀTIKA"]
      : ["ЭЛЕКТРИКА", "АВТОМАТИКА", "ИНЖЕНЕРИЯ"];
  const discuss = isEn ? "Discuss project" : isLv ? "Apspriest projektu" : "Обсудить проект";

  return (
    <div className="relative overflow-hidden rounded-[2px] border border-[#2e2e2e] bg-[#161616] px-6 py-7 md:min-h-[280px] md:px-8 md:py-8">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.55]"
        viewBox="0 0 360 300"
        fill="none"
        aria-hidden
      >
        <path d="M40 36H210" stroke="#3a3a3a" strokeWidth="1" />
        <path d="M210 36V120" stroke="#3a3a3a" strokeWidth="1" />
        <path d="M210 120H300" stroke="#3a3a3a" strokeWidth="1" />
        <path d="M80 120V210" stroke="#3a3a3a" strokeWidth="1" />
        <path d="M80 210H180" stroke="#3a3a3a" strokeWidth="1" />
        <path d="M180 210V260" stroke="#3a3a3a" strokeWidth="1" />
        <path d="M260 160H320" stroke="#3a3a3a" strokeWidth="1" />
        <path d="M320 160V240" stroke="#3a3a3a" strokeWidth="1" />
        <circle cx="210" cy="36" r="2.5" fill="var(--signal)" />
        <circle cx="80" cy="120" r="2.5" fill="#555" />
        <circle cx="180" cy="210" r="2.5" fill="var(--signal)" />
        <circle cx="320" cy="240" r="2.5" fill="#555" />
        <text x="228" y="52" fill="#555" fontSize="9" fontFamily="monospace">
          220V
        </text>
        <text x="228" y="148" fill="#555" fontSize="9" fontFamily="monospace">
          SMART
        </text>
        <text x="92" y="248" fill="#555" fontSize="9" fontFamily="monospace">
          HVAC
        </text>
      </svg>

      <div className="relative z-[1] flex h-full flex-col justify-between gap-10">
        <div className="flex flex-col gap-2.5">
          {lines.map((line) => (
            <p
              key={line}
              className="font-[family-name:var(--font-display)] text-[13px] font-medium uppercase tracking-[0.16em] text-white"
            >
              {line}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <span className="h-px w-16 bg-[var(--signal)]" aria-hidden />
          <p className="font-[family-name:var(--font-display)] text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--on-dark-mute)]">
            ↓ {discuss}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContactsSection({ content, locale, company }) {
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const profile = normalizeCompanyProfile(company);
  const phone = content?.phones?.[0] || profile.phone || "";
  const email = content?.email || profile.email || "";
  const address = content?.address || formatCompanyAddressShort(profile, locale);
  const hours = content?.hoursWeekday || "";
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";
  const labels = content?.detailLabels || {};
  const detailsVisible = Boolean(content?.detailsVisible);
  const visibility = getDetailVisibility(content);
  const showPhone = detailsVisible && visibility.phone && Boolean(phone);
  const showEmail = detailsVisible && visibility.email && Boolean(email);
  const showAddress = detailsVisible && visibility.address && Boolean(address);
  const showHours = detailsVisible && visibility.hours && Boolean(hours);
  const showDetails = showPhone || showEmail || showAddress || showHours;
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const specialty = isEn
    ? "Electrical. Automation. Engineering systems."
    : isLv
      ? "Elektrība. Automātika. Inženiersistēmas."
      : "Электрика. Автоматика. Инженерные системы.";

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("fail");
      toast.success(isEn ? "Request sent" : isLv ? "Pieteikums nosūtīts" : "Заявка отправлена");
      setForm({ name: "", phone: "", email: "", message: "" });
      setShowForm(false);
    } catch {
      toast.error(isEn ? "Send failed" : isLv ? "Sūtīšanas kļūda" : "Ошибка отправки");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatedSection id="contacts" className="bg-[#111111] pb-10 pt-14 md:pb-14 md:pt-16">
      <div className="container-site grid items-start gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div className="flex max-w-[560px] flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-display)] text-[12px] font-medium uppercase leading-[1.3] tracking-[0.15em] text-[var(--signal)]">
              {content.label}
            </p>
            <span className="h-[2px] w-8 bg-[var(--signal)]" aria-hidden />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.1] text-white">
            {content.title}
          </h2>
          <p className="font-[family-name:var(--font-display)] text-[15px] font-medium leading-[1.4] tracking-[0.02em] text-[var(--signal)]">
            {specialty}
          </p>
          <p className="max-w-[480px] font-[family-name:var(--font-body)] text-[16px] leading-[1.55] text-[#c4c4c4]">
            {content.description}
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              className="btn-primary inline-flex items-center justify-center gap-2"
              onClick={() => setShowForm((v) => !v)}
            >
              <ButtonLabel arrow>
                {content.primaryCta || (isEn ? "Write to us" : isLv ? "Rakstīt mums" : "Написать нам")}
              </ButtonLabel>
            </button>
            <a href={telHref} className="btn-ghost">
              {content.secondaryCta || (isEn ? "Call" : isLv ? "Zvanīt" : "Позвонить")}
            </a>
          </div>

          {showForm ? (
            <form onSubmit={onSubmit} className="mt-2 grid max-w-md gap-3">
              <input
                className="rounded-lg border border-[var(--on-dark-line)] bg-transparent px-4 py-3 text-sm text-white placeholder:text-[var(--on-dark-mute)]"
                placeholder={content.formNameLabel}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                className="rounded-lg border border-[var(--on-dark-line)] bg-transparent px-4 py-3 text-sm text-white placeholder:text-[var(--on-dark-mute)]"
                placeholder={content.formPhoneLabel}
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                required
              />
              <input
                type="email"
                className="rounded-lg border border-[var(--on-dark-line)] bg-transparent px-4 py-3 text-sm text-white placeholder:text-[var(--on-dark-mute)]"
                placeholder={content.formEmailLabel}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              <textarea
                rows={3}
                className="rounded-lg border border-[var(--on-dark-line)] bg-transparent px-4 py-3 text-sm text-white placeholder:text-[var(--on-dark-mute)]"
                placeholder={content.formMessageLabel}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
              <button type="submit" className="btn-primary w-fit" disabled={loading}>
                <ButtonLabel>{content.formSubmitLabel}</ButtonLabel>
              </button>
            </form>
          ) : null}

          {showDetails ? (
            <div className="mt-2 grid gap-6 border-t border-[var(--on-dark-line)] pt-6 sm:grid-cols-2">
              {showPhone ? (
                <div className="flex flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-body)] text-[12px] tracking-[0.08em] text-[var(--on-dark-mute)]">
                    {labels.phone || "ТЕЛЕФОН"}
                  </span>
                  <a
                    href={telHref}
                    className="font-[family-name:var(--font-display)] text-[18px] font-medium text-white"
                  >
                    {phone}
                  </a>
                </div>
              ) : null}
              {showEmail ? (
                <div className="flex flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-body)] text-[12px] tracking-[0.08em] text-[var(--on-dark-mute)]">
                    {labels.email || "EMAIL"}
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="font-[family-name:var(--font-display)] text-[18px] font-medium text-white"
                  >
                    {email}
                  </a>
                </div>
              ) : null}
              {showAddress ? (
                <div className="flex flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-body)] text-[12px] tracking-[0.08em] text-[var(--on-dark-mute)]">
                    {labels.address || "АДРЕС"}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[18px] font-medium text-white">
                    {address}
                  </span>
                </div>
              ) : null}
              {showHours ? (
                <div className="flex flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-body)] text-[12px] tracking-[0.08em] text-[var(--on-dark-mute)]">
                    {labels.hours || "ЧАСЫ"}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[18px] font-medium text-white">
                    {hours}
                  </span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <ContactsSchematic locale={locale} />
      </div>
    </AnimatedSection>
  );
}
