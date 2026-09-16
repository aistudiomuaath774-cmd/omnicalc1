import { useEffect, useState } from "react"
import { useLanguage } from "@/i18n/LanguageContext"
import { useCalculator } from "./CalculatorContext"
import { ResultCard } from "@/components/ResultCard"
import { ModeTabs } from "@/components/Field"
import { evaluate } from "./mathEngine"

type Key = { label: string; insert: string; kind?: "op" | "fn" | "num" | "action" | "eq" }

const keys: Key[][] = [
  [
    { label: "sin", insert: "sin(", kind: "fn" },
    { label: "cos", insert: "cos(", kind: "fn" },
    { label: "tan", insert: "tan(", kind: "fn" },
    { label: "π", insert: "pi", kind: "fn" },
    { label: "e", insert: "e", kind: "fn" },
  ],
  [
    { label: "ln", insert: "ln(", kind: "fn" },
    { label: "log", insert: "log(", kind: "fn" },
    { label: "x!", insert: "!", kind: "fn" },
    { label: "^", insert: "^", kind: "op" },
    { label: "√", insert: "sqrt(", kind: "fn" },
  ],
  [
    { label: "7", insert: "7", kind: "num" },
    { label: "8", insert: "8", kind: "num" },
    { label: "9", insert: "9", kind: "num" },
    { label: "(", insert: "(", kind: "op" },
    { label: ")", insert: ")", kind: "op" },
  ],
  [
    { label: "4", insert: "4", kind: "num" },
    { label: "5", insert: "5", kind: "num" },
    { label: "6", insert: "6", kind: "num" },
    { label: "×", insert: "*", kind: "op" },
    { label: "÷", insert: "/", kind: "op" },
  ],
  [
    { label: "1", insert: "1", kind: "num" },
    { label: "2", insert: "2", kind: "num" },
    { label: "3", insert: "3", kind: "num" },
    { label: "+", insert: "+", kind: "op" },
    { label: "−", insert: "-", kind: "op" },
  ],
  [
    { label: "0", insert: "0", kind: "num" },
    { label: ".", insert: ".", kind: "num" },
    { label: "C", insert: "CLEAR", kind: "action" },
    { label: "⌫", insert: "DEL", kind: "action" },
    { label: "=", insert: "EVAL", kind: "eq" },
  ],
]

export default function Scientific() {
  const { t, dir } = useLanguage()
  const { addHistory } = useCalculator()
  const [expr, setExpr] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState(false)
  const [angle, setAngle] = useState<"deg" | "rad">("deg")

  const run = () => {
    if (!expr.trim()) return
    try {
      const value = evaluate(expr, angle)
      if (!Number.isFinite(value)) throw new Error("bad")
      const rounded = Number(value.toFixed(10))
      const text = `${expr} = ${rounded}`
      setResult(String(rounded))
      setError(false)
      addHistory(text)
    } catch {
      setResult("")
      setError(true)
    }
  }

  const press = (insert: string) => {
    if (insert === "CLEAR") {
      setExpr("")
      setResult("")
      setError(false)
      return
    }
    if (insert === "DEL") {
      setExpr((e) => e.slice(0, -1))
      return
    }
    if (insert === "EVAL") {
      run()
      return
    }
    setError(false)
    setExpr((e) => e + insert)
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT") return
      if (/[0-9+\-*/().^!]/.test(e.key)) {
        setExpr((prev) => prev + e.key)
        setError(false)
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault()
        run()
      } else if (e.key === "Backspace") {
        setExpr((prev) => prev.slice(0, -1))
      } else if (e.key === "Escape") {
        setExpr("")
        setResult("")
        setError(false)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expr, angle])

  const keyClass = (kind?: Key["kind"]) => {
    switch (kind) {
      case "eq":
        return "bg-primary text-primary-foreground hover:opacity-90"
      case "op":
        return "bg-muted hover:bg-border"
      case "fn":
        return "bg-accent/10 text-accent hover:bg-accent/20"
      case "action":
        return "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
      default:
        return "bg-card border hover:bg-muted"
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="w-32">
            <ModeTabs
              ariaLabel="Angle mode"
              value={angle}
              onChange={(v) => setAngle(v as "deg" | "rad")}
              options={[
                { value: "deg", label: t("sci.deg") },
                { value: "rad", label: t("sci.rad") },
              ]}
            />
          </div>
        </div>

        <label htmlFor="sci-expr" className="sr-only">
          {t("sci.title")}
        </label>
        <input
          id="sci-expr"
          dir="ltr"
          className={`field mb-1 text-end font-mono text-lg ${error ? "ring-2 ring-rose-500" : ""}`}
          value={expr}
          onChange={(e) => {
            setExpr(e.target.value)
            setError(false)
          }}
          placeholder="0"
          aria-invalid={error}
        />
        <div dir="ltr" className="mb-4 min-h-7 text-end font-mono text-2xl font-bold tabular-nums">
          {error ? <span className="text-rose-500">Error</span> : result || <span className="text-muted-foreground">0</span>}
        </div>

        <div className="grid grid-cols-5 gap-2" dir="ltr">
          {keys.flat().map((k, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => press(k.insert)}
              className={`btn h-12 text-sm font-semibold ${keyClass(k.kind)}`}
              aria-label={k.label}
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>

      <ResultCard title={t("sci.title")} resultText={result && expr ? `${expr} = ${result}` : ""}>
        <div dir="ltr" className="font-mono text-3xl font-bold tabular-nums">
          {result}
        </div>
        <p dir={dir} className="mt-2 text-sm text-muted-foreground">
          {expr}
        </p>
      </ResultCard>
    </div>
  )
}
