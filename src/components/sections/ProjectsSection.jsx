import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SiteImage } from "@/components/ui/SiteImage";

export function ProjectsSection({ content }) {
  const items = content?.items || [];

  return (
    <AnimatedSection id="projects" className="bg-white pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="container-site flex flex-col gap-10 md:gap-14">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex flex-col gap-4">
            <p className="section-label">{content.label}</p>
            <h2 className="section-title">{content.title}</h2>
          </div>
          {content.description ? (
            <p className="max-w-[480px] font-[family-name:var(--font-body)] text-[clamp(1rem,1.4vw,1.125rem)] leading-[1.5] text-[var(--mute)]">
              {content.description}
            </p>
          ) : null}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <article
              key={`${item.title}-${i}`}
              className="group flex flex-col overflow-hidden rounded-[2px] border border-[var(--line)] bg-white transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(17,17,17,0.10)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--mist)]">
                {item.imageUrl ? (
                  <SiteImage
                    src={item.imageUrl}
                    alt={item.title || ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-[family-name:var(--font-display)] text-[13px] font-medium tracking-[0.12em] text-[var(--mute)]">
                      MAKUZO
                    </span>
                  </div>
                )}
                {item.tag ? (
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 font-[family-name:var(--font-display)] text-[11px] font-medium tracking-[0.08em] text-[var(--ink)]">
                    {item.tag}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-1 flex-col gap-2 p-5 md:p-6">
                <h3 className="font-[family-name:var(--font-display)] text-[18px] font-medium leading-snug text-[var(--ink)] md:text-[20px]">
                  {item.title}
                </h3>
                {item.meta ? (
                  <p className="font-[family-name:var(--font-body)] text-[14px] text-[var(--mute)]">
                    {item.meta}
                  </p>
                ) : null}
                {item.description ? (
                  <p className="mt-1 font-[family-name:var(--font-body)] text-[14px] leading-[1.5] text-[var(--mute)]">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
