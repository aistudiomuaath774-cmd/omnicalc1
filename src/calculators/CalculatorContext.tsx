import { createContext, useContext, type ReactNode } from "react"

interface CalculatorContextValue {
  addHistory: (text: string) => void
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null)

export function CalculatorContextProvider({
  addHistory,
  children,
}: {
  addHistory: (text: string) => void
  children: ReactNode
}) {
  return <CalculatorContext.Provider value={{ addHistory }}>{children}</CalculatorContext.Provider>
}

export function useCalculator() {
  const ctx = useContext(CalculatorContext)
  if (!ctx) throw new Error("useCalculator must be used within a CalculatorContextProvider")
  return ctx
}
