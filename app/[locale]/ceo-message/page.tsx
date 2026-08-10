import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { CTA } from "@/components/sections/CTA";
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
    path: "/ceo-message",
    title: locale === "en" ? "CEO Message" : "كلمة الرئيس التنفيذي",
    description:
      locale === "en"
        ? "A message from Mohammad Hussain, CEO of Al Maha National Company, on the company's approach and commitment to clients."
        : "كلمة من محمد حسين، الرئيس التنفيذي لشركة المها الوطنية، حول منهجية الشركة والتزامها تجاه عملائها."
  });
}

export default async function CeoMessagePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  const paragraphsEn = [
    "At Al Maha National Company, our philosophy is straightforward: earn every client's trust through consistent, dependable delivery. Whether we are managing a construction contract, sourcing spare parts, or coordinating a trading shipment, our team approaches each engagement with the same discipline and attention to detail.",
    "Kuwait's construction, trading and industrial sectors demand partners who understand local conditions and deliver on their commitments. We built Al Maha to be that partner — spanning construction and contracting, aluminum and steel works, scrap trading, import and export, spare parts, and logistics, so our clients can rely on a single, capable point of contact.",
    "We are proud of the relationships we have built and remain focused on growing responsibly, investing in our team, and maintaining the standards that our clients expect on every project, large or small.",
    "We look forward to working with you."
  ];
  const paragraphsAr = [
    "في شركة المها الوطنية، فلسفتنا واضحة: كسب ثقة كل عميل من خلال التسليم المتسق والموثوق. سواء كنا ندير عقد بناء، أو نوفر قطع غيار، أو ننسق شحنة تجارية، يتعامل فريقنا مع كل مهمة بنفس الانضباط والاهتمام بالتفاصيل.",
    "تتطلب قطاعات البناء والتجارة والصناعة في الكويت شركاء يفهمون الظروف المحلية ويفون بالتزاماتهم. أسسنا المها لتكون ذلك الشريك — بتغطية البناء والمقاولات وأعمال الألمنيوم والحديد وتجارة الخردة والاستيراد والتصدير وقطع الغيار واللوجستيات، بحيث يمكن لعملائنا الاعتماد على جهة اتصال واحدة قادرة.",
    "نحن فخورون بالعلاقات التي بنيناها ونظل ملتزمين بالنمو المسؤول والاستثمار في فريقنا والحفاظ على المعايير التي يتوقعها عملاؤنا في كل مشروع، كبيراً كان أم صغيراً.",
    "نتطلع للعمل معكم."
  ];
  const paragraphs = locale === "en" ? paragraphsEn : paragraphsAr;

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "CEO Message" : "كلمة الرئيس التنفيذي" }]} />
      <PageHero
        eyebrow={locale === "en" ? "Leadership" : "القيادة"}
        title={locale === "en" ? "A Message from Our CEO" : "كلمة من رئيسنا التنفيذي"}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
                <Image
                  src="/images/general/ceo-monogram.jpg"
                  alt={
                    locale === "en"
                      ? "Mohammad Hussain, CEO of Al Maha National Company"
                      : "محمد حسين، الرئيس التنفيذي لشركة المها الوطنية"
                  }
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-6">
                <p className="font-serif text-xl font-bold text-navy">
                  {locale === "en" ? company.ceoNameEn : company.ceoNameAr}
                </p>
                <p className="mt-1 text-sm text-gold-600">
                  {locale === "en" ? company.ceoTitleEn : company.ceoTitleAr}
                </p>
                <p className="mt-4 text-sm text-navy-400">
                  {locale === "en" ? company.nameEn : company.nameAr}
                </p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-5 text-base leading-relaxed text-navy-600">
                {paragraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "font-serif text-lg text-navy" : ""}>
                    {p}
                  </p>
                ))}
                <p className="mt-4 font-serif text-lg font-bold text-navy">
                  — {locale === "en" ? company.ceoNameEn : company.ceoNameAr}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTA
        locale={locale}
        title={locale === "en" ? "Have a project in mind?" : "لديكم مشروع تريدون مناقشته؟"}
        description={
          locale === "en"
            ? "Our leadership and team are ready to discuss how Al Maha can support your requirements."
            : "قيادتنا وفريقنا جاهزون لمناقشة كيف يمكن للمها دعم متطلباتكم."
        }
        primaryLabel={dict.common.getQuote}
        secondaryLabel={dict.common.contactUs}
      />
    </>
  );
}
