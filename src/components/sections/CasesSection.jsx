import { SiteImage } from "@/components/ui/SiteImage";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const DEFAULT_IMAGES = {
  stats: "/img/Background.png",
  bullets: "/img/DSC00956.png",
};

const IMAGE_FRAME_CLASS =
  "aspect-[590/640] w-full lg:aspect-auto lg:h-[640px]";

function imageClassName(variant) {
  return variant === "stats" ? "object-[25%_85%] scale-[1.0]" : "object-center";
}

function normalizeCaseImageUrl(url) {
  const trimmed = typeof url === "string" ? url.trim() : "";
  if (!trimmed) return "";
  if (trimmed === "/img/DSC00956.jpg") return "/img/DSC00956.png";
  return trimmed;
}

function normalizeCaseItem(item, index) {
  const variant = item.variant || (index === 0 ? "stats" : "bullets");
  const imageUrl =
    normalizeCaseImageUrl(item.imageUrl) ||
    DEFAULT_IMAGES[variant] ||
    "";

  return { ...item, variant, imageUrl };
}

function StatsRow({ item }) {
  return (
    <div className="mt-10 grid grid-cols-3 gap-4 border-y border-[var(--line)] py-7 sm:gap-8 sm:py-8">
      {(item.stats || []).map((stat, i) => (
        <div key={i} className="min-w-0">
          <p className="font-display text-[clamp(1.875rem,5vw,3.5rem)] leading-none text-[var(--ink)]">
            {stat}
          </p>
          <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)] sm:mt-3 sm:text-[11px]">
            {item.statsLabels?.[i]}
          </p>
        </div>
      ))}
    </div>
  );
}

function BulletsList({ item }) {
  return (
    <ul className="mt-10 border-t border-[var(--line)]">
      {(item.bullets || []).map((bullet, i) => (
        <li
          key={i}
          className="flex items-start gap-3 border-b border-[var(--line)] py-[18px] text-[clamp(1rem,1.6vw,1.125rem)] font-medium leading-snug text-[var(--ink)] sm:gap-4 sm:py-5"
        >
          <span className="mt-0.5 shrink-0 font-normal text-[var(--accent)]">—</span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
}

export function CasesSection({ content }) {
  const items = (content?.items || []).map(normalizeCaseItem);

  return (
    <AnimatedSection className="bg-white pt-14 md:pt-20">
      <div className="container-site flex min-w-0 flex-col gap-16 md:gap-20 lg:gap-[88px]">
        {items.map((item, i) => (
          <div
            key={i}
            id={item.variant === "stats" ? "about" : item.variant === "bullets" ? "design" : undefined}
            className="grid min-w-0 gap-10 lg:grid-cols-2 lg:items-start lg:gap-7 xl:gap-8"
          >
            <div
              className={`relative min-w-0 overflow-hidden rounded-[18px] bg-[var(--surface-tint)] shadow-[0_4px_10.6px_rgba(88,88,88,0.25)] ${IMAGE_FRAME_CLASS}`}
            >
              {item.imageUrl ? (
                <SiteImage
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 590px"
                  className={imageClassName(item.variant)}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[var(--ink-muted)]">
                  Photo
                </div>
              )}
            </div>

            <div className="flex min-w-0 flex-col">
              <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--ink-muted)]">
                {item.label}
              </p>
              <h3 className="mt-4 whitespace-pre-line text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.12] text-[var(--ink)] lg:mt-5 lg:leading-[1.15]">
                {item.title}
              </h3>
              <p className="mt-6 whitespace-pre-line text-[clamp(0.9375rem,1.5vw,1.0625rem)] leading-[1.7] text-[var(--ink-muted)] lg:mt-7">
                {item.description}
              </p>

              {item.variant === "bullets" ? <BulletsList item={item} /> : <StatsRow item={item} />}
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
