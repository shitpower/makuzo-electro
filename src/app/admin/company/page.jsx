import { getSiteSettings } from "@/db/queries";
import { AdminCompanyClient } from "./AdminCompanyClient";

export default async function AdminCompanyPage() {
  const settings = await getSiteSettings();
  return <AdminCompanyClient initialCompany={settings.companyProfile} />;
}
