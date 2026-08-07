"use client";

import { useEffect, useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import clsx from "clsx";

/**
 * @param {{
 *   label?: string;
 *   items: Array<{ label: string; onClick: () => void; tone?: "default" | "danger" }>;
 * }} props
 */
export function ActionMenu({ label = "Действия", items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current?.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
        className="admin-btn focus-ring px-2"
      >
        <FiMoreHorizontal size={16} />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 min-w-[160px] overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-modal)] py-1"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
              className={clsx(
                "focus-ring block w-full px-3 py-2.5 text-left text-sm hover:bg-[var(--bg-elevated)]",
                item.tone === "danger" ? "text-[var(--status-error)]" : "text-[var(--text-primary)]",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
