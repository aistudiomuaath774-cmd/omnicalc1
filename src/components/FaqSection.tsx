import { useState } from "react"
import { ChevronDown, BookOpen } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"
import type { FaqItem } from "@/calculators/types"

export function GuideSection({ text }: { text: string }) {
  const { t } = useLanguage()
  return (
    <section className="card p-6">
      <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
        <BookOpen className="h-5 w-5 text-primary" />
        {t("guide.title")}
      </h2>
      <p className="leading-relaxed text-muted-foreground">{text}</p>
    </section>
  )
}

export function FaqSection({ faq }: { faq: FaqItem[] }) {
  const { t, lang } = useLanguage()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="card p-6" aria-label={t("faq.title")}>
      <h2 className="mb-4 text-lg font-semibold">{t("faq.title")}</h2>
      <ul className="flex flex-col divide-y divide-border">
        {faq.map((item, i) => {
          const isOpen = open === i
          return (
            <li key={i} className="py-1">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-3 text-start text-sm font-medium"
              >
                <span>{item.q[lang]}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && <p className="pb-3 text-sm leading-relaxed text-muted-foreground">{item.a[lang]}</p>}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
