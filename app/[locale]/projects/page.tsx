import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Breadcrumbs } from "@/components/sections/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/sections/ProjectCard";
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
    path: "/projects",
    title: locale === "en" ? "Projects" : "المشاريع",
    description:
      locale === "en"
        ? "A portfolio of Al Maha National Company's construction, aluminum, steel and trading projects across Kuwait."
        : "معرض لمشاريع شركة المها الوطنية في البناء والألمنيوم والحديد والتجارة في جميع أنحاء الكويت."
  });
}

const projectsEn = [
  { title: "Commercial Building Fit-Out", category: "Construction", location: "Al Jahra, Kuwait", image: "/images/projects/sample-1.jpg" },
  { title: "Aluminum Facade Installation", category: "Aluminum Works", location: "Kuwait City", image: "/images/projects/sample-2.jpg" },
  { title: "Industrial Site Scrap Program", category: "Scrap Trading", location: "Shuwaikh Industrial", image: "/images/projects/sample-3.jpg" },
  { title: "Warehouse Structural Steel", category: "Steel & Metal Works", location: "Al Rai", image: "/images/projects/sample-4.jpg" },
  { title: "Villa Renovation & Extension", category: "Building Construction", location: "Al Jahra", image: "/images/projects/sample-5.jpg" },
  { title: "Heavy Equipment Parts Supply", category: "Spare Parts", location: "Kuwait", image: "/images/projects/sample-6.jpg" }
];
const projectsAr = [
  { title: "تجهيز مبنى تجاري", category: "البناء", location: "الجهراء، الكويت", image: "/images/projects/sample-1.jpg" },
  { title: "تركيب واجهات ألمنيوم", category: "أعمال الألمنيوم", location: "مدينة الكويت", image: "/images/projects/sample-2.jpg" },
  { title: "برنامج خردة لموقع صناعي", category: "تجارة الخردة", location: "الشويخ الصناعية", image: "/images/projects/sample-3.jpg" },
  { title: "هيكل حديدي لمستودع", category: "أعمال الحديد والمعادن", location: "الري", image: "/images/projects/sample-4.jpg" },
  { title: "تجديد وتوسعة فيلا", category: "إنشاء المباني", location: "الجهراء", image: "/images/projects/sample-5.jpg" },
  { title: "توريد قطع غيار معدات ثقيلة", category: "قطع الغيار", location: "الكويت", image: "/images/projects/sample-6.jpg" }
];

export default async function ProjectsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = getDictionary(locale);
  const projects = locale === "en" ? projectsEn : projectsAr;

  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: locale === "en" ? "Projects" : "المشاريع" }]} />
      <PageHero
        eyebrow={locale === "en" ? "Our Work" : "أعمالنا"}
        title={locale === "en" ? "Project Portfolio" : "معرض المشاريع"}
        description={
          locale === "en"
            ? "A representative look at the type of work Al Maha delivers across construction, fabrication and trading. Photography of specific completed projects will be added here as it becomes available."
            : "نظرة تمثيلية على نوعية الأعمال التي تقدمها المها في البناء والتصنيع والتجارة. سيتم إضافة صور المشاريع المنجزة المحددة هنا فور توفرها."
        }
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={i} title={p.title} category={p.category} location={p.location} image={p.image} />
            ))}
          </div>
        </Container>
      </section>

      <CTA
        locale={locale}
        title={locale === "en" ? "Have a project you'd like to discuss?" : "لديكم مشروع تريدون مناقشته؟"}
        description={
          locale === "en"
            ? "Share your requirements and our team will get back to you with next steps."
            : "شاركونا متطلباتكم وسيتواصل معكم فريقنا بالخطوات التالية."
        }
        primaryLabel={dict.common.getQuote}
        secondaryLabel={dict.common.contactUs}
      />
    </>
  );
}
