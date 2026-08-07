import { AboutSection } from "@/components/sections/AboutSection";
import { CareersSection } from "@/components/sections/CareersSection";
import { ContactsSection } from "@/components/sections/ContactsSection";
import { DesignSection } from "@/components/sections/DesignSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { getSiteSettings, getVisibleSectionsMap } from "@/db/queries";
import { getSectionContent, getSiteLocaleServer } from "@/lib/site-locale";

export default async function HomePage() {
  const locale = await getSiteLocaleServer();
  const [sectionsMap] = await Promise.all([getVisibleSectionsMap(), getSiteSettings()]);

  const hero = getSectionContent(sectionsMap.hero, locale);
  const design = getSectionContent(sectionsMap.design, locale);
  const services = getSectionContent(sectionsMap.services, locale);
  const projects = getSectionContent(sectionsMap.projects, locale);
  const about = getSectionContent(sectionsMap.about, locale);
  const careers = getSectionContent(sectionsMap.careers, locale);
  const contacts = getSectionContent(sectionsMap.contacts, locale);
  const phone = contacts?.phones?.[0] || "";

  return (
    <>
      {sectionsMap.hero ? <HeroSection content={hero} locale={locale} phone={phone} /> : null}
      {sectionsMap.design ? <DesignSection content={design} /> : null}
      {sectionsMap.services ? <ServicesSection content={services} /> : null}
      {sectionsMap.projects ? <ProjectsSection content={projects} /> : null}
      {sectionsMap.about ? <AboutSection content={about} /> : null}
      {sectionsMap.careers ? <CareersSection content={careers} /> : null}
      {sectionsMap.contacts ? <ContactsSection content={contacts} locale={locale} /> : null}
    </>
  );
}
