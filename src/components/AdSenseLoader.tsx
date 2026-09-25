import { useEffect } from "react"
import { COOKIE_CONSENT_KEY, hasCookieConsent } from "./CookieConsent"

const SCRIPT_ID = "omnicalc-adsense-script"
const CLIENT = (import.meta as any).VITE_ADSENSE_CLIENT || "ca-pub-7538440942805514"

export default function AdSenseLoader() {
  const enabled = (import.meta as any).VITE_USE_ADSENSE === "true"
  const isDev = (import.meta as any).env?.MODE !== "production"
  const ALLOW_ADS_ON_DEV = (import.meta as any).VITE_ALLOW_ADS_ON_DEV === "true"

  useEffect(() => {
    const load = () => {
      // Only load if enabled OR dev override
      if (!enabled && !(isDev && ALLOW_ADS_ON_DEV)) return
      if (!hasCookieConsent() && !(isDev && ALLOW_ADS_ON_DEV)) return
      if (document.getElementById(SCRIPT_ID)) return

      const script = document.createElement("script")
      script.id = SCRIPT_ID
      script.async = true
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT}`
      script.crossOrigin = "anonymous"
      document.head.appendChild(script)
    }

    load()
    window.addEventListener("omnicalc:consent", load)
    return () => window.removeEventListener("omnicalc:consent", load)
  }, [enabled, isDev])

  return null
}
