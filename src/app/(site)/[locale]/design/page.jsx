import { DesignPageContent } from "@/components/sections/DesignPageContent";
import { getSectionByKey } from "@/db/queries";
import {
  getSectionContent,
  resolveLocaleParam,
  siteLocaleStaticParams,
  withLocale,
} from "@/lib/site-locale";

export const revalidate = 300;

export function generateStaticParams() {
  return siteLocaleStaticParams();
}

export async function generateMetadata({ params }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocaleParam(localeParam);
  const copy =
    locale === "en"
      ? {
          title: "Design support — Makuzo",
          description: "See your electrical layout at 1:1 scale before installation.",
        }
      : locale === "lv"
        ? {
            title: "Dizaina atbalsts — Makuzo",
            description: "Ieraugiet elektroinstalācijas izvietojumu mērogā 1:1 pirms montāžas.",
          }
        : {
            title: "Дизайнерское сопровождение — Makuzo",
            description: "Увидите электрику в масштабе 1:1 ещё до монтажа.",
          };
  return {
    ...copy,
    alternates: {
      canonical: withLocale(locale, "/design"),
      languages: {
        ru: "/ru/design",
        lv: "/lv/design",
        en: "/en/design",
      },
    },
  };
}

export default async function DesignPage({ params }) {
  const { locale: localeParam } = await params;
  const locale = resolveLocaleParam(localeParam);
  const section = await getSectionByKey("design");
  const content = getSectionContent(section, locale) || {};

  return (
    <div className="bg-white">
      <DesignPageContent content={content} locale={locale} />
    </div>
  );
}
