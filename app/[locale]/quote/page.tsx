import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { company } from "@/data/company";
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
    path: "/quote",
    title: locale === "en" ? "Request a Quote" : "اطلب عرض سعر",
    description:
      locale === "en"
        ? "Request a tailored quotation from Al Maha National Company for construction, trading, or industrial services in Kuwait."
        : "اطلب عرض سعر مخصص من شركة المها الوطنية لخدمات البناء أو التجارة أو الصناعة في الكويت."
  });
}

export default async function QuotePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: dict.quote.title }]} />
      <PageHero eyebrow={dict.common.getQuote} title={dict.quote.title} description={dict.quote.subtitle} />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-center text-sm leading-relaxed text-navy-500">
              {dict.quote.intro}
            </p>
            <div className="rounded-sm border border-navy-50 bg-white p-6 shadow-card sm:p-10">
              <QuoteForm locale={locale} />
            </div>
            <p className="mt-6 text-center text-xs text-navy-400">
              {locale === "en"
                ? `Prefer to talk directly? Call us at ${company.phoneDisplay}.`
                : `تفضلون التحدث مباشرة؟ اتصلوا بنا على ${company.phoneDisplay}.`}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
