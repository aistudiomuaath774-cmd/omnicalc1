import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "./i18n/LanguageContext"
import { ThemeProvider } from "./theme/ThemeContext"
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import CookieConsent from "./components/CookieConsent"

const HomePage = lazy(() => import("./pages/HomePage"))
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"))
const ContactPage = lazy(() => import("./pages/Contact"))
const NotFoundPage = lazy(() => import("./pages/NotFound"))
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"))
const TermsPage = lazy(() => import("./pages/TermsPage"))

function RouteFallback() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-muted border-t-primary" aria-hidden />
      <span className="sr-only">Loading</span>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <CookieConsent />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/calculator/:id" element={<CalculatorPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
