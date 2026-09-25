import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Moon, Sun, Languages, Menu, X, Sigma } from "lucide-react"
import { useTheme } from "@/theme/ThemeContext"
import { useLanguage } from "@/i18n/LanguageContext"
import { calculators } from "@/calculators/registry"

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { t, lang, toggleLang, withLang } = useLanguage()
  const [open, setOpen] = useState(false)

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link to={withLang("/")} className="flex items-center gap-2" aria-label={t("app.name")}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sigma className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">{t("app.name")}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <NavLink to={withLang("/")} end className={navLinkClass}>
            {t("nav.home")}
          </NavLink>
          {calculators.map((c) => (
            <NavLink key={c.id} to={withLang(`/calculator/${c.id}`)} className={navLinkClass}>
              {t(c.titleKey)}
            </NavLink>
          ))}
          <NavLink to={withLang("/contact")} className={navLinkClass}>
            {t("nav.contact")}
          </NavLink>
          <NavLink to={withLang("/about")} className={navLinkClass}>
            {t("nav.about")}
          </NavLink>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleLang}
            className="btn-ghost gap-1.5"
            aria-label={t("lang.toggle")}
          >
            <Languages className="h-4 w-4" />
            <span className="text-xs font-semibold">{lang === "en" ? "AR" : "EN"}</span>
          </button>
          <button type="button" onClick={toggleTheme} className="btn-ghost" aria-label={t("theme.toggle")}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="btn-ghost md:hidden"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            <NavLink to={withLang("/")} end className={navLinkClass} onClick={() => setOpen(false)}>
              {t("nav.home")}
            </NavLink>
            {calculators.map((c) => (
              <NavLink
                key={c.id}
                to={withLang(`/calculator/${c.id}`)}
                className={navLinkClass}
                onClick={() => setOpen(false)}
              >
                {t(c.titleKey)}
              </NavLink>
            ))}
            <NavLink to={withLang("/contact")} className={navLinkClass} onClick={() => setOpen(false)}>
              {t("nav.contact")}
            </NavLink>
            <NavLink to={withLang("/about")} className={navLinkClass} onClick={() => setOpen(false)}>
              {t("nav.about")}
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}
