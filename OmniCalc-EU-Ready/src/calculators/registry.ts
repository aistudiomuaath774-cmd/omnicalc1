import { lazy } from "react"
import { Calculator, Ruler, Atom, HeartPulse, Landmark, CalendarClock } from "lucide-react"
import type { CalculatorDef } from "./types"

/**
 * Central calculator registry.
 *
 * To add a new calculator:
 *   1. Create a component in src/calculators/<Name>.tsx
 *   2. Add one entry to this array with a unique `id`.
 * Routing, navigation, home cards, SEO and JSON-LD are all derived from here.
 */
export const calculators: CalculatorDef[] = [
  {
    id: "scientific",
    titleKey: "sci.title",
    descKey: "sci.desc",
    guideKey: "sci.guide",
    categoryKey: "nav.calculators",
    icon: Calculator,
    accent: "from-blue-500/15 to-blue-500/5 text-blue-500",
    component: lazy(() => import("./Scientific")),
    faq: [
      {
        q: {
          en: "Does the scientific calculator support keyboard input?",
          ar: "هل تدعم الحاسبة العلمية إدخال لوحة المفاتيح؟",
        },
        a: {
          en: "Yes. Type digits and operators directly, press Enter to evaluate, Backspace to delete and Esc to clear.",
          ar: "نعم. اكتب الأرقام والعوامل مباشرة، اضغط Enter للحساب وBackspace للحذف وEsc للمسح.",
        },
      },
      {
        q: {
          en: "How do I switch between degrees and radians?",
          ar: "كيف أبدّل بين الدرجات والراديان؟",
        },
        a: {
          en: "Use the DEG/RAD toggle above the keypad. Trigonometric functions honor the selected mode.",
          ar: "استخدم مفتاح درجة/راديان أعلى لوحة الأزرار. تتبع الدوال المثلثية الوضع المحدد.",
        },
      },
    ],
  },
  {
    id: "unit-converter",
    titleKey: "unit.title",
    descKey: "unit.desc",
    guideKey: "unit.guide",
    categoryKey: "nav.calculators",
    icon: Ruler,
    accent: "from-emerald-500/15 to-emerald-500/5 text-emerald-500",
    component: lazy(() => import("./UnitConverter")),
    faq: [
      {
        q: {
          en: "Which unit categories are supported?",
          ar: "ما فئات الوحدات المدعومة؟",
        },
        a: {
          en: "Length, area, volume, mass and temperature, each with the most common metric and imperial units.",
          ar: "الطول والمساحة والحجم والكتلة ودرجة الحرارة، ولكل منها أشهر الوحدات المترية والإمبراطورية.",
        },
      },
      {
        q: {
          en: "How is temperature converted?",
          ar: "كيف يتم تحويل درجة الحرارة؟",
        },
        a: {
          en: "Temperatures use exact formulas between Celsius, Fahrenheit and Kelvin rather than a simple ratio.",
          ar: "تستخدم درجات الحرارة معادلات دقيقة بين المئوية والفهرنهايت والكلفن بدلاً من نسبة بسيطة.",
        },
      },
    ],
  },
  {
    id: "physics",
    titleKey: "phys.title",
    descKey: "phys.desc",
    guideKey: "phys.guide",
    categoryKey: "nav.calculators",
    icon: Atom,
    accent: "from-violet-500/15 to-violet-500/5 text-violet-500",
    component: lazy(() => import("./Physics")),
    faq: [
      {
        q: {
          en: "What units does the physics calculator use?",
          ar: "ما الوحدات التي تستخدمها حاسبة الفيزياء؟",
        },
        a: {
          en: "SI units throughout: meters, seconds, kilograms, newtons, joules and watts.",
          ar: "وحدات النظام الدولي: الأمتار والثواني والكيلوغرامات والنيوتن والجول والواط.",
        },
      },
      {
        q: {
          en: "How is force calculated?",
          ar: "كيف تُحسب القوة؟",
        },
        a: {
          en: "Force uses Newton's second law: F = m × a (mass times acceleration).",
          ar: "تُحسب القوة بقانون نيوتن الثاني: القوة = الكتلة × التسارع.",
        },
      },
    ],
  },
  {
    id: "health",
    titleKey: "health.title",
    descKey: "health.desc",
    guideKey: "health.guide",
    categoryKey: "nav.calculators",
    icon: HeartPulse,
    accent: "from-rose-500/15 to-rose-500/5 text-rose-500",
    component: lazy(() => import("./Health")),
    faq: [
      {
        q: {
          en: "Which formula is used for calories?",
          ar: "ما المعادلة المستخدمة للسعرات؟",
        },
        a: {
          en: "The Mifflin-St Jeor equation for basal metabolic rate, multiplied by an activity factor.",
          ar: "معادلة ميفلين-سانت جور لمعدل الأيض الأساسي مضروبة في عامل النشاط.",
        },
      },
      {
        q: {
          en: "How accurate is the body fat estimate?",
          ar: "ما مدى دقة تقدير نسبة الدهون؟",
        },
        a: {
          en: "It uses the US Navy circumference method, a reasonable estimate but not a clinical measurement.",
          ar: "يستخدم طريقة محيط البحرية الأمريكية، وهو تقدير معقول لكنه ليس قياسًا سريريًا.",
        },
      },
    ],
  },
  {
    id: "vat",
    titleKey: "vat.title",
    descKey: "vat.desc",
    guideKey: "vat.guide",
    categoryKey: "nav.calculators",
    icon: Landmark,
    accent: "from-orange-500/15 to-orange-500/5 text-orange-500",
    component: lazy(() => import("./VATCalculator")),
    faq: [
      {
        q: { en: "What does the European VAT calculator calculate?", ar: "ماذا تحسب حاسبة ضريبة القيمة المضافة الأوروبية؟" },
        a: { en: "It calculates the VAT amount and the net or gross total when you provide an amount and a VAT rate.", ar: "تحسب قيمة الضريبة والإجمالي الصافي أو الإجمالي عند إدخال المبلغ ونسبة ضريبة القيمة المضافة." },
      },
      {
        q: { en: "Which VAT rates are included?", ar: "ما نسب ضريبة القيمة المضافة المتاحة؟" },
        a: { en: "Quick presets include 19% for Germany, 20% for the United Kingdom, 21% for Spain, 23% for Ireland, 24% for Greece and 25% for Sweden, plus a custom rate.", ar: "تتضمن النسب السريعة 19% لألمانيا و20% للمملكة المتحدة و21% لإسبانيا و23% لأيرلندا و24% لليونان و25% للسويد، إضافة إلى نسبة مخصصة." },
      },
      {
        q: { en: "Are VAT rates the same for every transaction?", ar: "هل تكون نسب الضريبة نفسها لكل معاملة؟" },
        a: { en: "No. Rates can vary by country, product, date and transaction type. Verify the applicable rate with an official tax source or qualified adviser.", ar: "لا. قد تختلف النسب حسب البلد والمنتج والتاريخ ونوع المعاملة. تحقّق من النسبة السارية من مصدر ضريبي رسمي أو مستشار مؤهل." },
      },
    ],
  },
  {
    id: "finance",
    titleKey: "fin.title",
    descKey: "fin.desc",
    guideKey: "fin.guide",
    categoryKey: "nav.calculators",
    icon: Landmark,
    accent: "from-amber-500/15 to-amber-500/5 text-amber-500",
    component: lazy(() => import("./Finance")),
    faq: [
      {
        q: {
          en: "How is the mortgage payment calculated?",
          ar: "كيف يُحسب قسط الرهن؟",
        },
        a: {
          en: "It uses the standard amortization formula based on principal, monthly rate and number of payments.",
          ar: "يستخدم معادلة الإطفاء القياسية بناءً على المبلغ الأساسي والمعدل الشهري وعدد الأقساط.",
        },
      },
      {
        q: {
          en: "Is the finance calculator tied to a currency?",
          ar: "هل ترتبط حاسبة المالية بعملة معينة؟",
        },
        a: {
          en: "No. It is currency-agnostic — enter amounts in any currency and results stay in the same unit.",
          ar: "لا. إنها مستقلة عن العملة — أدخل المبالغ بأي عملة وتبقى النتائج بالوحدة نفسها.",
        },
      },
    ],
  },
  {
    id: "date-age",
    titleKey: "date.title",
    descKey: "date.desc",
    guideKey: "date.guide",
    categoryKey: "nav.calculators",
    icon: CalendarClock,
    accent: "from-cyan-500/15 to-cyan-500/5 text-cyan-500",
    component: lazy(() => import("./DateAge")),
    faq: [
      {
        q: {
          en: "How is age broken down?",
          ar: "كيف يتم تفصيل العمر؟",
        },
        a: {
          en: "Into years, months and days from the date of birth to today, accounting for varying month lengths.",
          ar: "إلى سنوات وأشهر وأيام من تاريخ الميلاد حتى اليوم مع مراعاة اختلاف أطوال الأشهر.",
        },
      },
      {
        q: {
          en: "Can I measure the gap between any two dates?",
          ar: "هل يمكنني قياس الفارق بين أي تاريخين؟",
        },
        a: {
          en: "Yes, switch to Date Difference mode to get the total days and a full breakdown.",
          ar: "نعم، بدّل إلى وضع الفرق بين تاريخين للحصول على إجمالي الأيام وتفصيل كامل.",
        },
      },
    ],
  },
]

export function getCalculator(id: string): CalculatorDef | undefined {
  return calculators.find((c) => c.id === id)
}
