"use client";

/**
 * @param {{
 *   value: string;
 *   onChange: (value: string) => void;
 *   placeholder?: string;
 *   className?: string;
 *   "aria-label"?: string;
 * }} props
 */
export function SearchBar({
  value,
  onChange,
  placeholder = "Поиск…",
  className = "",
  "aria-label": ariaLabel = "Поиск",
}) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={`admin-input focus-ring admin-touch max-w-xs ${className}`.trim()}
    />
  );
}
