import { useCallback, useEffect, useState } from "react"

export interface HistoryEntry {
  id: string
  text: string
  time: number
}

const MAX_ENTRIES = 25

export function useHistory(calculatorId: string) {
  const storageKey = `omnicalc:history:${calculatorId}`
  const [entries, setEntries] = useState<HistoryEntry[]>([])

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey)
      setEntries(raw ? (JSON.parse(raw) as HistoryEntry[]) : [])
    } catch {
      setEntries([])
    }
  }, [storageKey])

  const persist = useCallback(
    (next: HistoryEntry[]) => {
      setEntries(next)
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        /* ignore quota errors */
      }
    },
    [storageKey],
  )

  const add = useCallback(
    (text: string) => {
      const entry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text,
        time: Date.now(),
      }
      setEntries((prev) => {
        const next = [entry, ...prev].slice(0, MAX_ENTRIES)
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next))
        } catch {
          /* ignore */
        }
        return next
      })
    },
    [storageKey],
  )

  const remove = useCallback(
    (id: string) => {
      setEntries((prev) => {
        const next = prev.filter((e) => e.id !== id)
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next))
        } catch {
          /* ignore */
        }
        return next
      })
    },
    [storageKey],
  )

  const clear = useCallback(() => persist([]), [persist])

  return { entries, add, remove, clear }
}
