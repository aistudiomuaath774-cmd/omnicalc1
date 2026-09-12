import { useState } from "react"
import { useLanguage } from "@/i18n/LanguageContext"
import { useCalculator } from "./CalculatorContext"
import { ResultCard } from "@/components/ResultCard"
import { NumberField, ModeTabs, Metric } from "@/components/Field"

type Mode = "speed" | "acceleration" | "force" | "power"

export default function Physics() {
  const { t } = useLanguage()
  const { addHistory } = useCalculator()
  const [mode, setMode] = useState<Mode>("speed")
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  const [c, setC] = useState("")
  const [result, setResult] = useState<{ label: string; value: string; unit: string } | null>(null)

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

  const config: Record<
    Mode,
    { labelKey: string; unit: string; fields: { label: string; value: string; set: (v: string) => void }[]; compute: () => number | null }
  > = {
    speed: {
      labelKey: "phys.speed",
      unit: "m/s",
      fields: [
        { label: t("phys.distance"), value: a, set: setA },
        { label: t("phys.time"), value: b, set: setB },
      ],
      compute: () => (a && b && Number(b) !== 0 ? Number(a) / Number(b) : null),
    },
    acceleration: {
      labelKey: "phys.acceleration",
      unit: "m/s²",
      fields: [
        { label: t("phys.v0"), value: a, set: setA },
        { label: t("phys.v1"), value: b, set: setB },
        { label: t("phys.time"), value: c, set: setC },
      ],
      compute: () => (a !== "" && b !== "" && c && Number(c) !== 0 ? (Number(b) - Number(a)) / Number(c) : null),
    },
    force: {
      labelKey: "phys.force",
      unit: "N",
      fields: [
        { label: t("phys.mass"), value: a, set: setA },
        { label: t("phys.accel"), value: b, set: setB },
      ],
      compute: () => (a && b ? Number(a) * Number(b) : null),
    },
    power: {
      labelKey: "phys.power",
      unit: "W",
      fields: [
        { label: t("phys.work"), value: a, set: setA },
        { label: t("phys.time"), value: b, set: setB },
      ],
      compute: () => (a && b && Number(b) !== 0 ? Number(a) / Number(b) : null),
    },
  }

  const current = config[mode]

  const calculate = () => {
    const value = current.compute()
    if (value === null || Number.isNaN(value)) {
      setResult(null)
      return
    }
    const rounded = Number(value.toFixed(4)).toString()
    const label = t(current.labelKey)
    setResult({ label, value: rounded, unit: current.unit })
    addHistory(`${label}: ${rounded} ${current.unit}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card p-5">
        <ModeTabs
          ariaLabel={t("phys.title")}
          value={mode}
          onChange={(v) => onMode(v as Mode)}
          options={(["speed", "acceleration", "force", "power"] as Mode[]).map((m) => ({
            value: m,
            label: t(config[m].labelKey),
          }))}
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {current.fields.map((f, i) => (
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

      <ResultCard
        title={t("phys.title")}
        resultText={result ? `${result.label}: ${result.value} ${result.unit}` : ""}
      >
        {result && <Metric label={result.label} value={`${result.value} ${result.unit}`} />}
      </ResultCard>
    </div>
  )
}
