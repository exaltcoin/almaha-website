import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function Breadcrumbs({
  locale,
  items
}: {
  locale: Locale;
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-navy-50 bg-navy-50/40">
      <div className="mx-auto max-w-8xl px-5 py-3 sm:px-8 lg:px-12">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-navy-400">
          <li>
            <Link href={`/${locale}`} className="hover:text-gold-600">
              {locale === "en" ? "Home" : "الرئيسية"}
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-navy-200">/</span>
              {item.href ? (
                <Link href={item.href} className="hover:text-gold-600">
                  {item.label}
                </Link>
              ) : (
                <span className="text-navy-600">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
