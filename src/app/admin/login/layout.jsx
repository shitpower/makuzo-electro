import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";

/** Logged-in admins skip the login form. */
export default async function AdminLoginLayout({ children }) {
  const user = await getSession();
  if (user) {
    redirect("/admin");
  }
  return children;
}
