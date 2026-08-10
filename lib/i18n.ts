export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "ar" : "en";
}

/** Swap the leading /en or /ar segment of a path for the given locale. */
export function localizePath(path: string, locale: Locale): string {
  const segments = path.split("/").filter(Boolean);
  const first = segments[0];
  if (first && isLocale(first)) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  return "/" + segments.join("/");
}
