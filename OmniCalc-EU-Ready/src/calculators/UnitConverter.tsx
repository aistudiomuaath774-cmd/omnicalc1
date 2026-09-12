import { useEffect, useMemo, useState } from "react"
import { ArrowLeftRight } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"
import type { Lang } from "@/i18n/translations"
import { useCalculator } from "./CalculatorContext"
import { ResultCard } from "@/components/ResultCard"
import { NumberField, SelectField, ModeTabs } from "@/components/Field"

interface Unit {
  key: string
  label: Record<Lang, string>
  /** factor to base unit (not used for temperature) */
  factor?: number
}

type Category = "length" | "area" | "volume" | "mass" | "temperature"

const categories: Record<Category, { labelKey: string; units: Unit[] }> = {
  length: {
    labelKey: "unit.length",
    units: [
      { key: "mm", label: { en: "Millimeter", ar: "مليمتر" }, factor: 0.001 },
      { key: "cm", label: { en: "Centimeter", ar: "سنتيمتر" }, factor: 0.01 },
      { key: "m", label: { en: "Meter", ar: "متر" }, factor: 1 },
      { key: "km", label: { en: "Kilometer", ar: "كيلومتر" }, factor: 1000 },
      { key: "in", label: { en: "Inch", ar: "بوصة" }, factor: 0.0254 },
      { key: "ft", label: { en: "Foot", ar: "قدم" }, factor: 0.3048 },
      { key: "mi", label: { en: "Mile", ar: "ميل" }, factor: 1609.344 },
    ],
  },
  area: {
    labelKey: "unit.area",
    units: [
      { key: "m2", label: { en: "Square meter", ar: "متر مربع" }, factor: 1 },
      { key: "km2", label: { en: "Square kilometer", ar: "كيلومتر مربع" }, factor: 1_000_000 },
      { key: "ft2", label: { en: "Square foot", ar: "قدم مربع" }, factor: 0.092903 },
      { key: "ac", label: { en: "Acre", ar: "فدان" }, factor: 4046.8564224 },
      { key: "ha", label: { en: "Hectare", ar: "هكتار" }, factor: 10000 },
    ],
  },
  volume: {
    labelKey: "unit.volume",
    units: [
      { key: "ml", label: { en: "Milliliter", ar: "مليلتر" }, factor: 0.001 },
      { key: "l", label: { en: "Liter", ar: "لتر" }, factor: 1 },
      { key: "m3", label: { en: "Cubic meter", ar: "متر مكعب" }, factor: 1000 },
      { key: "gal", label: { en: "US Gallon", ar: "جالون أمريكي" }, factor: 3.785411784 },
      { key: "cup", label: { en: "US Cup", ar: "كوب" }, factor: 0.2365882365 },
    ],
  },
  mass: {
    labelKey: "unit.mass",
    units: [
      { key: "mg", label: { en: "Milligram", ar: "مليجرام" }, factor: 0.000001 },
      { key: "g", label: { en: "Gram", ar: "جرام" }, factor: 0.001 },
      { key: "kg", label: { en: "Kilogram", ar: "كيلوجرام" }, factor: 1 },
      { key: "t", label: { en: "Tonne", ar: "طن" }, factor: 1000 },
      { key: "lb", label: { en: "Pound", ar: "رطل" }, factor: 0.45359237 },
      { key: "oz", label: { en: "Ounce", ar: "أونصة" }, factor: 0.028349523125 },
    ],
  },
  temperature: {
    labelKey: "unit.temperature",
    units: [
      { key: "c", label: { en: "Celsius", ar: "مئوية" } },
      { key: "f", label: { en: "Fahrenheit", ar: "فهرنهايت" } },
      { key: "k", label: { en: "Kelvin", ar: "كلفن" } },
    ],
  },
}

function convertTemp(value: number, from: string, to: string): number {
  let celsius: number
  if (from === "c") celsius = value
  else if (from === "f") celsius = (value - 32) * (5 / 9)
  else celsius = value - 273.15
  if (to === "c") return celsius
  if (to === "f") return celsius * (9 / 5) + 32
  return celsius + 273.15
}

export default function UnitConverter() {
  const { t, lang } = useLanguage()
  const { addHistory } = useCalculator()
  const [category, setCategory] = useState<Category>("length")
  const [from, setFrom] = useState("m")
  const [to, setTo] = useState("cm")
  const [value, setValue] = useState("1")

  const units = categories[category].units
  const metricDefaults: Record<Category, [string, string]> = {
    length: ["m", "cm"],
    area: ["m2", "ha"],
    volume: ["l", "ml"],
    mass: ["kg", "g"],
    temperature: ["c", "c"],
  }

  useEffect(() => {
    const [defaultFrom, defaultTo] = metricDefaults[category]
    setFrom(defaultFrom)
    setTo(defaultTo)
    setValue("1")
  }, [category])

  const result = useMemo(() => {
    const num = Number(value)
    if (value === "" || Number.isNaN(num)) return null
    if (category === "temperature") return convertTemp(num, from, to)
    const fu = units.find((u) => u.key === from)
    const tu = units.find((u) => u.key === to)
    if (!fu?.factor || !tu?.factor) return null
    return (num * fu.factor) / tu.factor
  }, [value, from, to, category, units])

  const fromLabel = units.find((u) => u.key === from)?.label[lang] ?? from
  const toLabel = units.find((u) => u.key === to)?.label[lang] ?? to
  const rounded = result === null ? "" : Number(result.toFixed(6)).toString()

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  const save = () => {
    if (result === null) return
    addHistory(`${value} ${fromLabel} = ${rounded} ${toLabel}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card p-5">
        <ModeTabs
          ariaLabel={t("unit.category")}
          value={category}
          onChange={(v) => setCategory(v as Category)}
          options={(Object.keys(categories) as Category[]).map((c) => ({
            value: c,
            label: t(categories[c].labelKey),
          }))}
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <NumberField label={t("unit.value")} value={value} onChange={setValue} />
          <div className="flex items-end">
            <button type="button" onClick={swap} className="btn-outline w-full" aria-label={t("action.reset")}>
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>
          <SelectField
            label={t("unit.from")}
            value={from}
            onChange={setFrom}
            options={units.map((u) => ({ value: u.key, label: u.label[lang] }))}
          />
          <SelectField
            label={t("unit.to")}
            value={to}
            onChange={setTo}
            options={units.map((u) => ({ value: u.key, label: u.label[lang] }))}
          />
        </div>

        <button type="button" onClick={save} disabled={result === null} className="btn-primary mt-4 w-full">
          {t("action.calculate")}
        </button>
      </div>

      <ResultCard
        title={t("unit.title")}
        resultText={result === null ? "" : `${value} ${fromLabel} = ${rounded} ${toLabel}`}
      >
        <div className="text-3xl font-bold tabular-nums">
          {rounded} <span className="text-lg font-medium text-muted-foreground">{toLabel}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {value} {fromLabel}
        </p>
      </ResultCard>
    </div>
  )
}
