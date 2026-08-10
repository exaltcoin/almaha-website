export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-700">
      {children}
    </span>
  );
}
