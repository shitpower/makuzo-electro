import Link from "next/link";

import { MakuzoLogo } from "@/components/ui/MakuzoLogo";

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

export function SiteFooter({ content = {}, locale }) {
  const year = new Date().getFullYear();
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const navLinks = content.navLinks?.length
    ? content.navLinks
    : DEFAULT_NAV[isEn ? "en" : isLv ? "lv" : "ru"];
  const companyLines = content.companyLines || ["SIA MAKUZO"];
  const legalLinks = content.legalLinks || [];

  return (
    <footer className="bg-[#111111] pb-8 pt-14 text-white md:min-h-[320px] md:pb-12 md:pt-20">
      <div className="container-site flex flex-col gap-10 md:min-h-[224px] md:gap-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-12">
          <div className="flex max-w-[360px] flex-col gap-4">
            <Link href="/" className="focus-ring inline-block rounded-sm">
              <MakuzoLogo variant="second" className="h-8 w-auto md:h-9" />
            </Link>
            {content.brandText ? (
              <p className="font-[family-name:var(--font-body)] text-[13px] leading-[1.45] text-[var(--on-dark-mute)]">
                {content.brandText}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-20 lg:gap-24">
            <div className="flex flex-col gap-3">
              <p className="font-[family-name:var(--font-display)] text-[13px] font-medium tracking-[0.06em] text-[var(--signal)]">
                {content.navTitle || (isEn ? "SECTIONS" : isLv ? "SADAĻAS" : "РАЗДЕЛЫ")}
              </p>
              <ul className="flex flex-col gap-3 font-[family-name:var(--font-body)] text-[14px] text-[var(--on-dark-mute)]">
                {navLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <a href={link.href} className="transition hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-[family-name:var(--font-display)] text-[13px] font-medium tracking-[0.06em] text-[var(--signal)]">
                {content.companyTitle || (isEn ? "COMPANY" : isLv ? "UZŅĒMUMS" : "КОМПАНИЯ")}
              </p>
              <ul className="flex flex-col gap-3 font-[family-name:var(--font-body)] text-[14px] text-[var(--on-dark-mute)]">
                {companyLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-[var(--on-dark-line)] pt-6 sm:flex-row sm:items-center">
          <p className="font-[family-name:var(--font-body)] text-[12px] text-[var(--on-dark-mute)]">
            © {year} MAKUZO. {content.copyrightLocation || ""}
          </p>
          <div className="flex flex-wrap gap-6 font-[family-name:var(--font-body)] text-[12px] text-[var(--on-dark-mute)]">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href || "#"} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
