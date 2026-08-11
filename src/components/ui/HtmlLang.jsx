"use client";

import { useEffect } from "react";

/** Syncs <html lang> without reading cookies() in the root layout (keeps SSR/ISR static). */
export function HtmlLang({ locale }) {
  useEffect(() => {
    const lang = locale === "lv" ? "lv" : locale === "en" ? "en" : "ru";
    document.documentElement.lang = lang;
  }, [locale]);

  return null;
}
