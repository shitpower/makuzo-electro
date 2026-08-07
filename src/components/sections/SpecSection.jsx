import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function SpecSection({ content }) {
  if (!content?.text) return null;

  const parts = content.highlight ? content.text.split(content.highlight) : [content.text];

  return (
    <AnimatedSection id="specialization" className="bg-white pb-20 pt-10 md:pb-24 md:pt-14">
      <div className="container-site mx-auto grid max-w-[1450px] gap-4 md:grid-cols-[180px_1fr] md:items-center md:gap-10">
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--ink-muted)]">
          {content.label}
        </p>
        <p className="max-w-[1150px] text-[clamp(1.4rem,2.8vw,2.125rem)] font-medium leading-[1.15] text-[var(--ink)]">
          {parts[0]}
          {content.highlight ? <span className="text-accent">{content.highlight}</span> : null}
          {parts[1] || ""}
        </p>
      </div>
    </AnimatedSection>
  );
}
