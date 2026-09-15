// Utility to load external scripts reliably and only once.
// Returns a Promise that resolves on load and rejects on error.
export type ScriptOptions = {
  id: string
  src: string
  async?: boolean
  defer?: boolean
  crossOrigin?: string | null
  dataset?: Record<string, string>
  nonce?: string
}

export function loadScript(opts: ScriptOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof document === "undefined") return reject(new Error("no-document"))

    const { id, src, async = true, defer = false, crossOrigin = "anonymous", dataset, nonce } = opts

    const existing = document.getElementById(id) as HTMLScriptElement | null
    if (existing) {
      // If already loaded, resolve immediately. If it's still loading, attach events.
      if ((existing.getAttribute("data-loaded") || "") === "true") return resolve()
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(new Error("script-error")), { once: true })
      return
    }

    const s = document.createElement("script")
    s.id = id
    s.src = src
    s.async = async
    if (defer) s.defer = true
    if (crossOrigin) s.crossOrigin = crossOrigin
    if (nonce) s.nonce = nonce
    if (dataset) {
      Object.keys(dataset).forEach((k) => {
        // @ts-ignore - dataset index
        s.dataset[k] = dataset[k]
      })
    }

    s.addEventListener(
      "load",
      () => {
        s.setAttribute("data-loaded", "true")
        resolve()
      },
      { once: true }
    )
    s.addEventListener(
      "error",
      () => {
        reject(new Error("script-error"))
      },
      { once: true }
    )

    document.head.appendChild(s)
  })
}
