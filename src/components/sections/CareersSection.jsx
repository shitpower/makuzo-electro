import { FiArrowRight } from "react-icons/fi";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function CareersSection({ content }) {
  const roles = content?.roles || [];

  return (
    <AnimatedSection id="careers" className="bg-[var(--careers-dark)] pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="container-site flex flex-col items-stretch gap-12 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-1 flex-col gap-7">
          <p className="section-label">{content.label}</p>
          <h2 className="max-w-[454px] font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.1] text-white">
            {content.title}
          </h2>
          <p className="max-w-[520px] font-[family-name:var(--font-body)] text-[17px] leading-[1.5] text-[var(--on-dark-mute)]">
            {content.description}
          </p>
          <a href={content.buttonHref || "#contacts"} className="btn-primary w-fit">
            {content.buttonText}
          </a>
        </div>

        <div className="flex-1 rounded-[2px] bg-[var(--careers-panel)] px-6 py-4 md:px-8">
          {roles.map((role, index) => (
            <a
              key={role.title}
              href={content.buttonHref || "#contacts"}
              className={`flex items-center justify-between gap-4 py-6 transition hover:opacity-80 ${
                index < roles.length - 1 ? "border-b border-[#334559]" : ""
              }`}
            >
              <div className="flex flex-col gap-1.5">
                <span className="font-[family-name:var(--font-display)] text-[18px] font-medium text-white">
                  {role.title}
                </span>
                <span className="font-[family-name:var(--font-body)] text-[13px] text-[var(--on-dark-mute)]">
                  {role.meta}
                </span>
              </div>
              <FiArrowRight className="size-5 shrink-0 text-[var(--gold)]" aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
