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
    path: "/mission",
    title: locale === "en" ? "Our Mission" : "رسالتنا",
    description:
      locale === "en"
        ? "Al Maha National Company's mission, principles and commitment to clients across Kuwait."
        : "رسالة شركة المها الوطنية ومبادئها والتزامها تجاه العملاء في جميع أنحاء الكويت."
  });
}

const principlesEn = [
  { title: "Commit Realistically", desc: "We only commit to scopes, timelines and terms we can genuinely deliver." },
  { title: "Communicate Clearly", desc: "Clients always know the status of their project, order or shipment." },
  { title: "Execute Consistently", desc: "The same standard of work applies whether the engagement is large or small." },
  { title: "Stand Behind Our Work", desc: "We remain accountable after delivery, not just during it." }
];
const principlesAr = [
  { title: "الالتزام بواقعية", desc: "لا نلتزم إلا بنطاقات وجداول زمنية وشروط قادرون فعلياً على تنفيذها." },
  { title: "التواصل بوضوح", desc: "يعرف عملاؤنا دائماً حالة مشروعهم أو طلبهم أو شحنتهم." },
  { title: "التنفيذ بثبات", desc: "يُطبَّق نفس معيار العمل سواء كان التعامل كبيراً أو صغيراً." },
  { title: "الوقوف خلف عملنا", desc: "نظل مسؤولين بعد التسليم، وليس فقط أثناءه." }
];

export default async function MissionPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const principles = locale === "en" ? principlesEn : principlesAr;

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Mission" : "رسالتنا" }]} />
      <PageHero
        eyebrow={locale === "en" ? "What Drives Us" : "ما يحركنا"}
        title={locale === "en" ? "Our Mission" : "رسالتنا"}
        description={
          locale === "en"
            ? "To deliver construction, trading and industrial services that clients can depend on — backed by realistic commitments, transparent communication and consistent quality."
            : "تقديم خدمات بناء وتجارة وصناعة يمكن للعملاء الاعتماد عليها — مدعومة بالتزامات واقعية وتواصل شفاف وجودة متسقة."
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={locale === "en" ? "Client Commitment" : "التزامنا تجاه العملاء"}
            title={locale === "en" ? "The Principles Behind Our Mission" : "المبادئ وراء رسالتنا"}
            align="center"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <div key={i} className="rounded-sm border border-navy-50 bg-white p-6 text-center shadow-card">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold-700">
                  {i + 1}
                </div>
                <h3 className="font-serif text-base font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        locale={locale}
        title={locale === "en" ? "Experience our approach firsthand" : "جرّبوا منهجيتنا بأنفسكم"}
        description={
          locale === "en"
            ? "Send us your requirement and see how we put our mission into practice."
            : "أرسلوا لنا متطلباتكم وشاهدوا كيف نطبق رسالتنا عملياً."
        }
        primaryLabel={dict.common.getQuote}
        secondaryLabel={dict.common.contactUs}
      />
    </>
  );
}
