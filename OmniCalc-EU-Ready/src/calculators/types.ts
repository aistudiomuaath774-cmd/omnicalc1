import type { ComponentType, LazyExoticComponent } from "react"
import type { Lang } from "@/i18n/translations"
import type { LucideIcon } from "lucide-react"

export interface FaqItem {
  q: Record<Lang, string>
  a: Record<Lang, string>
}

export interface CalculatorDef {
  /** unique slug used in the route and for history storage */
  id: string
  /** translation key for the display name */
  titleKey: string
  /** translation key for the short description */
  descKey: string
  /** translation key for the extended user guide */
  guideKey: string
  /** category translation key used for grouping on the home page */
  categoryKey: string
  icon: LucideIcon
  /** lazy-loaded calculator component */
  component: LazyExoticComponent<ComponentType>
  /** FAQ entries (also emitted as JSON-LD FAQPage) */
  faq: FaqItem[]
  /** accent gradient classes for the home card */
  accent: string
}
