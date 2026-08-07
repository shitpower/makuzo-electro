"use client";

import { useState } from "react";
import { toast } from "sonner";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  formatCompanyAddressShort,
  normalizeCompanyProfile,
} from "@/lib/company-profile";

export function ContactsSection({ content, locale, company }) {
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const profile = normalizeCompanyProfile(company);
  const phone = content?.phones?.[0] || profile.phone || "";
  const email = content?.email || profile.email || "";
  const address = content?.address || formatCompanyAddressShort(profile, locale);
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#";
  const labels = content?.detailLabels || {};
  const detailsVisible = Boolean(content?.detailsVisible);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
    <AnimatedSection id="contacts" className="bg-[#111111] pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="container-site flex flex-col gap-12 md:gap-16">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:gap-16">
          <div className="flex max-w-[680px] flex-1 flex-col gap-6">
            <p className="section-label">{content.label}</p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.75rem)] font-bold leading-tight text-white">
              {content.title}
            </h2>
            <p className="max-w-[480px] font-[family-name:var(--font-body)] text-[16px] leading-[1.5] text-[var(--on-dark-mute)]">
              {content.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <button type="button" className="btn-primary" onClick={() => setShowForm((v) => !v)}>
                {content.primaryCta || (isEn ? "Write" : isLv ? "Rakstīt" : "Написать")}
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
                  {content.formSubmitLabel}
                </button>
              </form>
            ) : null}
          </div>

          {detailsVisible ? (
            <div className="flex w-full max-w-[240px] flex-col gap-7 pt-2 lg:pt-10">
              {phone ? (
                <div className="flex flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-body)] text-[12px] tracking-[0.08em] text-[var(--on-dark-mute)]">
                    {labels.phone || "ТЕЛЕФОН"}
                  </span>
                  <a
                    href={telHref}
                    className="font-[family-name:var(--font-display)] text-[20px] font-medium text-white"
                  >
                    {phone}
                  </a>
                </div>
              ) : null}
              {email ? (
                <div className="flex flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-body)] text-[12px] tracking-[0.08em] text-[var(--on-dark-mute)]">
                    {labels.email || "EMAIL"}
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="font-[family-name:var(--font-display)] text-[20px] font-medium text-white"
                  >
                    {email}
                  </a>
                </div>
              ) : null}
              {address ? (
                <div className="flex flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-body)] text-[12px] tracking-[0.08em] text-[var(--on-dark-mute)]">
                    {labels.address || "АДРЕС"}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[20px] font-medium text-white">
                    {address}
                  </span>
                </div>
              ) : null}
              {content.hoursWeekday ? (
                <div className="flex flex-col gap-1.5">
                  <span className="font-[family-name:var(--font-body)] text-[12px] tracking-[0.08em] text-[var(--on-dark-mute)]">
                    {labels.hours || "ЧАСЫ"}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[20px] font-medium text-white">
                    {content.hoursWeekday}
                  </span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="h-px w-full bg-[var(--on-dark-line)]" />
      </div>
    </AnimatedSection>
  );
}
