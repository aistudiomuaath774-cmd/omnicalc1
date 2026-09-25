import { Suspense } from "react"
import { Link, useParams } from "react-router-dom"
import { getCalculator, calculators } from "@/calculators/registry"
import { CalculatorContextProvider } from "@/calculators/CalculatorContext"
import { useHistory } from "@/hooks/useHistory"
import { useSEO } from "@/hooks/useSEO"
import { useLanguage } from "@/i18n/LanguageContext"
import { HistoryPanel } from "@/components/HistoryPanel"
import { StarRating } from "@/components/StarRating"
import { FaqSection, GuideSection } from "@/components/FaqSection"
import { MethodologySection } from "@/components/MethodologySection"

function LoadingCard() {
  return (
    <div className="card flex h-64 items-center justify-center p-6">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" aria-hidden />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export default function CalculatorPage() {
  const { id = "" } = useParams()
  const { t, lang, withLang } = useLanguage()
  const def = getCalculator(id)
  const history = useHistory(id)

  const title = def ? `${t(def.titleKey)} — ${t("app.name")}` : `${t("notFound")} — ${t("app.name")}`
  const description = def ? t(def.descKey) : t("app.description")

  useSEO({
    title,
    description,
    keywords:
      lang === "ar"
        ? `${t(def?.titleKey ?? "app.name")}, حاسبة مجانية، حسابات دقيقة، شرح وطريقة الاستخدام، أدوات أونلاين، نتائج فورية`
        : `${t(def?.titleKey ?? "app.name")}, free online calculator, accurate calculations, how to use, instant results, online tool`,
    lang,
    jsonLd: def
      ? [
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `${t(def.titleKey)} — ${t("app.name")}`,
            description: t(def.descKey),
            applicationCategory: "UtilityApplication",
            applicationSubCategory: "Online calculator",
            operatingSystem: "Any",
            url: `${window.location.origin}/calculator/${def.id}?lang=${lang}`,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            inLanguage: lang,
            featureList: [t(def.titleKey), t(def.descKey), t(def.guideKey)],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: def.faq.map((f) => ({
              "@type": "Question",
              name: f.q[lang],
              acceptedAnswer: { "@type": "Answer", text: f.a[lang] },
            })),
          },
        ]
      : undefined,
  })

  if (!def) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">{t("notFound")}</h1>
        <Link to={withLang("/")} className="btn-primary mt-6 inline-flex">
          {t("nav.home")}
        </Link>
      </main>
    )
  }

  const Component = def.component
  const Icon = def.icon

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <article className="flex flex-col gap-6">
          <header className="flex items-start gap-4">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${def.accent}`}>
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-balance">{t(def.titleKey)}</h1>
              <p className="mt-1 text-muted-foreground text-pretty">{t(def.descKey)}</p>
            </div>
          </header>

          <CalculatorContextProvider addHistory={history.add}>
            <Suspense fallback={<LoadingCard />}>
              <Component />
            </Suspense>
          </CalculatorContextProvider>

          <GuideSection text={t(def.guideKey)} />
          <MethodologySection calculatorId={def.id} />
          <FaqSection faq={def.faq} />
        </article>

        <aside className="flex flex-col gap-6">
          <HistoryPanel entries={history.entries} onRemove={history.remove} onClear={history.clear} />
          <StarRating calculatorId={id} />
          <nav aria-label={t("nav.calculators")} className="card p-5">
            <h3 className="mb-3 text-sm font-semibold">{t("nav.calculators")}</h3>
            <ul className="flex flex-col gap-1">
              {calculators
                .filter((c) => c.id !== id)
                .map((c) => {
                  const CIcon = c.icon
                  return (
                    <li key={c.id}>
                      <Link
                        to={withLang(`/calculator/${c.id}`)}
                        className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <CIcon className="h-4 w-4" />
                        {t(c.titleKey)}
                      </Link>
                    </li>
                  )
                })}
            </ul>
          </nav>
        </aside>
      </div>
    </main>
  )
}
