"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { mainNav, aboutNav } from "@/data/navigation";
import { services } from "@/data/services";
import { company } from "@/data/company";
import type { Locale } from "@/lib/i18n";

export function MobileMenu({
  locale,
  dict
}: {
  locale: Locale;
  dict: { menu: string; close: string };
}) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.menu}
        className="flex h-10 w-10 items-center justify-center rounded-sm border border-navy-100 text-navy"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-navy-900/60"
            onClick={() => setOpen(false)}
          />
          <div className="relative ms-auto flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-white p-5">
            <div className="mb-6 flex items-center justify-between">
              <Logo locale={locale} size="sm" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={dict.close}
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-navy-100 text-navy"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1">
              {mainNav.map((item) => {
                if (item.href === "/services") {
                  return (
                    <div key={item.href} className="border-b border-navy-50">
                      <button
                        type="button"
                        onClick={() => setServicesOpen((v) => !v)}
                        className="flex w-full items-center justify-between py-3 text-start font-medium text-navy"
                      >
                        {locale === "en" ? item.labelEn : item.labelAr}
                        <span className="text-xs">{servicesOpen ? "−" : "+"}</span>
                      </button>
                      {servicesOpen && (
                        <ul className="mb-3 flex flex-col gap-1 ps-3">
                          <li>
                            <Link
                              href={`/${locale}/services`}
                              className="block py-1.5 text-sm text-navy-500"
                              onClick={() => setOpen(false)}
                            >
                              {locale === "en" ? "All Services" : "جميع الخدمات"}
                            </Link>
                          </li>
                          {services.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/${locale}/services/${s.slug}`}
                                className="block py-1.5 text-sm text-navy-500"
                                onClick={() => setOpen(false)}
                              >
                                {locale === "en" ? s.title.en : s.title.ar}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                }
                if (item.href === "/about") {
                  return (
                    <div key={item.href} className="border-b border-navy-50">
                      <button
                        type="button"
                        onClick={() => setAboutOpen((v) => !v)}
                        className="flex w-full items-center justify-between py-3 text-start font-medium text-navy"
                      >
                        {locale === "en" ? item.labelEn : item.labelAr}
                        <span className="text-xs">{aboutOpen ? "−" : "+"}</span>
                      </button>
                      {aboutOpen && (
                        <ul className="mb-3 flex flex-col gap-1 ps-3">
                          {aboutNav.map((a) => (
                            <li key={a.href}>
                              <Link
                                href={`/${locale}${a.href}`}
                                className="block py-1.5 text-sm text-navy-500"
                                onClick={() => setOpen(false)}
                              >
                                {locale === "en" ? a.labelEn : a.labelAr}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    className="border-b border-navy-50 py-3 font-medium text-navy"
                    onClick={() => setOpen(false)}
                  >
                    {locale === "en" ? item.labelEn : item.labelAr}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${company.phoneHref}`}
                className="text-center text-sm font-semibold text-navy"
              >
                {company.phoneDisplay}
              </a>
              <Link
                href={`/${locale}/quote`}
                onClick={() => setOpen(false)}
                className="rounded-sm bg-gold px-5 py-3 text-center text-sm font-semibold text-navy-900"
              >
                {locale === "en" ? "Request a Quote" : "اطلب عرض سعر"}
              </Link>
              <LanguageSwitcher locale={locale} className="justify-center" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
