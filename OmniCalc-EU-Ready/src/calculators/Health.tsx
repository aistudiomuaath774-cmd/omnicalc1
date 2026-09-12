import { useState } from "react"
import { useLanguage } from "@/i18n/LanguageContext"
import { useCalculator } from "./CalculatorContext"
import { ResultCard } from "@/components/ResultCard"
import { NumberField, SelectField, ModeTabs, Metric } from "@/components/Field"

type Mode = "bmi" | "calories" | "bodyfat"
type Gender = "male" | "female"

const activityFactors: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  extra: 1.9,
}

export default function Health() {
  const { t } = useLanguage()
  const { addHistory } = useCalculator()
  const [mode, setMode] = useState<Mode>("bmi")
  const [gender, setGender] = useState<Gender>("male")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [activity, setActivity] = useState("moderate")
  const [neck, setNeck] = useState("")
  const [waist, setWaist] = useState("")
  const [hip, setHip] = useState("")
  const [result, setResult] = useState<{ text: string; metrics: { label: string; value: string }[] } | null>(null)

  const reset = () => {
    setWeight("")
    setHeight("")
    setAge("")
    setNeck("")
    setWaist("")
    setHip("")
    setResult(null)
  }

  const onMode = (m: Mode) => {
    setMode(m)
    setResult(null)
  }

  const calculate = () => {
    if (mode === "bmi") {
      const w = Number(weight)
      const h = Number(height) / 100
      if (!w || !h) return setResult(null)
      const bmi = w / (h * h)
      const rounded = bmi.toFixed(1)
      let category = "Normal"
      if (bmi < 18.5) category = "Underweight"
      else if (bmi < 25) category = "Normal"
      else if (bmi < 30) category = "Overweight"
      else category = "Obese"
      const text = `${t("health.bmi")}: ${rounded} (${category})`
      setResult({ text, metrics: [{ label: t("health.bmi"), value: rounded }, { label: "Category", value: category }] })
      addHistory(text)
      return
    }

    if (mode === "calories") {
      const w = Number(weight)
      const h = Number(height)
      const a = Number(age)
      if (!w || !h || !a) return setResult(null)
      // Mifflin-St Jeor
      const bmr = 10 * w + 6.25 * h - 5 * a + (gender === "male" ? 5 : -161)
      const tdee = bmr * activityFactors[activity]
      const text = `BMR: ${Math.round(bmr)} kcal, TDEE: ${Math.round(tdee)} kcal`
      setResult({
        text,
        metrics: [
          { label: "BMR", value: `${Math.round(bmr)} kcal` },
          { label: "TDEE", value: `${Math.round(tdee)} kcal` },
        ],
      })
      addHistory(text)
      return
    }

    // body fat — US Navy method
    const h = Number(height)
    const n = Number(neck)
    const wa = Number(waist)
    const hp = Number(hip)
    if (!h || !n || !wa || (gender === "female" && !hp)) return setResult(null)
    let bf: number
    if (gender === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(wa + hp - n) + 0.221 * Math.log10(h)) - 450
    }
    if (!Number.isFinite(bf)) return setResult(null)
    const rounded = bf.toFixed(1)
    const text = `${t("health.bodyfat")}: ${rounded}%`
    setResult({ text, metrics: [{ label: t("health.bodyfat"), value: `${rounded}%` }] })
    addHistory(text)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card p-5">
        <ModeTabs
          ariaLabel={t("health.title")}
          value={mode}
          onChange={(v) => onMode(v as Mode)}
          options={[
            { value: "bmi", label: t("health.bmi") },
            { value: "calories", label: t("health.calories") },
            { value: "bodyfat", label: t("health.bodyfat") },
          ]}
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {(mode === "calories" || mode === "bodyfat") && (
            <SelectField
              label={t("health.gender")}
              value={gender}
              onChange={(v) => setGender(v as Gender)}
              options={[
                { value: "male", label: t("health.male") },
                { value: "female", label: t("health.female") },
              ]}
            />
          )}

          {mode === "bmi" && (
            <>
              <NumberField label={t("health.weight")} value={weight} onChange={setWeight} />
              <NumberField label={t("health.height")} value={height} onChange={setHeight} />
            </>
          )}

          {mode === "calories" && (
            <>
              <NumberField label={t("health.weight")} value={weight} onChange={setWeight} />
              <NumberField label={t("health.height")} value={height} onChange={setHeight} />
              <NumberField label={t("health.age")} value={age} onChange={setAge} />
              <SelectField
                label={t("health.activity")}
                value={activity}
                onChange={setActivity}
                options={[
                  { value: "sedentary", label: t("health.act.sedentary") },
                  { value: "light", label: t("health.act.light") },
                  { value: "moderate", label: t("health.act.moderate") },
                  { value: "active", label: t("health.act.active") },
                  { value: "extra", label: t("health.act.extra") },
                ]}
              />
            </>
          )}

          {mode === "bodyfat" && (
            <>
              <NumberField label={t("health.height")} value={height} onChange={setHeight} />
              <NumberField label={t("health.neck")} value={neck} onChange={setNeck} />
              <NumberField label={t("health.waist")} value={waist} onChange={setWaist} />
              {gender === "female" && <NumberField label={t("health.hip")} value={hip} onChange={setHip} />}
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

      <ResultCard title={t("health.title")} resultText={result?.text ?? ""}>
        <div className="grid gap-3 sm:grid-cols-2">
          {result?.metrics.map((m, i) => (
            <Metric key={i} label={m.label} value={m.value} />
          ))}
        </div>
      </ResultCard>
    </div>
  )
}
