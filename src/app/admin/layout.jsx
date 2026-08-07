import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Панель управления",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className="font-admin h-dvh overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)] antialiased">
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </div>
  );
}
