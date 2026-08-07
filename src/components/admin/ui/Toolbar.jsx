"use client";

/**
 * @param {{ children: import("react").ReactNode; className?: string }} props
 */
export function Toolbar({ children, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`.trim()}>{children}</div>
  );
}
