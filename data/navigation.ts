export type NavLink = {
  labelEn: string;
  labelAr: string;
  href: string; // path after /{locale}, e.g. "/about"
};

export const mainNav: NavLink[] = [
  { labelEn: "Home", labelAr: "الرئيسية", href: "" },
  { labelEn: "About", labelAr: "من نحن", href: "/about" },
  { labelEn: "Services", labelAr: "خدماتنا", href: "/services" },
  { labelEn: "Projects", labelAr: "المشاريع", href: "/projects" },
  { labelEn: "Gallery", labelAr: "معرض الصور", href: "/gallery" },
  { labelEn: "Careers", labelAr: "الوظائف", href: "/careers" },
  { labelEn: "Contact", labelAr: "اتصل بنا", href: "/contact" }
];

export const aboutNav: NavLink[] = [
  { labelEn: "About Us", labelAr: "من نحن", href: "/about" },
  { labelEn: "CEO Message", labelAr: "كلمة الرئيس التنفيذي", href: "/ceo-message" },
  { labelEn: "Vision", labelAr: "رؤيتنا", href: "/vision" },
  { labelEn: "Mission", labelAr: "رسالتنا", href: "/mission" },
  { labelEn: "Clients & Partners", labelAr: "العملاء والشركاء", href: "/clients" },
  { labelEn: "Licenses & Certifications", labelAr: "التراخيص والشهادات", href: "/licenses" }
];

export const footerServiceLinks: NavLink[] = [
  { labelEn: "Construction & Contracting", labelAr: "البناء والمقاولات", href: "/services/construction-contracting" },
  { labelEn: "Aluminum Works", labelAr: "أعمال الألمنيوم", href: "/services/aluminum-works" },
  { labelEn: "Steel & Metal Works", labelAr: "أعمال الحديد والمعادن", href: "/services/steel-metal-works" },
  { labelEn: "Scrap Trading", labelAr: "تجارة الخردة", href: "/services/scrap-trading" },
  { labelEn: "Import & Export", labelAr: "الاستيراد والتصدير", href: "/services/import-export" },
  { labelEn: "Logistics & Transportation", labelAr: "الخدمات اللوجستية والنقل", href: "/services/logistics-transportation" }
];

export const utilityNav: NavLink[] = [
  { labelEn: "Privacy Policy", labelAr: "سياسة الخصوصية", href: "/privacy-policy" },
  { labelEn: "Terms & Conditions", labelAr: "الشروط والأحكام", href: "/terms-conditions" }
];
