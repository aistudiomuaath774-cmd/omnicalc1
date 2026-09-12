import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"
import { useSEO } from "@/hooks/useSEO"
import { calculators } from "@/calculators/registry"
import { AdSlot } from "@/components/AdSlot"

export default function HomePage() {
  const { t, lang, dir, withLang } = useLanguage()

  useSEO({
    title: `${t("app.name")} — ${t("app.tagline")}`,
    description: t("app.description"),
    keywords:
      lang === "ar"
        ? "حاسبات مجانية أونلاين، حاسبة علمية، محول وحدات، حاسبة فيزياء، حاسبة صحة ولياقة، حساب BMI ومؤشر كتلة الجسم، حساب السعرات الحرارية، حاسبة مالية، حاسبة عمر"
        : "free online calculators, scientific calculator, unit converter, physics calculator, health and fitness calculator, BMI calculator, calorie calculator, Mifflin-St Jeor, US Navy body fat calculator, finance calculator, age calculator",
    lang,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t("app.name"),
        description: t("app.description"),
        applicationCategory: "UtilityApplication",
        applicationSubCategory: "Online calculator suite",
        operatingSystem: "Any",
        url: window.location.origin,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        inLanguage: lang,
        featureList: calculators.map((calculator) => t(calculator.titleKey)),
      },
    ],
  })

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-accent/10 px-6 py-14 text-center sm:py-20">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{t("app.name")}</p>
        <h1 className="mx-auto max-w-3xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
          {t("home.heading")}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground text-pretty sm:text-lg">{t("home.sub")}</p>
        <a href="#calculators" className="btn-primary mt-8 inline-flex">
          {t("home.browse")}
          <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
        </a>
      </section>

      <div className="my-8">
        <AdSlot variant="header" />
      </div>

      <article>
        <section id="calculators" aria-labelledby="calc-heading" className="scroll-mt-20">
        <h2 id="calc-heading" className="mb-5 text-xl font-bold">
          {t("nav.calculators")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((c) => {
            const Icon = c.icon
            return (
              <Link
                key={c.id}
                to={withLang(`/calculator/${c.id}`)}
                className="card group flex flex-col gap-3 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.accent}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-semibold">{t(c.titleKey)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(c.descKey)}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {t("home.browse")}
                  <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                </span>
              </Link>
            )
          })}
        </div>
        </section>
      </article>
    </main>
  )
}
