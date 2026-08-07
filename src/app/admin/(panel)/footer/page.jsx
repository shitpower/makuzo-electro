import { getSectionByKey } from "@/db/queries";
import { AdminFooterClient } from "./AdminFooterClient";

export default async function AdminFooterPage() {
  const section = await getSectionByKey("footer");
  if (!section) {
    return (
      <div className="p-6 text-sm text-[var(--text-muted)]">
        Секция footer не найдена. Запустите npm run db:seed.
      </div>
    );
  }
  return <AdminFooterClient section={section} />;
}
