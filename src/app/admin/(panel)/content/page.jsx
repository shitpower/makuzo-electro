import { listSections, getSiteSettings } from "@/db/queries";
import { AdminContentClient } from "./AdminContentClient";

export default async function AdminContentPage() {
  const [sections, settings] = await Promise.all([listSections(), getSiteSettings()]);
  return <AdminContentClient sections={sections} sectionSpacing={settings.sectionSpacing} />;
}
