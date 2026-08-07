"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useState } from "react";
import { FiEye, FiEyeOff, FiLoader, FiLock } from "react-icons/fi";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          let msg = data.error || "Ошибка входа";
          if (res.status === 503 && data.code === "SESSION_CONFIG") {
            msg += " Добавьте SESSION_SECRET и перезапустите сервер.";
          }
          setError(msg);
          setLoading(false);
          return;
        }

        const target =
          callbackUrl.startsWith("/admin") && !callbackUrl.startsWith("/admin/login")
            ? callbackUrl
            : "/admin";
        router.push(target);
        router.refresh();
      } catch {
        setError("Ошибка соединения");
        setLoading(false);
      }
    },
    [callbackUrl, email, password, router],
  );

  return (
    <form onSubmit={handleSubmit} className="matte-panel w-full max-w-md space-y-6 rounded-2xl p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="grid size-12 place-items-center rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)]">
          <FiLock size={20} className="text-[var(--accent)]" />
        </div>
        <h1 className="text-2xl font-extrabold text-[var(--text-primary)]">Вход в админку</h1>
        <p className="text-center text-sm text-[var(--text-primary)]/85">Управление сайтом Makuzo</p>
      </div>

      {error ? (
        <p className="rounded-lg bg-[var(--status-error)]/10 px-3 py-2 text-sm text-[var(--status-error)]" role="alert">
          {error}
        </p>
      ) : null}

      <label className="admin-label">
        Login
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          autoComplete="email"
          className="admin-input focus-ring"
          autoFocus
          required
        />
      </label>

      <label className="admin-label">
        Пароль
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            autoComplete="current-password"
            className="admin-input focus-ring pr-10"
            placeholder="Введите пароль"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
      </label>

      <button
        type="submit"
        disabled={loading || !email || !password}
        className="btn-primary focus-ring w-full"
      >
        {loading ? <FiLoader size={16} className="animate-spin" /> : null}
        {loading ? "Вход..." : "Войти"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="matte-panel w-full max-w-md rounded-2xl p-8 text-center text-sm text-[var(--text-secondary)]">
          Загрузка…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
