export type Bi = { en: string; ar: string };
export type ProcessStep = { title: Bi; description: Bi };
export type FaqItem = { q: Bi; a: Bi };

export type Service = {
  slug: string;
  category: Bi;
  title: Bi;
  shortDescription: Bi;
  metaDescription: Bi;
  heroImage: string;
  overview: Bi[];
  capabilities: Bi[];
  industries: Bi[];
  process: ProcessStep[];
  whyChooseUs: Bi[];
  faq: FaqItem[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "construction-contracting",
    category: { en: "Construction", ar: "البناء" },
    title: { en: "Construction & Contracting", ar: "البناء والمقاولات" },
    shortDescription: {
      en: "Full-scope construction and contracting services for residential, commercial and industrial projects across Kuwait.",
      ar: "خدمات بناء ومقاولات شاملة للمشاريع السكنية والتجارية والصناعية في جميع أنحاء الكويت."
    },
    metaDescription: {
      en: "Al Maha National Company delivers professional construction and contracting services in Kuwait, from planning through handover, for residential, commercial and industrial clients.",
      ar: "تقدم شركة المها الوطنية خدمات بناء ومقاولات احترافية في الكويت، من التخطيط وحتى التسليم، للعملاء السكنيين والتجاريين والصناعيين."
    },
    heroImage: "/images/services/construction-contracting.jpg",
    overview: [
      {
        en: "Al Maha National Company provides end-to-end construction and contracting services built around reliability, safety and disciplined project execution. Our teams coordinate planning, materials, labor and site management so clients receive a single accountable partner from groundbreaking to handover.",
        ar: "تقدم شركة المها الوطنية خدمات بناء ومقاولات متكاملة تقوم على الموثوقية والسلامة والتنفيذ المنضبط للمشاريع. تنسّق فرقنا التخطيط والمواد والعمالة وإدارة الموقع لتوفير شريك واحد مسؤول للعميل من بداية الحفر وحتى التسليم."
      },
      {
        en: "Whether the requirement is a new build, a fit-out, or a phased contracting package, we structure our approach around clear scopes, realistic schedules and transparent communication with clients and consultants.",
        ar: "سواء كان المطلوب إنشاءً جديداً أو تجهيزاً داخلياً أو حزمة مقاولات على مراحل، فإننا نبني منهجيتنا على نطاقات عمل واضحة وجداول زمنية واقعية وتواصل شفاف مع العملاء والاستشاريين."
      }
    ],
    capabilities: [
      { en: "General contracting for residential, commercial and industrial projects", ar: "مقاولات عامة للمشاريع السكنية والتجارية والصناعية" },
      { en: "Site mobilization, planning and construction management", ar: "تجهيز الموقع والتخطيط وإدارة أعمال البناء" },
      { en: "Coordination of civil, structural, and finishing works", ar: "تنسيق الأعمال المدنية والإنشائية وأعمال التشطيبات" },
      { en: "Renovation, fit-out and building upgrade contracts", ar: "عقود التجديد والتجهيز الداخلي وتحديث المباني" },
      { en: "Subcontractor coordination and quality supervision", ar: "تنسيق المقاولين من الباطن والإشراف على الجودة" },
      { en: "Materials procurement and site logistics", ar: "توريد المواد ولوجستيات الموقع" }
    ],
    industries: [
      { en: "Residential developers", ar: "المطورون السكنيون" },
      { en: "Commercial property owners", ar: "ملاك العقارات التجارية" },
      { en: "Industrial and warehouse facilities", ar: "المنشآت الصناعية والمستودعات" },
      { en: "Government and private sector clients", ar: "العملاء من القطاعين الحكومي والخاص" }
    ],
    process: [
      { title: { en: "Consultation & Scope", ar: "الاستشارة وتحديد النطاق" }, description: { en: "We review requirements, drawings and site conditions to define a clear scope of work.", ar: "نراجع المتطلبات والمخططات وظروف الموقع لتحديد نطاق عمل واضح." } },
      { title: { en: "Planning & Estimation", ar: "التخطيط والتسعير" }, description: { en: "Detailed scheduling, resourcing and cost estimation before mobilization.", ar: "جدولة تفصيلية وتخصيص الموارد وتقدير التكاليف قبل بدء التنفيذ." } },
      { title: { en: "Execution & Supervision", ar: "التنفيذ والإشراف" }, description: { en: "On-site construction management with continuous quality and safety supervision.", ar: "إدارة أعمال البناء في الموقع مع إشراف مستمر على الجودة والسلامة." } },
      { title: { en: "Handover & Support", ar: "التسليم والدعم" }, description: { en: "Final inspection, documentation and handover with post-completion support.", ar: "الفحص النهائي والتوثيق والتسليم مع دعم ما بعد الإنجاز." } }
    ],
    whyChooseUs: [
      { en: "Single accountable contractor across trades and phases", ar: "مقاول واحد مسؤول عن جميع التخصصات والمراحل" },
      { en: "Disciplined site management and safety practices", ar: "إدارة موقع منضبطة وممارسات سلامة صارمة" },
      { en: "Transparent scheduling and progress communication", ar: "جدولة شفافة وتواصل مستمر حول سير العمل" },
      { en: "Kuwait-based team with local market knowledge", ar: "فريق مقيم في الكويت وذو معرفة بالسوق المحلي" }
    ],
    faq: [
      { q: { en: "Do you handle both new construction and renovation contracts?", ar: "هل تتولون أعمال الإنشاء الجديد وأعمال التجديد على حد سواء؟" }, a: { en: "Yes. We take on new-build contracts as well as renovation, fit-out and upgrade projects for existing structures.", ar: "نعم، نتولى عقود الإنشاء الجديد بالإضافة إلى مشاريع التجديد والتجهيز الداخلي وتحديث المباني القائمة." } },
      { q: { en: "Can you work alongside our own consultants and engineers?", ar: "هل يمكنكم العمل جنباً إلى جنب مع استشاريينا ومهندسينا؟" }, a: { en: "Yes. We regularly coordinate with client-appointed consultants, architects and engineers throughout the project lifecycle.", ar: "نعم، ننسق بانتظام مع الاستشاريين والمهندسين المعينين من قبل العميل طوال دورة حياة المشروع." } },
      { q: { en: "How do you handle project scheduling and delays?", ar: "كيف تتعاملون مع جدولة المشروع والتأخيرات؟" }, a: { en: "We build realistic schedules from the outset and maintain transparent, ongoing communication so any risk to timelines is flagged early.", ar: "نضع جداول زمنية واقعية منذ البداية ونحافظ على تواصل شفاف ومستمر بحيث يتم رصد أي مخاطر على الجدول الزمني في وقت مبكر." } }
    ],
    related: ["building-construction", "infrastructure-projects", "steel-metal-works"]
  },
  {
    slug: "building-construction",
    category: { en: "Construction", ar: "البناء" },
    title: { en: "Building Construction", ar: "إنشاء المباني" },
    shortDescription: {
      en: "Residential, commercial and industrial building solutions built to specification and delivered on schedule.",
      ar: "حلول بناء سكنية وتجارية وصناعية تُنفذ وفق المواصفات وتُسلم في الوقت المحدد."
    },
    metaDescription: {
      en: "Building construction services in Kuwait covering residential, commercial and industrial structures, from foundation works to final finishing.",
      ar: "خدمات إنشاء المباني في الكويت تغطي المنشآت السكنية والتجارية والصناعية، من أعمال الأساسات وحتى التشطيبات النهائية."
    },
    heroImage: "/images/services/building-construction.jpg",
    overview: [
      {
        en: "Our building construction division manages the full lifecycle of residential, commercial and light-industrial structures, coordinating structural works, MEP interfaces and finishing so buildings are delivered safely, on specification and ready for use.",
        ar: "يتولى قسم إنشاء المباني لدينا إدارة دورة الحياة الكاملة للمنشآت السكنية والتجارية والصناعية الخفيفة، وينسّق الأعمال الإنشائية وواجهات الأعمال الكهروميكانيكية والتشطيبات لضمان تسليم المباني بأمان ووفق المواصفات وجاهزة للاستخدام."
      }
    ],
    capabilities: [
      { en: "Foundation, structural and shell & core works", ar: "أعمال الأساسات والهيكل الإنشائي والقشرة الخارجية" },
      { en: "Residential villa and multi-unit building construction", ar: "إنشاء الفلل السكنية والمباني متعددة الوحدات" },
      { en: "Commercial building shells and interior build-outs", ar: "هياكل المباني التجارية وأعمال التجهيز الداخلي" },
      { en: "Light-industrial and warehouse building construction", ar: "إنشاء المباني الصناعية الخفيفة والمستودعات" },
      { en: "Finishing works: flooring, cladding, painting, joinery", ar: "أعمال التشطيبات: الأرضيات والكسوة والدهانات والنجارة" }
    ],
    industries: [
      { en: "Private homeowners and villa developers", ar: "أصحاب المنازل الخاصة ومطورو الفلل" },
      { en: "Commercial and retail property owners", ar: "ملاك العقارات التجارية والتجزئة" },
      { en: "Light-industrial facility operators", ar: "مشغلو المنشآت الصناعية الخفيفة" }
    ],
    process: [
      { title: { en: "Design Review", ar: "مراجعة التصميم" }, description: { en: "Structural and architectural drawings are reviewed for build feasibility.", ar: "تتم مراجعة المخططات الإنشائية والمعمارية للتحقق من إمكانية التنفيذ." } },
      { title: { en: "Foundation & Structure", ar: "الأساسات والهيكل" }, description: { en: "Groundworks, foundations and structural framing are executed to specification.", ar: "تنفيذ أعمال الحفر والأساسات والهيكل الإنشائي وفق المواصفات." } },
      { title: { en: "MEP Coordination", ar: "تنسيق الأعمال الكهروميكانيكية" }, description: { en: "Electrical, plumbing and mechanical rough-ins are coordinated with structural progress.", ar: "تنسيق الأعمال الكهربائية والسباكة والميكانيكية مع تقدم الأعمال الإنشائية." } },
      { title: { en: "Finishing & Handover", ar: "التشطيبات والتسليم" }, description: { en: "Interior and exterior finishing followed by inspection and handover.", ar: "أعمال التشطيبات الداخلية والخارجية يتبعها الفحص والتسليم." } }
    ],
    whyChooseUs: [
      { en: "Coordinated management of structural, MEP and finishing trades", ar: "إدارة منسقة للأعمال الإنشائية والكهروميكانيكية والتشطيبات" },
      { en: "Attention to specification, tolerances and finish quality", ar: "اهتمام دقيق بالمواصفات والتفاوتات المسموحة وجودة التشطيب" },
      { en: "Experience across residential, commercial and industrial builds", ar: "خبرة في المباني السكنية والتجارية والصناعية" }
    ],
    faq: [
      { q: { en: "Do you build from architectural drawings we already have?", ar: "هل تبنون وفق مخططات معمارية جاهزة لدينا؟" }, a: { en: "Yes, we construct from client-supplied architectural and structural drawings, and can coordinate with your design consultants.", ar: "نعم، نقوم بالبناء وفق المخططات المعمارية والإنشائية التي يوفرها العميل، ويمكننا التنسيق مع استشاري التصميم الخاص بكم." } },
      { q: { en: "Can you manage both the shell and the interior fit-out?", ar: "هل يمكنكم إدارة الهيكل الخارجي والتجهيز الداخلي معاً؟" }, a: { en: "Yes, our teams manage shell and core construction as well as full interior fit-out under a single contract.", ar: "نعم، تدير فرقنا أعمال الهيكل والقشرة الخارجية بالإضافة إلى التجهيز الداخلي الكامل ضمن عقد واحد." } }
    ],
    related: ["construction-contracting", "infrastructure-projects", "aluminum-works"]
  },
  {
    slug: "infrastructure-projects",
    category: { en: "Construction", ar: "البناء" },
    title: { en: "Infrastructure Projects", ar: "مشاريع البنية التحتية" },
    shortDescription: {
      en: "Site preparation, civil works and infrastructure support for development-ready sites.",
      ar: "أعمال تجهيز المواقع والأعمال المدنية ودعم البنية التحتية لتهيئة المواقع للتطوير."
    },
    metaDescription: {
      en: "Infrastructure and civil works services in Kuwait including site preparation, earthworks and supporting civil infrastructure for development projects.",
      ar: "خدمات البنية التحتية والأعمال المدنية في الكويت تشمل تجهيز المواقع وأعمال الحفر والبنية التحتية المدنية الداعمة لمشاريع التطوير."
    },
    heroImage: "/images/services/infrastructure-projects.jpg",
    overview: [
      {
        en: "We support developers and contractors with site preparation and civil infrastructure works that get land ready for construction — from earthworks and grading to supporting utilities coordination.",
        ar: "ندعم المطورين والمقاولين بأعمال تجهيز المواقع والبنية التحتية المدنية التي تُهيئ الأرض للبناء — من أعمال الحفر والتسوية وحتى تنسيق المرافق الداعمة."
      }
    ],
    capabilities: [
      { en: "Site clearance, earthworks and grading", ar: "تنظيف الموقع وأعمال الحفر والتسوية" },
      { en: "Access roads and internal site infrastructure", ar: "طرق الوصول والبنية التحتية الداخلية للموقع" },
      { en: "Civil works supporting utility connections", ar: "الأعمال المدنية الداعمة لتوصيلات المرافق" },
      { en: "Site drainage and preparatory groundworks", ar: "تصريف مياه الموقع وأعمال التجهيز الأرضية" }
    ],
    industries: [
      { en: "Land developers", ar: "مطورو الأراضي" },
      { en: "Government and municipal projects", ar: "المشاريع الحكومية والبلدية" },
      { en: "Industrial site operators", ar: "مشغلو المواقع الصناعية" }
    ],
    process: [
      { title: { en: "Site Survey", ar: "مسح الموقع" }, description: { en: "Ground conditions and site boundaries are assessed before work begins.", ar: "يتم تقييم ظروف الأرض وحدود الموقع قبل بدء العمل." } },
      { title: { en: "Earthworks & Grading", ar: "أعمال الحفر والتسوية" }, description: { en: "Clearance, excavation and grading to prepare the site for construction.", ar: "التنظيف والحفر والتسوية لتجهيز الموقع للبناء." } },
      { title: { en: "Civil Infrastructure", ar: "البنية التحتية المدنية" }, description: { en: "Access roads, drainage and supporting civil works are executed.", ar: "تنفيذ طرق الوصول والصرف والأعمال المدنية الداعمة." } },
      { title: { en: "Readiness Handover", ar: "تسليم الموقع الجاهز" }, description: { en: "Site is inspected and handed over ready for the next construction phase.", ar: "يتم فحص الموقع وتسليمه جاهزاً لمرحلة البناء التالية." } }
    ],
    whyChooseUs: [
      { en: "Experienced in preparing sites for varied development types", ar: "خبرة في تجهيز المواقع لأنواع تطوير متعددة" },
      { en: "Coordinated approach with construction and utility teams", ar: "منهجية منسقة مع فرق البناء والمرافق" },
      { en: "Focus on safe, compliant groundworks", ar: "التركيز على أعمال أرضية آمنة ومتوافقة مع الاشتراطات" }
    ],
    faq: [
      { q: { en: "Do you handle utility coordination as part of infrastructure works?", ar: "هل تتولون تنسيق المرافق كجزء من أعمال البنية التحتية؟" }, a: { en: "We manage the civil works that support utility connections and coordinate with the relevant utility authorities and contractors as needed.", ar: "ندير الأعمال المدنية الداعمة لتوصيلات المرافق وننسق مع الجهات والمقاولين المعنيين بالمرافق عند الحاجة." } }
    ],
    related: ["construction-contracting", "building-construction", "logistics-transportation"]
  },
  {
    slug: "aluminum-works",
    category: { en: "Fabrication", ar: "التصنيع" },
    title: { en: "Aluminum Works", ar: "أعمال الألمنيوم" },
    shortDescription: {
      en: "Aluminum fabrication and installation for doors, windows, partitions and facades.",
      ar: "تصنيع وتركيب الألمنيوم للأبواب والنوافذ والقواطع والواجهات."
    },
    metaDescription: {
      en: "Professional aluminum works in Kuwait: doors, windows, partitions and facade fabrication and installation for residential and commercial buildings.",
      ar: "أعمال ألمنيوم احترافية في الكويت: تصنيع وتركيب الأبواب والنوافذ والقواطع والواجهات للمباني السكنية والتجارية."
    },
    heroImage: "/images/services/aluminum-works.jpg",
    overview: [
      {
        en: "Al Maha's aluminum division fabricates and installs doors, windows, partitions and facade systems for residential, commercial and industrial buildings, balancing durability, appearance and precise fit.",
        ar: "يقوم قسم الألمنيوم لدى المها بتصنيع وتركيب الأبواب والنوافذ والقواطع وأنظمة الواجهات للمباني السكنية والتجارية والصناعية، مع الموازنة بين المتانة والمظهر ودقة التركيب."
      }
    ],
    capabilities: [
      { en: "Aluminum doors and window systems", ar: "أنظمة أبواب ونوافذ الألمنيوم" },
      { en: "Interior partitions and glazing", ar: "القواطع الداخلية والزجاج" },
      { en: "Curtain wall and facade cladding", ar: "الجدران الساترة وكسوة الواجهات" },
      { en: "Custom fabrication to architectural specification", ar: "تصنيع مخصص وفق المواصفات المعمارية" },
      { en: "On-site installation and finishing", ar: "التركيب والتشطيب في الموقع" }
    ],
    industries: [
      { en: "Residential and villa projects", ar: "المشاريع السكنية والفلل" },
      { en: "Commercial and retail buildings", ar: "المباني التجارية ومحلات التجزئة" },
      { en: "Office fit-out contractors", ar: "مقاولو تجهيز المكاتب" }
    ],
    process: [
      { title: { en: "Measurement & Design", ar: "القياس والتصميم" }, description: { en: "Precise site measurement and system selection to match architectural intent.", ar: "قياس دقيق للموقع واختيار الأنظمة المناسبة لتحقيق الرؤية المعمارية." } },
      { title: { en: "Fabrication", ar: "التصنيع" }, description: { en: "Aluminum sections are cut, machined and assembled to specification.", ar: "يتم قص وتشكيل وتجميع مقاطع الألمنيوم وفق المواصفات." } },
      { title: { en: "Installation", ar: "التركيب" }, description: { en: "On-site installation with careful attention to alignment and sealing.", ar: "التركيب في الموقع مع اهتمام دقيق بالمحاذاة والعزل." } },
      { title: { en: "Quality Check", ar: "فحص الجودة" }, description: { en: "Final inspection for operation, fit and finish before handover.", ar: "فحص نهائي للتشغيل والتركيب والتشطيب قبل التسليم." } }
    ],
    whyChooseUs: [
      { en: "Precision fabrication matched to architectural drawings", ar: "تصنيع دقيق مطابق للمخططات المعمارية" },
      { en: "Clean, professional on-site installation", ar: "تركيب نظيف واحترافي في الموقع" },
      { en: "Suitable for residential, commercial and industrial scopes", ar: "مناسب للمشاريع السكنية والتجارية والصناعية" }
    ],
    faq: [
      { q: { en: "Can you fabricate to custom architectural profiles?", ar: "هل يمكنكم التصنيع وفق مقاسات معمارية مخصصة؟" }, a: { en: "Yes, we fabricate aluminum systems to custom specifications and architectural drawings.", ar: "نعم، نقوم بتصنيع أنظمة الألمنيوم وفق المواصفات المخصصة والمخططات المعمارية." } }
    ],
    related: ["steel-metal-works", "building-construction", "construction-contracting"]
  },
  {
    slug: "steel-metal-works",
    category: { en: "Fabrication", ar: "التصنيع" },
    title: { en: "Steel & Metal Works", ar: "أعمال الحديد والمعادن" },
    shortDescription: {
      en: "Structural steel, welding and general metal fabrication for construction and industrial projects.",
      ar: "أعمال الحديد الإنشائي واللحام والتصنيع المعدني العام لمشاريع البناء والصناعة."
    },
    metaDescription: {
      en: "Steel and metal works in Kuwait covering structural fabrication, welding and general metalwork for construction and industrial clients.",
      ar: "أعمال الحديد والمعادن في الكويت تشمل التصنيع الإنشائي واللحام وأعمال المعادن العامة لعملاء البناء والصناعة."
    },
    heroImage: "/images/services/steel-metal-works.jpg",
    overview: [
      {
        en: "Our steel and metal works team handles structural fabrication, welding and general metalwork for construction sites and industrial clients, from structural framing to custom metal installations.",
        ar: "يتولى فريق أعمال الحديد والمعادن لدينا التصنيع الإنشائي واللحام وأعمال المعادن العامة لمواقع البناء والعملاء الصناعيين، بدءاً من الهياكل الإنشائية وحتى التركيبات المعدنية المخصصة."
      }
    ],
    capabilities: [
      { en: "Structural steel fabrication and erection", ar: "تصنيع وتركيب الحديد الإنشائي" },
      { en: "Welding and metal joining services", ar: "خدمات اللحام ووصل المعادن" },
      { en: "Staircases, railings and structural supports", ar: "السلالم والدرابزينات والدعامات الإنشائية" },
      { en: "Custom metal fabrication for industrial use", ar: "تصنيع معدني مخصص للاستخدام الصناعي" },
      { en: "Site installation and structural finishing", ar: "التركيب والتشطيب الإنشائي في الموقع" }
    ],
    industries: [
      { en: "Construction and contracting projects", ar: "مشاريع البناء والمقاولات" },
      { en: "Industrial and warehouse facilities", ar: "المنشآت الصناعية والمستودعات" },
      { en: "Commercial building fit-outs", ar: "تجهيزات المباني التجارية" }
    ],
    process: [
      { title: { en: "Design & Specification", ar: "التصميم والمواصفات" }, description: { en: "Structural requirements are reviewed and fabrication drawings prepared.", ar: "تتم مراجعة المتطلبات الإنشائية وإعداد مخططات التصنيع." } },
      { title: { en: "Fabrication", ar: "التصنيع" }, description: { en: "Steel and metal components are cut, welded and assembled in a controlled process.", ar: "يتم قص ولحام وتجميع مكونات الحديد والمعادن ضمن عملية منضبطة." } },
      { title: { en: "Site Erection", ar: "التركيب في الموقع" }, description: { en: "Fabricated structures are transported and erected on site.", ar: "يتم نقل الهياكل المصنعة وتركيبها في الموقع." } },
      { title: { en: "Inspection", ar: "الفحص" }, description: { en: "Welds and structural connections are inspected for quality and safety.", ar: "يتم فحص اللحامات والوصلات الإنشائية للتأكد من الجودة والسلامة." } }
    ],
    whyChooseUs: [
      { en: "Skilled welding and fabrication crews", ar: "طواقم لحام وتصنيع ماهرة" },
      { en: "Structural work suitable for construction and industrial use", ar: "أعمال إنشائية مناسبة للبناء والاستخدام الصناعي" },
      { en: "Attention to safety in fabrication and erection", ar: "اهتمام بالسلامة في التصنيع والتركيب" }
    ],
    faq: [
      { q: { en: "Do you fabricate custom structural components?", ar: "هل تقومون بتصنيع مكونات إنشائية مخصصة؟" }, a: { en: "Yes, we fabricate structural steel and custom metalwork to project-specific drawings and requirements.", ar: "نعم، نقوم بتصنيع الحديد الإنشائي والأعمال المعدنية المخصصة وفق مخططات ومتطلبات كل مشروع." } }
    ],
    related: ["aluminum-works", "construction-contracting", "scrap-trading"]
  },
  {
    slug: "scrap-trading",
    category: { en: "Trading", ar: "التجارة" },
    title: { en: "Scrap Trading", ar: "تجارة الخردة" },
    shortDescription: {
      en: "Commercial scrap buying, selling and handling for industrial and metal scrap materials.",
      ar: "شراء وبيع ومناولة الخردة التجارية للمواد الصناعية والمعدنية."
    },
    metaDescription: {
      en: "Scrap trading services in Kuwait covering commercial buying, selling and handling of industrial and metal scrap materials.",
      ar: "خدمات تجارة الخردة في الكويت تشمل الشراء والبيع التجاري ومناولة مواد الخردة الصناعية والمعدنية."
    },
    heroImage: "/images/services/scrap-trading.jpg",
    overview: [
      {
        en: "Al Maha operates as a commercial scrap trading partner, buying, selling and handling ferrous and non-ferrous metal scrap for industrial clients, workshops and facilities across Kuwait.",
        ar: "تعمل شركة المها كشريك تجاري في تجارة الخردة، حيث تشتري وتبيع وتناول خردة المعادن الحديدية وغير الحديدية للعملاء الصناعيين والورش والمنشآت في جميع أنحاء الكويت."
      }
    ],
    capabilities: [
      { en: "Purchase of ferrous and non-ferrous metal scrap", ar: "شراء خردة المعادن الحديدية وغير الحديدية" },
      { en: "Commercial scrap sales and supply", ar: "بيع وتوريد الخردة تجارياً" },
      { en: "Scrap collection and site clearance coordination", ar: "تنسيق جمع الخردة وتنظيف المواقع" },
      { en: "Sorting and handling of mixed industrial scrap", ar: "فرز ومناولة الخردة الصناعية المختلطة" }
    ],
    industries: [
      { en: "Industrial facilities and factories", ar: "المنشآت الصناعية والمصانع" },
      { en: "Construction and demolition sites", ar: "مواقع البناء والهدم" },
      { en: "Automotive and workshop operators", ar: "مشغلو السيارات والورش" }
    ],
    process: [
      { title: { en: "Assessment", ar: "التقييم" }, description: { en: "Scrap volume and material type are assessed to determine handling and pricing.", ar: "يتم تقييم كمية الخردة ونوع المادة لتحديد طريقة المناولة والتسعير." } },
      { title: { en: "Collection", ar: "الجمع" }, description: { en: "Scrap is collected from client sites in a coordinated, efficient manner.", ar: "يتم جمع الخردة من مواقع العملاء بطريقة منظمة وفعالة." } },
      { title: { en: "Sorting & Handling", ar: "الفرز والمناولة" }, description: { en: "Materials are sorted by type for proper handling and onward trading.", ar: "يتم فرز المواد حسب النوع لضمان المناولة الصحيحة والتجارة اللاحقة." } },
      { title: { en: "Settlement", ar: "التسوية" }, description: { en: "Commercial terms are settled transparently based on assessed material.", ar: "يتم تسوية الشروط التجارية بشفافية بناءً على المواد التي تم تقييمها." } }
    ],
    whyChooseUs: [
      { en: "Transparent commercial terms", ar: "شروط تجارية شفافة" },
      { en: "Efficient collection and site clearance", ar: "جمع فعال وتنظيف للمواقع" },
      { en: "Experience across ferrous and non-ferrous materials", ar: "خبرة في المواد الحديدية وغير الحديدية" }
    ],
    faq: [
      { q: { en: "What types of scrap do you handle?", ar: "ما أنواع الخردة التي تتعاملون معها؟" }, a: { en: "We handle a broad range of ferrous and non-ferrous metal scrap from industrial, construction and automotive sources.", ar: "نتعامل مع مجموعة واسعة من خردة المعادن الحديدية وغير الحديدية من مصادر صناعية وإنشائية وسيارات." } }
    ],
    related: ["recycling-services", "import-export", "steel-metal-works"]
  },
  {
    slug: "recycling-services",
    category: { en: "Trading", ar: "التجارة" },
    title: { en: "Recycling Services", ar: "خدمات إعادة التدوير" },
    shortDescription: {
      en: "Material recovery and industrial recycling services supporting responsible material reuse.",
      ar: "خدمات استرداد المواد وإعادة التدوير الصناعي لدعم إعادة الاستخدام المسؤول للمواد."
    },
    metaDescription: {
      en: "Industrial recycling and material recovery services in Kuwait, supporting responsible handling and reuse of recyclable materials.",
      ar: "خدمات إعادة التدوير الصناعي واسترداد المواد في الكويت، لدعم المناولة المسؤولة وإعادة استخدام المواد القابلة لإعادة التدوير."
    },
    heroImage: "/images/services/recycling-services.jpg",
    overview: [
      {
        en: "We support industrial clients with the recovery and responsible handling of recyclable materials, working alongside our scrap trading operations to keep usable materials in circulation.",
        ar: "ندعم العملاء الصناعيين في استرداد المواد القابلة لإعادة التدوير ومناولتها بمسؤولية، بالتعاون مع عمليات تجارة الخردة لدينا للحفاظ على تداول المواد القابلة للاستخدام."
      }
    ],
    capabilities: [
      { en: "Industrial material recovery coordination", ar: "تنسيق استرداد المواد الصناعية" },
      { en: "Recyclable material sorting and handling", ar: "فرز ومناولة المواد القابلة لإعادة التدوير" },
      { en: "Support for facility recycling programs", ar: "دعم برامج إعادة التدوير للمنشآت" }
    ],
    industries: [
      { en: "Manufacturing and processing facilities", ar: "منشآت التصنيع والمعالجة" },
      { en: "Construction and demolition operations", ar: "عمليات البناء والهدم" }
    ],
    process: [
      { title: { en: "Material Review", ar: "مراجعة المواد" }, description: { en: "Recyclable material streams are identified and assessed.", ar: "يتم تحديد وتقييم مسارات المواد القابلة لإعادة التدوير." } },
      { title: { en: "Collection & Sorting", ar: "الجمع والفرز" }, description: { en: "Materials are collected and sorted by category for onward handling.", ar: "يتم جمع المواد وفرزها حسب الفئة للمناولة اللاحقة." } },
      { title: { en: "Responsible Handling", ar: "المناولة المسؤولة" }, description: { en: "Materials are directed to appropriate recycling and reuse channels.", ar: "يتم توجيه المواد إلى قنوات إعادة التدوير وإعادة الاستخدام المناسبة." } }
    ],
    whyChooseUs: [
      { en: "Integrated with our scrap trading operations", ar: "متكامل مع عمليات تجارة الخردة لدينا" },
      { en: "Responsible material handling practices", ar: "ممارسات مسؤولة في مناولة المواد" }
    ],
    faq: [
      { q: { en: "Can you set up a recurring recycling collection for our facility?", ar: "هل يمكنكم ترتيب جمع دوري لإعادة التدوير من منشأتنا؟" }, a: { en: "Yes, we can coordinate recurring collection schedules for facilities generating consistent recyclable material volumes.", ar: "نعم، يمكننا تنسيق جداول جمع دورية للمنشآت التي تولّد كميات منتظمة من المواد القابلة لإعادة التدوير." } }
    ],
    related: ["scrap-trading", "import-export", "industrial-solutions"]
  },
  {
    slug: "import-export",
    category: { en: "Trading", ar: "التجارة" },
    title: { en: "Import & Export", ar: "الاستيراد والتصدير" },
    shortDescription: {
      en: "International sourcing and trading services connecting Kuwait to global suppliers and markets.",
      ar: "خدمات التوريد والتجارة الدولية التي تربط الكويت بالموردين والأسواق العالمية."
    },
    metaDescription: {
      en: "Import and export trading services from Kuwait, covering international sourcing, commercial trade and cross-border logistics coordination.",
      ar: "خدمات تجارة الاستيراد والتصدير من الكويت، تشمل التوريد الدولي والتجارة التجارية وتنسيق اللوجستيات عبر الحدود."
    },
    heroImage: "/images/services/import-export.jpg",
    overview: [
      {
        en: "Al Maha facilitates import and export trade for construction materials, industrial equipment, spare parts and general trading goods, connecting Kuwait-based demand with international supply.",
        ar: "تُسهّل شركة المها تجارة الاستيراد والتصدير لمواد البناء والمعدات الصناعية وقطع الغيار وسلع التجارة العامة، بما يربط الطلب في الكويت بالعرض الدولي."
      }
    ],
    capabilities: [
      { en: "International sourcing and supplier coordination", ar: "التوريد الدولي وتنسيق الموردين" },
      { en: "Import of construction and industrial materials", ar: "استيراد مواد البناء والمواد الصناعية" },
      { en: "Export coordination for trading goods", ar: "تنسيق التصدير لسلع التجارة" },
      { en: "Documentation and cross-border trade support", ar: "دعم التوثيق والتجارة عبر الحدود" }
    ],
    industries: [
      { en: "Construction material buyers", ar: "مشترو مواد البناء" },
      { en: "Industrial equipment operators", ar: "مشغلو المعدات الصناعية" },
      { en: "Spare parts and automotive trade", ar: "تجارة قطع الغيار والسيارات" }
    ],
    process: [
      { title: { en: "Sourcing Request", ar: "طلب التوريد" }, description: { en: "Client requirements are reviewed and matched to suitable suppliers.", ar: "تتم مراجعة متطلبات العميل ومطابقتها بالموردين المناسبين." } },
      { title: { en: "Trade Coordination", ar: "تنسيق التجارة" }, description: { en: "Commercial terms, documentation and logistics are coordinated.", ar: "يتم تنسيق الشروط التجارية والتوثيق واللوجستيات." } },
      { title: { en: "Shipment & Delivery", ar: "الشحن والتسليم" }, description: { en: "Goods are shipped and tracked through to delivery in Kuwait or destination market.", ar: "يتم شحن البضائع ومتابعتها حتى التسليم في الكويت أو السوق المستهدف." } }
    ],
    whyChooseUs: [
      { en: "Established sourcing and trading processes", ar: "عمليات توريد وتجارة راسخة" },
      { en: "Support across construction, industrial and spare parts trade", ar: "دعم في تجارة البناء والصناعة وقطع الغيار" }
    ],
    faq: [
      { q: { en: "Can you source specific materials or equipment on request?", ar: "هل يمكنكم توريد مواد أو معدات محددة عند الطلب؟" }, a: { en: "Yes, we coordinate international sourcing for specific construction materials, industrial equipment and spare parts based on client requirements.", ar: "نعم، ننسق التوريد الدولي لمواد بناء ومعدات صناعية وقطع غيار محددة بناءً على متطلبات العميل." } }
    ],
    related: ["used-vehicle-spare-parts", "heavy-equipment-parts", "logistics-transportation"]
  },
  {
    slug: "used-vehicle-spare-parts",
    category: { en: "Spare Parts", ar: "قطع الغيار" },
    title: { en: "Used Vehicle Spare Parts", ar: "قطع غيار السيارات المستعملة" },
    shortDescription: {
      en: "Trading of used automotive spare parts with import and export capability.",
      ar: "تجارة قطع غيار السيارات المستعملة مع إمكانية الاستيراد والتصدير."
    },
    metaDescription: {
      en: "Used vehicle spare parts trading in Kuwait, including sourcing, import and export of automotive parts for workshops and traders.",
      ar: "تجارة قطع غيار السيارات المستعملة في الكويت، بما في ذلك توريد واستيراد وتصدير قطع غيار السيارات للورش والتجار."
    },
    heroImage: "/images/services/used-vehicle-spare-parts.jpg",
    overview: [
      {
        en: "We trade used automotive spare parts, supporting workshops, resellers and buyers with sourcing, import and export of parts across a range of vehicle makes and models.",
        ar: "نتاجر في قطع غيار السيارات المستعملة، وندعم الورش وتجار إعادة البيع والمشترين في توريد واستيراد وتصدير القطع لمجموعة واسعة من الماركات والموديلات."
      }
    ],
    capabilities: [
      { en: "Sourcing of used spare parts by make and model", ar: "توريد قطع الغيار المستعملة حسب الماركة والموديل" },
      { en: "Import and export of automotive parts", ar: "استيراد وتصدير قطع غيار السيارات" },
      { en: "Trading support for workshops and resellers", ar: "دعم تجاري للورش وتجار إعادة البيع" }
    ],
    industries: [
      { en: "Auto repair workshops", ar: "ورش تصليح السيارات" },
      { en: "Spare parts resellers", ar: "تجار إعادة بيع قطع الغيار" },
      { en: "Individual vehicle owners", ar: "ملاك السيارات الأفراد" }
    ],
    process: [
      { title: { en: "Parts Request", ar: "طلب القطع" }, description: { en: "Client specifies the required part, make and model.", ar: "يحدد العميل القطعة المطلوبة والماركة والموديل." } },
      { title: { en: "Sourcing", ar: "التوريد" }, description: { en: "We source matching used parts through our trading network.", ar: "نقوم بتوريد القطع المستعملة المطابقة من خلال شبكتنا التجارية." } },
      { title: { en: "Supply / Import-Export", ar: "التوريد / الاستيراد والتصدير" }, description: { en: "Parts are supplied locally or coordinated through import/export as needed.", ar: "يتم توريد القطع محلياً أو تنسيق استيرادها وتصديرها حسب الحاجة." } }
    ],
    whyChooseUs: [
      { en: "Wide trading network for used auto parts", ar: "شبكة تجارية واسعة لقطع غيار السيارات المستعملة" },
      { en: "Import/export capability for hard-to-find parts", ar: "قدرة على الاستيراد والتصدير للقطع نادرة التوفر" }
    ],
    faq: [
      { q: { en: "Can you source parts for commercial vehicles as well?", ar: "هل يمكنكم توريد قطع للمركبات التجارية أيضاً؟" }, a: { en: "Yes, in addition to passenger vehicle parts, we source used parts for commercial and light-duty vehicles.", ar: "نعم، بالإضافة إلى قطع السيارات الخاصة، نوفر قطع غيار مستعملة للمركبات التجارية والخفيفة." } }
    ],
    related: ["heavy-equipment-parts", "import-export", "logistics-transportation"]
  },
  {
    slug: "heavy-equipment-parts",
    category: { en: "Spare Parts", ar: "قطع الغيار" },
    title: { en: "Heavy Equipment Parts", ar: "قطع غيار المعدات الثقيلة" },
    shortDescription: {
      en: "Truck, machinery and heavy-equipment spare parts trading, including engines and gearboxes.",
      ar: "تجارة قطع غيار الشاحنات والآليات والمعدات الثقيلة، بما في ذلك المحركات وصناديق التروس."
    },
    metaDescription: {
      en: "Heavy equipment and truck spare parts trading in Kuwait, including engines, gearboxes and machinery components for industrial and construction fleets.",
      ar: "تجارة قطع غيار المعدات الثقيلة والشاحنات في الكويت، بما في ذلك المحركات وصناديق التروس ومكونات الآليات لأساطيل الصناعة والبناء."
    },
    heroImage: "/images/services/heavy-equipment-parts.jpg",
    overview: [
      {
        en: "We supply spare parts for trucks, heavy machinery and construction equipment, including engines, gearboxes and structural components, supporting fleet operators and contractors in keeping equipment running.",
        ar: "نوفر قطع غيار للشاحنات والآليات الثقيلة ومعدات البناء، بما في ذلك المحركات وصناديق التروس والمكونات الإنشائية، لدعم مشغلي الأساطيل والمقاولين في إبقاء المعدات قيد التشغيل."
      }
    ],
    capabilities: [
      { en: "Truck and heavy machinery spare parts supply", ar: "توريد قطع غيار الشاحنات والآليات الثقيلة" },
      { en: "Engines and gearboxes trading", ar: "تجارة المحركات وصناديق التروس" },
      { en: "Sourcing for construction and industrial equipment", ar: "توريد لمعدات البناء والصناعة" }
    ],
    industries: [
      { en: "Construction fleet operators", ar: "مشغلو أساطيل البناء" },
      { en: "Heavy equipment rental companies", ar: "شركات تأجير المعدات الثقيلة" },
      { en: "Logistics and transport companies", ar: "شركات اللوجستيات والنقل" }
    ],
    process: [
      { title: { en: "Equipment Details", ar: "تفاصيل المعدة" }, description: { en: "Client provides equipment make, model and required part.", ar: "يقدم العميل تفاصيل ماركة وموديل المعدة والقطعة المطلوبة." } },
      { title: { en: "Sourcing & Quotation", ar: "التوريد والتسعير" }, description: { en: "We source the part and provide commercial terms.", ar: "نقوم بتوريد القطعة وتقديم الشروط التجارية." } },
      { title: { en: "Delivery", ar: "التسليم" }, description: { en: "Parts are delivered or coordinated for pickup based on client location.", ar: "يتم تسليم القطع أو تنسيق استلامها حسب موقع العميل." } }
    ],
    whyChooseUs: [
      { en: "Access to engines, gearboxes and major components", ar: "إمكانية الوصول إلى المحركات وصناديق التروس والمكونات الرئيسية" },
      { en: "Understanding of construction and industrial fleet needs", ar: "فهم لاحتياجات أساطيل البناء والصناعة" }
    ],
    faq: [
      { q: { en: "Do you supply parts for specific heavy equipment brands?", ar: "هل توفرون قطعاً لماركات محددة من المعدات الثقيلة؟" }, a: { en: "We source parts across a range of truck and heavy equipment brands — share your equipment details and required part for a quotation.", ar: "نوفر قطع غيار لمجموعة واسعة من ماركات الشاحنات والمعدات الثقيلة — يرجى مشاركة تفاصيل المعدة والقطعة المطلوبة للحصول على عرض سعر." } }
    ],
    related: ["used-vehicle-spare-parts", "import-export", "logistics-transportation"]
  },
  {
    slug: "logistics-transportation",
    category: { en: "Logistics", ar: "اللوجستيات" },
    title: { en: "Logistics & Transportation", ar: "الخدمات اللوجستية والنقل" },
    shortDescription: {
      en: "Transportation, material movement and commercial logistics support across Kuwait.",
      ar: "النقل ونقل المواد ودعم اللوجستيات التجارية في جميع أنحاء الكويت."
    },
    metaDescription: {
      en: "Logistics and transportation services in Kuwait supporting material movement, delivery coordination and commercial logistics for trading and construction clients.",
      ar: "خدمات اللوجستيات والنقل في الكويت لدعم نقل المواد وتنسيق التسليم واللوجستيات التجارية لعملاء التجارة والبناء."
    },
    heroImage: "/images/services/logistics-transportation.jpg",
    overview: [
      {
        en: "Our logistics and transportation services move materials, equipment and trading goods reliably across Kuwait, supporting our construction, trading and spare parts operations as well as third-party clients.",
        ar: "تنقل خدمات اللوجستيات والنقل لدينا المواد والمعدات وسلع التجارة بشكل موثوق في جميع أنحاء الكويت، بما يدعم عمليات البناء والتجارة وقطع الغيار الخاصة بنا بالإضافة إلى العملاء الخارجيين."
      }
    ],
    capabilities: [
      { en: "Material and equipment transportation", ar: "نقل المواد والمعدات" },
      { en: "Site delivery coordination", ar: "تنسيق التسليم إلى المواقع" },
      { en: "Commercial logistics support", ar: "دعم اللوجستيات التجارية" }
    ],
    industries: [
      { en: "Construction and contracting projects", ar: "مشاريع البناء والمقاولات" },
      { en: "Trading and distribution businesses", ar: "أعمال التجارة والتوزيع" }
    ],
    process: [
      { title: { en: "Movement Request", ar: "طلب النقل" }, description: { en: "Client specifies material, volume and destination.", ar: "يحدد العميل المواد والكمية والوجهة." } },
      { title: { en: "Scheduling", ar: "الجدولة" }, description: { en: "Transportation is scheduled to align with project or delivery timelines.", ar: "يتم جدولة النقل بما يتوافق مع الجداول الزمنية للمشروع أو التسليم." } },
      { title: { en: "Delivery", ar: "التسليم" }, description: { en: "Goods are transported and delivered to the specified location.", ar: "يتم نقل البضائع وتسليمها إلى الموقع المحدد." } }
    ],
    whyChooseUs: [
      { en: "Reliable coordination across our own operations", ar: "تنسيق موثوق عبر عملياتنا الخاصة" },
      { en: "Experience moving construction and trading materials", ar: "خبرة في نقل مواد البناء والتجارة" }
    ],
    faq: [
      { q: { en: "Can you handle recurring delivery schedules for ongoing projects?", ar: "هل يمكنكم التعامل مع جداول تسليم متكررة للمشاريع المستمرة؟" }, a: { en: "Yes, we can coordinate recurring transportation and delivery schedules aligned to project timelines.", ar: "نعم، يمكننا تنسيق جداول نقل وتسليم متكررة تتماشى مع الجداول الزمنية للمشروع." } }
    ],
    related: ["warehouse-storage", "import-export", "industrial-solutions"]
  },
  {
    slug: "industrial-solutions",
    category: { en: "Industrial", ar: "الصناعة" },
    title: { en: "Industrial Solutions", ar: "الحلول الصناعية" },
    shortDescription: {
      en: "Industrial supply and operational support solutions for facilities and projects.",
      ar: "حلول توريد صناعي ودعم تشغيلي للمنشآت والمشاريع."
    },
    metaDescription: {
      en: "Industrial supply and operational support solutions in Kuwait for facilities, contractors and industrial operators.",
      ar: "حلول توريد صناعي ودعم تشغيلي في الكويت للمنشآت والمقاولين والمشغلين الصناعيين."
    },
    heroImage: "/images/services/industrial-solutions.jpg",
    overview: [
      {
        en: "Al Maha supports industrial clients with supply and operational solutions that draw on our trading, contracting and logistics capabilities, tailored to each facility's requirements.",
        ar: "تدعم شركة المها العملاء الصناعيين بحلول توريد وتشغيل تعتمد على قدراتنا في التجارة والمقاولات واللوجستيات، مصممة وفق متطلبات كل منشأة."
      }
    ],
    capabilities: [
      { en: "Industrial equipment and materials supply", ar: "توريد المعدات والمواد الصناعية" },
      { en: "Operational support for facility requirements", ar: "دعم تشغيلي لمتطلبات المنشآت" },
      { en: "Coordination across trading and logistics services", ar: "التنسيق بين خدمات التجارة واللوجستيات" }
    ],
    industries: [
      { en: "Manufacturing facilities", ar: "منشآت التصنيع" },
      { en: "Industrial site operators", ar: "مشغلو المواقع الصناعية" }
    ],
    process: [
      { title: { en: "Needs Assessment", ar: "تقييم الاحتياجات" }, description: { en: "We review the facility's supply and operational requirements.", ar: "نراجع متطلبات التوريد والتشغيل الخاصة بالمنشأة." } },
      { title: { en: "Solution Coordination", ar: "تنسيق الحل" }, description: { en: "Relevant supply, trading or logistics services are coordinated.", ar: "يتم تنسيق خدمات التوريد أو التجارة أو اللوجستيات ذات الصلة." } },
      { title: { en: "Ongoing Support", ar: "الدعم المستمر" }, description: { en: "We remain available for recurring or evolving industrial needs.", ar: "نبقى متاحين للاحتياجات الصناعية المتكررة أو المتطورة." } }
    ],
    whyChooseUs: [
      { en: "Single partner across multiple industrial needs", ar: "شريك واحد لتلبية احتياجات صناعية متعددة" },
      { en: "Flexible, facility-specific approach", ar: "منهجية مرنة وخاصة بكل منشأة" }
    ],
    faq: [
      { q: { en: "Can you support a facility with multiple ongoing needs at once?", ar: "هل يمكنكم دعم منشأة لديها احتياجات متعددة ومستمرة في آن واحد؟" }, a: { en: "Yes, we can coordinate supply, logistics and related services together for facilities with multiple ongoing requirements.", ar: "نعم، يمكننا تنسيق التوريد واللوجستيات والخدمات ذات الصلة معاً للمنشآت ذات المتطلبات المتعددة والمستمرة." } }
    ],
    related: ["logistics-transportation", "warehouse-storage", "import-export"]
  },
  {
    slug: "warehouse-storage",
    category: { en: "Logistics", ar: "اللوجستيات" },
    title: { en: "Warehouse & Storage Services", ar: "خدمات المستودعات والتخزين" },
    shortDescription: {
      en: "Professional warehouse and storage solutions for materials, equipment and trading goods.",
      ar: "حلول احترافية للمستودعات والتخزين للمواد والمعدات وسلع التجارة."
    },
    metaDescription: {
      en: "Warehouse and storage services in Kuwait for construction materials, industrial equipment and trading goods, supporting supply chain continuity.",
      ar: "خدمات المستودعات والتخزين في الكويت لمواد البناء والمعدات الصناعية وسلع التجارة، لدعم استمرارية سلسلة التوريد."
    },
    heroImage: "/images/services/warehouse-storage.jpg",
    overview: [
      {
        en: "We provide warehouse and storage support for materials, equipment and trading goods, helping clients manage inventory and supply continuity alongside our trading and logistics operations.",
        ar: "نوفر دعم المستودعات والتخزين للمواد والمعدات وسلع التجارة، لمساعدة العملاء في إدارة المخزون واستمرارية التوريد إلى جانب عمليات التجارة واللوجستيات لدينا."
      }
    ],
    capabilities: [
      { en: "Storage for construction materials and equipment", ar: "تخزين مواد ومعدات البناء" },
      { en: "Inventory support for trading goods", ar: "دعم المخزون لسلع التجارة" },
      { en: "Coordinated dispatch from storage to site", ar: "تنسيق الشحن من المستودع إلى الموقع" }
    ],
    industries: [
      { en: "Construction and contracting projects", ar: "مشاريع البناء والمقاولات" },
      { en: "Trading and distribution operations", ar: "عمليات التجارة والتوزيع" }
    ],
    process: [
      { title: { en: "Storage Assessment", ar: "تقييم التخزين" }, description: { en: "We review material type, volume and storage duration.", ar: "نراجع نوع المواد وكميتها ومدة التخزين." } },
      { title: { en: "Storage & Management", ar: "التخزين والإدارة" }, description: { en: "Goods are stored and tracked for the required period.", ar: "يتم تخزين البضائع ومتابعتها للمدة المطلوبة." } },
      { title: { en: "Dispatch", ar: "الشحن" }, description: { en: "Materials are dispatched to site or client as scheduled.", ar: "يتم شحن المواد إلى الموقع أو العميل وفق الجدول الزمني." } }
    ],
    whyChooseUs: [
      { en: "Integrated with our logistics and trading operations", ar: "متكامل مع عمليات اللوجستيات والتجارة لدينا" },
      { en: "Coordinated storage-to-site dispatch", ar: "شحن منسق من المستودع إلى الموقع" }
    ],
    faq: [
      { q: { en: "Can you store materials for an ongoing project timeline?", ar: "هل يمكنكم تخزين المواد لمدة مشروع مستمر؟" }, a: { en: "Yes, we can arrange storage aligned to your project's phased delivery and consumption schedule.", ar: "نعم، يمكننا ترتيب التخزين بما يتوافق مع جدول التسليم والاستهلاك المرحلي لمشروعكم." } }
    ],
    related: ["logistics-transportation", "industrial-solutions", "import-export"]
  }
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.related
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));
}
