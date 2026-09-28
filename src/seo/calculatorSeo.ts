import type { Lang } from "@/i18n/translations"

export type CalculatorSeo = {
  title: Record<Lang, string>
  description: Record<Lang, string>
  keywords: Record<Lang, string>
  answer: Record<Lang, string>
  steps: Record<Lang, string[]>
}

export const calculatorSeo: Record<string, CalculatorSeo> = {
  "date-age": {
    title: {
      en: "Age Calculator Online — Exact Chronological Age",
      ar: "حاسبة العمر بالميلادي بدقة",
    },
    description: {
      en: "Calculate exact age in years, months, days and total days. Use our free chronological age calculator online with clear results.",
      ar: "احسب عمرك بالسنوات والأشهر والأيام وإجمالي الأيام بدقة. حاسبة عمر مجانية وسهلة للاستخدام.",
    },
    keywords: {
      en: "age calculator online, chronological age calculator, date difference calculator, calculate exact age",
      ar: "حاسبة العمر، حاسبة العمر بالميلادي، برنامج حساب العمر، حساب العمر بالهجري، الفرق بين تاريخين",
    },
    answer: {
      en: "OmniCalc calculates chronological age by comparing the date of birth with today, then breaking the elapsed period into complete years, months, and days. It accounts for different month lengths and also reports the total number of elapsed days.",
      ar: "تحسب OmniCalc العمر الزمني بمقارنة تاريخ الميلاد بتاريخ اليوم، ثم تقسيم الفترة المنقضية إلى سنوات وأشهر وأيام مكتملة. تراعي الحاسبة اختلاف طول الأشهر وتعرض أيضاً إجمالي الأيام المنقضية.",
    },
    steps: {
      en: ["Choose Age Calculator and enter your date of birth.", "Select Calculate to compare it with today's date.", "Read the result as years, months, days, and total days."],
      ar: ["اختر وضع حاسبة العمر وأدخل تاريخ الميلاد.", "اضغط احسب لمقارنة التاريخ بتاريخ اليوم.", "اقرأ النتيجة بالسنوات والأشهر والأيام وإجمالي الأيام."],
    },
  },
  "unit-converter": {
    title: {
      en: "Unit Converter — Length, Weight, Volume & More",
      ar: "تحويل وحدات القياس — الطول والوزن والحجم",
    },
    description: {
      en: "Convert length, area, volume, mass and temperature units instantly. Free online unit converter with metric and imperial options.",
      ar: "حوّل وحدات الطول والمساحة والحجم والكتلة ودرجة الحرارة فوراً. محول وحدات مجاني يدعم النظامين المتري والإمبراطوري.",
    },
    keywords: {
      en: "unit converter, length converter, weight converter, volume converter, temperature converter",
      ar: "تحويل الوحدات، محول وحدات القياس، تحويل الطول، تحويل الوزن، تحويل الحرارة",
    },
    answer: {
      en: "OmniCalc converts a value by translating it to a base unit for the selected category, then translating that base value to the target unit. Temperature uses exact Celsius, Fahrenheit, and Kelvin formulas instead of a simple multiplier.",
      ar: "تحوّل OmniCalc القيمة إلى وحدة أساسية للفئة المختارة، ثم تحوّل القيمة الأساسية إلى الوحدة الهدف. وتستخدم درجات الحرارة معادلات دقيقة بين المئوية والفهرنهايت والكلفن بدلاً من معامل ضرب بسيط.",
    },
    steps: {
      en: ["Choose a category such as length, mass, volume, area, or temperature.", "Enter a value and select the source and target units.", "Review the converted value and use the swap button for the reverse conversion."],
      ar: ["اختر فئة مثل الطول أو الكتلة أو الحجم أو المساحة أو الحرارة.", "أدخل القيمة وحدد وحدة المصدر والوحدة الهدف.", "راجع القيمة المحولة واستخدم زر التبديل للتحويل العكسي."],
    },
  },
  scientific: {
    title: { en: "Scientific Calculator Online — Free & Fast", ar: "الحاسبة العلمية أونلاين — مجانية وسريعة" },
    description: { en: "Solve trigonometry, logarithms, exponents and factorials with a free scientific calculator and DEG/RAD support.", ar: "احسب الدوال المثلثية واللوغاريتمات والأسس والمضروب مع حاسبة علمية مجانية ودعم الدرجة والراديان." },
    keywords: { en: "scientific calculator, online calculator, trigonometry calculator", ar: "حاسبة علمية، حاسبة مثلثية، حاسبة أونلاين" },
    answer: { en: "The OmniCalc scientific calculator evaluates common arithmetic, trigonometric, logarithmic, exponential, and factorial expressions. Use DEG for degrees or RAD for radians before evaluating trigonometric functions.", ar: "تقيّم الحاسبة العلمية في OmniCalc العمليات الحسابية والدوال المثلثية واللوغاريتمية والأسية والمضروب. استخدم وضع الدرجة أو الراديان قبل حساب الدوال المثلثية." },
    steps: { en: ["Type an expression or use the calculator buttons.", "Choose DEG or RAD for trigonometric calculations.", "Press Calculate or Enter to view the result."], ar: ["اكتب تعبيراً أو استخدم أزرار الحاسبة.", "اختر الدرجة أو الراديان للحسابات المثلثية.", "اضغط احسب أو Enter لعرض النتيجة."] },
  },
  physics: {
    title: { en: "Physics Calculator — Force, Speed & Power", ar: "حاسبة الفيزياء — القوة والسرعة والقدرة" },
    description: { en: "Calculate common physics quantities including speed, acceleration, force, energy and power using SI units.", ar: "احسب كميات فيزيائية شائعة مثل السرعة والتسارع والقوة والطاقة والقدرة باستخدام وحدات النظام الدولي." },
    keywords: { en: "physics calculator, force calculator, speed calculator, power calculator", ar: "حاسبة الفيزياء، حاسبة القوة، حاسبة السرعة، حاسبة القدرة" },
    answer: { en: "The physics calculator applies standard introductory relationships such as speed equals distance divided by time and force equals mass multiplied by acceleration. Enter compatible SI-unit values for the clearest result.", ar: "تستخدم حاسبة الفيزياء علاقات تمهيدية قياسية مثل السرعة التي تساوي المسافة مقسومة على الزمن والقوة التي تساوي الكتلة مضروبة في التسارع. أدخل قيماً متوافقة مع وحدات النظام الدولي." },
    steps: { en: ["Select the physical quantity you want to calculate.", "Enter the known values in compatible units.", "Review the result and its SI unit."], ar: ["حدد الكمية الفيزيائية التي تريد حسابها.", "أدخل القيم المعروفة بوحدات متوافقة.", "راجع النتيجة ووحدة النظام الدولي الخاصة بها."] },
  },
  health: {
    title: { en: "Health Calculator — BMI, Calories & Body Fat", ar: "حاسبة الصحة — BMI والسعرات ونسبة الدهون" },
    description: { en: "Estimate BMI, daily calories and body fat with free health calculators. Results are educational estimates, not medical diagnoses.", ar: "قدّر مؤشر كتلة الجسم والسعرات اليومية ونسبة الدهون. النتائج تعليمية وليست تشخيصاً طبياً." },
    keywords: { en: "BMI calculator, calorie calculator, body fat calculator, health calculator", ar: "حاسبة BMI، حاسبة السعرات، حاسبة نسبة الدهون، حاسبة الصحة" },
    answer: { en: "OmniCalc provides educational estimates for BMI, daily calorie needs, and body-fat percentage from the values you enter. These estimates can support planning but do not replace clinical measurements or professional medical advice.", ar: "تقدم OmniCalc تقديرات تعليمية لمؤشر كتلة الجسم واحتياج السعرات ونسبة الدهون اعتماداً على القيم المدخلة. تساعد التقديرات في التخطيط لكنها لا تحل محل القياس السريري أو المشورة الطبية." },
    steps: { en: ["Choose the health measure you want to estimate.", "Enter the requested personal measurements.", "Use the result as a general planning reference, not a diagnosis."], ar: ["اختر المؤشر الصحي الذي تريد تقديره.", "أدخل القياسات الشخصية المطلوبة.", "استخدم النتيجة كمرجع عام للتخطيط وليست تشخيصاً." ] },
  },
  vat: {
    title: { en: "VAT Calculator — Add or Remove Sales Tax", ar: "حاسبة ضريبة القيمة المضافة — إضافة أو استخراج الضريبة" },
    description: { en: "Calculate VAT, net price and gross price with common rate presets or a custom tax rate. Verify rates for your jurisdiction.", ar: "احسب ضريبة القيمة المضافة والسعر الصافي والإجمالي بنسب شائعة أو نسبة مخصصة، وتحقق من النسبة المحلية." },
    keywords: { en: "VAT calculator, sales tax calculator, net gross price", ar: "حاسبة ضريبة القيمة المضافة، حاسبة الضريبة، السعر الصافي والإجمالي" },
    answer: { en: "The VAT calculator adds or removes a selected tax rate from an amount. Gross price equals net price multiplied by one plus the VAT rate; removing VAT reverses that relationship. Rates vary by jurisdiction and transaction.", ar: "تضيف حاسبة الضريبة نسبة مختارة إلى المبلغ أو تستخرجها منه. يساوي السعر الإجمالي السعر الصافي مضروباً في واحد زائد النسبة، وتختلف النسب حسب البلد والمعاملة." },
    steps: { en: ["Enter the amount and choose whether it is net or gross.", "Select a preset VAT rate or enter a custom rate.", "Check the calculated VAT and final amount against the applicable tax rules."], ar: ["أدخل المبلغ وحدد ما إذا كان صافياً أو إجمالياً.", "اختر نسبة ضريبة جاهزة أو أدخل نسبة مخصصة.", "تحقق من قيمة الضريبة والمبلغ النهائي وفق القواعد السارية." ] },
  },
  finance: {
    title: { en: "Finance Calculator — Mortgage, ROI & Profit", ar: "حاسبة مالية — الرهن والعائد والربح" },
    description: { en: "Explore mortgage payments, ROI, discounts and profit margins with free financial planning calculators.", ar: "احسب دفعات الرهن والعائد على الاستثمار والخصومات وهوامش الربح باستخدام حاسبات مالية مجانية." },
    keywords: { en: "finance calculator, mortgage calculator, ROI calculator, profit margin", ar: "حاسبة مالية، حاسبة الرهن، العائد على الاستثمار، هامش الربح" },
    answer: { en: "The finance tools provide general planning calculations such as mortgage payments, return on investment, discounts, and profit margins. Results depend on the assumptions and inputs and are not financial advice.", ar: "تقدم الأدوات المالية حسابات تخطيط عامة مثل دفعات الرهن والعائد على الاستثمار والخصومات وهوامش الربح. تعتمد النتائج على الافتراضات والمدخلات وليست استشارة مالية." },
    steps: { en: ["Choose the financial calculation that matches your question.", "Enter amounts, rates, and periods using consistent units.", "Compare the result with official terms, fees, and professional advice before acting."], ar: ["اختر الحساب المالي المناسب لسؤالك.", "أدخل المبالغ والنسب والفترات بوحدات متسقة.", "قارن النتيجة بالشروط والرسوم الرسمية وبمشورة مختص قبل اتخاذ قرار." ] },
  },
}

export function getCalculatorSeo(id: string, lang: Lang) {
  const entry = calculatorSeo[id]
  return entry ? { title: entry.title[lang], description: entry.description[lang], keywords: entry.keywords[lang], answer: entry.answer[lang], steps: entry.steps[lang] } : null
}
