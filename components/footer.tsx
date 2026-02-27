"use client"

import { ArrowUp, Github, Linkedin, Instagram, Music2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLang } from "@/context/lang-context"
import { content, siteConfig } from "@/content/content"

export function Footer() {
  const { t } = useLang()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 lg:flex-row lg:justify-between lg:px-6">
        <div className="flex flex-col items-center gap-2 lg:items-start">
          <span className="text-sm text-muted-foreground">
            {new Date().getFullYear()} {content.footer.copyright}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm" asChild>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="size-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon-sm" asChild>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="size-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon-sm" asChild>
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="size-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon-sm" asChild>
            <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <Music2 className="size-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon-sm" asChild>
            <a href={`mailto:${siteConfig.email}`} aria-label="Email">
              <Mail className="size-4" />
            </a>
          </Button>

          <div className="ml-2 h-5 w-px bg-border" aria-hidden="true" />

          <Button variant="ghost" size="sm" onClick={scrollToTop}>
            <ArrowUp className="size-3.5" />
            {t(content.footer.backToTop)}
          </Button>
        </div>
      </div>
    </footer>
  )
}
