import { useState } from "react"
import { useLanguage } from "@/i18n/LanguageContext"
import { useCalculator } from "./CalculatorContext"
import { ResultCard } from "@/components/ResultCard"
import { DateField, ModeTabs, Metric } from "@/components/Field"

type Mode = "age" | "diff"

function breakdown(from: Date, to: Date) {
  let start = from
  let end = to
  if (start > end) [start, end] = [end, start]

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()
  let days = end.getDate() - start.getDate()

  if (days < 0) {
    months -= 1
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
    days += prevMonth.getDate()
  }
  if (months < 0) {
    years -= 1
    months += 12
  }

  const totalDays = Math.round((end.getTime() - start.getTime()) / 86_400_000)
  return { years, months, days, totalDays }
}

export default function DateAge() {
  const { t } = useLanguage()
  const { addHistory } = useCalculator()
  const [mode, setMode] = useState<Mode>("age")
  const [dob, setDob] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [result, setResult] = useState<{ text: string; y: number; m: number; d: number; total: number } | null>(null)

  const reset = () => {
    setDob("")
    setStart("")
    setEnd("")
    setResult(null)
  }

  const onMode = (m: Mode) => {
    setMode(m)
    setResult(null)
  }

  const calculate = () => {
    let from: Date
    let to: Date
    if (mode === "age") {
      if (!dob) return setResult(null)
      from = new Date(dob)
      to = new Date()
    } else {
      if (!start || !end) return setResult(null)
      from = new Date(start)
      to = new Date(end)
    }
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return setResult(null)

    const { years, months, days, totalDays } = breakdown(from, to)
    const text = `${years} ${t("years")}, ${months} ${t("months")}, ${days} ${t("days")} (${totalDays} ${t("days")})`
    setResult({ text, y: years, m: months, d: days, total: totalDays })
    addHistory(text)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card p-5">
        <ModeTabs
          ariaLabel={t("date.title")}
          value={mode}
          onChange={(v) => onMode(v as Mode)}
          options={[
            { value: "age", label: t("date.age") },
            { value: "diff", label: t("date.diff") },
          ]}
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {mode === "age" ? (
            <DateField label={t("date.dob")} value={dob} onChange={setDob} />
          ) : (
            <>
              <DateField label={t("date.start")} value={start} onChange={setStart} />
              <DateField label={t("date.end")} value={end} onChange={setEnd} />
            </>
          )}
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

      <ResultCard title={t("date.title")} resultText={result?.text ?? ""}>
        {result && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label={t("years")} value={String(result.y)} />
            <Metric label={t("months")} value={String(result.m)} />
            <Metric label={t("days")} value={String(result.d)} />
            <Metric label={`${t("days")} (total)`} value={String(result.total)} />
          </div>
        )}
      </ResultCard>
    </div>
  )
}
