import { getSectionByKey, getSiteSettings } from "@/db/queries";
import { AdminContactInfoClient } from "./AdminContactInfoClient";

export default async function AdminContactInfoPage() {
  const [section, settings] = await Promise.all([getSectionByKey("contacts"), getSiteSettings()]);
  if (!section) {
    return (
      <div className="p-6 text-sm text-[var(--text-muted)]">
        Секция contacts не найдена. Запустите npm run db:seed.
      </div>
    );
  }
  return <AdminContactInfoClient section={section} company={settings.companyProfile} />;
}
