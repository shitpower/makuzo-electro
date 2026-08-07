import { AdminProfilePanel } from "@/components/admin/AdminProfilePanel";
import { PageHeader } from "@/components/admin/ui/PageHeader";

export default function AdminProfilePage() {
  return (
    <div className="space-y-8 p-4 lg:p-8">
      <PageHeader
        title="Профиль"
        className="[&_h1]:text-2xl [&_h1]:font-semibold sm:[&_h1]:text-3xl"
      />
      <AdminProfilePanel />
    </div>
  );
}
