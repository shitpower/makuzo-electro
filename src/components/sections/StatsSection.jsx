import { AnimatedSection } from "@/components/ui/AnimatedSection";

function formatDescription(text) {
  if (!text) return "";
  if (text.includes("\n")) return text;

  return text
    .replace(/отрасли,\s*с/i, "отрасли,\nс")
    .replace(/domeniu,\s*din/i, "domeniu,\ndin")
    .replace(/(Латвии)/i, "\n$1")
    .replace(/(Letonia)/i, "\n$1");
}

function suffixSizeClass(suffix) {
  return suffix.length > 1
    ? "pt-1 text-[clamp(1.5rem,11vw,3.625rem)] leading-none md:pt-[9px] md:text-[58px] md:leading-[58px]"
    : "pt-0.5 text-[clamp(1.35rem,10vw,3.375rem)] leading-none md:pt-[6px] md:text-[54px] md:leading-[54px]";
}

export function StatsSection({ content }) {
  const items = content?.items || [];

  return (
    <AnimatedSection className="bg-white">
      <div className="container-site grid min-w-0 gap-[15px] md:grid-cols-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex min-h-[280px] min-w-0 max-w-full flex-col overflow-hidden rounded-[22px] bg-gradient-to-r from-[#2c2c2c] to-[#373737] px-5 pb-8 pt-5 text-white shadow-[0_4px_11.2px_rgba(96,96,96,0.43)] sm:min-h-[340px] sm:px-7 sm:pb-9 sm:pt-6 md:min-h-[400px] md:px-9 md:pb-10 md:pt-[26px]"
          >
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <p className="min-w-0 text-[clamp(13px,4.8vw,21px)] font-bold uppercase leading-[1.35] tracking-[1.2px] text-white sm:leading-[33px] md:text-[21px] md:tracking-[2px]">
                {item.tag}
              </p>
              <span className="inline-flex h-[34px] w-fit shrink-0 items-center whitespace-nowrap rounded-full border-[1.5px] border-white/[0.12] px-4 text-[11px] font-bold uppercase tracking-[0.02em] text-white sm:h-[36px] sm:px-5 sm:text-[13px] md:h-[39px] md:px-6 md:text-[15px]">
                {item.badge}
              </span>
            </div>

            <p className="mt-6 flex min-w-0 items-start font-stat-number leading-none text-[var(--signal)] sm:mt-8 md:mt-[48px]">
              <span className="text-[clamp(3rem,24vw,7.5rem)] leading-[0.95] md:text-[120px] md:leading-[120px]">
                {item.value}
              </span>
              <span className={suffixSizeClass(String(item.suffix || ""))}>{item.suffix}</span>
            </p>

            <p className="mt-auto min-w-0 max-w-[421px] whitespace-pre-line text-[clamp(15px,6.5vw,26px)] font-normal leading-[1.45] text-white md:leading-[38px]">
              {formatDescription(item.description)}
            </p>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
}
