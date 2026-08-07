"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AdminProfilePanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) throw new Error("fail");
        const data = await res.json();
        if (!cancelled) {
          setName(data.user?.name || "");
          setEmail(data.user?.email || "");
        }
      } catch {
        if (!cancelled) toast.error("Не удалось загрузить профиль");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSave(event) {
    event.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      toast.error("Новые пароли не совпадают");
      return;
    }
    if (!currentPassword) {
      toast.error("Укажите текущий пароль");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      toast.error("Пароль должен быть минимум 6 символов");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          currentPassword,
          newPassword: newPassword || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Ошибка сохранения");
        return;
      }
      setName(data.user?.name || "");
      setEmail(data.user?.email || "");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Профиль обновлён");
    } catch {
      toast.error("Ошибка соединения");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <p className="text-sm text-[var(--text-secondary)]">Загрузка профиля…</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Данные аккаунта</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Обновите имя, логин и пароль администратора
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="profile-email" className="block text-sm text-[var(--text-secondary)]">
            Email (логин)
          </label>
          <input
            id="profile-email"
            type="email"
            className="admin-input focus-ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
            disabled={saving}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="profile-name" className="block text-sm text-[var(--text-secondary)]">
            Имя
          </label>
          <input
            id="profile-name"
            className="admin-input focus-ring"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
            autoComplete="name"
            disabled={saving}
          />
        </div>

        <div className="border-t border-[var(--border-subtle)] pt-6">
          <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">Смена пароля</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="profile-current-password"
                className="block text-sm text-[var(--text-secondary)]"
              >
                Текущий пароль
              </label>
              <input
                id="profile-current-password"
                type="password"
                className="admin-input focus-ring"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={saving}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="profile-new-password"
                className="block text-sm text-[var(--text-secondary)]"
              >
                Новый пароль
              </label>
              <input
                id="profile-new-password"
                type="password"
                className="admin-input focus-ring"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                disabled={saving}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="profile-confirm-password"
                className="block text-sm text-[var(--text-secondary)]"
              >
                Повторите новый пароль
              </label>
              <input
                id="profile-confirm-password"
                type="password"
                className="admin-input focus-ring"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                disabled={saving}
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-[var(--text-muted)]">
            Оставьте поля нового пароля пустыми, если менять его не нужно. Текущий пароль нужен для
            любого сохранения.
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary min-h-11 px-6 py-2.5 text-sm font-medium"
          >
            {saving ? "Сохранение..." : "Сохранить изменения"}
          </button>
        </div>
      </form>
    </div>
  );
}
