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
      setResult(`${rounded}`)
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
