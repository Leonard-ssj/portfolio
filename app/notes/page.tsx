"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Calendar, Search, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { AnimatedBackground } from "@/components/animated-background"
import { Footer } from "@/components/footer"
import { Reveal, StaggerContainer, StaggerItem } from "@/components/reveal"
import { useLang } from "@/context/lang-context"
import { content } from "@/content/content"

export default function NotesPage() {
  const { t } = useLang()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | null>(null)
  const posts = content.notes.posts

  const categories = Array.from(new Set(posts.map((p) => t(p.category)))).sort((a, b) => a.localeCompare(b))

  const filtered = posts.filter((post) => {
    const title = t(post.title).toLowerCase()
    const summary = t(post.summary).toLowerCase()
    const q = search.toLowerCase()
    const matchesText = title.includes(q) || summary.includes(q)
    const matchesCategory = !category || t(post.category) === category
    return matchesText && matchesCategory
  })

  const estimateReadMinutes = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(words / 200))
  }

  return (
    <>
      <AnimatedBackground />
      <Header />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <Reveal>
            <div className="flex flex-col gap-6 mb-12">
              <Button variant="ghost" size="sm" asChild className="w-fit">
                <Link href="/">
                  <ArrowLeft className="size-3.5" />
                  {t({ es: "Volver al inicio", en: "Back to home" })}
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
                {t(content.notes.title)}
              </h1>
              {"subtitle" in content.notes && (
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                  {t((content.notes as { subtitle: { es: string; en: string } }).subtitle)}
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mb-10 flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t(content.notes.searchPlaceholder)}
                  className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={category === null ? "default" : "outline"}
                  onClick={() => setCategory(null)}
                >
                  {t({ es: "Todas", en: "All" })}
                </Button>
                {categories.map((c) => (
                  <Button
                    key={c}
                    type="button"
                    size="sm"
                    variant={category === c ? "default" : "outline"}
                    onClick={() => setCategory((prev) => (prev === c ? null : c))}
                  >
                    {c}
                  </Button>
                ))}

                <span className="ml-auto text-xs text-muted-foreground">
                  {filtered.length} {t({ es: "resultado(s)", en: "result(s)" })}
                </span>
              </div>
            </div>
          </Reveal>

          <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.1}>
            {filtered.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <Link
                  href={`/notes/${post.slug}`}
                  className="glass-card group block h-full min-h-[220px] rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
                >
                  <div className="mb-4 h-px w-full overflow-hidden rounded-full bg-border/60">
                    <div className="h-full w-full animate-shimmer opacity-20" />
                  </div>
                  <div className="flex h-full flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="size-3" />
                        {post.date}
                      </span>
                      <Badge variant="secondary" className="text-xs font-normal">
                        <Tag className="size-3" />
                        {t(post.category)}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {estimateReadMinutes(t(post.content))} {t({ es: "min lectura", en: "min read" })}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {t(post.title)}
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(post.summary)}
                    </p>
                    <span className="mt-auto flex items-center gap-1 text-sm font-medium text-primary">
                      {t({ es: "Leer mas", en: "Read more" })}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                {t({ es: "No se encontraron notas.", en: "No notes found." })}
              </div>
            )}
          </StaggerContainer>
        </div>
      </main>
      <Footer />
    </>
  )
}
