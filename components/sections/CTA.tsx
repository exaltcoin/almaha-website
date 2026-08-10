import Link from "next/link";
import { company } from "@/data/company";
import { Divider } from "@/components/ui/Divider";
import type { Locale } from "@/lib/i18n";

export function CTA({
  locale,
  title,
  description,
  primaryLabel,
  secondaryLabel
}: {
  locale: Locale;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-24">
      <div className="bg-navy-texture pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, #C9A667 0%, transparent 55%)"
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-12">
        <h2 className="font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        <Divider tone="gold" className="mt-6" />
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-navy-200">
          {description}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={`/${locale}/quote`}
            className="rounded-sm bg-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-navy-900 transition-colors hover:bg-gold-600"
          >
            {primaryLabel}
          </Link>
          <a
            href={`tel:${company.phoneHref}`}
            className="rounded-sm border border-white/25 px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors hover:border-gold"
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
