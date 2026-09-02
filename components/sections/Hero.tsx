import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function Hero({
  locale,
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div className="absolute inset-0">
        <Image
          src="/images/general/hero-home.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient scrim ensures WCAG-adequate text contrast regardless of
            the underlying image, and reinforces the start-side reading focus. */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
      </div>
      <div className="relative mx-auto max-w-8xl px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-40">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">
            {eyebrow}
          </span>
          <h1 className="font-serif text-2xl font-bold leading-tight text-white xs:text-3xl sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-100 sm:text-lg">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:gap-4">
            <Link
              href={`/${locale}/services`}
              className="rounded-sm bg-gold px-7 py-3.5 text-center text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-600"
            >
              {ctaPrimary}
            </Link>
            <Link
              href={`/${locale}/quote`}
              className="rounded-sm border border-white/25 px-7 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:border-gold"
            >
              {ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
