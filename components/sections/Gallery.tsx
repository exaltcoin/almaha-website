"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";

export type GalleryImage = {
  src: string;
  label: string;
};

export function Gallery({
  items,
  locale
}: {
  items: GalleryImage[];
  locale: Locale;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      // Arrow direction follows visual/reading direction: in RTL, the
      // "next" image is to the left, so ArrowLeft advances forward.
      if (e.key === "ArrowRight") locale === "ar" ? showPrev() : showNext();
      if (e.key === "ArrowLeft") locale === "ar" ? showNext() : showPrev();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, showPrev, showNext, locale]);

  // Resolve to a single stable reference so TypeScript can narrow it once
  // (repeated `items[openIndex]` lookups aren't narrowed under
  // noUncheckedIndexedAccess, since each is a fresh indexed access).
  const activeItem = openIndex !== null ? items[openIndex] : undefined;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative aspect-square w-full overflow-hidden rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={item.label}
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-navy-900/0 transition-colors group-hover:bg-navy-900/20" />
            <span className="absolute bottom-0 start-0 end-0 translate-y-full bg-navy-900/80 px-3 py-2 text-xs font-medium text-white transition-transform duration-200 group-hover:translate-y-0">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={locale === "en" ? "Image viewer" : "عارض الصور"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={locale === "en" ? "Close" : "إغلاق"}
            className="absolute end-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              locale === "ar" ? showNext() : showPrev();
            }}
            aria-label={locale === "en" ? "Previous image" : "الصورة السابقة"}
            className="absolute start-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold sm:start-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeItem.src}
              alt={activeItem.label}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <span className="absolute bottom-0 start-0 end-0 bg-navy-900/80 px-4 py-3 text-sm font-medium text-white">
              {activeItem.label}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              locale === "ar" ? showPrev() : showNext();
            }}
            aria-label={locale === "en" ? "Next image" : "الصورة التالية"}
            className="absolute end-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold sm:end-6"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
