import { useLanguage } from "@/i18n/LanguageContext"
import type { Lang } from "@/i18n/translations"

type Props = {
  calculatorId: string
  answer: string
  steps: string[]
  lang: Lang
}

const unitRows = {
  en: [
    ["1 inch", "2.54 cm"],
    ["1 foot", "0.3048 m"],
    ["1 mile", "1.609344 km"],
    ["1 kilogram", "1000 g"],
    ["1 US gallon", "3.785411784 L"],
  ],
  ar: [
    ["1 بوصة", "2.54 سم"],
    ["1 قدم", "0.3048 م"],
    ["1 ميل", "1.609344 كم"],
    ["1 كيلوجرام", "1000 جرام"],
    ["1 جالون أمريكي", "3.785411784 لتر"],
  ],
} as const

export function CalculatorAnswer({ calculatorId, answer, steps, lang }: Props) {
  const { t } = useLanguage()
  const ar = lang === "ar"
  return (
    <section className="card border-primary/20 bg-primary/[0.03] p-5 sm:p-6" aria-labelledby="quick-answer-heading">
      <h2 id="quick-answer-heading" className="text-lg font-bold">
        {ar ? "الإجابة المختصرة" : "Quick answer"}
      </h2>
      <p className="mt-3 leading-7 text-muted-foreground">{answer}</p>
      <h3 className="mt-5 text-base font-semibold">{ar ? "طريقة الاستخدام" : "How to use it"}</h3>
      <ol className="mt-2 list-inside list-decimal space-y-2 leading-7 text-muted-foreground">
        {steps.map((step) => <li key={step}>{step}</li>)}
      </ol>
      {calculatorId === "unit-converter" && (
        <div className="mt-5 overflow-x-auto">
          <h3 className="mb-2 text-base font-semibold">{ar ? "مراجع تحويل شائعة" : "Common conversion references"}</h3>
          <table className="w-full min-w-[18rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-start">
                <th scope="col" className="px-3 py-2 text-start">{ar ? "الوحدة" : "Unit"}</th>
                <th scope="col" className="px-3 py-2 text-start">{ar ? "تعادل" : "Equals"}</th>
              </tr>
            </thead>
            <tbody>
              {unitRows[lang].map(([from, to]) => (
                <tr key={from} className="border-b border-border/60">
                  <td className="px-3 py-2">{from}</td>
                  <td className="px-3 py-2">{to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-5 text-sm text-muted-foreground">
        {ar
          ? "للتفاصيل والافتراضات والمراجع، راجع قسم المنهجية أسفل الأداة."
          : "See the methodology section below for assumptions, references, and limitations."}{" "}
        <span className="sr-only">{t("app.name")}</span>
      </p>
    </section>
  )
}
