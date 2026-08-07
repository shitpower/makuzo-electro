"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiColumns,
  FiExternalLink,
  FiHome,
  FiImage,
  FiLayout,
  FiLogOut,
  FiMail,
  FiMoreHorizontal,
  FiPhone,
  FiSettings,
  FiShield,
  FiUser,
  FiX,
} from "react-icons/fi";

import { UserChip } from "@/components/admin/ui/UserChip";

const SIDEBAR_STORAGE_KEY = "makuzo:admin-sidebar-open";

const NAV_GROUPS = [
  {
    id: "content",
    label: "Контент",
    items: [
      { href: "/admin", label: "Обзор", icon: FiHome, match: (p) => p === "/admin" },
      { href: "/admin/content", label: "Контент", icon: FiLayout, match: (p) => p === "/admin/content" },
      { href: "/admin/footer", label: "Футер", icon: FiColumns, match: (p) => p === "/admin/footer" },
      {
        href: "/admin/contact-info",
        label: "Контакты",
        icon: FiPhone,
        match: (p) => p === "/admin/contact-info",
      },
      {
        href: "/admin/company",
        label: "Компания",
        icon: FiBriefcase,
        match: (p) => p === "/admin/company",
      },
      { href: "/admin/media", label: "Медиа", icon: FiImage, match: (p) => p === "/admin/media" },
    ],
  },
  {
    id: "operations",
    label: "Операции",
    items: [
      {
        href: "/admin/inquiries",
        label: "Заявки",
        icon: FiMail,
        match: (p) => p.startsWith("/admin/inquiries"),
      },
      { href: "/admin/audit", label: "Журнал", icon: FiShield, match: (p) => p === "/admin/audit" },
    ],
  },
  {
    id: "system",
    label: "Система",
    items: [
      {
        href: "/admin/settings",
        label: "Настройки",
        icon: FiSettings,
        match: (p) => p === "/admin/settings",
      },
    ],
  },
];

const MOBILE_PRIMARY = [
  { href: "/admin", label: "Обзор", icon: FiHome, match: (p) => p === "/admin" },
  { href: "/admin/content", label: "Контент", icon: FiLayout, match: (p) => p === "/admin/content" },
  { href: "/admin/footer", label: "Футер", icon: FiColumns, match: (p) => p === "/admin/footer" },
  {
    href: "/admin/inquiries",
    label: "Заявки",
    icon: FiMail,
    match: (p) => p.startsWith("/admin/inquiries"),
  },
];

const MOBILE_MORE = [
  { href: "/admin/contact-info", label: "Контакты", icon: FiPhone },
  { href: "/admin/company", label: "Компания", icon: FiBriefcase },
  { href: "/admin/media", label: "Медиа", icon: FiImage },
  { href: "/admin/audit", label: "Журнал", icon: FiShield },
  { href: "/admin/settings", label: "Настройки", icon: FiSettings },
  { href: "/admin/profile", label: "Профиль", icon: FiUser },
];

function NavLink({ item, sidebarOpen, pathname }) {
  const Icon = item.icon;
  const active = item.match(pathname);
  return (
    <Link
      href={item.href}
      title={sidebarOpen ? undefined : item.label}
      aria-current={active ? "page" : undefined}
      className={`focus-ring flex w-full items-center rounded-lg py-2.5 text-sm font-medium transition ${
        sidebarOpen ? "gap-2.5 px-3" : "justify-center px-0"
      } ${
        active
          ? "bg-[var(--accent)]/10 text-[var(--accent)]"
          : "text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
      }`}
    >
      <Icon size={18} aria-hidden className="shrink-0" />
      {sidebarOpen ? <span>{item.label}</span> : null}
    </Link>
  );
}

