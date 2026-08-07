import "./globals.css";

import { Bebas_Neue, IBM_Plex_Sans, Inter, Mulish, Space_Grotesk } from "next/font/google";

import { getSiteLocaleServer } from "@/lib/site-locale";

const mulish = Mulish({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-plex",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export default async function RootLayout({ children }) {
  const locale = await getSiteLocaleServer();

  return (
    <html
      lang={locale === "lv" ? "lv" : locale === "en" ? "en" : "ru"}
      data-scroll-behavior="smooth"
      className={`${mulish.variable} ${spaceGrotesk.variable} ${ibmPlex.variable} ${inter.variable} ${bebasNeue.variable}`}
    >
      <body className="bg-white antialiased">{children}</body>
    </html>
  );
}
