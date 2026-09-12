import { useEffect } from "react"
import { COOKIE_CONSENT_KEY, hasCookieConsent } from "./CookieConsent"

const SCRIPT_ID = "omnicalc-adsense-script"
const CLIENT = "ca-pub-7538440942805514"

export default function AdSenseLoader() {
  useEffect(() => {
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
  }, [])

  return null
}

export { COOKIE_CONSENT_KEY }
