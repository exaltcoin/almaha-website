import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { CTA } from "@/components/sections/CTA";
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
    path: "/licenses",
    title: locale === "en" ? "Licenses & Certifications" : "التراخيص والشهادات",
    description:
      locale === "en"
        ? "Commercial licenses, approvals and certifications held by Al Maha National Company in Kuwait."
        : "التراخيص التجارية والموافقات والشهادات التي تحملها شركة المها الوطنية في الكويت."
  });
}

export default async function LicensesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Licenses & Certifications" : "التراخيص والشهادات" }]} />
      <PageHero
        eyebrow={locale === "en" ? "Compliance" : "الامتثال"}
        title={locale === "en" ? "Licenses & Certifications" : "التراخيص والشهادات"}
        description={
          locale === "en"
            ? "Al Maha National Company operates as a registered commercial entity in Kuwait, structured to serve construction, trading and industrial clients."
            : "تعمل شركة المها الوطنية ككيان تجاري مسجل في الكويت، ومهيكلة لخدمة عملاء البناء والتجارة والصناعة."
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={locale === "en" ? "Documentation" : "التوثيق"}
            title={
              locale === "en"
                ? "Commercial registration and certification details"
                : "تفاصيل السجل التجاري والشهادات"
            }
            description={
              locale === "en"
                ? "This page is structured to display Al Maha's commercial license number, relevant municipal and industry approvals, and any professional certifications as they are issued or renewed. We present only verified, currently valid documentation."
                : "هذه الصفحة مصممة لعرض رقم السجل التجاري لشركة المها، والموافقات البلدية والقطاعية ذات الصلة، وأي شهادات مهنية فور إصدارها أو تجديدها. نعرض فقط الوثائق الموثقة والسارية حالياً."
            }
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: locale === "en" ? "Commercial License" : "الرخصة التجارية",
                desc: locale === "en" ? "Registered general trading and contracting license, State of Kuwait." : "رخصة تجارة عامة ومقاولات مسجلة، دولة الكويت."
              },
              {
                title: locale === "en" ? "Municipal Approvals" : "الموافقات البلدية",
                desc: locale === "en" ? "Relevant municipal approvals for construction and site operations, added as issued." : "الموافقات البلدية ذات الصلة بعمليات البناء والمواقع، تُضاف فور إصدارها."
              },
              {
                title: locale === "en" ? "Industry Certifications" : "الشهادات القطاعية",
                desc: locale === "en" ? "Professional and safety certifications relevant to our fabrication and contracting work, presented here as obtained." : "الشهادات المهنية وشهادات السلامة ذات الصلة بأعمال التصنيع والمقاولات، تُعرض هنا فور الحصول عليها."
              }
            ].map((item, i) => (
              <div key={i} className="rounded-sm border border-navy-50 bg-white p-6 shadow-card">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-gold-400">
                  <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 2 3 5v5c0 4.2 2.9 7.7 7 8.7 4.1-1 7-4.5 7-8.7V5l-7-3Z" />
                  </svg>
                </div>
                <h3 className="font-serif text-base font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        locale={locale}
        title={locale === "en" ? "Need documentation for a tender or contract?" : "تحتاجون وثائق لعطاء أو عقد؟"}
        description={
          locale === "en"
            ? "Contact us and we'll provide the relevant documentation for your requirement."
            : "تواصلوا معنا وسنوفر لكم الوثائق ذات الصلة بمتطلباتكم."
        }
        primaryLabel={dict.common.contactUs}
        secondaryLabel={dict.common.getQuote}
      />
    </>
  );
}
