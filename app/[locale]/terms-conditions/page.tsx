import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
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
    path: "/terms-conditions",
    title: locale === "en" ? "Terms & Conditions" : "الشروط والأحكام",
    description:
      locale === "en"
        ? "Terms and conditions governing the use of Al Maha National Company's website."
        : "الشروط والأحكام التي تحكم استخدام موقع شركة المها الوطنية."
  });
}

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  const contentEn = [
    { h: "Acceptance of Terms", p: "By accessing and using this website, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the website." },
    { h: "Use of Website Content", p: "Content on this website — including text, logos and graphics — belongs to Al Maha National Company unless otherwise noted, and may not be reproduced without written permission." },
    { h: "Service Inquiries & Quotations", p: "Submitting a contact form or quote request does not constitute a binding contract. Formal engagement terms, pricing and scope are confirmed separately in writing between Al Maha National Company and the client." },
    { h: "No Warranty on Website Information", p: "While we aim to keep information on this website accurate and current, service descriptions are general in nature. Specific project terms are governed by the applicable signed agreement." },
    { h: "Limitation of Liability", p: "Al Maha National Company is not liable for any indirect or consequential loss arising from use of this website or reliance on its general content." },
    { h: "Governing Law", p: "These Terms & Conditions are governed by the laws of the State of Kuwait." },
    { h: "Contact Us", p: `For questions about these Terms & Conditions, contact us at ${company.email} or ${company.phoneDisplay}.` }
  ];
  const contentAr = [
    { h: "قبول الشروط", p: "باستخدام هذا الموقع، فإنكم توافقون على الالتزام بهذه الشروط والأحكام. في حال عدم الموافقة، يرجى التوقف عن استخدام الموقع." },
    { h: "استخدام محتوى الموقع", p: "يعود محتوى هذا الموقع — بما في ذلك النصوص والشعارات والرسومات — إلى شركة المها الوطنية ما لم يُذكر خلاف ذلك، ولا يجوز إعادة إنتاجه دون إذن كتابي." },
    { h: "الاستفسارات وطلبات عروض الأسعار", p: "لا يشكل تقديم نموذج تواصل أو طلب عرض سعر عقداً ملزماً. يتم تأكيد شروط التعامل الرسمية والتسعير والنطاق بشكل منفصل وكتابياً بين شركة المها الوطنية والعميل." },
    { h: "عدم وجود ضمان على معلومات الموقع", p: "رغم سعينا للحفاظ على دقة وحداثة معلومات هذا الموقع، فإن أوصاف الخدمات عامة الطابع. تخضع شروط المشروع المحددة للاتفاقية الموقعة السارية." },
    { h: "حدود المسؤولية", p: "لا تتحمل شركة المها الوطنية المسؤولية عن أي خسارة غير مباشرة أو تبعية ناتجة عن استخدام هذا الموقع أو الاعتماد على محتواه العام." },
    { h: "القانون الحاكم", p: "تخضع هذه الشروط والأحكام لقوانين دولة الكويت." },
    { h: "تواصلوا معنا", p: `لأي استفسارات حول هذه الشروط والأحكام، يرجى التواصل معنا عبر ${company.email} أو ${company.phoneDisplay}.` }
  ];
  const content = locale === "en" ? contentEn : contentAr;

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Terms & Conditions" : "الشروط والأحكام" }]} />
      <PageHero
        eyebrow={locale === "en" ? "Legal" : "قانوني"}
        title={locale === "en" ? "Terms & Conditions" : "الشروط والأحكام"}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-sm text-navy-400">
              {locale === "en" ? "Last updated: August 2026" : "آخر تحديث: أغسطس 2026"}
            </p>
            <div className="flex flex-col gap-8">
              {content.map((section, i) => (
                <div key={i}>
                  <h2 className="font-serif text-lg font-bold text-navy">{section.h}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{section.p}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
