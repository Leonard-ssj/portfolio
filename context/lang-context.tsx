"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Lang = "es" | "en"

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: <T>(obj: { es: T; en: T }) => T
}

const LangContext = createContext<LangContextType | undefined>(undefined)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-lang") as Lang | null
    if (stored === "es" || stored === "en") {
      setLangState(stored)
    }
    setMounted(true)
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem("portfolio-lang", newLang)
  }

  const t = <T,>(obj: { es: T; en: T }): T => obj[lang]

  if (!mounted) {
    return (
      <LangContext.Provider value={{ lang: "es", setLang, t: (obj) => obj.es }}>
        {children}
      </LangContext.Provider>
    )
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LangContext)
  if (!context) throw new Error("useLang must be used within LangProvider")
  return context
}
