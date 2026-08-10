import { Divider } from "@/components/ui/Divider";

export function PageHero({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-28">
      <div className="bg-navy-texture pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, #C9A667 0%, transparent 38%), radial-gradient(circle at 85% 85%, #C9A667 0%, transparent 42%)"
        }}
      />
      {/* Thin corner frame — an editorial signature rather than a flat block */}
      <div className="pointer-events-none absolute start-6 top-6 h-14 w-14 border-s border-t border-gold/25 sm:start-10 sm:top-10" />
      <div className="pointer-events-none absolute end-6 bottom-6 h-14 w-14 border-e border-b border-gold/25 sm:end-10 sm:bottom-10" />

      <div className="relative mx-auto max-w-8xl px-5 sm:px-8 lg:px-12">
        {eyebrow && (
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-3xl font-serif text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <Divider tone="gold" align="start" className="mt-6" />
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
