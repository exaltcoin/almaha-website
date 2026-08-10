import type { ProcessStep } from "@/data/services";
import type { Locale } from "@/lib/i18n";

export function ProcessTimeline({
  steps,
  locale
}: {
  steps: ProcessStep[];
  locale: Locale;
}) {
  return (
    <ol className="relative mx-auto max-w-3xl">
      {/* connecting line — offset to sit behind the numeral column */}
      <div
        className="absolute top-2 bottom-2 start-[27px] w-px bg-gradient-to-b from-gold/60 via-navy-100 to-transparent"
        aria-hidden="true"
      />
      {steps.map((step, i) => (
        <li key={i} className="relative flex gap-6 pb-12 last:pb-0 sm:gap-8">
          <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-white font-serif text-lg font-bold text-gold-700 shadow-card">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-2.5">
            <h3 className="font-serif text-lg font-bold text-navy">
              {locale === "en" ? step.title.en : step.title.ar}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-500">
              {locale === "en" ? step.description.en : step.description.ar}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
