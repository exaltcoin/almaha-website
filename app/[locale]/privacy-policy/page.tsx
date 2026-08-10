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
    path: "/privacy-policy",
    title: locale === "en" ? "Privacy Policy" : "سياسة الخصوصية",
    description:
      locale === "en"
        ? "How Al Maha National Company collects, uses and protects information submitted through this website."
        : "كيفية جمع شركة المها الوطنية للمعلومات المقدمة عبر هذا الموقع واستخدامها وحمايتها.",
    noIndex: false
  });
}

export default async function PrivacyPolicyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  const contentEn = [
    { h: "Information We Collect", p: "When you submit a contact form, quote request or job application on this website, we collect the information you provide — such as your name, company, email address, phone number and any message, project details or files you choose to attach." },
    { h: "How We Use Your Information", p: "We use the information you submit to respond to your inquiry, prepare quotations, evaluate job applications, and communicate with you about your request. We do not sell or rent your personal information to third parties." },
    { h: "Data Storage & Security", p: "Submitted information is transmitted to Al Maha National Company's designated contact channels. We take reasonable technical measures to protect information submitted through this website against unauthorized access." },
    { h: "File Uploads", p: "Files you upload (such as CVs or project attachments) are used solely for the purpose of evaluating your request or application." },
    { h: "Cookies", p: "This website may use minimal, functional cookies necessary for the site to operate correctly. We do not use cookies for third-party advertising." },
    { h: "Your Rights", p: "You may contact us at any time to ask what information we hold about you or to request its deletion, using the contact details below." },
    { h: "Contact Us", p: `For any questions about this Privacy Policy, please contact us at ${company.email} or ${company.phoneDisplay}.` }
  ];
  const contentAr = [
    { h: "المعلومات التي نجمعها", p: "عند تقديم نموذج تواصل أو طلب عرض سعر أو طلب توظيف عبر هذا الموقع، نقوم بجمع المعلومات التي تقدمونها — مثل الاسم واسم الشركة والبريد الإلكتروني ورقم الهاتف وأي رسالة أو تفاصيل مشروع أو ملفات تختارون إرفاقها." },
    { h: "كيفية استخدام معلوماتكم", p: "نستخدم المعلومات المقدمة للرد على استفساراتكم وإعداد عروض الأسعار وتقييم طلبات التوظيف والتواصل معكم بخصوص طلبكم. لا نبيع أو نؤجر معلوماتكم الشخصية لأطراف ثالثة." },
    { h: "تخزين البيانات وأمانها", p: "يتم إرسال المعلومات المقدمة إلى قنوات التواصل المحددة لدى شركة المها الوطنية. نتخذ تدابير تقنية معقولة لحماية المعلومات المقدمة عبر هذا الموقع من الوصول غير المصرح به." },
    { h: "رفع الملفات", p: "تُستخدم الملفات التي تقومون برفعها (مثل السير الذاتية أو مرفقات المشاريع) فقط لغرض تقييم طلبكم أو تقديمكم." },
    { h: "ملفات تعريف الارتباط", p: "قد يستخدم هذا الموقع ملفات تعريف ارتباط وظيفية بسيطة ضرورية لعمل الموقع بشكل صحيح. لا نستخدم ملفات تعريف الارتباط لأغراض إعلانية من أطراف ثالثة." },
    { h: "حقوقكم", p: "يمكنكم التواصل معنا في أي وقت للاستفسار عن المعلومات التي نحتفظ بها عنكم أو لطلب حذفها، باستخدام بيانات التواصل أدناه." },
    { h: "تواصلوا معنا", p: `لأي استفسارات حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر ${company.email} أو ${company.phoneDisplay}.` }
  ];
  const content = locale === "en" ? contentEn : contentAr;

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Privacy Policy" : "سياسة الخصوصية" }]} />
      <PageHero
        eyebrow={locale === "en" ? "Legal" : "قانوني"}
        title={locale === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
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
