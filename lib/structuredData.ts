import { company } from "@/data/company";
import type { Locale } from "@/lib/i18n";

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: locale === "en" ? company.nameEn : company.nameAr,
    url: `${company.siteUrl}/${locale}`,
    logo: `${company.siteUrl}/brand/logo-almaha-full.png`,
    image: `${company.siteUrl}/brand/logo-almaha-full.png`,
    telephone: company.phoneDisplay,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "en" ? company.addressEn : company.addressAr,
      addressLocality: locale === "en" ? company.city : company.cityAr,
      addressCountry: "KW"
    }
  };
}

export function localBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: locale === "en" ? company.nameEn : company.nameAr,
    url: `${company.siteUrl}/${locale}`,
    image: `${company.siteUrl}/brand/logo-almaha-full.png`,
    telephone: company.phoneDisplay,
    email: company.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "en" ? company.addressEn : company.addressAr,
      addressLocality: locale === "en" ? company.city : company.cityAr,
      addressCountry: "KW"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.lat,
      longitude: company.geo.lng
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      opens: "08:00",
      closes: "18:00"
    }
  };
}

export function breadcrumbSchema(
  locale: Locale,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${company.siteUrl}/${locale}${item.path}`
    }))
  };
}

export function serviceSchema(
  locale: Locale,
  service: { title: string; description: string; slug: string }
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: locale === "en" ? company.nameEn : company.nameAr
    },
    areaServed: {
      "@type": "Country",
      name: "Kuwait"
    },
    url: `${company.siteUrl}/${locale}/services/${service.slug}`
  };
}
