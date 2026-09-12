import { useEffect } from "react"

interface SEOOptions {
  title?: string
  description?: string
  keywords?: string
  lang?: 'en' | 'ar'
  canonical?: string
  jsonLd?: any[]
}

function setMeta(name: string, content: string | null) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
  if (!el && content) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  if (el) {
    if (content) el.setAttribute('content', content)
    else el.remove()
  }
}

function setOrUpdateLink(rel: string, attrs: Record<string, string>) {
  const selectorParts = [`link[rel=\"${rel}\"]`]
  if (attrs.hreflang) selectorParts.push(`[hreflang=\"${attrs.hreflang}\"]`)
  const selector = selectorParts.join('')
  let el = document.querySelector(selector) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) {
    el.setAttribute(k, v)
  }
}

export function useSEO(opts: SEOOptions) {
  useEffect(() => {
    const { title, description, keywords, lang = 'en', canonical, jsonLd } = opts

    if (title) document.title = title

    setMeta('description', description ?? null)
    setMeta('keywords', keywords ?? null)
    setMeta('robots', 'index, follow, max-image-preview:large')
    setMeta('googlebot', 'index, follow')

    // canonical
    try {
      const url = new URL(canonical ?? window.location.href)
      url.searchParams.delete('utm_source')
      url.searchParams.delete('utm_medium')
      const canon = url.toString()
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
      }
      link.href = canon
    } catch (e) {
      // ignore
    }

    // hreflang: en, ar, x-default
    const siteOrigin = (window as any).__SITE_ORIGIN__ || window.location.origin
    const path = window.location.pathname
    const enHref = `${siteOrigin}${path}?lang=en`
    const arHref = `${siteOrigin}${path}?lang=ar`

    // remove existing alternates
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove())

    // add alternates
    setOrUpdateLink('alternate', { hreflang: 'en', href: enHref })
    setOrUpdateLink('alternate', { hreflang: 'ar', href: arHref })
    setOrUpdateLink('alternate', { hreflang: 'x-default', href: enHref })

    // JSON-LD
    document.querySelectorAll('script[type="application/ld+json"]').forEach((n) => n.remove())
    if (jsonLd && jsonLd.length) {
      jsonLd.forEach((obj) => {
        const s = document.createElement('script')
        s.type = 'application/ld+json'
        s.text = JSON.stringify(obj)
        document.head.appendChild(s)
      })
    }
  }, [opts.title, opts.description, opts.keywords, opts.lang, opts.canonical])
}
