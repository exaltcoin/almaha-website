import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Noto_Kufi_Arabic } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { locales, isLocale, dir, type Locale } from "@/lib/i18n";
import { company } from "@/data/company";
import { organizationSchema } from "@/lib/structuredData";
import "@/app/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap"
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B1F3A"
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";

  const title =
    locale === "en"
      ? "Al Maha National Company for General Trading & Contracting | Kuwait"
      : "شركة المها الوطنية للتجارة العامة والمقاولات | الكويت";
  const description =
    locale === "en"
      ? "Al Maha National Company delivers construction & contracting, aluminum and steel works, scrap trading, import/export, spare parts and logistics services across Kuwait."
      : "تقدم شركة المها الوطنية خدمات البناء والمقاولات وأعمال الألمنيوم والحديد وتجارة الخردة والاستيراد والتصدير وقطع الغيار واللوجستيات في جميع أنحاء الكويت.";

  return {
    metadataBase: new URL(company.siteUrl),
    title: { default: title, template: `%s | ${locale === "en" ? "Al Maha National Company" : "شركة المها الوطنية"}` },
    description,
    icons: {
      icon: [
        { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" }
      ],
      apple: [{ url: "/brand/icon-180.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon.ico"]
    },
    manifest: "/manifest.webmanifest"
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const direction = dir(locale);

  return (
    <html lang={locale} dir={direction}>
      <body
        className={`${playfair.variable} ${inter.variable} ${notoKufiArabic.variable} ${
          locale === "ar" ? "font-arabic" : "font-sans"
        } bg-white text-navy-900 antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema(locale))
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy focus:shadow-elevated"
        >
          {locale === "en" ? "Skip to main content" : "تخطَّ إلى المحتوى الرئيسي"}
        </a>
        <Header locale={locale} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} />
        <WhatsAppButton locale={locale} />
      </body>
    </html>
  );
}
