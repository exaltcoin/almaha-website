import type { Bi } from "@/data/services";
import type { Locale } from "@/lib/i18n";

export function IndustryShowcase({
  items,
  locale
}: {
  items: Bi[];
  locale: Locale;
}) {
  return (
    <ul className="grid grid-cols-1 gap-0 divide-y divide-navy-100 sm:grid-cols-2 sm:divide-y-0 sm:gap-x-10">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-4 border-navy-100 py-4 sm:border-b"
        >
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
          <span className="font-serif text-base font-medium text-navy">
            {locale === "en" ? item.en : item.ar}
          </span>
        </li>
      ))}
    </ul>
  );
}
