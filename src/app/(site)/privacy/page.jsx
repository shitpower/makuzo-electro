import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { getCompanyProfile } from "@/db/queries";
import { getPrivacyPolicyContent } from "@/lib/privacy-policy-content";
import { getSiteLocaleServer } from "@/lib/site-locale";

export async function generateMetadata() {
  const locale = await getSiteLocaleServer();
  const company = await getCompanyProfile();
  const content = getPrivacyPolicyContent(locale, company);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: "/privacy",
      languages: {
        ru: "/privacy?lang=ru",
        lv: "/privacy?lang=lv",
        en: "/privacy?lang=en",
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage() {
  const locale = await getSiteLocaleServer();
  const company = await getCompanyProfile();
  const content = getPrivacyPolicyContent(locale, company);
  const updatedLabel =
    locale === "en" ? "Last updated:" : locale === "lv" ? "Atjaunināts:" : "Обновлено:";

  return (
    <div
      className="bg-white"
      lang={locale === "lv" ? "lv" : locale === "en" ? "en" : "ru"}
    >
      <AnimatedSection className="border-b border-[var(--line)] bg-[var(--mist)] pb-10 pt-8 md:pb-14 md:pt-14">
        <div className="container-site flex min-w-0 flex-col gap-4 md:gap-5">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[var(--mute)] transition hover:text-[var(--ink)]"
          >
            <FiArrowLeft aria-hidden />
            {content.backLabel}
          </Link>
          <p className="section-label">{content.label}</p>
          <h1 className="legal-page-title max-w-[900px]">{content.title}</h1>
          <p className="font-[family-name:var(--font-body)] text-[13px] text-[var(--mute)] sm:text-[14px]">
            {updatedLabel} {content.updatedAt}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="pb-16 pt-8 md:pb-24 md:pt-14">
        <div className="container-site min-w-0 max-w-[820px]">
          <p className="legal-prose font-[family-name:var(--font-body)] text-[15px] leading-[1.6] text-[var(--ink)] sm:text-[17px]">
            {content.intro}
          </p>

          <div className="mt-8 flex flex-col gap-8 md:mt-12 md:gap-12">
            {content.sections.map((section) => (
              <section key={section.title} className="flex min-w-0 flex-col gap-3 md:gap-4">
                <h2 className="legal-page-heading font-[family-name:var(--font-display)] text-[19px] font-bold leading-snug text-[var(--ink)] sm:text-[22px] md:text-[24px]">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="legal-prose font-[family-name:var(--font-body)] text-[14px] leading-[1.65] text-[var(--mute)] sm:text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list?.length ? (
                  <ul className="flex flex-col gap-2.5">
                    {section.list.map((item) => (
                      <li
                        key={item.slice(0, 48)}
                        className="legal-prose flex gap-3 font-[family-name:var(--font-body)] text-[14px] leading-[1.65] text-[var(--mute)] sm:text-[15px]"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--signal)]" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
