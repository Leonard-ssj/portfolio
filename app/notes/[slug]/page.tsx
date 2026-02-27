"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { AnimatedBackground } from "@/components/animated-background"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"
import { useLang } from "@/context/lang-context"
import { content } from "@/content/content"

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function MarkdownContent({ text, headingIds }: { text: string; headingIds: Record<number, string> }) {
  const lines = text.split("\n")
  const elements: React.ReactNode[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-3xl font-bold tracking-tight text-foreground mt-8 mb-4 first:mt-0 text-balance">
          {line.slice(2)}
        </h1>
      )
    } else if (line.startsWith("## ")) {
      const id = headingIds[i]
      elements.push(
        <h2 key={i} id={id} className="scroll-mt-28 text-xl font-semibold text-foreground mt-8 mb-3">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*:\s*(.+)$/)
      if (match) {
        elements.push(
          <li key={i} className="flex gap-2 text-base leading-relaxed text-muted-foreground ml-4 mb-1">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
            <span>
              <strong className="font-semibold text-card-foreground">{match[1]}</strong>: {match[2]}
            </span>
          </li>
        )
      } else {
        const boldMatch = line.match(/^- \*\*(.+?)\*\*(.*)$/)
        if (boldMatch) {
          elements.push(
            <li key={i} className="flex gap-2 text-base leading-relaxed text-muted-foreground ml-4 mb-1">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
              <span>
                <strong className="font-semibold text-card-foreground">{boldMatch[1]}</strong>{boldMatch[2]}
              </span>
            </li>
          )
        }
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="flex gap-2 text-base leading-relaxed text-muted-foreground ml-4 mb-1">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
          {line.slice(2)}
        </li>
      )
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />)
    } else {
      elements.push(
        <p key={i} className="text-base leading-relaxed text-muted-foreground mb-2">
          {line}
        </p>
      )
    }
  }

  return <div className="flex flex-col">{elements}</div>
}

export default function NotePostPage() {
  const params = useParams()
  const { t } = useLang()
  const slug = params.slug as string

  const post = content.notes.posts.find((p) => p.slug === slug)
  const [copied, setCopied] = useState(false)

  const text = post ? t(post.content) : ""

  const headings = useMemo(() => {
    const lines = text.split("\n")
    const used = new Map<string, number>()
    const items: Array<{ title: string; id: string; line: number }> = []
    const ids: Record<number, string> = {}

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (!line.startsWith("## ")) continue
      const title = line.slice(3).trim()
      const base = slugify(title) || `section-${i}`
      const count = (used.get(base) ?? 0) + 1
      used.set(base, count)
      const id = count > 1 ? `${base}-${count}` : base
      items.push({ title, id, line: i })
      ids[i] = id
    }

    return { items, ids }
  }, [text])

  const estimateReadMinutes = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(words / 200))
  }, [text])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  if (!post) {
    return (
      <>
        <AnimatedBackground />
        <Header />
        <main className="pt-28 pb-20">
          <div className="mx-auto max-w-4xl px-4 lg:px-6 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {t({ es: "Nota no encontrada", en: "Note not found" })}
            </h1>
            <Button variant="outline" asChild>
              <Link href="/notes">
                <ArrowLeft className="size-3.5" />
                {t({ es: "Volver a notas", en: "Back to notes" })}
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <AnimatedBackground />
      <Header />
      <main className="pt-28 pb-20">
        <article className="mx-auto max-w-6xl px-4 lg:px-6">
          <Reveal>
            <div className="flex flex-col gap-6 mb-10">
              <Button variant="ghost" size="sm" asChild className="w-fit">
                <Link href="/notes">
                  <ArrowLeft className="size-3.5" />
                  {t({ es: "Volver a notas", en: "Back to notes" })}
                </Link>
              </Button>

              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="size-3.5" />
                  {post.date}
                </span>
                <Badge variant="secondary" className="text-xs font-normal">
                  <Tag className="size-3" />
                  {t(post.category)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {estimateReadMinutes} {t({ es: "min lectura", en: "min read" })}
                </span>

                <div className="ml-auto flex items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={copyLink}>
                    {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                    {copied ? t({ es: "Copiado", en: "Copied" }) : t({ es: "Copiar enlace", en: "Copy link" })}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div className="glass-card min-w-0 rounded-xl p-8 lg:p-10">
                <MarkdownContent text={text} headingIds={headings.ids} />
              </div>

              <div className="hidden lg:block">
                <div className="glass-card sticky top-28 rounded-xl p-6">
                  <div className="flex flex-col gap-4">
                    <div className="text-sm font-semibold text-card-foreground">
                      {t({ es: "En esta nota", en: "On this note" })}
                    </div>
                    {headings.items.length ? (
                      <nav className="flex flex-col gap-2">
                        {headings.items.map((h) => (
                          <a
                            key={h.id}
                            href={`#${h.id}`}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {h.title}
                          </a>
                        ))}
                      </nav>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        {t({ es: "Sin secciones.", en: "No sections." })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  )
}
