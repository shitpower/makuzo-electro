"use client";

import { useRef } from "react";
import clsx from "clsx";

/**
 * Below-fold entrance animation via CSS — no framer-motion, no opacity:0 on SSR.
 * Content is visible immediately (LCP/CLS safe); motion only enhances after paint.
 */
export function AnimatedSection({ children, className, id }) {
  const ref = useRef(null);

  return (
    <section
      id={id}
      ref={ref}
      className={clsx("motion-safe:animate-[section-in_0.55s_ease-out]", className)}
    >
      {children}
    </section>
  );
}
