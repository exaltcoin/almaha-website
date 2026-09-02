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
  dict
}: {
  locale: Locale;
  dict: { menu: string; close: string };
}) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  // The drawer is portaled to document.body (see below), which only exists
  // client-side — this flag avoids a server/client render mismatch.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Lock background scroll while the drawer is open, and allow Escape to
  // close it. Restored/removed on close or unmount so it never leaks.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const drawer = (
    <div className="fixed inset-0 z-[100] flex" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-navy-900/60" onClick={closeMenu} />
      <div className="relative ms-auto flex h-full w-[85%] max-w-sm flex-col overflow-y-auto bg-white p-5 shadow-elevated">
        <div className="mb-6 flex shrink-0 items-center justify-between">
          <Logo locale={locale} size="sm" />
          <button
            type="button"
            onClick={closeMenu}
            aria-label={dict.close}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-navy-100 text-navy"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
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
                          onClick={closeMenu}
                        >
                          {locale === "en" ? "All Services" : "جميع الخدمات"}
                        </Link>
                      </li>
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/${locale}/services/${s.slug}`}
                            className="block py-1.5 text-sm text-navy-500"
                            onClick={closeMenu}
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
                            onClick={closeMenu}
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
                onClick={closeMenu}
              >
                {locale === "en" ? item.labelEn : item.labelAr}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 flex shrink-0 flex-col gap-3">
          <a
            href={`tel:${company.phoneHref}`}
            className="text-center text-sm font-semibold text-navy"
          >
            {company.phoneDisplay}
          </a>
          <Link
            href={`/${locale}/quote`}
            onClick={closeMenu}
            className="rounded-sm bg-gold px-5 py-3 text-center text-sm font-semibold text-navy-900"
          >
            {locale === "en" ? "Request a Quote" : "اطلب عرض سعر"}
          </Link>
          <LanguageSwitcher locale={locale} className="justify-center" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.menu}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-sm border border-navy-100 text-navy"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
      </button>

      {/*
       * Rendered via a portal directly under document.body — NOT as a
       * normal child here. The Header this button lives in uses
       * `backdrop-blur` (backdrop-filter), which per the CSS spec creates
       * a new containing block for any `position: fixed` descendant. Left
       * as a normal child, this drawer's `fixed inset-0` would be
       * confined to the header's own small bounding box instead of the
       * full viewport — the "blank box" instead of a full-screen menu.
       * Portaling to <body> removes it from that containing block so it
       * always covers the full viewport correctly.
       */}
      {mounted && open && createPortal(drawer, document.body)}
    </div>
  );
}
