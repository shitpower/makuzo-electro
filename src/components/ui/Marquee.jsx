export function Marquee({ items = [] }) {
  if (items.length === 0) return null;
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[var(--line)] bg-[var(--surface-tint)] py-6">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--ink-muted)]">
              {item}
            </span>
            <span className="text-lg text-[var(--ink-muted)]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
