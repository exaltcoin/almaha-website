export function StatsShowcase({
  items
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-20">
      <div className="bg-navy-texture pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 divide-x divide-white/10 rtl:divide-x-reverse sm:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="px-4 text-center first:ps-0 last:pe-0">
              <div className="font-serif text-4xl font-bold text-gold-400 sm:text-5xl">
                {item.value}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-navy-300">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
