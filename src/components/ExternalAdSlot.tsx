import { useEffect, useRef, useState } from "react"
import { hasCookieConsent } from "./CookieConsent"

declare global {
  interface Window {
    atOptions?: {
      key: string
      format: "iframe"
      height: number
      width: number
      params: Record<string, unknown>
    }
  }
}

type ExternalAdVariant = "tower" | "smallTower" | "banner"

const ads: Record<ExternalAdVariant, { key: string; height: number; width: number }> = {
  tower: { key: "10a59e47b41d9889deb284ab5a0bf460", height: 600, width: 160 },
  smallTower: { key: "4bab395f72e708783efcfb02fe5691da", height: 300, width: 160 },
  banner: { key: "1ece01a59c2c84ded856edd9d9cb7b27", height: 50, width: 320 },
}

export function ExternalAdSlot({ variant, className = "" }: { variant: ExternalAdVariant; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const ad = ads[variant]
  const [consented, setConsented] = useState(hasCookieConsent)
  const [adUnavailable, setAdUnavailable] = useState(false)

  useEffect(() => {
    const onConsent = () => setConsented(hasCookieConsent())
    window.addEventListener("omnicalc:consent", onConsent)
    return () => window.removeEventListener("omnicalc:consent", onConsent)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !consented) return

    // تفريغ الحاوية وإعادة ضبط الحالة
    container.replaceChildren()
    setAdUnavailable(false)

    // إعداد متغيرات الإعلان
    window.atOptions = {
      key: ad.key,
      format: "iframe",
      height: ad.height,
      width: ad.width,
      params: {},
    }

    // إنشاء سكربت الإعلان
    const script = document.createElement("script")
    script.async = true
    script.src = `https://alwaysmulticulturallanding.com/${ad.key}/invoke.js`
    script.dataset.omnicalcAd = variant

    // إظهار نص العطل فقط في حال فشل تحميل السكربت (بسبب مانع الإعلانات)
    script.onerror = () => {
      setAdUnavailable(true)
    }

    container.appendChild(script)

    return () => {
      if (container) container.replaceChildren()
    }
  }, [ad.height, ad.key, ad.width, variant, consented])

  return (
    <div
      ref={containerRef}
      className={`ad-frame ad-frame-${variant} flex w-full items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight: ad.height }}
      aria-label="Advertisement"
      data-consent-required={!consented}
      data-ad-provider="alwaysmulticulturallanding"
    >
      {consented && adUnavailable && (
        <span className="px-3 text-center text-xs text-muted-foreground">
          Ads may be unavailable. Please check your ad-blocker settings if you would like to support this free tool.
        </span>
      )}
      {!consented && <span className="px-3 text-center text-xs text-muted-foreground">Ads load after your consent.</span>}
    </div>
  )
}

export function ExternalAdLink() {
  return null
}
