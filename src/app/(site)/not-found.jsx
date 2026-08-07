import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-black">404</h1>
      <p className="mt-4 text-[var(--text-secondary)]">Страница не найдена</p>
      <Link href="/" className="btn-primary mt-8">
        На главную
      </Link>
    </div>
  );
}
