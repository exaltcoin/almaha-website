import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { company, whatsappLink } from "@/data/company";
import { getDictionary } from "@/lib/dictionary";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structuredData";
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
    path: "/contact",
    title: locale === "en" ? "Contact Us" : "اتصل بنا",
    description:
      locale === "en"
        ? "Get in touch with Al Maha National Company in Al Jahra, Kuwait — phone, email, WhatsApp and contact form."
        : "تواصلوا مع شركة المها الوطنية في الجهراء، الكويت — هاتف، بريد إلكتروني، واتساب ونموذج تواصل."
  });
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  const mapEmbedSrc = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema(locale, [{ name: dict.contact.title, path: "/contact" }])
          )
        }}
      />
      <Breadcrumbs locale={locale} items={[{ label: dict.contact.title }]} />
      <PageHero
        eyebrow={dict.common.getInTouch}
        title={dict.contact.title}
        description={dict.contact.subtitle}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-5">
                <div className="rounded-sm border border-navy-50 bg-white p-6 shadow-card">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    {dict.common.address}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    {locale === "en" ? company.addressEn : company.addressAr}
                  </p>
                </div>
                <div className="rounded-sm border border-navy-50 bg-white p-6 shadow-card">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    {dict.common.phone}
                  </h3>
                  <a href={`tel:${company.phoneHref}`} className="mt-2 block text-sm font-semibold text-navy hover:text-gold-600">
                    {company.phoneDisplay}
                  </a>
                </div>
                <div className="rounded-sm border border-navy-50 bg-white p-6 shadow-card">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    {dict.common.email}
                  </h3>
                  <a href={`mailto:${company.email}`} className="mt-2 block break-all text-sm font-semibold text-navy hover:text-gold-600">
                    {company.email}
                  </a>
                </div>
                <div className="rounded-sm border border-navy-50 bg-white p-6 shadow-card">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                    {dict.common.workingHours}
                  </h3>
                  <p className="mt-2 text-sm text-navy-600">{dict.common.workingHoursValue}</p>
                </div>
                <a
                  href={whatsappLink(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90"
                >
                  {dict.common.whatsapp}
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-sm border border-navy-50 bg-white p-6 shadow-card sm:p-8">
                <h2 className="mb-6 font-serif text-xl font-bold text-navy">{dict.contact.formTitle}</h2>
                <ContactForm locale={locale} />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="mb-4 font-serif text-lg font-bold text-navy">{dict.common.location}</h3>
            <div className="aspect-video w-full overflow-hidden rounded-sm border border-navy-50 bg-navy-50">
              {mapEmbedSrc ? (
                <iframe
                  src={mapEmbedSrc}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={locale === "en" ? "Al Maha National Company location" : "موقع شركة المها الوطنية"}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center text-sm text-navy-400">
                  <p>
                    {locale === "en"
                      ? "Map preview will appear here once NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL is set in your environment."
                      : "ستظهر معاينة الخريطة هنا فور تعيين NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL في بيئة التشغيل."}
                  </p>
                  <p className="font-medium text-navy-500">
                    {locale === "en" ? company.addressEn : company.addressAr}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
