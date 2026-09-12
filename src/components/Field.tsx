import { useId, type ReactNode } from "react"

interface NumberFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  step?: string
  min?: string
}

export function NumberField({ label, value, onChange, placeholder, step, min }: NumberFieldProps) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        className="field"
        value={value}
        placeholder={placeholder}
        step={step}
        min={min}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

interface SelectFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}

export function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select id={id} className="field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

interface DateFieldProps {
  label: string
  value: string
  onChange: (v: string) => void
}

export function DateField({ label, value, onChange }: DateFieldProps) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input id={id} type="date" className="field" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

interface ModeTabsProps {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  ariaLabel: string
}

export function ModeTabs({ value, onChange, options, ariaLabel }: ModeTabsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-1 rounded-lg border bg-muted/40 p-1"
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(o.value)}
            className={`btn h-8 flex-1 px-3 text-sm ${
              active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

export function Metric({ label, value, children }: { label: string; value?: string; children?: ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{value ?? children}</div>
    </div>
  )
}
