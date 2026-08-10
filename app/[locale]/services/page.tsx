import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CTA } from "@/components/sections/CTA";
import { services } from "@/data/services";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata } from "@/lib/seo";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return buildMetadata({
    locale,
    path: "/services",
    title: locale === "en" ? "Our Services" : "خدماتنا",
    description:
      locale === "en"
        ? "Explore Al Maha National Company's full range of services: construction & contracting, aluminum & steel works, scrap trading, import/export, spare parts and logistics in Kuwait."
        : "تعرّف على المجموعة الكاملة من خدمات شركة المها الوطنية: البناء والمقاولات وأعمال الألمنيوم والحديد وتجارة الخردة والاستيراد والتصدير وقطع الغيار واللوجستيات في الكويت."
  });
}

export default async function ServicesIndexPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: dict.common.ourServices }]} />
      <PageHero
        eyebrow={locale === "en" ? "What We Do" : "ماذا نقدم"}
        title={locale === "en" ? "Our Services" : "خدماتنا"}
        description={
          locale === "en"
            ? "A single, capable partner across construction, trading, industrial supply and logistics — built to support your project from start to finish."
            : "شريك واحد وقادر في البناء والتجارة والتوريد الصناعي واللوجستيات — مصمم لدعم مشروعكم من البداية إلى النهاية."
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <ServiceGrid services={services} locale={locale} />
        </Container>
      </section>

      <CTA
        locale={locale}
        title={locale === "en" ? "Not sure which service fits your need?" : "لست متأكداً من الخدمة المناسبة لاحتياجكم؟"}
        description={
          locale === "en"
            ? "Tell us about your requirement and we'll point you to the right solution."
            : "أخبرونا بمتطلباتكم وسنوجهكم إلى الحل المناسب."
        }
        primaryLabel={dict.common.getQuote}
        secondaryLabel={dict.common.contactUs}
      />
    </>
  );
}
