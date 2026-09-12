import { useEffect } from "react"

interface SEOOptions {
  title: string
  description: string
  lang: "ar" | "en" | string
  path?: string
  keywords?: string
  jsonLd?: Record<string, unknown>[]
}

function upsertMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

function upsertLink(rel: string, href: string, extra: Record<string, string> = {}) {
  const selector = `link[rel="${rel}"]${extra.hreflang ? `[hreflang="${extra.hreflang}"]` : ""}`
  let el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement("link")
    el.rel = rel
    Object.entries(extra).forEach(([key, value]) => el!.setAttribute(key, value))
    document.head.appendChild(el)
  }
  el.href = href
}

export function useSEO({ title, description, lang, path, keywords, jsonLd }: SEOOptions) {
  useEffect(() => {
    document.title = title
    upsertMeta("description", description)
    if (keywords) upsertMeta("keywords", keywords)
    upsertMeta("og:title", title, "property")
    upsertMeta("og:description", description, "property")
    upsertMeta("og:type", "website", "property")
    upsertMeta("og:site_name", "OmniCalc", "property")
    upsertMeta("og:locale", lang === "ar" ? "ar_AR" : "en_US", "property")
    upsertMeta("og:image", `${window.location.origin}/icon.svg`, "property")
    upsertMeta("twitter:card", "summary", "name")
    upsertMeta("twitter:title", title)
    upsertMeta("twitter:description", description)
    upsertMeta("twitter:image", `${window.location.origin}/icon.svg`)

    const pathname = path || window.location.pathname
    const base = window.location.origin
    const localized = (locale: string) => `${base}${pathname}${pathname.includes("?") ? "&" : "?"}lang=${locale}`
    upsertMeta("og:url", localized(lang), "property")
    upsertLink("canonical", localized(lang))
    upsertLink("alternate", localized("ar"), { hreflang: "ar" })
    upsertLink("alternate", localized("en"), { hreflang: "en" })
    upsertLink("alternate", localized("en-GB"), { hreflang: "en-GB" })
    upsertLink("alternate", localized("en-IE"), { hreflang: "en-IE" })
    upsertLink("alternate", localized("en"), { hreflang: "x-default" })
    document.documentElement.lang = lang
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"

    const scriptId = "omnicalc-jsonld"
    document.getElementById(scriptId)?.remove()
    if (jsonLd?.length) {
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.id = scriptId
      script.textContent = JSON.stringify(jsonLd.length === 1 ? jsonLd[0] : jsonLd)
      document.head.appendChild(script)
    }
    return () => document.getElementById(scriptId)?.remove()
  }, [title, description, lang, path, keywords, jsonLd])
}
