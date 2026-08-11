import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Панель управления",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/icon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon/Makuzo-ico.png", type: "image/png" },
    ],
    shortcut: "/icon/favicon-32.png",
  },
};

/** Shared shell for login + panel (login skips sidebar via pathname). */
export default function AdminLayout({ children }) {
  return (
    <div className="font-admin h-dvh overflow-hidden bg-[var(--bg-base)] text-[var(--text-primary)] antialiased">
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </div>
  );
}
