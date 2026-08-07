"use client";

import { useRouter, usePathname } from "next/navigation";
import { Toaster } from "sonner";

import { AdminShell } from "@/components/admin/AdminShell";

export function AdminLayoutClient({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  if (isLogin) {
    return (
      <div className="font-admin flex h-full min-h-0 flex-col overflow-hidden bg-[var(--bg-void)] text-[var(--text-primary)]">
        <Toaster position="top-right" theme="dark" />
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto p-4">{children}</div>
      </div>
    );
  }

  return (
    <div className="font-admin h-full min-h-0 overflow-hidden text-[var(--text-primary)]">
      <Toaster position="top-right" theme="dark" />
      <AdminShell onLogout={handleLogout}>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
      </AdminShell>
    </div>
  );
}
