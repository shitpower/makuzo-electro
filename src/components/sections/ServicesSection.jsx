"use client";

import { useState } from "react";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";

import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function ServicesSection({ content }) {
  const items = (content?.items || []).filter((item) => item.visible !== false);
  const [openNum, setOpenNum] = useState(null);

  return (
    <AnimatedSection id="services" className="bg-[var(--mist)] pb-16 pt-8 md:pb-24 md:pt-14">
      <div className="container-site flex flex-col gap-10 md:gap-12">
        <div className="flex flex-col gap-4">
          <p className="section-label">{content.label}</p>
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <h2 className="section-title">{content.title}</h2>
            {content.description ? (
              <p className="max-w-[420px] font-[family-name:var(--font-body)] text-[16px] leading-[1.3] text-[var(--mute)]">
                {content.description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col">
          {items.map((item, index) => {
            const displayNum = String(index + 1).padStart(2, "0");
            const itemKey = item.id || item.num || `${item.title}-${index}`;
            const isOpen = openNum === itemKey;
            const bullets = item.bullets || [];

            return (
              <div key={itemKey} className="group border-b border-[var(--line)]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenNum(isOpen ? null : itemKey)}
                  className="flex w-full items-center gap-4 py-6 text-left md:gap-8 md:py-7"
                >
                  <span className="w-8 shrink-0 text-[14px] font-semibold tracking-[0.04em] text-[var(--mute)]">
                    {displayNum}
                  </span>
                  <h3 className="min-w-0 flex-1 text-[clamp(1.125rem,2.4vw,1.875rem)] font-medium text-[var(--ink)] transition-colors group-hover:text-[var(--signal)]">
                    {item.title}
                  </h3>
                  <p className="hidden w-full max-w-[360px] shrink-0 text-[15px] text-[var(--mute)] md:block md:w-[40%]">
                    {item.description}
                  </p>
                  <span className="shrink-0 text-[var(--ink)] md:hidden">
                    <FiChevronDown
                      className={`text-xl text-[var(--mute)] transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </span>
                  <FiArrowRight
                    className={`btn-arrow hidden size-6 text-[var(--ink)] transition-transform md:block ${isOpen ? "rotate-90" : ""}`}
                    aria-hidden
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-7 pl-12 pr-2 md:pl-16 md:pr-14">
                      {item.description ? (
                        <p className="mb-4 text-[15px] text-[var(--mute)] md:hidden">{item.description}</p>
                      ) : null}
                      {bullets.length ? (
                        <ul className="grid gap-2.5 sm:grid-cols-2">
                          {bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex gap-2.5 font-[family-name:var(--font-body)] text-[14px] leading-[1.45] text-[var(--mute)]"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--signal)]" aria-hidden />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}
