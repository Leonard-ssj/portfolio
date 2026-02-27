"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Menu, X, Languages } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useLang } from "@/context/lang-context"
import { content, siteConfig } from "@/content/content"
import { cn } from "@/lib/utils"

export function Header() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === "/"
  const navLabels = t(content.nav)
  const navAnchors = content.navAnchors

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    navAnchors.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isHome, navAnchors])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const handleNavClick = (anchor: string) => {
    setMobileOpen(false)
    if (!isHome) {
      window.location.href = `/#${anchor}`
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-card border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 lg:px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          {siteConfig.initials}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLabels.map((label, i) => {
            const anchor = navAnchors[i]
            return (
              <a
                key={anchor}
                href={`/#${anchor}`}
                onClick={() => handleNavClick(anchor)}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  activeSection === anchor && isHome
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
                {activeSection === anchor && isHome && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-primary" />
                )}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label="Toggle language"
          >
            <Languages className="size-4" />
            <span className="sr-only">
              {lang === "es" ? "Switch to English" : "Cambiar a Espanol"}
            </span>
          </Button>

          {mounted && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
          )}

          <Button
            size="sm"
            className="hidden lg:inline-flex"
            asChild
          >
            <a href="/#contact">{t(content.contact.title)}</a>
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden glass-card border-t border-border/50">
          <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
            {navLabels.map((label, i) => (
              <a
                key={navAnchors[i]}
                href={`/#${navAnchors[i]}`}
                onClick={() => handleNavClick(navAnchors[i])}
                className={cn(
                  "px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
                  activeSection === navAnchors[i] && isHome
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {label}
              </a>
            ))}
            <div className="mt-2 pt-2 border-t border-border/50">
              <Button size="sm" className="w-full" asChild>
                <a href="/#contact" onClick={() => setMobileOpen(false)}>
                  {t(content.contact.title)}
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
