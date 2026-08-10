import Link from "next/link";
import type { Service } from "@/data/services";
import type { Locale } from "@/lib/i18n";

export function ServiceCard({
  service,
  locale,
  index
}: {
  service: Service;
  locale: Locale;
  index?: number;
}) {
  return (
    <Link
      href={`/${locale}/services/${service.slug}`}
      className="group relative flex flex-col overflow-hidden border-t-2 border-transparent bg-white p-7 transition-all duration-200 hover:z-10 hover:-translate-y-1 hover:border-gold hover:shadow-elevated"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="inline-block w-fit text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
          {locale === "en" ? service.category.en : service.category.ar}
        </span>
        {typeof index === "number" && (
          <span className="font-serif text-xl font-bold leading-none text-navy-100 transition-colors group-hover:text-gold/40">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <h3 className="font-serif text-lg font-bold leading-snug text-navy transition-colors group-hover:text-gold-700">
        {locale === "en" ? service.title.en : service.title.ar}
      </h3>
      <p className="mt-2.5 flex-1 text-sm leading-relaxed text-navy-500">
        {locale === "en" ? service.shortDescription.en : service.shortDescription.ar}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
        {locale === "en" ? "Learn More" : "تعرّف أكثر"}
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
