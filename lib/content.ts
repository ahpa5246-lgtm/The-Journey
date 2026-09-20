export type Locale = "en" | "ar";
export type Audience = "visitor" | "local";
export type PlaceCategory = "heritage" | "nature" | "food" | "stay" | "culture";

export type Place = {
  id: string;
  name: { en: string; ar: string };
  governorate: string;
  category: PlaceCategory;
  summary: { en: string; ar: string };
  sourceLabel: string;
  sourceUrl: string;
  verified: boolean;
  featured?: boolean;
};

export const places: Place[] = [
  {
    id: "babylon",
    name: { en: "Babylon", ar: "بابل" },
    governorate: "Babylon",
    category: "heritage",
    summary: {
      en: "A UNESCO-listed archaeological landscape tied to one of Mesopotamia's most influential ancient cities.",
      ar: "موقع أثري مُدرج لدى اليونسكو ويرتبط بإحدى أكثر مدن بلاد الرافدين تأثيراً في التاريخ القديم.",
    },
    sourceLabel: "UNESCO World Heritage Centre",
    sourceUrl: "https://whc.unesco.org/en/list/278/",
    verified: true,
    featured: true,
  },
  {
    id: "erbil-citadel",
    name: { en: "Erbil Citadel", ar: "قلعة أربيل" },
    governorate: "Erbil",
    category: "heritage",
    summary: {
      en: "A fortified historic settlement rising above central Erbil and inscribed on UNESCO's World Heritage List.",
      ar: "مستوطنة تاريخية محصنة ترتفع فوق مركز أربيل ومدرجة على قائمة التراث العالمي لليونسكو.",
    },
    sourceLabel: "UNESCO World Heritage Centre",
    sourceUrl: "https://whc.unesco.org/en/list/1437/",
    verified: true,
    featured: true,
  },
  {
    id: "hatra",
    name: { en: "Hatra", ar: "الحضر" },
    governorate: "Nineveh",
    category: "heritage",
    summary: {
      en: "A fortified ancient city known for monumental architecture shaped by multiple cultural traditions.",
      ar: "مدينة قديمة محصنة معروفة بعمارتها الضخمة التي تأثرت بعدة تقاليد حضارية.",
    },
    sourceLabel: "UNESCO World Heritage Centre",
    sourceUrl: "https://whc.unesco.org/en/list/277/",
    verified: true,
    featured: true,
  },
  {
    id: "ashur",
    name: { en: "Ashur (Qal'at Sherqat)", ar: "آشور (قلعة الشرقاط)" },
    governorate: "Salah al-Din",
    category: "heritage",
    summary: {
      en: "The ancient religious capital of Assyria, positioned on the Tigris and listed by UNESCO.",
      ar: "العاصمة الدينية القديمة لآشور على نهر دجلة، والمدرجة على قائمة اليونسكو.",
    },
    sourceLabel: "UNESCO World Heritage Centre",
    sourceUrl: "https://whc.unesco.org/en/list/1130/",
    verified: true,
  },
  {
    id: "samarra",
    name: { en: "Samarra Archaeological City", ar: "مدينة سامراء الأثرية" },
    governorate: "Salah al-Din",
    category: "heritage",
    summary: {
      en: "An extensive archaeological city that preserves a major chapter of Abbasid urban history.",
      ar: "مدينة أثرية واسعة تحفظ فصلاً مهماً من التاريخ العمراني العباسي.",
    },
    sourceLabel: "UNESCO World Heritage Centre",
    sourceUrl: "https://whc.unesco.org/en/list/276/",
    verified: true,
  },
  {
    id: "ahwar",
    name: { en: "The Ahwar of Southern Iraq", ar: "أهوار جنوب العراق" },
    governorate: "Southern Iraq",
    category: "nature",
    summary: {
      en: "A UNESCO mixed property combining wetland biodiversity with the archaeological landscape of ancient Mesopotamian cities.",
      ar: "موقع مختلط لدى اليونسكو يجمع بين التنوع الحيوي للأهوار والمشهد الأثري لمدن بلاد الرافدين القديمة.",
    },
    sourceLabel: "UNESCO World Heritage Centre",
    sourceUrl: "https://whc.unesco.org/en/list/1481/",
    verified: true,
    featured: true,
  },
];

export const governorateCounts: Record<string, number> = places.reduce<Record<string, number>>(
  (acc, place) => {
    acc[place.governorate] = (acc[place.governorate] ?? 0) + 1;
    return acc;
  },
  {},
);

export const copy = {
  en: {
    brand: "The Journey",
    nav: { discover: "Discover", map: "Map", creators: "Creator trails" },
    visitor: "I'm visiting Iraq",
    local: "I live in Iraq",
    heroVisitor: "See Iraq with context, not scattered tabs.",
    heroLocal: "Find a better plan for your next day out.",
    heroSubVisitor:
      "Verified heritage, practical travel essentials, map-led discovery and creator trails — bilingual from the start.",
    heroSubLocal:
      "Fresh local discovery, creator-led recommendations and map filters built for weekends, families and new places.",
    explore: "Explore Iraq",
    mapTitle: "Pick a governorate. Then narrow the noise.",
    creatorsTitle: "Creator trails, collected in one place.",
    essentials: "Before you go",
    planner: "Smart trip finder",
  },
  ar: {
    brand: "الرحلة",
    nav: { discover: "اكتشف", map: "الخريطة", creators: "رحلات المؤثرين" },
    visitor: "أنا زائر للعراق",
    local: "أنا أعيش في العراق",
    heroVisitor: "اكتشف العراق بسياق واضح، لا بعشرات التبويبات المبعثرة.",
    heroLocal: "رتّب طلعتك القادمة من مكان واحد.",
    heroSubVisitor:
      "تراث موثّق، أساسيات سفر عملية، اكتشاف عبر الخريطة ورحلات صُنّاع المحتوى — بالعربية والإنجليزية.",
    heroSubLocal:
      "اكتشاف محلي متجدد، توصيات من صناع المحتوى وفلاتر خريطة مناسبة للعوائل والطلعات والأماكن الجديدة.",
    explore: "اكتشف العراق",
    mapTitle: "اختر المحافظة، وبعدها صفِّ النتائج التي تحتاجها فقط.",
    creatorsTitle: "رحلات المؤثرين، مجمعة في مكان واحد.",
    essentials: "قبل لا تطلع",
    planner: "مخطط الرحلة الذكي",
  },
} as const;
