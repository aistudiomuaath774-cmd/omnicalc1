import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"

export function StarRating({ calculatorId }: { calculatorId: string }) {
  const { t } = useLanguage()
  const storageKey = `omnicalc:rating:${calculatorId}`
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey)
    setRating(stored ? Number(stored) : 0)
    setHover(0)
  }, [storageKey])

  const choose = (value: number) => {
    setRating(value)
    window.localStorage.setItem(storageKey, `${value}`)
  }

  const active = hover || rating

  return (
    <div className="card p-5">
      <h3 className="mb-3 text-sm font-semibold">{t("rating.title")}</h3>
      <div className="flex items-center gap-1" role="radiogroup" aria-label={t("rating.title")}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={t("rating.stars", { n: value })}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            onFocus={() => setHover(value)}
            onBlur={() => setHover(0)}
            onClick={() => choose(value)}
            className="rounded p-1 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Star
              className="h-6 w-6"
              strokeWidth={1.5}
              fill={value <= active ? "currentColor" : "none"}
              color={value <= active ? "#f59e0b" : "hsl(var(--muted-foreground))"}
            />
          </button>
        ))}
      </div>
      {rating > 0 && <p className="mt-2 text-xs text-muted-foreground">{t("rating.thanks")}</p>}
    </div>
  )
}
