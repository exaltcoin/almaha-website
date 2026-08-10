import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Gallery } from "@/components/sections/Gallery";
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
    path: "/gallery",
    title: locale === "en" ? "Gallery" : "معرض الصور",
    description:
      locale === "en"
        ? "Visual gallery of Al Maha National Company's construction, fabrication and trading work in Kuwait."
        : "معرض صور لأعمال شركة المها الوطنية في البناء والتصنيع والتجارة في الكويت."
  });
}

const galleryItems = [
  { labelEn: "Construction Sites", labelAr: "مواقع البناء", src: "/images/gallery/item-1.jpg" },
  { labelEn: "Aluminum Works", labelAr: "أعمال الألمنيوم", src: "/images/gallery/item-2.jpg" },
  { labelEn: "Steel Fabrication", labelAr: "تصنيع الحديد", src: "/images/gallery/item-3.jpg" },
  { labelEn: "Scrap Yard Operations", labelAr: "عمليات ساحة الخردة", src: "/images/gallery/item-4.jpg" },
  { labelEn: "Spare Parts Inventory", labelAr: "مخزون قطع الغيار", src: "/images/gallery/item-5.jpg" },
  { labelEn: "Logistics Fleet", labelAr: "أسطول اللوجستيات", src: "/images/gallery/item-6.jpg" },
  { labelEn: "Warehouse Facilities", labelAr: "مرافق المستودعات", src: "/images/gallery/item-7.jpg" },
  { labelEn: "Industrial Facilities", labelAr: "المنشآت الصناعية", src: "/images/gallery/item-8.jpg" }
] as const;

export default async function GalleryPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Gallery" : "معرض الصور" }]} />
      <PageHero
        eyebrow={locale === "en" ? "Visual Overview" : "نظرة بصرية"}
        title={locale === "en" ? "Gallery" : "معرض الصور"}
        description={
          locale === "en"
            ? "A categorized visual overview of our work areas. Real photography from Al Maha sites and projects will populate this gallery going forward."
            : "نظرة بصرية مصنفة على مجالات عملنا. سيتم تعبئة هذا المعرض تباعاً بصور حقيقية من مواقع ومشاريع المها."
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <Gallery
            items={galleryItems.map((g) => ({
              label: locale === "en" ? g.labelEn : g.labelAr,
              src: g.src
            }))}
            locale={locale}
          />
        </Container>
      </section>

      <CTA
        locale={locale}
        title={locale === "en" ? "Want to see more of our work?" : "تريدون رؤية المزيد من أعمالنا؟"}
        description={
          locale === "en"
            ? "Get in touch and we'll be glad to share more detail relevant to your project."
            : "تواصلوا معنا وسنكون سعداء بمشاركة المزيد من التفاصيل ذات الصلة بمشروعكم."
        }
        primaryLabel={dict.common.getQuote}
        secondaryLabel={dict.common.contactUs}
      />
    </>
  );
}
