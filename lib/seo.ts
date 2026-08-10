import type { Metadata } from "next";
import { company } from "@/data/company";
import type { Locale } from "@/lib/i18n";

type BuildMetaArgs = {
  locale: Locale;
  path: string; // path WITHOUT locale prefix, e.g. "/about" or "" for home
  title: string;
  description: string;
  noIndex?: boolean;
};

export function buildMetadata({
  locale,
  path,
  title,
  description,
  noIndex
}: BuildMetaArgs): Metadata {
  const cleanPath = path === "/" ? "" : path;
  const enUrl = `${company.siteUrl}/en${cleanPath}`;
  const arUrl = `${company.siteUrl}/ar${cleanPath}`;
  const canonical = locale === "en" ? enUrl : arUrl;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        ar: arUrl,
        "x-default": enUrl
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName:
        locale === "en" ? company.nameEn : company.nameAr,
      locale: locale === "en" ? "en_US" : "ar_KW",
      type: "website",
      images: [
        {
          url: `${company.siteUrl}/brand/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: company.nameEn
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${company.siteUrl}/brand/og-image.jpg`]
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true }
  };
}
