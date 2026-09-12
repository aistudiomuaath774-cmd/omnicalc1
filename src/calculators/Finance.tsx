import { useState } from "react"
import { useLanguage } from "@/i18n/LanguageContext"
import { useCalculator } from "./CalculatorContext"
import { ResultCard } from "@/components/ResultCard"
import { NumberField, ModeTabs, Metric } from "@/components/Field"

type Mode = "roi" | "mortgage" | "discount" | "margin"

const fmt = (n: number) =>
  new Intl.NumberFormat("en", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n)

export default function Finance() {
  const { t } = useLanguage()
  const { addHistory } = useCalculator()
  const [mode, setMode] = useState<Mode>("roi")
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const [c, setC] = useState("")
  const [result, setResult] = useState<{ text: string; metrics: { label: string; value: string }[] } | null>(null)

  const reset = () => {
    setA("")
    setB("")
    setC("")
    setResult(null)
  }

  const onMode = (m: Mode) => {
    setMode(m)
    reset()
  }

  const calculate = () => {
    const na = Number(a)
    const nb = Number(b)
    const nc = Number(c)

    if (mode === "roi") {
      if (!a || !b || na === 0) return setResult(null)
      const profit = nb - na
      const roi = (profit / na) * 100
      const text = `ROI: ${roi.toFixed(2)}% (${fmt(profit)})`
      setResult({
        text,
        metrics: [
          { label: "ROI", value: `${roi.toFixed(2)}%` },
          { label: t("fin.final"), value: fmt(profit) },
        ],
      })
      addHistory(text)
      return
    }

    if (mode === "mortgage") {
      if (!a || !b || !c) return setResult(null)
      const monthlyRate = nb / 100 / 12
      const n = nc * 12
      const payment =
        monthlyRate === 0 ? na / n : (na * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
      const total = payment * n
      const interest = total - na
      const text = `Monthly: ${fmt(payment)}, Total: ${fmt(total)}`
      setResult({
        text,
        metrics: [
          { label: "Monthly", value: fmt(payment) },
          { label: "Total", value: fmt(total) },
          { label: "Interest", value: fmt(interest) },
        ],
      })
      addHistory(text)
      return
    }

    if (mode === "discount") {
      if (!a || !b) return setResult(null)
      const saved = (na * nb) / 100
      const final = na - saved
      const text = `${fmt(final)} (saved ${fmt(saved)})`
      setResult({
        text,
        metrics: [
          { label: t("fin.final"), value: fmt(final) },
          { label: "Saved", value: fmt(saved) },
        ],
      })
      addHistory(text)
      return
    }

    // margin
    if (!a || !b || nb === 0) return setResult(null)
    const profit = nb - na
    const margin = (profit / nb) * 100
    const markup = na === 0 ? 0 : (profit / na) * 100
    const text = `Margin: ${margin.toFixed(2)}%, Markup: ${markup.toFixed(2)}%`
    setResult({
      text,
      metrics: [
        { label: t("fin.margin"), value: `${margin.toFixed(2)}%` },
        { label: "Markup", value: `${markup.toFixed(2)}%` },
        { label: t("fin.final"), value: fmt(profit) },
      ],
    })
    addHistory(text)
  }

  const fields: Record<Mode, { label: string; value: string; set: (v: string) => void }[]> = {
    roi: [
      { label: t("fin.initial"), value: a, set: setA },
      { label: t("fin.final"), value: b, set: setB },
    ],
    mortgage: [
      { label: t("fin.principal"), value: a, set: setA },
      { label: t("fin.rate"), value: b, set: setB },
      { label: t("fin.years"), value: c, set: setC },
    ],
    discount: [
      { label: t("fin.price"), value: a, set: setA },
      { label: t("fin.percent"), value: b, set: setB },
    ],
    margin: [
      { label: t("fin.cost"), value: a, set: setA },
      { label: t("fin.revenue"), value: b, set: setB },
    ],
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card p-5">
        <ModeTabs
          ariaLabel={t("fin.title")}
          value={mode}
          onChange={(v) => onMode(v as Mode)}
          options={[
            { value: "roi", label: t("fin.roi") },
            { value: "mortgage", label: t("fin.mortgage") },
            { value: "discount", label: t("fin.discount") },
            { value: "margin", label: t("fin.margin") },
          ]}
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {fields[mode].map((f, i) => (
            <NumberField key={i} label={f.label} value={f.value} onChange={f.set} />
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" onClick={calculate} className="btn-primary flex-1">
            {t("action.calculate")}
          </button>
          <button type="button" onClick={reset} className="btn-outline">
            {t("action.reset")}
          </button>
        </div>
      </div>

      <ResultCard title={t("fin.title")} resultText={result?.text ?? ""}>
        <div className="grid gap-3 sm:grid-cols-2">
          {result?.metrics.map((m, i) => (
            <Metric key={i} label={m.label} value={m.value} />
          ))}
        </div>
      </ResultCard>
    </div>
  )
}
