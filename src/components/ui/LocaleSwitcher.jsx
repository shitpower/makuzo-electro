"use client";

import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";

const LOCALES = [
  { code: "ru", label: "RU" },
  { code: "lv", label: "LV" },
  { code: "en", label: "EN" },
];

const LOCALE_MAX_AGE = 60 * 60 * 24 * 365;

/** Module-scope helper — avoids react-hooks/immutability on document.cookie inside the component. */
function writeLocaleCookie(next) {
  globalThis.document.cookie = `locale=${next};path=/;max-age=${LOCALE_MAX_AGE};samesite=lax`;
}

export function LocaleSwitcher({ locale }) {
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next) {
    writeLocaleCookie(next);
    router.push(`${pathname}?lang=${next}`);
    router.refresh();
  }

  return (
    <div className="flex items-center text-sm font-medium sm:text-sm">
      {LOCALES.map((item, index) => (
        <span key={item.code} className="flex items-center">
          {index > 0 ? (
            <span className="select-none text-[var(--ink-faint)]" aria-hidden>
              |
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => switchLocale(item.code)}
            className={clsx(
              "focus-ring grid min-h-11 min-w-11 place-items-center rounded-lg transition",
              locale === item.code
                ? "text-[var(--accent)]"
                : "text-[var(--ink-muted)] hover:text-[var(--ink)]",
            )}
          >
            {item.label}
          </button>
        </span>
      ))}
    </div>
  );
}
