"use client"

import { Briefcase, MapPin, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Section, SectionTitle } from "@/components/section"
import { Reveal, StaggerContainer, StaggerItem } from "@/components/reveal"
import { useLang } from "@/context/lang-context"
import { content } from "@/content/content"

export function ExperienceSection() {
  const { t } = useLang()
  const items = t(content.experience.items)

  return (
    <Section id="experience">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionTitle>{t(content.experience.title)}</SectionTitle>
        </Reveal>

        <StaggerContainer className="relative flex flex-col gap-8" staggerDelay={0.15}>
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border hidden sm:block" aria-hidden="true" />

          {items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="flex gap-6">
                {/* Timeline dot */}
                <div className="hidden sm:flex flex-col items-center pt-1.5">
                  <motion.div
                    className={`size-[10px] rounded-full ring-4 ring-background ${item.current ? "bg-primary" : "bg-muted-foreground/40"}`}
                    animate={item.current ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={item.current ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : undefined}
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                  className="glass-card flex-1 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex flex-col gap-4">
                    <div className="h-px w-full overflow-hidden rounded-full bg-border/60">
                      <div className="h-full w-full animate-shimmer opacity-20" />
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-card-foreground">{item.role}</h3>
                          {item.current && (
                            <Badge variant="default" className="text-xs">
                              {t({ es: "Actual", en: "Current" })}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase className="size-3.5" />
                            {item.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3.5" />
                            {item.location}
                          </span>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
                        <Calendar className="size-3.5" />
                        {item.period}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-2">
                      {item.bullets.map((bullet, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  )
}
