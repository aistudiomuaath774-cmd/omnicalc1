import { useLanguage } from "@/i18n/LanguageContext"

type Methodology = {
  en: { summary: string; example: string; references: Array<[string, string]> }
  ar: { summary: string; example: string; references: Array<[string, string]> }
}

const methodology: Record<string, Methodology> = {
  scientific: {
    en: {
      summary: "Evaluates the entered mathematical expression using JavaScript Math functions, with explicit degree/radian handling for trigonometric functions.",
      example: "For sin(30°), the angle is converted to radians before evaluation; the displayed result is rounded for readability without changing the stored calculation.",
      references: [["JavaScript Math reference", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math"]],
    },
    ar: {
      summary: "تقيّم الحاسبة التعبير الرياضي باستخدام دوال Math في JavaScript، مع معالجة واضحة لوضعي الدرجة والراديان للدوال المثلثية.",
      example: "في ‎sin(30°)‎ تُحوّل الزاوية إلى راديان قبل الحساب، وتُقرّب النتيجة المعروضة للقراءة دون تغيير قيمة الحساب الداخلية.",
      references: [["مرجع Math في JavaScript", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math"]],
    },
  },
  "unit-converter": {
    en: {
      summary: "Converts values through base-unit factors for length, area, volume, mass, and temperature. Temperature uses an offset formula rather than a simple multiplier.",
      example: "A length is first converted to the category's base unit and then from that base unit to the selected target unit.",
      references: [["NIST SI units", "https://www.nist.gov/pml/owm/metric-si/si-units"]],
    },
    ar: {
      summary: "تحوّل القيم عبر معاملات الوحدة الأساسية للطول والمساحة والحجم والكتلة ودرجة الحرارة. وتستخدم درجة الحرارة معادلة تتضمن إزاحة، لا معامل ضرب فقط.",
      example: "تُحوّل القيمة أولاً إلى الوحدة الأساسية للفئة ثم من الوحدة الأساسية إلى الوحدة الهدف التي اختارها المستخدم.",
      references: [["وحدات النظام الدولي من NIST", "https://www.nist.gov/pml/owm/metric-si/si-units"]],
    },
  },
  physics: {
    en: {
      summary: "Uses standard introductory mechanics relationships for speed, acceleration, force, and power, with SI units shown in the interface.",
      example: "Force is calculated as mass multiplied by acceleration, while speed is calculated as distance divided by time when those inputs are selected.",
      references: [["OpenStax College Physics", "https://openstax.org/details/books/college-physics-2e"]],
    },
    ar: {
      summary: "تستخدم الحاسبة علاقات الميكانيكا التمهيدية للسرعة والتسارع والقوة والقدرة، مع إظهار وحدات النظام الدولي في الواجهة.",
      example: "تُحسب القوة بضرب الكتلة في التسارع، بينما تُحسب السرعة بقسمة المسافة على الزمن عند اختيار هذه المدخلات.",
      references: [["كتاب الفيزياء الجامعية من OpenStax", "https://openstax.org/details/books/college-physics-2e"]],
    },
  },
  health: {
    en: {
      summary: "Provides estimates for BMI, daily calories, and body-fat percentage from the selected inputs. These are screening or planning estimates, not diagnoses.",
      example: "BMI is weight in kilograms divided by height in metres squared; calorie estimates vary with the selected activity level and personal inputs.",
      references: [["CDC Adult BMI", "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html"]],
    },
    ar: {
      summary: "تقدم تقديرات لمؤشر كتلة الجسم والسعرات اليومية ونسبة الدهون وفق المدخلات المختارة. هذه تقديرات للفحص أو التخطيط وليست تشخيصاً.",
      example: "يُحسب مؤشر كتلة الجسم بقسمة الوزن بالكيلوغرام على مربع الطول بالمتر، وتتغير تقديرات السعرات حسب مستوى النشاط والبيانات الشخصية.",
      references: [["مؤشر كتلة الجسم للبالغين من CDC", "https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html"]],
    },
  },
  vat: {
    en: {
      summary: "Adds or removes a selected VAT rate using the standard net-to-gross and gross-to-net relationships. Rates are presets for convenience and must be verified for the relevant jurisdiction.",
      example: "Gross price equals net price multiplied by one plus the VAT rate; removing VAT reverses that relationship.",
      references: [["European Commission — VAT", "https://taxation-customs.ec.europa.eu/taxation/vat_en"]],
    },
    ar: {
      summary: "تضيف أو تستخرج نسبة ضريبة القيمة المضافة المختارة باستخدام العلاقة القياسية بين السعر الصافي والإجمالي. النسب المعروضة اختصارات للمساعدة ويجب التحقق منها للبلد والمعاملة.",
      example: "السعر الإجمالي يساوي السعر الصافي مضروباً في واحد زائد نسبة الضريبة، واستخراج الضريبة يعكس هذه العلاقة.",
      references: [["المفوضية الأوروبية — ضريبة القيمة المضافة", "https://taxation-customs.ec.europa.eu/taxation/vat_en"]],
    },
  },
  finance: {
    en: {
      summary: "Calculates common planning measures such as ROI, mortgage payments, discounts, and profit margin from the supplied amounts and rates.",
      example: "Mortgage estimates assume a fixed periodic rate and regular payments; actual lender terms, fees, taxes, and insurance can change the result.",
      references: [["Consumer Financial Protection Bureau", "https://www.consumerfinance.gov/owning-a-home/"]],
    },
    ar: {
      summary: "تحسب مؤشرات تخطيط شائعة مثل العائد على الاستثمار والدفعات العقارية والخصومات وهامش الربح من المبالغ والنسب المدخلة.",
      example: "تفترض تقديرات الرهن معدلًا دورياً ثابتاً ودفعات منتظمة؛ وقد تغيّر شروط المقرض والرسوم والضرائب والتأمين النتيجة الفعلية.",
      references: [["مكتب حماية المستهلك المالي", "https://www.consumerfinance.gov/owning-a-home/"]],
    },
  },
  "date-age": {
    en: {
      summary: "Compares calendar dates and decomposes the elapsed period into years, months, and days using the Gregorian calendar and the selected dates.",
      example: "The result is calendar-based rather than a fixed number of 30-day months, so month length and leap years affect the breakdown.",
      references: [["ISO 8601 date and time overview", "https://www.iso.org/iso-8601-date-and-time-format.html"]],
    },
    ar: {
      summary: "تقارن التواريخ وتفكك الفترة المنقضية إلى سنوات وأشهر وأيام باستخدام التقويم الغريغوري والتواريخ المختارة.",
      example: "النتيجة تقويمية وليست مبنية على اعتبار كل شهر 30 يوماً؛ لذلك يؤثر طول الشهر والسنوات الكبيسة في التفصيل.",
      references: [["نظرة عامة على ISO 8601 للتاريخ والوقت", "https://www.iso.org/iso-8601-date-and-time-format.html"]],
    },
  },
}

export function MethodologySection({ calculatorId }: { calculatorId: string }) {
  const { lang } = useLanguage()
  const content = methodology[calculatorId]?.[lang] ?? methodology[calculatorId]?.en
  if (!content) return null

  return (
    <section className="card p-6" aria-labelledby="methodology-heading">
      <h2 id="methodology-heading" className="text-lg font-bold">
        {lang === "ar" ? "المنهجية والمراجع" : "Methodology & References"}
      </h2>
      <p className="mt-3 leading-7 text-muted-foreground">{content.summary}</p>
      <p className="mt-3 leading-7 text-muted-foreground">
        <strong className="text-foreground">{lang === "ar" ? "مثال وحدود: " : "Example and limits: "}</strong>
        {content.example}
      </p>
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-foreground">{lang === "ar" ? "مراجع مفيدة" : "Useful references"}</h3>
        <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
          {content.references.map(([label, href]) => (
            <li key={href}>
              <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        {lang === "ar"
          ? "هذه المعلومات تعليمية ولا تغني عن التحقق من مختص عند اتخاذ قرار طبي أو مالي أو قانوني أو هندسي."
          : "This information is educational and does not replace professional verification for medical, financial, legal, or engineering decisions."}
      </p>
    </section>
  )
}
