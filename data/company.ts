// Centralized company information — single source of truth.
// Update details here once; they propagate across the entire site.

export const company = {
  nameEn: "Al Maha National Company for General Trading & Contracting",
  nameEnShort: "Al Maha National Company",
  nameAr: "شركة المها الوطنية للتجارة العامة والمقاولات",
  nameArShort: "شركة المها الوطنية",

  ceoNameEn: "Mohammad Hussain",
  ceoNameAr: "محمد حسين",
  ceoTitleEn: "Chief Executive Officer",
  ceoTitleAr: "الرئيس التنفيذي",

  phoneDisplay: "+965 6640 0098",
  phoneHref: "+96566400098",
  whatsappNumber: "96566400098",
  email: "almahaexport202@gmail.com",

  addressEn:
    "Al Jahra, Block 002, Ali Ramadan Street, First Floor, Unit No. 00001, Kuwait",
  addressAr:
    "دولة الكويت، محافظة الجهراء، منطقة الجهراء، قطعة 002، شارع علي رمضان، الدور الأول، الوحدة رقم 00001",

  city: "Al Jahra",
  cityAr: "الجهراء",
  country: "Kuwait",
  countryAr: "الكويت",

  // Approximate coordinates for Al Jahra, Kuwait — used for map embed / LocalBusiness schema.
  // Replace with the exact building coordinates when available.
  geo: {
    lat: 29.3375,
    lng: 47.6581
  },

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://almahanationalcompanyforgeneraltradingandcontracting.com",

  social: {
    // Populate when official company profiles are available.
    instagram: "",
    linkedin: "",
    twitter: ""
  }
} as const;

export const whatsappMessage = {
  en: "Hello, I would like to inquire about Al Maha National Company services.",
  ar: "مرحباً، أرغب في الاستفسار عن خدمات شركة المها الوطنية."
};

export function whatsappLink(locale: "en" | "ar") {
  const text = encodeURIComponent(whatsappMessage[locale]);
  return `https://wa.me/${company.whatsappNumber}?text=${text}`;
}
