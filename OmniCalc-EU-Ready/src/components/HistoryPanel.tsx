import { Copy, Trash2, History as HistoryIcon } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"
import type { HistoryEntry } from "@/hooks/useHistory"

interface Props {
  entries: HistoryEntry[]
  onRemove: (id: string) => void
  onClear: () => void
}

export function HistoryPanel({ entries, onRemove, onClear }: Props) {
  const { t, lang } = useLanguage()

  const copyEntry = (text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {})
  }

  return (
    <section className="card p-5" aria-label={t("history.title")}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-semibold">
          <HistoryIcon className="h-4 w-4 text-muted-foreground" />
          {t("history.title")}
        </h3>
        {entries.length > 0 && (
          <button type="button" onClick={onClear} className="btn-ghost text-xs text-muted-foreground">
            {t("history.clear")}
          </button>
        )}
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("history.empty")}</p>
      ) : (
        <ul className="flex max-h-80 flex-col gap-2 overflow-y-auto pe-1">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex items-start justify-between gap-2 rounded-md border bg-muted/30 p-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="break-words text-sm">{entry.text}</p>
                <time className="text-[11px] text-muted-foreground" dateTime={new Date(entry.time).toISOString()}>
                  {new Date(entry.time).toLocaleString(lang === "ar" ? "ar" : "en")}
                </time>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => copyEntry(entry.text)}
                  aria-label={t("history.copy")}
                  className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(entry.id)}
                  aria-label={t("history.delete")}
                  className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-rose-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
