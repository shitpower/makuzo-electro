import dynamic from "next/dynamic";

import { HeroSection } from "@/components/sections/HeroSection";
import { getSiteSettings, getVisibleSectionsMap } from "@/db/queries";
import { getSectionContent, getSiteLocaleServer } from "@/lib/site-locale";

/**
 * Below-fold sections — code-split so Hero LCP JS stays lean.
 * loading: null avoids layout jump / fake skeletons competing with LCP.
 * ssr: true (default) keeps SEO/content in HTML; only JS is deferred.
 */
const DesignSection = dynamic(
  () => import("@/components/sections/DesignSection").then((m) => m.DesignSection),
  { loading: () => null },
);
const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection").then((m) => m.ServicesSection),
  { loading: () => null },
);
const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection").then((m) => m.ProjectsSection),
  { loading: () => null },
);
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection").then((m) => m.AboutSection),
  { loading: () => null },
);
const CareersSection = dynamic(
  () => import("@/components/sections/CareersSection").then((m) => m.CareersSection),
  { loading: () => null },
);
const ContactsSection = dynamic(
  () => import("@/components/sections/ContactsSection").then((m) => m.ContactsSection),
  { loading: () => null },
);

export default async function HomePage() {
  const locale = await getSiteLocaleServer();
  const [sectionsMap, settings] = await Promise.all([getVisibleSectionsMap(), getSiteSettings()]);
  const company = settings.companyProfile;

  const hero = getSectionContent(sectionsMap.hero, locale);
  const design = getSectionContent(sectionsMap.design, locale);
  const services = getSectionContent(sectionsMap.services, locale);
  const projects = getSectionContent(sectionsMap.projects, locale);
  const about = getSectionContent(sectionsMap.about, locale);
  const careers = getSectionContent(sectionsMap.careers, locale);
  const contacts = getSectionContent(sectionsMap.contacts, locale);
  const phone = contacts?.phones?.[0] || company?.phone || "";

  return (
    <>
      {sectionsMap.hero ? <HeroSection content={hero} locale={locale} phone={phone} /> : null}
      {sectionsMap.design ? <DesignSection content={design} /> : null}
      {sectionsMap.services ? <ServicesSection content={services} /> : null}
      {sectionsMap.projects ? <ProjectsSection content={projects} /> : null}
      {sectionsMap.about ? <AboutSection content={about} /> : null}
      {sectionsMap.careers ? <CareersSection content={careers} /> : null}
      {sectionsMap.contacts ? (
        <ContactsSection content={contacts} locale={locale} company={company} />
      ) : null}
    </>
  );
}
