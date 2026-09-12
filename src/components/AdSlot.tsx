import { useLanguage } from "@/i18n/LanguageContext"

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>
  }
}

type Variant = "header" | "incontent" | "sidebar"

const labelKey: Record<Variant, string> = {
  header: "ad.header",
  incontent: "ad.incontent",
  sidebar: "ad.sidebar",
}

function AdSenseUnit({ variant }: { variant: Variant }) {
  return (
    <div className={`adsense-unit adsense-unit--${variant}`}>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7538440942805514"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key="-fk-1b-3f-4k+to"
        data-ad-client="ca-pub-7538440942805514"
        data-ad-slot="9572719712"
      />
      <script dangerouslySetInnerHTML={{ __html: "(adsbygoogle = window.adsbygoogle || []).push({});" }} />
    </div>
  )
}

export function AdSlot({ variant, className = "" }: { variant: Variant; className?: string }) {
  const { t } = useLanguage()

  return (
    <aside
      aria-label={t(labelKey[variant])}
      data-ad-slot={variant}
      className={`ad-slot ad-slot--${variant} ${className}`}
    >
      <div className="ad-slot__content">
        <AdSenseUnit variant={variant} />
      </div>
    </aside>
  )
}
