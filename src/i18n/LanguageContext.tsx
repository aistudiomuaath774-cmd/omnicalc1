import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { translations, type Lang } from "./translations"

interface LanguageContextValue {
  lang: Lang
  dir: "ltr" | "rtl"
  setLang: (lang: Lang) => void
  toggleLang: () => void
  t: (key: string, vars?: Record<string, string | number>) => string
  withLang: (path: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "omnicalc:lang"

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en"
  const params = new URLSearchParams(window.location.search)
  const urlLang = params.get("lang")
  if (urlLang === "ar" || urlLang === "en") return urlLang
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "ar" || stored === "en") return stored
  return "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

  const dir = lang === "ar" ? "rtl" : "ltr"

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = dir
    html.classList.toggle("font-arabic", lang === "ar")
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang, dir])

  const setLang = (next: Lang) => {
    setLangState(next)
    const url = new URL(window.location.href)
    url.searchParams.set("lang", next)
    window.history.replaceState({}, "", url)
  }

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en")

  const t = useMemo(() => {
    return (key: string, vars?: Record<string, string | number>) => {
      let str = translations[lang][key] ?? translations.en[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, "g"), `${v}`)
        }
      }
      return str
    }
  }, [lang])

  const withLang = useMemo(() => {
    return (path: string) => {
      const [pathWithQuery, hash] = path.split("#", 2)
      const [pathname, query = ""] = pathWithQuery.split("?", 2)
      const params = new URLSearchParams(query)
      params.set("lang", lang)
      const search = params.toString()
      return `${pathname}?${search}${hash ? `#${hash}` : ""}`
    }
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir, setLang, toggleLang, t, withLang }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, dir, t, withLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
