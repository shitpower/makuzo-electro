import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SiteImage } from "@/components/ui/SiteImage";

export function AboutSection({ content }) {
  const stats = content?.stats || [];
  const features = content?.features || [];
  const statsVisible = Boolean(content?.statsVisible);

  return (
    <AnimatedSection id="about" className="bg-white pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="container-site flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex flex-col gap-5">
            <p className="section-label">{content.label}</p>
            <h2 className="section-title">{content.title}</h2>
          </div>
          <p className="max-w-[480px] font-[family-name:var(--font-body)] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.5] text-[var(--mute)]">
            {content.description}
          </p>
        </div>

        {statsVisible && stats.length > 0 ? (
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <p className="font-stat-number text-[clamp(2.5rem,8vw,4.5rem)] leading-none text-[var(--signal)]">
                  {stat.value}
                </p>
                <p className="text-[15px] leading-[19px] text-[var(--ink)] opacity-65">{stat.label}</p>
              </div>
            ))}
          </div>
        ) : null}

        {content.imageUrl ? (
          <div className="relative aspect-[16/7] w-full overflow-hidden rounded-[2px] bg-[var(--mist)]">
            <SiteImage
              src={content.imageUrl}
              alt={content.title || ""}
              fill
              sizes="(max-width: 1600px) 100vw, 1600px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="h-px w-full bg-[var(--line)]" />

        <div className="grid gap-10 md:grid-cols-3 md:gap-10">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-4">
              <div className="h-[3px] w-10 bg-[var(--signal)]" />
              <h3 className="font-[family-name:var(--font-display)] text-[20px] font-medium leading-[26px] text-[var(--ink)]">
                {feature.title}
              </h3>
              <p className="font-[family-name:var(--font-body)] text-[15px] leading-[1.45] text-[var(--mute)]">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
