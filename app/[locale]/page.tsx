import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { StatsShowcase } from "@/components/sections/StatsShowcase";
import { SplitSection } from "@/components/sections/SplitSection";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { CTA } from "@/components/sections/CTA";
import { Container } from "@/components/ui/Container";
import { services } from "@/data/services";
import { company } from "@/data/company";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata } from "@/lib/seo";
import { localBusinessSchema } from "@/lib/structuredData";
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
    path: "/",
    title:
      locale === "en"
        ? "Al Maha National Company | Construction, Trading & Contracting in Kuwait"
        : "شركة المها الوطنية | البناء والتجارة والمقاولات في الكويت",
    description:
      locale === "en"
        ? "Kuwait-based construction, trading and industrial partner offering contracting, aluminum & steel works, scrap trading, import/export, spare parts and logistics."
        : "شريككم الكويتي في البناء والتجارة والصناعة، نقدم المقاولات وأعمال الألمنيوم والحديد وتجارة الخردة والاستيراد والتصدير وقطع الغيار واللوجستيات."
  });
}

const strengthsEn = [
  { title: "Reliable Execution", desc: "Disciplined project management and consistent, on-schedule delivery across every engagement." },
  { title: "Broad Capability", desc: "One partner spanning construction, trading, industrial supply and logistics — fewer vendors, less friction." },
  { title: "Kuwait Market Knowledge", desc: "A Kuwait-based team with practical understanding of local requirements, suppliers and site conditions." },
  { title: "Transparent Partnership", desc: "Clear scopes, honest communication and commercial terms clients can plan around." }
];
const strengthsAr = [
  { title: "تنفيذ موثوق", desc: "إدارة مشاريع منضبطة وتسليم متسق وفي الوقت المحدد في كل تعامل." },
  { title: "قدرات واسعة", desc: "شريك واحد يغطي البناء والتجارة والتوريد الصناعي واللوجستيات — موردون أقل واحتكاك أقل." },
  { title: "معرفة بالسوق الكويتي", desc: "فريق مقيم في الكويت ذو فهم عملي للمتطلبات المحلية والموردين وظروف المواقع." },
  { title: "شراكة شفافة", desc: "نطاقات عمل واضحة وتواصل صادق وشروط تجارية يمكن للعملاء التخطيط بناءً عليها." }
];

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const strengths = locale === "en" ? strengthsEn : strengthsAr;
  const featured = services.slice(0, 6);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(locale)) }}
      />

      <Hero
        locale={locale}
        eyebrow={dict.hero.eyebrow}
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        ctaPrimary={dict.hero.ctaPrimary}
        ctaSecondary={dict.hero.ctaSecondary}
      />

      {/* Who We Are — full-width editorial split, not a boxed card */}
      <SplitSection
        eyebrow={locale === "en" ? "Who We Are" : "من نحن"}
        title={
          locale === "en"
            ? "A Kuwait-based partner across construction, trading and industrial services"
            : "شريككم الكويتي في البناء والتجارة والخدمات الصناعية"
        }
        image="/images/general/about.jpg"
        imageAlt={locale === "en" ? "Al Maha National Company operations" : "عمليات شركة المها الوطنية"}
      >
        <p>
          {locale === "en"
            ? "Al Maha National Company for General Trading & Contracting brings together construction and contracting, aluminum and steel works, scrap trading and recycling, import/export, spare parts and logistics under one accountable partner."
            : "تجمع شركة المها الوطنية للتجارة العامة والمقاولات بين البناء والمقاولات وأعمال الألمنيوم والحديد وتجارة الخردة وإعادة التدوير والاستيراد والتصدير وقطع الغيار واللوجستيات تحت مظلة شريك واحد مسؤول."}
        </p>
        <p>
          {locale === "en"
            ? "We work with residential, commercial and industrial clients across Kuwait, focused on dependable execution and clear communication at every stage."
            : "نعمل مع العملاء السكنيين والتجاريين والصناعيين في جميع أنحاء الكويت، مع التركيز على التنفيذ الموثوق والتواصل الواضح في كل مرحلة."}
        </p>
        <Link
          href={`/${locale}/about`}
          className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold text-navy hover:text-gold-600"
        >
          {locale === "en" ? "More About Al Maha" : "المزيد عن المها"}
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rtl:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </SplitSection>

      {/* Editorial stats band */}
      <StatsShowcase
        items={
          locale === "en"
            ? [
                { value: "13+", label: "Service Lines" },
                { value: "1", label: "Accountable Partner" },
                { value: "KW", label: "Kuwait-Based" },
                { value: "B2B", label: "& Government Ready" }
              ]
            : [
                { value: "+13", label: "خط خدمة" },
                { value: "1", label: "شريك مسؤول" },
                { value: "الكويت", label: "مقرنا" },
                { value: "B2B", label: "وجاهز حكومياً" }
              ]
        }
      />

      {/* Services — seamless editorial tile grid with index numerals */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={locale === "en" ? "What We Do" : "ماذا نقدم"}
            title={locale === "en" ? "Our Business Sectors" : "قطاعات أعمالنا"}
            description={
              locale === "en"
                ? "From groundbreaking to global sourcing — explore the services that make Al Maha a single, capable partner."
                : "من بداية الحفر إلى التوريد العالمي — تعرّف على الخدمات التي تجعل من المها شريكاً واحداً وقادراً."
            }
          />
          <div className="mt-12">
            <ServiceGrid services={featured} locale={locale} showIndex />
          </div>
          <div className="mt-10 text-center">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 border border-navy/20 px-7 py-3.5 text-sm font-semibold tracking-wide text-navy transition-colors hover:border-gold hover:bg-navy-50/50"
            >
              {dict.common.allServices}
            </Link>
          </div>
        </Container>
      </section>

      {/* Strengths — reversed split, dark tone for rhythm contrast */}
      <section className="bg-navy-900 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={locale === "en" ? "Why Al Maha" : "لماذا المها"}
            title={locale === "en" ? "Built on Reliability and Broad Capability" : "قائمون على الموثوقية والقدرات الواسعة"}
            align="center"
          />
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s, i) => (
              <div key={i} className="relative border-t border-white/10 pt-6">
                <span className="numeral-outline absolute -top-2 end-0 font-serif text-4xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="max-w-[85%] font-serif text-base font-bold text-white">{s.title}</h3>
                <p className="mt-2.5 max-w-[90%] text-sm leading-relaxed text-navy-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Projects teaser */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={locale === "en" ? "Our Work" : "أعمالنا"}
              title={locale === "en" ? "Featured Projects" : "مشاريع مختارة"}
            />
            <Link
              href={`/${locale}/projects`}
              className="shrink-0 text-sm font-semibold text-navy hover:text-gold-600"
            >
              {dict.common.viewAll}
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(locale === "en"
              ? [
                  { title: "Commercial Building Fit-Out", category: "Construction", location: "Al Jahra, Kuwait", image: "/images/projects/sample-1.jpg" },
                  { title: "Aluminum Facade Installation", category: "Aluminum Works", location: "Kuwait City", image: "/images/projects/sample-2.jpg" },
                  { title: "Industrial Site Scrap Program", category: "Scrap Trading", location: "Shuwaikh Industrial", image: "/images/projects/sample-3.jpg" }
                ]
              : [
                  { title: "تجهيز مبنى تجاري", category: "البناء", location: "الجهراء، الكويت", image: "/images/projects/sample-1.jpg" },
                  { title: "تركيب واجهات ألمنيوم", category: "أعمال الألمنيوم", location: "مدينة الكويت", image: "/images/projects/sample-2.jpg" },
                  { title: "برنامج خردة لموقع صناعي", category: "تجارة الخردة", location: "الشويخ الصناعية", image: "/images/projects/sample-3.jpg" }
                ]
            ).map((p, i) => (
              <ProjectCard key={i} title={p.title} category={p.category} location={p.location} image={p.image} />
            ))}
          </div>
        </Container>
      </section>

      <CTA
        locale={locale}
        title={locale === "en" ? "Ready to start your project?" : "جاهزون لبدء مشروعكم؟"}
        description={
          locale === "en"
            ? "Tell us what you need — construction, trading or industrial support — and our team will respond promptly."
            : "أخبرونا بما تحتاجونه — بناء أو تجارة أو دعم صناعي — وسيستجيب فريقنا بسرعة."
        }
        primaryLabel={dict.common.getQuote}
        secondaryLabel={`${company.phoneDisplay}`}
      />
    </>
  );
}
