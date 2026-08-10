import en from "@/locales/en.json";
import ar from "@/locales/ar.json";
import type { Locale } from "@/lib/i18n";

const dictionaries = { en, ar };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type Dictionary = typeof en;
