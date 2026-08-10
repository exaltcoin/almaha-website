import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SplitSection } from "@/components/sections/SplitSection";
import { Container } from "@/components/ui/Container";
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
    path: "/about",
    title: locale === "en" ? "About Us" : "من نحن",
    description:
      locale === "en"
        ? "Learn about Al Maha National Company's business focus, values and approach to construction, trading and industrial services in Kuwait."
        : "تعرّف على تركيز أعمال شركة المها الوطنية وقيمها ومنهجيتها في خدمات البناء والتجارة والصناعة في الكويت."
  });
}

const valuesEn = [
  { title: "Reliability", desc: "We deliver what we commit to, on the timeline we agree, with clear communication throughout." },
  { title: "Integrity", desc: "Transparent commercial terms and honest assessments guide every client relationship." },
  { title: "Quality", desc: "From site work to trading transactions, we hold our output to a professional, verifiable standard." },
  { title: "Adaptability", desc: "Our breadth across construction, trading and logistics lets us respond to varied client needs." }
];
const valuesAr = [
  { title: "الموثوقية", desc: "ننفذ ما نلتزم به، وفق الجدول الزمني المتفق عليه، مع تواصل واضح طوال الوقت." },
  { title: "النزاهة", desc: "شروط تجارية شفافة وتقييمات صادقة توجّه كل علاقة مع العملاء." },
  { title: "الجودة", desc: "من أعمال الموقع إلى المعاملات التجارية، نلتزم بمعيار احترافي وقابل للتحقق." },
  { title: "المرونة", desc: "اتساع نطاق أعمالنا في البناء والتجارة واللوجستيات يتيح لنا الاستجابة لاحتياجات العملاء المتنوعة." }
];

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const values = locale === "en" ? valuesEn : valuesAr;

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "About Us" : "من نحن" }]} />
      <PageHero
        eyebrow={locale === "en" ? "About Al Maha" : "عن المها"}
        title={locale === "en" ? "A Trusted Partner in Trading & Contracting" : "شريك موثوق في التجارة والمقاولات"}
        description={
          locale === "en"
            ? "Al Maha National Company for General Trading & Contracting serves clients across Kuwait with a broad, integrated set of construction, trading and industrial capabilities."
            : "تخدم شركة المها الوطنية للتجارة العامة والمقاولات العملاء في جميع أنحاء الكويت بمجموعة واسعة ومتكاملة من القدرات في البناء والتجارة والصناعة."
        }
      />

      <SplitSection
        eyebrow={locale === "en" ? "Corporate Profile" : "الملف التعريفي"}
        title={locale === "en" ? "Our Business Focus" : "تركيز أعمالنا"}
        image="/images/general/about.jpg"
        imageAlt={locale === "en" ? "Al Maha National Company operations" : "عمليات شركة المها الوطنية"}
      >
        <p>
          {locale === "en"
            ? "Al Maha National Company operates across construction and contracting, aluminum and steel fabrication, scrap trading and recycling, import and export, spare parts trading, and logistics and warehousing. This breadth lets us support clients through the full lifecycle of a project or trading relationship — often as a single accountable partner rather than a chain of separate vendors."
            : "تعمل شركة المها الوطنية في مجالات البناء والمقاولات، وتصنيع الألمنيوم والحديد، وتجارة الخردة وإعادة التدوير، والاستيراد والتصدير، وتجارة قطع الغيار، واللوجستيات والتخزين. يتيح لنا هذا الاتساع دعم العملاء خلال دورة الحياة الكاملة للمشروع أو العلاقة التجارية — غالباً كشريك واحد مسؤول بدلاً من سلسلة من الموردين المنفصلين."}
        </p>
        <p>
          {locale === "en"
            ? "We are based in Al Jahra, Kuwait, and work with residential, commercial, industrial and institutional clients. Our approach centers on realistic planning, transparent commercial terms and consistent follow-through."
            : "يقع مقرنا في الجهراء، الكويت، ونعمل مع العملاء السكنيين والتجاريين والصناعيين والمؤسسيين. تتمحور منهجيتنا حول التخطيط الواقعي والشروط التجارية الشفافة والمتابعة المستمرة."}
        </p>
      </SplitSection>

      <SplitSection
        eyebrow={locale === "en" ? "Our Approach" : "منهجيتنا"}
        title={locale === "en" ? "Operational Commitment to Quality" : "التزام تشغيلي بالجودة"}
        image="/images/services/construction-contracting.jpg"
        imageAlt={locale === "en" ? "Al Maha National Company site management" : "إدارة المواقع لدى شركة المها الوطنية"}
        reverse
        tone="navy"
      >
        <p>
          {locale === "en"
            ? "Every engagement — whether a construction contract, a trading transaction or a logistics arrangement — is managed with clear scopes, defined timelines and a named point of contact. We coordinate closely with client teams, consultants and suppliers to keep projects moving and commitments met."
            : "تتم إدارة كل تعامل — سواء كان عقد بناء أو معاملة تجارية أو ترتيب لوجستي — بنطاقات عمل واضحة وجداول زمنية محددة ونقطة اتصال معروفة. ننسق عن كثب مع فرق العملاء والاستشاريين والموردين للحفاظ على تقدم المشاريع والوفاء بالالتزامات."}
        </p>
        <p>
          {locale === "en"
            ? "As we grow, we intend to formalize additional certifications and licenses relevant to our expanding scope of work, and will present them on our Licenses & Certifications page as they are obtained."
            : "مع نمونا، نعتزم استكمال التراخيص والشهادات الإضافية ذات الصلة بنطاق عملنا المتوسع، وسنعرضها في صفحة التراخيص والشهادات فور الحصول عليها."}
        </p>
      </SplitSection>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={locale === "en" ? "What Guides Us" : "ما يوجهنا"}
            title={locale === "en" ? "Our Values" : "قيمنا"}
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={i} className="relative border-t border-navy-100 pt-6 text-center">
                <span className="numeral-outline absolute -top-3 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 font-serif text-4xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-base font-bold text-navy">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-navy-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        locale={locale}
        title={locale === "en" ? "Want to know more about working with us?" : "تريد معرفة المزيد عن العمل معنا؟"}
        description={
          locale === "en"
            ? "Reach out to discuss your project or requirement with our team."
            : "تواصلوا معنا لمناقشة مشروعكم أو متطلباتكم مع فريقنا."
        }
        primaryLabel={dict.common.getQuote}
        secondaryLabel={dict.common.contactUs}
      />
    </>
  );
}
