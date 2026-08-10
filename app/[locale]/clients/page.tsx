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
    path: "/clients",
    title: locale === "en" ? "Clients & Partners" : "العملاء والشركاء",
    description:
      locale === "en"
        ? "Al Maha National Company works with residential, commercial and industrial clients across Kuwait."
        : "تعمل شركة المها الوطنية مع العملاء السكنيين والتجاريين والصناعيين في جميع أنحاء الكويت."
  });
}

const sectorsEn = [
  { title: "Residential Developers", desc: "Villa owners and residential development projects across Kuwait." },
  { title: "Commercial Property Owners", desc: "Retail, office and mixed-use commercial building owners." },
  { title: "Industrial Facility Operators", desc: "Manufacturing, warehousing and industrial site operators." },
  { title: "Government & Institutional", desc: "Public sector and institutional procurement and contracting." },
  { title: "Automotive & Workshops", desc: "Workshops and resellers sourcing spare parts and components." },
  { title: "Logistics & Trading Partners", desc: "Businesses relying on our import/export and transport network." }
];
const sectorsAr = [
  { title: "المطورون السكنيون", desc: "أصحاب الفلل ومشاريع التطوير السكني في جميع أنحاء الكويت." },
  { title: "ملاك العقارات التجارية", desc: "أصحاب المباني التجارية للتجزئة والمكاتب والاستخدامات المختلطة." },
  { title: "مشغلو المنشآت الصناعية", desc: "مشغلو منشآت التصنيع والتخزين والمواقع الصناعية." },
  { title: "الجهات الحكومية والمؤسسية", desc: "المشتريات والمقاولات للقطاع العام والمؤسسات." },
  { title: "الورش والسيارات", desc: "الورش وتجار إعادة البيع الذين يوردون قطع الغيار والمكونات." },
  { title: "شركاء اللوجستيات والتجارة", desc: "الأعمال التي تعتمد على شبكتنا في الاستيراد والتصدير والنقل." }
];

export default async function ClientsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const sectors = locale === "en" ? sectorsEn : sectorsAr;

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Clients & Partners" : "العملاء والشركاء" }]} />
      <PageHero
        eyebrow={locale === "en" ? "Who We Work With" : "مع من نعمل"}
        title={locale === "en" ? "Clients & Partners" : "العملاء والشركاء"}
        description={
          locale === "en"
            ? "We're building lasting relationships with clients and partners across Kuwait's construction, trading and industrial sectors."
            : "نبني علاقات دائمة مع العملاء والشركاء في قطاعات البناء والتجارة والصناعة في الكويت."
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={locale === "en" ? "Sectors We Serve" : "القطاعات التي نخدمها"}
            title={
              locale === "en"
                ? "A Growing Network of Clients and Partners"
                : "شبكة متنامية من العملاء والشركاء"
            }
          />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s, i) => (
              <div key={i} className="rounded-sm border border-navy-50 bg-white p-6 shadow-card">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-gold-400">
                  {i + 1}
                </div>
                <h3 className="font-serif text-base font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border border-navy-50 bg-navy-50/40 p-6 text-center sm:p-8">
            <p className="text-sm font-medium text-navy-600">
              {locale === "en"
                ? "Client and partner information is displayed only where authorized."
                : "يتم عرض معلومات العملاء والشركاء فقط بموجب تفويض رسمي منهم."}
            </p>
            <p className="mt-2 text-sm text-navy-400">
              {locale === "en"
                ? "As formal agreements are reached with clients and partners who wish to be featured, their names and logos will be added here with proper authorization."
                : "مع إتمام الاتفاقيات الرسمية مع العملاء والشركاء الراغبين في الظهور، سيتم إضافة أسمائهم وشعاراتهم هنا بموافقة رسمية منهم."}
            </p>
          </div>
        </Container>
      </section>

      <CTA
        locale={locale}
        title={locale === "en" ? "Interested in becoming a partner?" : "مهتمون بأن تصبحوا شريكاً؟"}
        description={
          locale === "en"
            ? "We welcome conversations with potential clients and partners across our service areas."
            : "نرحب بالتواصل مع العملاء والشركاء المحتملين في جميع مجالات خدماتنا."
        }
        primaryLabel={dict.common.contactUs}
        secondaryLabel={dict.common.getQuote}
      />
    </>
  );
}
