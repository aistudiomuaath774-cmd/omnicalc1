import { useEffect } from "react"
import { COOKIE_CONSENT_KEY, hasCookieConsent } from "./CookieConsent"

const SCRIPT_ID = "omnicalc-adsense-script"
const CLIENT = "ca-pub-7538440942805514"

export default function AdSenseLoader() {
  // Only attempt to load AdSense if VITE_USE_ADSENSE === 'true' (set in your Vite env)
  // This project is now using external providers like Adsterra; keep AdSense disabled by default.
  // To enable AdSense, set VITE_USE_ADSENSE=true in your environment.
  // Cast import.meta to any to avoid TypeScript error during build in environments
  // where the Vite types are not loaded.
  const enabled = (import.meta as any).VITE_USE_ADSENSE === "true"

  useEffect(() => {
    if (!enabled) return

    const load = () => {
      if (!hasCookieConsent() || document.getElementById(SCRIPT_ID)) return
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
  }, [enabled])

  return null
}

export { COOKIE_CONSENT_KEY }
