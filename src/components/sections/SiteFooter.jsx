import Link from "next/link";

import { MakuzoLogo } from "@/components/ui/MakuzoLogo";
import {
  DEFAULT_COMPANY_PROFILE,
  formatCompanyLines,
  normalizeCompanyProfile,
} from "@/lib/company-profile";

const DEFAULT_NAV = {
  ru: [
    { label: "Услуги", href: "#services" },
    { label: "О нас", href: "#about" },
    { label: "Вакансии", href: "#careers" },
    { label: "Контакты", href: "#contacts" },
  ],
  lv: [
    { label: "Pakalpojumi", href: "#services" },
    { label: "Par mums", href: "#about" },
    { label: "Vakances", href: "#careers" },
    { label: "Kontakti", href: "#contacts" },
  ],
  en: [
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Contacts", href: "#contacts" },
  ],
};

export function SiteFooter({ content = {}, locale, company }) {
  const year = new Date().getFullYear();
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const profile = normalizeCompanyProfile(company || DEFAULT_COMPANY_PROFILE);
  const navLinks = content.navLinks?.length
    ? content.navLinks
    : DEFAULT_NAV[isEn ? "en" : isLv ? "lv" : "ru"];
  const companyLines = formatCompanyLines(profile, locale);
  const privacyLabel =
    content.privacyLabel ||
    (isEn ? "Privacy policy" : isLv ? "Privātuma politika" : "Политика конфиденциальности");
  const privacyHref = content.privacyHref || "/privacy";
  const tagline = isEn
    ? "ELECTRICAL · ENGINEERING · AUTOMATION"
    : isLv
      ? "ELEKTRĪBA · INŽENIERIJA · AUTOMĀTIKA"
      : "ELECTRICAL · ENGINEERING · AUTOMATION";

  const legalLinks = [];
  if (profile.instagramVisible && profile.instagramUrl) {
    legalLinks.push({ label: "Instagram", href: profile.instagramUrl, external: true });
  }
  legalLinks.push({ label: privacyLabel, href: privacyHref, external: false });

  return (
    <footer className="border-t border-[var(--on-dark-line)] bg-[#111111] pb-8 pt-10 text-white md:pb-10 md:pt-12">
      <div className="container-site flex flex-col gap-10 md:gap-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16">
          <div className="flex max-w-[520px] flex-col gap-5">
            <Link href="/" className="focus-ring inline-block w-fit rounded-sm">
              <MakuzoLogo variant="second" className="h-14 w-auto sm:h-16 md:h-[4.5rem]" />
            </Link>
            <p className="font-[family-name:var(--font-display)] text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--signal)]">
              {tagline}
            </p>
            {content.brandText ? (
              <p className="max-w-[460px] font-[family-name:var(--font-body)] text-[14px] leading-[1.5] text-[#c4c4c4]">
                {content.brandText}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16 lg:justify-end lg:gap-20">
            <div className="flex flex-col gap-3">
              <p className="font-[family-name:var(--font-display)] text-[12px] font-medium tracking-[0.12em] text-[var(--signal)]">
                {content.navTitle || (isEn ? "SECTIONS" : isLv ? "SADAĻAS" : "РАЗДЕЛЫ")}
              </p>
              <ul className="flex flex-col gap-2.5 font-[family-name:var(--font-body)] text-[14px] text-[var(--on-dark-mute)]">
                {navLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <a href={link.href} className="transition hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {profile.footerCompanyVisible ? (
              <div className="flex flex-col gap-3">
                <p className="font-[family-name:var(--font-display)] text-[12px] font-medium tracking-[0.12em] text-[var(--signal)]">
                  {content.companyTitle || (isEn ? "COMPANY" : isLv ? "UZŅĒMUMS" : "КОМПАНИЯ")}
                </p>
                <ul className="flex flex-col gap-2.5 font-[family-name:var(--font-body)] text-[14px] text-[var(--on-dark-mute)]">
                  {companyLines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-[var(--on-dark-line)] pt-5 sm:flex-row sm:items-center">
          <p className="font-[family-name:var(--font-body)] text-[12px] text-[var(--on-dark-mute)]">
            © {year} {profile.legalName.replace(/^SIA\s+/i, "") || "MAKUZO"}.{" "}
            {content.copyrightLocation || ""}
          </p>
          <div className="flex flex-wrap gap-6 font-[family-name:var(--font-body)] text-[12px] text-[var(--on-dark-mute)]">
            {legalLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} href={link.href || "#"} className="transition hover:text-white">
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
