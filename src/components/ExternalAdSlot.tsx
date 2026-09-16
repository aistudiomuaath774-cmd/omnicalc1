import { useEffect, useRef, useState } from "react"
import { hasCookieConsent } from "./CookieConsent"
import { loadScript } from "./AdLoader"

type ExternalAdVariant = "tower" | "smallTower" | "banner"

const ads: Record<ExternalAdVariant, { key: string; height: number; width: number }> = {
  tower: { key: "10a59e47b41d9889deb284ab5a0bf460", height: 600, width: 160 },
  smallTower: { key: "4bab395f72e708783efcfb02fe5691da", height: 300, width: 160 },
  banner: { key: "1ece01a59c2c84ded856edd9d9cb7b27", height: 50, width: 320 },
}

const DEFAULT_SCRIPT_ID = "omnicalc-external-ad-script"

// Helper: allow dev override to load ads on localhost when env flag set
const isDev = (import.meta as any).env?.MODE !== "production"
const ALLOW_ADS_ON_DEV = (import.meta as any).VITE_ALLOW_ADS_ON_DEV === "true"
// Base URL for ad provider (put official Adsterra url here via env)
const AD_PROVIDER_BASE = (import.meta as any).VITE_AD_PROVIDER_BASE || "https://alwaysmulticulturallanding.com"
// Full script URL (optional). Can include placeholder {KEY} which will be replaced with the ad key.
// Example: VITE_AD_PROVIDER_SCRIPT_URL="https://alwaysmulticulturallanding.com/axm930yuc?key={KEY}"
const AD_PROVIDER_SCRIPT = (import.meta as any).VITE_AD_PROVIDER_SCRIPT_URL || null

export function ExternalAdSlot({ variant, className = "" }: { variant: ExternalAdVariant; className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const ad = ads[variant]
  const [consented, setConsented] = useState<boolean>(() => (typeof window !== "undefined" ? hasCookieConsent() : false))
  const [adUnavailable, setAdUnavailable] = useState(false)
  const [inView, setInView] = useState(false)
  const slotId = `omnicalc-ad-${variant}-${ad.key}`

  useEffect(() => {
    const onConsent = () => setConsented(hasCookieConsent())
    window.addEventListener("omnicalc:consent", onConsent)
    return () => window.removeEventListener("omnicalc:consent", onConsent)
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            obs.disconnect()
          }
        })
      },
      { rootMargin: "200px", threshold: 0.01 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Do nothing until consent or dev-override
    if (!consented && !(isDev && ALLOW_ADS_ON_DEV)) {
      return
    }

    // Also wait until element is in viewport (lazy load)
    if (!inView) return

    // Clear previous
    container.replaceChildren()
    setAdUnavailable(false)

    // Provide a named container that some ad scripts expect
    const adContainer = document.createElement("div")
    adContainer.id = slotId
    adContainer.style.width = `${ad.width}px`
    adContainer.style.height = `${ad.height}px`
    adContainer.setAttribute("aria-hidden", "true")
    container.appendChild(adContainer)

    // Set any global options the provider expects (e.g., atOptions)
    ;(window as any).atOptions = {
      key: ad.key,
      format: "iframe",
      height: ad.height,
      width: ad.width,
      params: {},
    }

    // Build script URL. Prefer explicit script URL env var (supports {KEY} placeholder), otherwise fall back to base pattern
    let scriptUrl: string
    if (AD_PROVIDER_SCRIPT) {
      scriptUrl = AD_PROVIDER_SCRIPT.includes("{KEY}") ? AD_PROVIDER_SCRIPT.replace("{KEY}", ad.key) : AD_PROVIDER_SCRIPT
    } else {
      scriptUrl = `${AD_PROVIDER_BASE}/${ad.key}/invoke.js`
    }

    // Load script with helper
    const scriptId = `${DEFAULT_SCRIPT_ID}-${ad.key}`
    const loadTimeout = window.setTimeout(() => {
      // If loading takes too long, show unavailable (network slow or blocked)
      setAdUnavailable(true)
    }, 8000) // 8s

    loadScript({ id: scriptId, src: scriptUrl, async: true, crossOrigin: "anonymous", dataset: { variant } })
      .then(() => {
        clearTimeout(loadTimeout)
        // provider script should fill the div with id=slotId
      })
      .catch((err) => {
        clearTimeout(loadTimeout)
        // Could be blocked by AdBlock (ERR_BLOCKED_BY_CLIENT)
        setAdUnavailable(true)
        console.warn("Ad script failed to load", err)
      })

    return () => {
      // Optionally cleanup created ad container; but avoid removing external script to reuse for other slots
      if (container) container.replaceChildren()
    }
  }, [ad.key, ad.height, ad.width, consented, inView])

  return (
    <div
      ref={containerRef}
      className={`ad-frame ad-frame-${variant} flex w-full items-center justify-center overflow-hidden ${className}`}
      style={{ minHeight: ad.height }}
      aria-label="Advertisement"
      data-consent-required={!consented}
      data-ad-provider="external"
    >
      {consented && adUnavailable && (
        <span className="px-3 text-center text-xs text-muted-foreground">
          الإعلانات قد تكون غير متاحة. افحص إعدادات مانع الإعلانات أو الشبكة لديك.
        </span>
      )}
      {!consented && <span className="px-3 text-center text-xs text-muted-foreground">يتم تحميل الإعلانات بعد موافقتك.</span>}
    </div>
  )
}

export function ExternalAdLink() {
  return null
}
