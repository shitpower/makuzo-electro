import { AdminAuditTable } from "@/components/admin/AdminAuditTable";
import { PageHeader } from "@/components/admin/ui/PageHeader";

export default function AdminAuditPage() {
  return (
    <div className="space-y-5 p-4 lg:p-6">
      <PageHeader
        title="Журнал"
        subtitle="История действий: контент, настройки, медиа, заявки и бэкапы."
      />
      <AdminAuditTable />
    </div>
  );
}
