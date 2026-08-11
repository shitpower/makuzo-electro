import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLabel } from "@/components/ui/ButtonLabel";

function JobArrow({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M4 10H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 5L16 10L11 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CareersSection({ content, locale }) {
  const roles = content?.roles || [];
  const isLv = locale === "lv";
  const isEn = locale === "en";
  const openRolesLabel = isEn
    ? "Open positions"
    : isLv
      ? "Aktuālās vakances"
      : "Актуальные вакансии";
  const count = String(roles.length).padStart(2, "0");

  return (
    <AnimatedSection id="careers" className="bg-[var(--careers-dark)] pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-[100px]">
        <div className="flex max-w-[500px] flex-col gap-7">
          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-display)] text-[12px] font-medium uppercase leading-[1.3] tracking-[0.15em] text-[var(--signal)]">
              {content.label}
            </p>
            <span className="h-[2px] w-8 bg-[var(--signal)]" aria-hidden />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,4.2vw,3.5rem)] font-bold leading-[1.08] text-white">
            {content.title}
          </h2>
          <p className="font-[family-name:var(--font-body)] text-[17px] leading-[1.55] text-[#c4c4c4]">
            {content.description}
          </p>
          <a href={content.buttonHref || "#contacts"} className="btn-primary inline-flex w-fit items-center justify-center gap-2">
            <ButtonLabel arrow>{content.buttonText}</ButtonLabel>
          </a>
        </div>

        <div className="rounded-[2px] bg-[var(--careers-panel)] px-6 py-[22px] md:px-8">
          <div className="mb-2 flex items-baseline justify-between gap-4 border-b border-[var(--on-dark-line)] pb-5">
            <p className="font-[family-name:var(--font-display)] text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--signal)]">
              {openRolesLabel}
            </p>
            <span className="font-[family-name:var(--font-display)] text-[13px] font-medium tabular-nums tracking-[0.08em] text-white">
              {count}
            </span>
          </div>

          <ul className="flex flex-col">
            {roles.map((role, index) => (
              <li key={role.title}>
                <a
                  href={content.buttonHref || "#contacts"}
                  className={`group flex items-center justify-between gap-4 px-3 py-6 transition-[background-color,border-color] duration-200 ease-out hover:bg-[#3c3c3c] md:px-4 ${
                    index < roles.length - 1
                      ? "border-b border-[var(--on-dark-line)] hover:border-[var(--signal)]"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="font-[family-name:var(--font-display)] text-[18px] font-medium text-[#f0f0f0] transition-colors duration-200 group-hover:text-white">
                      {role.title}
                    </span>
                    <span className="font-[family-name:var(--font-body)] text-[13px] text-[#b0b0b0]">
                      {role.meta}
                    </span>
                  </div>
                  <JobArrow className="size-5 shrink-0 text-[var(--signal)] transition-transform duration-200 ease-out group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedSection>
  );
}
