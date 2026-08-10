import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { locales } from "@/lib/i18n";

const staticPaths = [
  "",
  "/about",
  "/ceo-message",
  "/vision",
  "/mission",
  "/services",
  "/projects",
  "/gallery",
  "/clients",
  "/licenses",
  "/careers",
  "/contact",
  "/quote",
  "/privacy-policy",
  "/terms-conditions"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const servicePaths = services.map((s) => `/services/${s.slug}`);
  const allPaths = [...staticPaths, ...servicePaths];

  const entries: MetadataRoute.Sitemap = [];

  for (const path of allPaths) {
    for (const locale of locales) {
      entries.push({
        url: `${company.siteUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : path.startsWith("/services") ? 0.8 : 0.6,
        alternates: {
          languages: {
            en: `${company.siteUrl}/en${path}`,
            ar: `${company.siteUrl}/ar${path}`
          }
        }
      });
    }
  }

  return entries;
}
