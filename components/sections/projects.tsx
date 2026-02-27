"use client"

import { ExternalLink, Github, Code2, Server, Layout, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Section, SectionTitle } from "@/components/section"
import { Reveal, StaggerContainer, StaggerItem } from "@/components/reveal"
import { useLang } from "@/context/lang-context"
import { content } from "@/content/content"

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "API / Backend": Server,
  "Backend": Code2,
  "Frontend": Layout,
  "Fullstack / SaaS": Layers,
}

export function ProjectsSection() {
  const { t } = useLang()
  const items = t(content.projects.items) as Array<{
    title: string
    type: string
    status?: string
    stack: string[]
    bullets: string[]
    links?: Array<{ label: string; href: string }>
  }>

  return (
    <Section id="projects">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionTitle>{t(content.projects.title)}</SectionTitle>
        </Reveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center" staggerDelay={0.12}>
          {items.map((project, i) => {
            const Icon = typeIcons[project.type] || Code2
            return (
              <StaggerItem key={i} className="h-full w-full">
                <div className="group relative h-full w-full max-w-[380px]">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-primary/15 via-transparent to-primary/15 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="glass-card relative flex h-full flex-col rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5">
                  <div className="mb-4 h-px w-full overflow-hidden rounded-full bg-border/60">
                    <div className="h-full w-full animate-shimmer opacity-20" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-sm text-card-foreground leading-tight">{project.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{project.type}</span>
                        {project.status && (
                          <Badge variant="secondary" className="text-[10px] font-normal">
                            {project.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs font-normal">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <ul className="flex-1 flex flex-col gap-1.5 mb-5">
                    {project.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 mt-auto">
                    {project.links?.length ? (
                      project.links.map((link) => {
                        const LinkIcon = link.href.includes("github.com") ? Github : ExternalLink
                        return (
                          <Button key={link.href} variant="outline" size="sm" asChild>
                            <a href={link.href} target="_blank" rel="noopener noreferrer">
                              <LinkIcon className="size-3.5" />
                              {link.label}
                            </a>
                          </Button>
                        )
                      })
                    ) : (
                      <span className="text-xs text-muted-foreground italic">
                        {t({ es: "Sin repositorio publico por ahora", en: "No public repository yet" })}
                      </span>
                    )}
                  </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </Section>
  )
}
