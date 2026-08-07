import { getSiteSettings } from "@/db/queries";
import { AdminSettingsClient } from "./AdminSettingsClient";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return <AdminSettingsClient initialSettings={settings} />;
}
