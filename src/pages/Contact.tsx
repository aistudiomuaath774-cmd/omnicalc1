import { useState, type FormEvent } from "react"
import { Mail, Send } from "lucide-react"
import { useLanguage } from "@/i18n/LanguageContext"
import { useSEO } from "@/hooks/useSEO"
import { AdSlot } from "@/components/AdSlot"

const CONTACT_EMAIL = "hello@omnicalc.app"

export default function ContactPage() {
  const { t, lang } = useLanguage()
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState("")

  useSEO({
    title: `${t("contact.title")} — ${t("app.name")}`,
    description: t("contact.desc"),
    lang,
  })

  const set = (key: string) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: "" }))
  }

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = t("contact.required")
    if (!form.email.trim()) next.email = t("contact.required")
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t("contact.invalidEmail")
    if (!form.message.trim()) next.message = t("contact.required")
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const subject = encodeURIComponent(form.subject || `${t("app.name")} — ${t("contact.title")}`)
    const body = encodeURIComponent(`${form.name} <${form.email}>\n\n${form.message}`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setStatus(t("contact.sent"))
  }

  const fields = [
    { key: "name", label: t("contact.name"), ph: t("contact.namePh"), type: "text" },
    { key: "email", label: t("contact.email"), ph: t("contact.emailPh"), type: "email" },
    { key: "subject", label: t("contact.subject"), ph: t("contact.subjectPh"), type: "text" },
  ] as const

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
          <Mail className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{t("contact.title")}</h1>
          <p className="mt-1 text-muted-foreground">{t("contact.desc")}</p>
        </div>
      </div>

      <form onSubmit={submit} noValidate className="card flex flex-col gap-4 p-6">
        {fields.map((f) => (
          <div key={f.key}>
            <label htmlFor={f.key} className="label">
              {f.label}
            </label>
            <input
              id={f.key}
              type={f.type}
              className="field"
              placeholder={f.ph}
              value={form[f.key]}
              onChange={(e) => set(f.key)(e.target.value)}
              aria-invalid={!!errors[f.key]}
              aria-describedby={errors[f.key] ? `${f.key}-error` : undefined}
            />
            {errors[f.key] && (
              <p id={`${f.key}-error`} className="mt-1 text-xs text-rose-500">
                {errors[f.key]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="message" className="label">
            {t("contact.message")}
          </label>
          <textarea
            id="message"
            rows={5}
            className="field resize-y"
            placeholder={t("contact.messagePh")}
            value={form.message}
            onChange={(e) => set("message")(e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-1 text-xs text-rose-500">
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" className="btn-primary">
          <Send className="h-4 w-4" />
          {t("contact.send")}
        </button>

        {status && (
          <p role="status" className="text-sm text-emerald-500">
            {status}
          </p>
        )}
      </form>

      <div className="mt-8">
        <AdSlot variant="incontent" />
      </div>
    </main>
  )
}
