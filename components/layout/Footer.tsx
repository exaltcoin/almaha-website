import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { mainNav, footerServiceLinks, utilityNav } from "@/data/navigation";
import { company } from "@/data/company";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-800 bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-8xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4 inline-flex rounded-sm bg-white p-2">
              <Logo locale={locale} size="sm" />
            </div>
            <p className="text-sm font-semibold text-white">
              {locale === "en" ? company.nameEn : company.nameAr}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-navy-300">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              {dict.footer.quickLinks}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-sm text-navy-200 transition-colors hover:text-gold-400"
                  >
                    {locale === "en" ? item.labelEn : item.labelAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              {dict.footer.ourServices}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerServiceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={`/${locale}${item.href}`}
                    className="text-sm text-navy-200 transition-colors hover:text-gold-400"
                  >
                    {locale === "en" ? item.labelEn : item.labelAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold-400">
              {dict.footer.contactInfo}
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-navy-200">
              <li className="leading-relaxed">
                {locale === "en" ? company.addressEn : company.addressAr}
              </li>
              <li>
                <a href={`tel:${company.phoneHref}`} className="hover:text-gold-400">
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-gold-400 break-all">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-navy-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-navy-400">
            © {year} {locale === "en" ? company.nameEn : company.nameAr}. {dict.footer.copyright}
          </p>
          <ul className="flex gap-5">
            {utilityNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={`/${locale}${item.href}`}
                  className="text-xs text-navy-400 hover:text-gold-400"
                >
                  {locale === "en" ? item.labelEn : item.labelAr}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
