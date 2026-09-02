import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { mainNav, aboutNav } from "@/data/navigation";
import { services } from "@/data/services";
import { company } from "@/data/company";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-50 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-8xl items-center justify-between gap-3 px-4 py-2.5 sm:gap-4 sm:px-8 sm:py-2 lg:px-12">
        <Logo locale={locale} size="md" />

        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            if (item.href === "/services") {
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={`/${locale}/services`}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:text-navy"
                  >
                    {locale === "en" ? item.labelEn : item.labelAr}
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="m3 4.5 3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <div className="invisible absolute start-1/2 top-full z-50 w-[720px] -translate-x-1/2 rtl:translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-1 rounded-sm border border-navy-50 bg-white p-5 shadow-elevated">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/${locale}/services/${s.slug}`}
                          className="rounded-sm px-3 py-2.5 text-sm text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy"
                        >
                          <span className="block font-medium">
                            {locale === "en" ? s.title.en : s.title.ar}
                          </span>
                          <span className="mt-0.5 block text-xs text-navy-400">
                            {locale === "en" ? s.category.en : s.category.ar}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            if (item.href === "/about") {
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={`/${locale}/about`}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:text-navy"
                  >
                    {locale === "en" ? item.labelEn : item.labelAr}
                    <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="m3 4.5 3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <div className="invisible absolute start-0 top-full z-50 w-64 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                    <div className="flex flex-col rounded-sm border border-navy-50 bg-white p-2 shadow-elevated">
                      {aboutNav.map((a) => (
                        <Link
                          key={a.href}
                          href={`/${locale}${a.href}`}
                          className="rounded-sm px-3 py-2.5 text-sm text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy"
                        >
                          {locale === "en" ? a.labelEn : a.labelAr}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:text-navy"
              >
                {locale === "en" ? item.labelEn : item.labelAr}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${company.phoneHref}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 3h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A15 15 0 0 1 3 6.6 1.5 1.5 0 0 1 4 3Z" />
            </svg>
            {company.phoneDisplay}
          </a>
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/quote`}
            className="rounded-sm bg-gold px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-600"
          >
            {locale === "en" ? "Request a Quote" : "اطلب عرض سعر"}
          </Link>
        </div>

        <MobileMenu locale={locale} dict={dict.nav} />
      </div>
    </header>
  );
}
