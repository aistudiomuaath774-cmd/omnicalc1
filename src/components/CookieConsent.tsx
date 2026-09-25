import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Cookie } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"

export const COOKIE_CONSENT_KEY = "omnicalc:cookie-consent:v1"
export const CONSENT_SETTINGS_EVENT = "omnicalc:manage-consent"

export function hasCookieConsent() {
  if (typeof window === "undefined") return false
  return window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted"
}

export function requestConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT))
}

export default function CookieConsent() {
  const { lang, withLang } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const showIfRequested = () => setVisible(true)
    setVisible(!window.localStorage.getItem(COOKIE_CONSENT_KEY))
    window.addEventListener(CONSENT_SETTINGS_EVENT, showIfRequested)
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, showIfRequested)
  }, [])

  const choose = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value)
    setVisible(false)
    window.dispatchEvent(new CustomEvent("omnicalc:consent", { detail: value }))
  }

  if (!visible) return null
  const ar = lang === "ar"

  return (
    <section
      role="dialog"
      aria-label={ar ? "إعدادات ملفات تعريف الارتباط" : "Cookie settings"}
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-4 shadow-2xl backdrop-blur sm:p-5"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Cookie className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <div className="text-sm leading-6">
            <h2 className="font-bold">{ar ? "نحترم خصوصيتك" : "We respect your privacy"}</h2>
            <p className="text-muted-foreground">
              {ar
                ? "نستخدم التخزين المحلي لتشغيل الموقع، ولا نحمّل تقنيات الإعلان غير الضرورية قبل إتمام اختيارك عندما يوجب القانون ذلك. يمكنك تغيير اختيارك من إعدادات الخصوصية في التذييل."
                : "We use local storage to operate the site, and we do not load non-essential advertising technologies before your choice where required. You can change your choice from Privacy Settings in the footer."}{" "}
              <Link to={withLang("/privacy")} className="font-medium text-primary underline underline-offset-2">
                {ar ? "اقرأ سياسة الخصوصية" : "Read our Privacy Policy"}
              </Link>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2 ps-8 sm:ps-0">
          <button type="button" onClick={() => choose("rejected")} className="btn-outline">
            {ar ? "رفض غير الضروري" : "Reject non-essential"}
          </button>
          <button type="button" onClick={() => choose("accepted")} className="btn-primary">
            {ar ? "موافقة" : "Accept"}
          </button>
        </div>
      </div>
    </section>
  )
}
