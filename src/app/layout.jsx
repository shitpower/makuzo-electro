import "./globals.css";

import { Mulish, Space_Grotesk } from "next/font/google";

import { getSiteLocaleServer } from "@/lib/site-locale";

/** Body / UI — Cyrillic + Latin */
const mulish = Mulish({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mulish",
  display: "swap",
});

/** Display / headings — Latin (Mulish fallback covers Cyrillic in CSS stack) */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space",
  display: "swap",
});

export default async function RootLayout({ children }) {
  const locale = await getSiteLocaleServer();

  return (
    <html
      lang={locale === "lv" ? "lv" : locale === "en" ? "en" : "ru"}
      data-scroll-behavior="smooth"
      className={`${mulish.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-white antialiased">{children}</body>
    </html>
  );
}
