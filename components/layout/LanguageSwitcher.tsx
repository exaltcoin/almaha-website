"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { otherLocale, localizePath, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({
  locale,
  className = ""
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname() || `/${locale}`;
  const target = otherLocale(locale);
  const href = localizePath(pathname, target);

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-sm border border-navy-100 px-3 py-1.5 text-sm font-medium text-navy-700 transition-colors hover:border-gold hover:text-navy ${className}`}
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M2.5 10h15M10 2.5c2 2.2 3 4.8 3 7.5s-1 5.3-3 7.5c-2-2.2-3-4.8-3-7.5s1-5.3 3-7.5Z" />
      </svg>
      {target === "ar" ? "العربية" : "English"}
    </Link>
  );
}