export function AdminShell({ onLogout, children }) {
  const pathname = usePathname();
  const [adminEmail, setAdminEmail] = useState("");
  const [adminName, setAdminName] = useState("");
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return localStorage.getItem(SIDEBAR_STORAGE_KEY) !== "0";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.user?.email) setAdminEmail(data.user.email);
        if (!cancelled && data?.user?.name) setAdminName(data.user.name);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  function toggleSidebar() {
    setSidebarOpen((open) => {
      const next = !open;
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  const moreActive = MOBILE_MORE.some((item) => pathname.startsWith(item.href));

  return (
    <div className="flex h-full min-h-0 min-w-0 overflow-hidden bg-[var(--bg-base)]">
      <aside
        className={`hidden h-full shrink-0 flex-col overflow-hidden border-r border-[var(--border-subtle)] bg-[var(--bg-surface)]/50 transition-[width] duration-200 lg:flex ${
          sidebarOpen ? "w-56 xl:w-60" : "w-[3.25rem]"
        }`}
      >
        <div className={`border-b border-[var(--border-subtle)] ${sidebarOpen ? "p-4" : "px-2 py-3"}`}>
          <Link
            href="/admin"
            className={`focus-ring flex items-center ${sidebarOpen ? "gap-2.5" : "justify-center"}`}
            aria-label="Makuzo Admin"
          >
            <span className="relative block size-8 shrink-0 overflow-hidden rounded-lg bg-[var(--bg-elevated)]">
              <Image src="/img/logo-on-light.webp" alt="" fill sizes="32px" className="object-contain p-1" />
            </span>
            {sidebarOpen ? (
              <span>
                <span className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Makuzo
                </span>
                <span className="admin-muted block text-[0.65rem]">Admin</span>
              </span>
            ) : null}
          </Link>
        </div>

        <nav className="min-h-0 flex-1 space-y-4 overflow-y-auto p-2" aria-label="Разделы админки">
          {NAV_GROUPS.map((group) => (
            <div key={group.id}>
              {sidebarOpen ? (
                <p className="admin-muted mb-1 px-3 text-[0.6rem] font-bold uppercase tracking-[0.16em]">
                  {group.label}
                </p>
              ) : null}
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavLink key={item.href} item={item} sidebarOpen={sidebarOpen} pathname={pathname} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className={`space-y-2 border-t border-[var(--border-subtle)] ${sidebarOpen ? "p-3" : "px-1.5 py-2"}`}>
          <UserChip name={adminName} email={adminEmail} collapsed={!sidebarOpen} />
          <Link
            href="/"
            target="_blank"
            title={sidebarOpen ? undefined : "Открыть сайт"}
            className={`admin-btn focus-ring w-full text-xs ${
              sidebarOpen ? "" : "justify-center border-transparent px-0"
            }`}
          >
            <FiExternalLink size={16} className="shrink-0" />
            {sidebarOpen ? "Открыть сайт" : null}
          </Link>
          <button
            type="button"
            onClick={onLogout}
            title={sidebarOpen ? undefined : "Выйти"}
            className={`admin-btn-ghost focus-ring flex min-h-11 w-full items-center text-xs hover:text-[var(--status-error)] ${
              sidebarOpen ? "gap-2 px-3 py-2" : "justify-center"
            }`}
          >
            <FiLogOut size={16} className="shrink-0" />
            {sidebarOpen ? "Выйти" : null}
          </button>
          <button
            type="button"
            onClick={toggleSidebar}
            aria-expanded={sidebarOpen}
            aria-label={sidebarOpen ? "Свернуть меню" : "Развернуть меню"}
            className={`admin-btn-ghost focus-ring flex min-h-11 w-full items-center ${
              sidebarOpen ? "gap-2 px-3 py-2" : "justify-center"
            }`}
          >
            {sidebarOpen ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
            {sidebarOpen ? <span className="text-xs">Свернуть</span> : null}
          </button>
        </div>
      </aside>

      {mobileDrawer ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Меню">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Закрыть меню"
            onClick={() => setMobileDrawer(false)}
          />
          <div className="absolute bottom-20 left-3 right-3 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-modal)] p-3">
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="admin-muted text-xs font-bold uppercase tracking-wide">Ещё</p>
              <button
                type="button"
                className="admin-btn-ghost focus-ring admin-touch grid place-items-center rounded-lg"
                onClick={() => setMobileDrawer(false)}
                aria-label="Закрыть"
              >
                <FiX size={18} />
              </button>
            </div>
            <div className="space-y-1">
              {MOBILE_MORE.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`focus-ring flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm ${
                      active
                        ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--border-subtle)] bg-[var(--bg-base)]/95 p-2 backdrop-blur-lg lg:hidden">
        <nav className="grid grid-cols-5 gap-1" aria-label="Мобильная навигация">
          {MOBILE_PRIMARY.map((item) => {
            const Icon = item.icon;
            const active = item.match(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`focus-ring flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-[0.65rem] ${
                  active ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
                }`}
              >
                <Icon size={18} aria-hidden />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMobileDrawer(true)}
            aria-expanded={mobileDrawer}
            className={`focus-ring flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg text-[0.65rem] ${
              moreActive || mobileDrawer ? "text-[var(--accent)]" : "text-[var(--text-muted)]"
            }`}
          >
            <FiMoreHorizontal size={18} aria-hidden />
            <span>Ещё</span>
          </button>
        </nav>
      </div>

      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden pb-20 lg:pb-0">{children}</div>
    </div>
  );
}
