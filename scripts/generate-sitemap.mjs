import { mkdir, writeFile } from "node:fs/promises"

const origin = "https://omnicalc1.vercel.app"
const calculators = ["scientific", "unit-converter", "physics", "health", "vat", "finance", "date-age"]
const staticPages = [
  ["/about", "monthly", "0.7"],
  ["/contact", "monthly", "0.6"],
  ["/privacy", "yearly", "0.3"],
  ["/terms", "yearly", "0.3"],
]

function entry(path, changefreq, priority) {
  const en = `${origin}${path}?lang=en`
  const ar = `${origin}${path}?lang=ar`
  return `  <url>\n    <loc>${en}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>\n    <xhtml:link rel="alternate" hreflang="ar" href="${ar}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>\n  </url>`
}

const urls = [
  entry("/", "daily", "1.0"),
  ...staticPages.map(([path, freq, priority]) => entry(path, freq, priority)),
  ...calculators.map((id) => entry(`/calculator/${id}`, "weekly", "0.8")),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n\n")}\n</urlset>\n`
await mkdir("public", { recursive: true })
await writeFile("public/sitemap.xml", xml)
console.log(`Generated public/sitemap.xml with ${urls.length} canonical entries.`)
