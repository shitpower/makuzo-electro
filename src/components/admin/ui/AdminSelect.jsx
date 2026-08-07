"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import clsx from "clsx";

/**
 * @typedef {{ value: string; label: string }} AdminSelectOption
 */

/**
 * Custom select — native OS popup cannot match admin dark theme/width.
 * @param {{
 *   value: string;
 *   onChange: (value: string) => void;
 *   options: AdminSelectOption[];
 *   "aria-label"?: string;
 *   className?: string;
 * }} props
 */
export function AdminSelect({ value, onChange, options, "aria-label": ariaLabel, className }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const listId = useId();
  const selected = options.find((opt) => opt.value === value) || options[0];

  useEffect(() => {
    function onDoc(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={rootRef} className={clsx("relative min-w-[10.5rem]", className)}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "admin-input focus-ring admin-touch flex w-full items-center justify-between gap-2 text-left",
          open && "border-[var(--accent)]",
        )}
      >
        <span className="truncate text-[var(--text-primary)]">{selected?.label ?? "—"}</span>
        <FiChevronDown
          size={16}
          className={clsx(
            "shrink-0 text-[var(--text-secondary)] transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 right-0 z-30 mt-1.5 overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-modal)] py-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <li key={opt.value || "__all"}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={clsx(
                    "focus-ring flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm transition",
                    active
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {active ? <FiCheck size={14} className="shrink-0" aria-hidden /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
