import { useState } from "react"
import { useLanguage } from "@/i18n/LanguageContext"
import { useCalculator } from "./CalculatorContext"
import { ResultCard } from "@/components/ResultCard"
import { NumberField, SelectField, ModeTabs, Metric } from "@/components/Field"

const presets = [
  { value: "19", label: "Germany · 19%" },
  { value: "20", label: "United Kingdom · 20%" },
  { value: "21", label: "Spain · 21%" },
  { value: "23", label: "Ireland · 23%" },
  { value: "24", label: "Greece · 24%" },
  { value: "25", label: "Sweden · 25%" },
  { value: "custom", label: "Custom" },
]

type Mode = "add" | "remove"
const fmt = (n: number) => new Intl.NumberFormat("en", { maximumFractionDigits: 2, minimumFractionDigits: 2 }).format(n)

export default function VATCalculator() {
  const { t, lang } = useLanguage()
  const { addHistory } = useCalculator()
  const [mode, setMode] = useState<Mode>("add")
  const [amount, setAmount] = useState("")
  const [preset, setPreset] = useState("19")
  const [customRate, setCustomRate] = useState("")
  const [result, setResult] = useState<{ net: number; vat: number; gross: number } | null>(null)

  const rate = preset === "custom" ? Number(customRate) : Number(preset)

  const calculate = () => {
    const input = Number(amount)
    if (!amount || !Number.isFinite(input) || input < 0 || !Number.isFinite(rate) || rate < 0) return setResult(null)
    const multiplier = 1 + rate / 100
    const net = mode === "add" ? input : input / multiplier
    const gross = mode === "add" ? input * multiplier : input
    const vat = gross - net
    setResult({ net, vat, gross })
    addHistory(`${t("vat.title")}: ${fmt(gross)} (${rate}%)`)
  }

  const reset = () => {
    setAmount("")
    setPreset("19")
    setCustomRate("")
    setResult(null)
  }

  const labels = lang === "ar"
    ? { germany: "ألمانيا · 19%", uk: "المملكة المتحدة · 20%", spain: "إسبانيا · 21%", ireland: "أيرلندا · 23%", greece: "اليونان · 24%", sweden: "السويد · 25%", custom: "مخصصة" }
    : { germany: "Germany · 19%", uk: "United Kingdom · 20%", spain: "Spain · 21%", ireland: "Ireland · 23%", greece: "Greece · 24%", sweden: "Sweden · 25%", custom: "Custom" }
  const localizedPresets = [labels.germany, labels.uk, labels.spain, labels.ireland, labels.greece, labels.sweden, labels.custom]

  return (
    <div className="flex flex-col gap-4">
      <div className="card p-5">
        <ModeTabs ariaLabel={t("vat.mode")} value={mode} onChange={(v) => { setMode(v as Mode); setResult(null) }} options={[{ value: "add", label: t("vat.add") }, { value: "remove", label: t("vat.remove") }]} />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <NumberField label={mode === "add" ? t("vat.net") : t("vat.gross")} value={amount} onChange={setAmount} step="0.01" min="0" />
          <SelectField label={t("vat.country")} value={preset} onChange={setPreset} options={presets.map((p, i) => ({ value: p.value, label: localizedPresets[i] }))} />
          {preset === "custom" && <NumberField label={t("vat.rate")} value={customRate} onChange={setCustomRate} step="0.01" min="0" />}
        </div>
        <div className="mt-4 flex gap-2"><button type="button" onClick={calculate} className="btn-primary flex-1">{t("action.calculate")}</button><button type="button" onClick={reset} className="btn-outline">{t("action.reset")}</button></div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">{t("vat.disclaimer")}</p>
      </div>
      <ResultCard title={t("vat.title")} resultText={result ? `${t("vat.total")}: ${fmt(result.gross)}` : ""}>
        <div className="grid gap-3 sm:grid-cols-3">
          <Metric label={t("vat.net")} value={result ? fmt(result.net) : "—"} />
          <Metric label={t("vat.vatAmount")} value={result ? fmt(result.vat) : "—"} />
          <Metric label={t("vat.gross")} value={result ? fmt(result.gross) : "—"} />
        </div>
      </ResultCard>
    </div>
  )
}
