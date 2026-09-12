import { Link } from "react-router-dom"
import { useLanguage } from "../i18n/LanguageContext"

export default function NotFoundPage() {
  const { t, withLang } = useLanguage()
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-foreground">{t("notfound.title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("notfound.desc")}</p>
      <Link
        to={withLang("/")}
        className="mt-6 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition hover:opacity-90"
      >
        {t("notfound.home")}
      </Link>
    </main>
  )
}
