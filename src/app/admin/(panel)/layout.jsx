import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

/**
 * Auth gate for all /admin/* except /admin/login (outside this group).
 * iron-session runs on Node here — not in edge/proxy — so public pages stay light.
 */
export default async function AdminPanelLayout({ children }) {
  const user = await getSession();
  if (!user) {
    redirect("/admin/login");
  }
  return children;
}
