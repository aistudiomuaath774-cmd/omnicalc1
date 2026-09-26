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
      {/* الحاوية الرئيسية للفوتر: تم ترتيبها لتظهر في عمودين متجاورين ومتوسطة في الشاشة */}
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-12 px-4 py-10 text-center sm:flex-row sm:items-start sm:justify-around">
        
        {/* العمود الأول: أومني كالك والروابط الخاصة بالموقع */}
        <nav aria-label={t("nav.home")} className="flex flex-col items-center sm:items-start">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sigma className="h-4 w-4" />
            </span>
            <span className="text-base font-extrabold">{t("app.name")}</span>
          </div>
          <p className="mb-4 max-w-xs text-sm text-muted-foreground">{t("app.description")}</p>
          
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

        {/* العمود الثاني: الحاسبات */}
        <nav aria-label={t("nav.calculators")} className="flex flex-col items-center sm:items-start">
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

      </div>

      {/* شريط حقوق النشر في الأسفل، متمركز بالكامل في المنتصف */}
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 px-4 py-4 text-center text-xs text-muted-foreground">
          <p>
            &copy; {year} {t("app.name")}. {t("footer.rights")}
          </p>
          <p>{t("footer.built")}</p>
        </div>
      </div>
    </footer>
  )
}
