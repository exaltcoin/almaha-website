"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/services";
import type { Locale } from "@/lib/i18n";

export function FAQ({ items, locale }: { items: FaqItem[]; locale: Locale }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-navy-100">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="py-1">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-start gap-5 py-5 text-start"
              aria-expanded={isOpen}
            >
              <span className="mt-0.5 shrink-0 font-serif text-lg font-bold text-gold/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-serif text-lg font-semibold text-navy">
                {locale === "en" ? item.q.en : item.q.ar}
              </span>
              <span
                className={`mt-1 shrink-0 text-xl leading-none text-gold-600 transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="ms-[2.75rem] pb-6 text-sm leading-relaxed text-navy-500 sm:max-w-2xl">
                {locale === "en" ? item.a.en : item.a.ar}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
