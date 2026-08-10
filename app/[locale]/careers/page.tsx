import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CareerForm } from "@/components/forms/CareerForm";
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
    path: "/careers",
    title: locale === "en" ? "Careers" : "الوظائف",
    description:
      locale === "en"
        ? "Explore career opportunities at Al Maha National Company, a growing Kuwait-based trading and contracting business."
        : "استكشف الفرص الوظيفية في شركة المها الوطنية، شركة تجارة ومقاولات كويتية متنامية."
  });
}

const areasEn = [
  "Construction & Site Supervision",
  "Aluminum & Steel Fabrication",
  "Trading & Procurement",
  "Logistics & Warehousing",
  "Administration & Finance",
  "Sales & Client Relations"
];
const areasAr = [
  "البناء والإشراف على الموقع",
  "تصنيع الألمنيوم والحديد",
  "التجارة والمشتريات",
  "اللوجستيات والمستودعات",
  "الإدارة والمالية",
  "المبيعات وعلاقات العملاء"
];

export default async function CareersPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const areas = locale === "en" ? areasEn : areasAr;

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: dict.careers.title }]} />
      <PageHero
        eyebrow={locale === "en" ? "Join Our Team" : "انضموا إلى فريقنا"}
        title={dict.careers.title}
        description={dict.careers.subtitle}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <SectionHeading
                eyebrow={locale === "en" ? "Business Areas" : "مجالات العمل"}
                title={locale === "en" ? "Where We Hire" : "أين نوظف"}
              />
              <ul className="mt-6 flex flex-col gap-3">
                {areas.map((a, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-sm border border-navy-50 bg-white px-4 py-3 text-sm text-navy-600 shadow-card">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-navy-500">
                {dict.careers.noOpenings}
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-sm border border-navy-50 bg-white p-6 shadow-card sm:p-8">
                <h2 className="mb-6 font-serif text-xl font-bold text-navy">{dict.careers.applyTitle}</h2>
                <CareerForm locale={locale} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
