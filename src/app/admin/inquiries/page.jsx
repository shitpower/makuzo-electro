import { Suspense } from "react";

import { AdminInquiriesTable } from "@/components/admin/AdminInquiriesTable";
import { PageHeader } from "@/components/admin/ui/PageHeader";

export default function AdminInquiriesPage() {
  return (
    <div className="space-y-5 p-4 lg:p-6">
      <PageHeader
        title="Заявки"
        subtitle="Обращения с формы на сайте. Новые заявки отмечены статусом."
      />
      <Suspense fallback={<p className="admin-muted text-sm">Загрузка заявок…</p>}>
        <AdminInquiriesTable />
      </Suspense>
    </div>
  );
}
