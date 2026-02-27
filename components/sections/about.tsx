"use client"

import { Search, Layers, Users } from "lucide-react"
import { Section, SectionTitle } from "@/components/section"
import { Reveal, StaggerContainer, StaggerItem } from "@/components/reveal"
import { useLang } from "@/context/lang-context"
import { content } from "@/content/content"

const icons = [Search, Layers, Users]

export function AboutSection() {
  const { t } = useLang()
  const cards = t(content.about.cards)

  return (
    <Section id="about">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionTitle>{t(content.about.title)}</SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              {t(content.about.text)}
            </p>
            <div className="mt-5 h-px w-48 overflow-hidden rounded-full bg-border/60">
              <div className="h-full w-full animate-shimmer opacity-25" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <h3 className="text-lg font-semibold text-foreground">
            {t(content.about.frameworkTitle)}
          </h3>
        </Reveal>
        <StaggerContainer className="grid gap-4 sm:grid-cols-3" staggerDelay={0.15}>
          {cards.map((card, i) => {
            const Icon = icons[i]
            return (
              <StaggerItem key={card.title} className="h-full">
                <div className="glass-card group flex h-full flex-col gap-3 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-semibold text-card-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </Section>
  )
}
