import { useState, type ReactNode } from "react"
import { Copy, Check, Printer, Share2 } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"

interface Props {
  /** plain-text representation of the result, used for copy & share */
  resultText: string
  title: string
  children?: ReactNode
}

export function ResultCard({ resultText, title, children }: Props) {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const hasResult = resultText.trim().length > 0

  const copy = async () => {
    if (!hasResult) return
    try {
      await navigator.clipboard.writeText(resultText)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* ignore */
    }
  }

  const print = () => window.print()

  const share = async () => {
    if (!hasResult) return
    const shareData = { title, text: resultText, url: window.location.href }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(`${resultText}\n${window.location.href}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <section className="card p-5" aria-live="polite" aria-label={t("result.label")}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-muted-foreground">{t("result.label")}</h3>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={copy}
            disabled={!hasResult}
            className="btn-ghost text-xs"
            aria-label={t("action.copy")}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            <span className="hidden sm:inline">{copied ? t("action.copied") : t("action.copy")}</span>
          </button>
          <button type="button" onClick={print} className="btn-ghost text-xs" aria-label={t("action.print")}>
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">{t("action.print")}</span>
          </button>
          <button
            type="button"
            onClick={share}
            disabled={!hasResult}
            className="btn-ghost text-xs"
            aria-label={t("action.share")}
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">{t("action.share")}</span>
          </button>
        </div>
      </div>
      {hasResult ? (
        <div className="fade-in">{children}</div>
      ) : (
        <p className="text-sm text-muted-foreground">{t("result.none")}</p>
      )}
    </section>
  )
}
