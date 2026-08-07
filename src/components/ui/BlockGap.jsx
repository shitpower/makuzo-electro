import { getGapAfter } from "@/lib/section-spacing";

/**
 * Wraps a homepage block and applies configurable margin below it.
 */
export function BlockGap({ sectionKey, spacing, isLast = false, children }) {
  if (isLast) return children;

  const gap = getGapAfter(spacing, sectionKey);

  return <div style={{ marginBottom: gap }}>{children}</div>;
}
