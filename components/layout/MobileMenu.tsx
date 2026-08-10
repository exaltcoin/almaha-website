"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { mainNav, aboutNav } from "@/data/navigation";
import { services } from "@/data/services";
import { company } from "@/data/company";
import type { Locale } from "@/lib/i18n";

export function MobileMenu({
  locale,
  dict,
}: {
  locale: Locale;
  dict: { menu: string; close: string };
}) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const drawer = (
    <div
      className="fixed inset-0 z-[100] flex"
      role="dialog"
      aria-modal="true"
      aria-label={dict.menu}
    >
      <button
        type="button"
        aria-label={dict.close}
        className="absolute inset-0 bg-navy-900/60"
        onClick={() => setOpen(false)}
      />

      <div className="relative ms-auto flex h-dvh w-[88%] max-w-sm flex-col overflow-y-auto bg-white p-5 shadow-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Logo locale={locale} size="sm" />

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={dict.close}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-navy-100 text-navy transition hover:border-gold hover:text-gold"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                strokeLinecap="round"
              />
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
                    onClick={() => setServicesOpen((value) => !value)}
                    className="flex w-full items-center justify-between py-3 text-start font-medium text-navy"
                    aria-expanded={servicesOpen}
                  >
                    <span>
                      {locale === "en" ? item.labelEn : item.labelAr}
                    </span>
                    <span className="text-lg leading-none text-gold">
                      {servicesOpen ? "−" : "+"}
                    </span>
                  </button>

                  {servicesOpen && (
                    <ul className="mb-3 flex flex-col gap-1 ps-3">
                      <li>
                        <Link
                          href={`/${locale}/services`}
                          className="block py-1.5 text-sm text-navy-500 transition hover:text-gold"
                          onClick={() => setOpen(false)}
                        >
                          {locale === "en"
                            ? "All Services"
                            : "جميع الخدمات"}
                        </Link>
                      </li>

                      {services.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/${locale}/services/${service.slug}`}
                            className="block py-1.5 text-sm text-navy-500 transition hover:text-gold"
                            onClick={() => setOpen(false)}
                          >
                            {locale === "en"
                              ? service.title.en
                              : service.title.ar}
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
                    onClick={() => setAboutOpen((value) => !value)}
                    className="flex w-full items-center justify-between py-3 text-start font-medium text-navy"
                    aria-expanded={aboutOpen}
                  >
                    <span>
                      {locale === "en" ? item.labelEn : item.labelAr}
                    </span>
                    <span className="text-lg leading-none text-gold">
                      {aboutOpen ? "−" : "+"}
                    </span>
                  </button>

                  {aboutOpen && (
                    <ul className="mb-3 flex flex-col gap-1 ps-3">
                      {aboutNav.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={`/${locale}${item.href}`}
                            className="block py-1.5 text-sm text-navy-500 transition hover:text-gold"
                            onClick={() => setOpen(false)}
                          >
                            {locale === "en"
                              ? item.labelEn
                              : item.labelAr}
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
                className="border-b border-navy-50 py-3 font-medium text-navy transition hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {locale === "en" ? item.labelEn : item.labelAr}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 flex flex-col gap-3 border-t border-navy-50 pt-5">
          <a
            href={`tel:${company.phoneHref}`}
            className="text-center text-sm font-semibold text-navy"
          >
            {company.phoneDisplay}
          </a>

          <Link
            href={`/${locale}/quote`}
            onClick={() => setOpen(false)}
            className="rounded-sm bg-gold px-5 py-3 text-center text-sm font-semibold text-navy-900 transition hover:bg-gold-600"
          >
            {locale === "en"
              ? "Request a Quote"
              : "اطلب عرض سعر"}
          </Link>

          <LanguageSwitcher
            locale={locale}
            className="justify-center"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.menu}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-sm border border-navy-100 text-navy"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            d="M4 7h16M4 12h16M4 17h16"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {mounted && open
        ? createPortal(drawer, document.body)
        : null}
    </>
  );
}