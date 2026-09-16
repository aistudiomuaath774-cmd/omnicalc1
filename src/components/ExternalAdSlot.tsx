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

// env helpers
const isDev = (import.meta as any).env?.MODE !== "production"
const ALLOW_ADS_ON_DEV = (import.meta as any).VITE_ALLOW_ADS_ON_DEV === "true"
const AD_PROVIDER_BASE: string = (import.meta as any).VITE_AD_PROVIDER_BASE || "https://alwaysmulticulturallanding.com"
const AD_PROVIDER_SCRIPT: string | null = (import.meta as any).VITE_AD_PROVIDER_SCRIPT_URL || null
// Optional explicit iframe URL to use as fallback (set to the working URL you tested)
const AD_PROVIDER_IFRAME_URL: string | null = (import.meta as any).VITE_AD_PROVIDER_IFRAME_URL || null

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

    // Ensure container has positioning and a sensible z-index (not to cover cookie dialog)
    if (!container.style.position) container.style.position = "relative"
    // keep z-index below cookie consent (z-50) but above normal content; adjust if needed
    if (!container.style.zIndex) container.style.zIndex = "20"

    // Highlight briefly for debug (remove after 2s) to see if it's covered
    const prevOutline = container.style.outline
    container.style.outline = "3px dashed rgba(0,128,255,0.8)"
    const outlineTimer = window.setTimeout(() => {
      container.style.outline = prevOutline || ""
    }, 2000)

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

    // DEBUG: inspect stacking/overlays at center point
    try {
      const rect = container.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const topEl = document.elementFromPoint(cx, cy)
      console.log("[Ad debug] slot rect:", rect, "elementAtCenter:", topEl)
      const elems = document.elementsFromPoint(cx, cy)
      console.log("[Ad debug] elementsFromPoint:", elems.map(e => ({ tag: e.tagName, id: e.id, classes: e.className })))
    } catch (e) {
      console.warn("[Ad debug] elementFromPoint failed", e)
    }

    // Load script with helper
    const scriptId = `${DEFAULT_SCRIPT_ID}-${ad.key}`
    const loadTimeout = window.setTimeout(() => {
      // If loading takes too long, show unavailable (network slow or blocked)
      setAdUnavailable(true)
    }, 10000) // 10s

    let probeCancelled = false

    loadScript({ id: scriptId, src: scriptUrl, async: true, crossOrigin: "anonymous", dataset: { variant } })
      .then(() => {
        clearTimeout(loadTimeout)
        // provider script should fill the div with id=slotId
        // Wait a short time to let provider inject content
        setTimeout(() => {
          if (probeCancelled) return
          const injected = document.getElementById(slotId)
          const innerLen = injected ? injected.innerHTML.trim().length : 0
          console.log("[Ad debug] after load injected inner length:", innerLen)
          if (!injected || innerLen === 0) {
            // Try a fallback: insert iframe (only if an explicit iframe URL is provided)
            const iframeUrl = AD_PROVIDER_IFRAME_URL || (AD_PROVIDER_SCRIPT && !AD_PROVIDER_SCRIPT.endsWith(".js") ? AD_PROVIDER_SCRIPT : null)
            if (iframeUrl) {
              try {
                const fbIframe = document.createElement("iframe")
                fbIframe.width = `${ad.width}`
                fbIframe.height = `${ad.height}`
                fbIframe.style.border = "0"
                fbIframe.style.display = "block"
                // prefer property over setAttribute to avoid TS DOM typing nuances
                fbIframe.src = iframeUrl.includes("{KEY}") ? iframeUrl.replace("{KEY}", ad.key) : iframeUrl
                fbIframe.referrerPolicy = "no-referrer"
                // append to the adContainer (or container if adContainer missing)
                (injected || adContainer).appendChild(fbIframe)
                console.warn("[Ad debug] fallback iframe inserted (iframeUrl used).")
              } catch (e) {
                console.error("[Ad debug] fallback iframe insertion failed", e)
              }
            } else {
              console.warn("[Ad debug] no iframe fallback URL available; ad container empty after script load.")
            }
          } else {
            console.log("[Ad debug] provider injected content successfully.")
          }
        }, 800) // wait 0.8s after script load
      })
      .catch((err) => {
        clearTimeout(loadTimeout)
        setAdUnavailable(true)
        console.warn("Ad script failed to load", err)
      })

    return () => {
      probeCancelled = true
      window.clearTimeout(loadTimeout)
      window.clearTimeout(outlineTimer)
      if (container) container.replaceChildren()
    }
  }, [ad.key, ad.height, ad.width, consented, inView])

  return (
    <div
      ref={containerRef}
      className={`ad-frame ad-frame-${variant} flex w-full items-center justify-center overflow-visible ${className}`}
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
