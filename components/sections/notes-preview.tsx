"use client"

import Link from "next/link"
import { ArrowRight, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Section, SectionTitle } from "@/components/section"
import { Reveal, StaggerContainer, StaggerItem } from "@/components/reveal"
import { useLang } from "@/context/lang-context"
import { content } from "@/content/content"

export function NotesPreviewSection() {
  const { t } = useLang()
  const highlights = (content.notesPreview as { highlights?: string[] }).highlights ?? [
    content.notesPreview.featured.slug,
  ]
  const posts = highlights
    .map((slug) => content.notes.posts.find((p) => p.slug === slug))
    .filter(Boolean) as Array<(typeof content.notes.posts)[number]>

  const estimateReadMinutes = (text: string) => {
    const words = text.trim().split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(words / 200))
  }

  return (
    <Section id="notes-preview">
      <div className="flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-3">
            <SectionTitle>{t(content.notesPreview.title)}</SectionTitle>
            {"subtitle" in content.notesPreview && (
              <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {t((content.notesPreview as { subtitle: { es: string; en: string } }).subtitle)}
              </p>
            )}
          </div>
        </Reveal>

        <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.08}>
          {posts.map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <Link
                href={`/notes/${post.slug}`}
                className="glass-card group block h-full min-h-[260px] rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
              >
                <div className="mb-4 h-px w-full overflow-hidden rounded-full bg-border/60">
                  <div className="h-full w-full animate-shimmer opacity-20" />
                </div>

                <div className="flex h-full flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3">
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

                  <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                    {t(post.title)}
                  </h3>
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
        </StaggerContainer>

        <Reveal delay={0.2}>
          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/notes">
                {t(content.notesPreview.cta)}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
