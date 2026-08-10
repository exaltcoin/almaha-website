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
    path: "/vision",
    title: locale === "en" ? "Our Vision" : "رؤيتنا",
    description:
      locale === "en"
        ? "Al Maha National Company's long-term vision for growth across construction, trading and industrial services in Kuwait."
        : "رؤية شركة المها الوطنية طويلة الأمد للنمو في خدمات البناء والتجارة والصناعة في الكويت."
  });
}

const pillarsEn = [
  { title: "Regional Reach", desc: "Grow from a trusted Kuwait-based partner into a recognized name across neighboring markets, without compromising on quality of execution." },
  { title: "Integrated Capability", desc: "Continue building the breadth of services under one roof, so clients spend less time coordinating vendors and more time on their core business." },
  { title: "Sustainable Practices", desc: "Expand our recycling and material recovery capabilities as part of a broader commitment to responsible industrial practice." },
  { title: "People & Expertise", desc: "Invest in the people who deliver our work, building deep expertise across every service line we operate." }
];
const pillarsAr = [
  { title: "امتداد إقليمي", desc: "النمو من شريك كويتي موثوق إلى اسم معروف في الأسواق المجاورة، دون المساس بجودة التنفيذ." },
  { title: "قدرات متكاملة", desc: "الاستمرار في بناء اتساع الخدمات تحت مظلة واحدة، بحيث يقضي العملاء وقتاً أقل في تنسيق الموردين ووقتاً أكبر في أعمالهم الأساسية." },
  { title: "ممارسات مستدامة", desc: "توسيع قدراتنا في إعادة التدوير واسترداد المواد كجزء من التزام أوسع بالممارسة الصناعية المسؤولة." },
  { title: "الأفراد والخبرة", desc: "الاستثمار في الأفراد الذين ينفذون أعمالنا، وبناء خبرة عميقة في كل خط خدمة نديره." }
];

export default async function VisionPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const pillars = locale === "en" ? pillarsEn : pillarsAr;

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Vision" : "رؤيتنا" }]} />
      <PageHero
        eyebrow={locale === "en" ? "Looking Ahead" : "نظرة إلى المستقبل"}
        title={locale === "en" ? "Our Vision" : "رؤيتنا"}
        description={
          locale === "en"
            ? "To be Kuwait's most reliable integrated partner for construction, trading and industrial services — trusted for consistent quality, transparent dealing and long-term partnership."
            : "أن نكون الشريك المتكامل الأكثر موثوقية في الكويت لخدمات البناء والتجارة والصناعة — موثوقين بجودة متسقة وتعامل شفاف وشراكة طويلة الأمد."
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={locale === "en" ? "Our Direction" : "وجهتنا"}
            title={locale === "en" ? "The Pillars of Our Vision" : "ركائز رؤيتنا"}
            align="center"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <div key={i} className="flex gap-4 rounded-sm border border-navy-50 bg-white p-6 shadow-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-gold-400">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        locale={locale}
        title={locale === "en" ? "Be part of our journey" : "كونوا جزءاً من مسيرتنا"}
        description={
          locale === "en"
            ? "Partner with Al Maha for your next project or trading requirement."
            : "تعاونوا مع المها في مشروعكم القادم أو متطلباتكم التجارية."
        }
        primaryLabel={dict.common.getQuote}
        secondaryLabel={dict.common.contactUs}
      />
    </>
  );
}
