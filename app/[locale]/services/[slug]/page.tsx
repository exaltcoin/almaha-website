import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Container } from "@/components/ui/Container";
import { FAQ } from "@/components/sections/FAQ";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { IndustryShowcase } from "@/components/sections/IndustryShowcase";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { CTA } from "@/components/sections/CTA";
import { services, getService, getRelatedServices } from "@/data/services";
import type { Service } from "@/data/services";
import { getDictionary } from "@/lib/dictionary";
import type { Dictionary } from "@/lib/dictionary";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/structuredData";
import { isLocale, locales, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: locale === "en" ? service.title.en : service.title.ar,
    description: locale === "en" ? service.metaDescription.en : service.metaDescription.ar
  });
}

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const service = getService(slug);
  if (!service) notFound();

  const dict = getDictionary(locale);
  const related = getRelatedServices(service);
  const title = locale === "en" ? service.title.en : service.title.ar;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema(locale, [
              { name: dict.common.ourServices, path: "/services" },
              { name: title, path: `/services/${slug}` }
            ])
          )
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(locale, {
              title,
              description: locale === "en" ? service.metaDescription.en : service.metaDescription.ar,
              slug: service.slug
            })
          )
        }}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: dict.common.ourServices, href: `/${locale}/services` },
          { label: title }
        ]}
      />

      <PageHero
        eyebrow={locale === "en" ? service.category.en : service.category.ar}
        title={title}
        description={locale === "en" ? service.shortDescription.en : service.shortDescription.ar}
      />

      {/* Overview — full-width editorial split with the service image */}
      <SplitSectionOverview service={service} locale={locale} dict={dict} />

      {/* Capabilities + Industries — editorial two-column band */}
      <section className="bg-navy-50/40 py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            <div>
              <h3 className="font-serif text-2xl font-bold text-navy">{dict.common.capabilities}</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {service.capabilities.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 border-b border-navy-100 pb-4 last:border-0">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-navy-600">
                      {locale === "en" ? c.en : c.ar}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-navy">{dict.common.industriesServed}</h3>
              <div className="mt-6">
                <IndustryShowcase items={service.industries} locale={locale} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Process — vertical timeline instead of a repeated card grid */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={locale === "en" ? "How We Work" : "كيف نعمل"}
            title={dict.common.ourProcess}
            align="center"
          />
          <div className="mt-14">
            <ProcessTimeline steps={service.process} locale={locale} />
          </div>
        </Container>
      </section>

      {/* Why Choose Us — reversed dark split */}
      <section className="bg-navy-900 py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm lg:order-1">
              <Image
                src={service.heroImage}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="lg:order-2">
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.28em] text-gold-400">
                {title}
              </span>
              <h2 className="font-serif text-3xl font-bold leading-[1.15] text-white sm:text-4xl">
                {dict.common.whyChooseUs}
              </h2>
              <ul className="mt-8 flex flex-col gap-5">
                {service.whyChooseUs.map((w, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="font-serif text-lg font-bold text-gold/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-0.5 text-sm leading-relaxed text-navy-200">
                      {locale === "en" ? w.en : w.ar}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={title} title={dict.common.faq} align="center" />
          <div className="mx-auto mt-12 max-w-2xl">
            <FAQ items={service.faq} locale={locale} />
          </div>
        </Container>
      </section>

      <RelatedServices
        services={related}
        locale={locale}
        title={dict.common.relatedServices}
      />

      <CTA
        locale={locale}
        title={
          locale === "en"
            ? `Ready to discuss your ${title} requirement?`
            : `جاهزون لمناقشة متطلبات ${title}؟`
        }
        description={
          locale === "en"
            ? "Send us the details and our team will respond with a tailored quotation."
            : "أرسلوا لنا التفاصيل وسيستجيب فريقنا بعرض سعر مخصص."
        }
        primaryLabel={dict.common.getQuote}
        secondaryLabel={dict.common.contactUs}
      />
    </>
  );
}

// Local sub-component: keeps the overview split's markup close to the data
// it renders without duplicating SplitSection's own default styling needs
// (this section needs the image second/content first, always, regardless
// of a `reverse` toggle, since it's the page's primary introduction).
function SplitSectionOverview({
  service,
  locale,
  dict
}: {
  service: Service;
  locale: Locale;
  dict: Dictionary;
}) {
  const title = locale === "en" ? service.title.en : service.title.ar;
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.28em] text-gold-600">
              {dict.common.overview}
            </span>
            <h2 className="font-serif text-3xl font-bold leading-[1.15] text-navy sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-navy-600">
              {service.overview.map((p, i) => (
                <p key={i}>{locale === "en" ? p.en : p.ar}</p>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm lg:sticky lg:top-24">
            <Image
              src={service.heroImage}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
