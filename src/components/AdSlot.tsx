import { useLanguage } from "@/i18n/LanguageContext"
import { ExternalAdLink, ExternalAdSlot } from "@/components/ExternalAdSlot"

type Variant = "header" | "incontent" | "sidebar"

const labelKey: Record<Variant, string> = {
  header: "ad.header",
  incontent: "ad.incontent",
  sidebar: "ad.sidebar",
}

export function AdSlot({ variant, className = "" }: { variant: Variant; className?: string }) {
  const { t } = useLanguage()
  const externalVariant = variant === "sidebar" ? "tower" : "banner"

  return (
    <aside
      aria-label={t(labelKey[variant])}
      data-ad-slot={variant}
      className={`flex w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted/40 ${className}`}
    >
      <div className="flex w-full flex-col items-center justify-center gap-2 py-3">
        <ExternalAdSlot variant={externalVariant} />
        {variant === "sidebar" && <ExternalAdSlot variant="smallTower" />}
        <ExternalAdLink />
      </div>
    </aside>
  )
}
