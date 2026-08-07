import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ButtonLabel } from "@/components/ui/ButtonLabel";

function resolveCtaTitle(content) {
  if (content.titleLine1) {
    return {
      line1: content.titleLine1,
      line2: content.titleLine2 || "",
      line3Prefix: content.titleLine3 ?? "",
      highlight: content.titleHighlight || "",
    };
  }

  const title = String(content.title || "");
  const highlight = String(content.titleHighlight || "");
  const signUpIndex = title.indexOf("Запишитесь");
  const roSignUpIndex = title.indexOf("Înscrieți-vă");

  if (signUpIndex > -1 && highlight) {
    return {
      line1: title.slice(0, signUpIndex).trim(),
      line2: "Запишитесь",
      line3Prefix: title.slice(signUpIndex + "Запишитесь".length, title.indexOf(highlight)).trimEnd() + " ",
      highlight,
    };
  }

  if (roSignUpIndex > -1 && highlight) {
    return {
      line1: title.slice(0, roSignUpIndex).trim(),
      line2: "Înscrieți-vă",
      line3Prefix: title.slice(roSignUpIndex + "Înscrieți-vă".length, title.indexOf(highlight)).trimEnd() + " ",
      highlight,
    };
  }

  return {
    line1: title,
    line2: "",
    line3Prefix: "",
    highlight,
  };
}

export function CtaSection({ content, phone }) {
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "#contacts";
  const title = resolveCtaTitle(content);

  return (
    <AnimatedSection className="bg-white pt-14 md:pt-20">
      <div className="container-site">
        <div className="relative min-h-[440px] overflow-hidden rounded-[18px] bg-gradient-to-r from-[#2c2c2c] to-[#373737]">
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-40"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at 85% 70%, rgba(168,106,61,0.35), transparent 55%), radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.06), transparent 50%)",
            }}
          />

          <div className="relative z-10 flex min-h-[440px] min-w-0 max-w-[827px] flex-col justify-center px-6 py-14 sm:px-8 md:px-12 md:py-[4.5rem]">
            <p className="text-[15px] font-semibold uppercase leading-[10px] tracking-[1px] text-white/35 md:text-[17px] md:leading-[12px]">
              {content.label}
            </p>

            <h2 className="mt-5 flex max-w-[827px] flex-col gap-1.5 text-[clamp(1.75rem,9vw,4.0625rem)] font-medium leading-[1.12] text-white md:mt-6 md:gap-2 md:text-[64px] md:leading-[1.1]">
              <span>{title.line1}</span>
              {title.line2 ? <span>{title.line2}</span> : null}
              {title.highlight ? (
                <span className="max-w-none md:whitespace-nowrap">
                  {title.line3Prefix}
                  <span className="text-[var(--signal)]">{title.highlight}</span>
                </span>
              ) : null}
            </h2>

            <a
              href={telHref}
              className="btn-primary mt-8 inline-flex w-fit items-center justify-center gap-2 !h-[33px] !min-w-[109px] !rounded-[100px] !bg-[var(--signal)] !px-[19px] !py-0 !text-[13px] !font-bold !leading-none"
            >
              <ButtonLabel arrow>{content.buttonText}</ButtonLabel>
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
