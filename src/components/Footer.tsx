import { Link } from "react-router-dom"
import { Sigma } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"
import { calculators } from "@/calculators/registry"
import { requestConsentSettings } from "@/components/CookieConsent"

export function Footer() {
  const { t, withLang } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sigma className="h-4 w-4" />
            </span>
            <span className="text-base font-extrabold">{t("app.name")}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t("app.description")}</p>
        </div>

        <nav aria-label={t("nav.calculators")}>
          <h3 className="mb-3 text-sm font-semibold">{t("nav.calculators")}</h3>
          <ul className="flex flex-col gap-2">
            {calculators.map((c) => (
              <li key={c.id}>
                <Link
                  to={withLang(`/calculator/${c.id}`)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t(c.titleKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("nav.home")}>
          <h3 className="mb-3 text-sm font-semibold">{t("app.name")}</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to={withLang("/")} className="text-sm text-muted-foreground hover:text-foreground">
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link to={withLang("/contact")} className="text-sm text-muted-foreground hover:text-foreground">
                {t("nav.contact")}
              </Link>
            </li>
            <li>
              <Link to={withLang("/about")} className="text-sm text-muted-foreground hover:text-foreground">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <button type="button" onClick={requestConsentSettings} className="text-sm text-muted-foreground hover:text-foreground">
                {t("footer.privacySettings")}
              </button>
            </li>
            <li>
              <Link to={withLang("/privacy")} className="text-sm text-muted-foreground hover:text-foreground">
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              <Link to={withLang("/terms")} className="text-sm text-muted-foreground hover:text-foreground">
                {t("footer.terms")}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {t("app.name")}. {t("footer.rights")}
          </p>
          <p>{t("footer.built")}</p>
        </div>
      </div>
    </footer>
  )
}
