"use client"

import { useRef, useState, useEffect, useCallback, type ComponentType } from "react"
import {
  Atom,
  BookOpen,
  Braces,
  ChevronLeft,
  ChevronRight,
  FileText, PenTool, Layers, Server, Database,
  Cloud, Wrench, RotateCw, Puzzle, Users,
  GitBranch,
  Hexagon,
  Kanban,
  Lightbulb,
  ListChecks,
  MessageSquare,
  Package,
  Pause,
  Play,
  Search,
  Send,
  Ticket,
  Wind,
  Workflow,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"
import { Section, SectionTitle } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLang } from "@/context/lang-context"
import { content } from "@/content/content"

const categoryIcons = [
  FileText, PenTool, Layers, Server, Database,
  Cloud, Wrench, RotateCw, Puzzle, Users
]

type IconComp = ComponentType<{ className?: string }>

const itemIconMap: Record<string, IconComp> = {
  React: Atom,
  "Next.js": Layers,
  TypeScript: Braces,
  "Tailwind CSS": Wind,
  "Node.js": Hexagon,
  SQL: Database,
  MySQL: Database,
  "PostgreSQL (basico)": Database,
  "PostgreSQL (basic)": Database,
  Redis: Database,
  Git: GitBranch,
  "Docker (basico)": Package,
  "Docker (basic)": Package,
  "Google Cloud (apoyo)": Cloud,
  "Google Cloud (support)": Cloud,
  "GitHub Actions/Workflows": Workflow,
  "Jenkins (apoyo)": Wrench,
  "Jenkins (support)": Wrench,
  Jira: Ticket,
  Confluence: BookOpen,
  Postman: Send,
  Scrum: Kanban,
  Comunicacion: MessageSquare,
  Communication: MessageSquare,
  "Documentacion clara": FileText,
  "Clear documentation": FileText,
  "Pensamiento analitico": Lightbulb,
  "Analytical thinking": Lightbulb,
  Organizacion: ListChecks,
  Organization: ListChecks,
  Proactividad: Zap,
  Proactivity: Zap,
  "Trabajo en equipo": Users,
  Teamwork: Users,
  "Atencion al detalle": Search,
  "Attention to detail": Search,
}

export function SkillsSection() {
  const { t } = useLang()
  const categories = t(content.skills.categories)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const animationRef = useRef<number | null>(null)
  const scrollPosRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const [itemStride, setItemStride] = useState(296)

  // Duplicate items for infinite scroll effect
  const duplicatedCategories = [...categories, ...categories]

  const scrollSpeed = 0.5

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const first = container.querySelector<HTMLElement>("[data-skill-card]")
    if (!first) return
    const styles = window.getComputedStyle(container)
    const gap = parseFloat(styles.columnGap || styles.gap || "0")
    const width = first.getBoundingClientRect().width
    const stride = Math.max(1, Math.round(width + gap))
    setItemStride(stride)
  }, [categories.length])

  const updateActiveIndex = useCallback(
    (scrollLeft: number) => {
      if (categories.length === 0) return
      const idx = Math.round(scrollLeft / itemStride) % categories.length
      if (idx !== activeIndexRef.current) {
        activeIndexRef.current = idx
        setActiveIndex(idx)
      }
    },
    [categories.length, itemStride]
  )

  const animate = useCallback(() => {
    const container = scrollRef.current
    if (!container) return

    if (!isPaused && !isHovered) {
      scrollPosRef.current += scrollSpeed
      // Reset when we've scrolled past the first set
      const halfScroll = container.scrollWidth / 2
      if (scrollPosRef.current >= halfScroll) {
        scrollPosRef.current = 0
      }
      container.scrollLeft = scrollPosRef.current
      updateActiveIndex(scrollPosRef.current)
    }
    animationRef.current = requestAnimationFrame(animate)
  }, [isPaused, isHovered, updateActiveIndex])

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [animate])

  const scrollBy = (direction: "left" | "right") => {
    const container = scrollRef.current
    if (!container) return
    const amount = itemStride
    if (direction === "left") {
      scrollPosRef.current = Math.max(0, scrollPosRef.current - amount)
    } else {
      scrollPosRef.current += amount
    }
    setIsPaused(true)
    container.scrollTo({ left: scrollPosRef.current, behavior: "smooth" })
  }

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current
    if (!container) return
    scrollPosRef.current = index * itemStride
    setIsPaused(true)
    container.scrollTo({ left: scrollPosRef.current, behavior: "smooth" })
    updateActiveIndex(scrollPosRef.current)
  }

  return (
    <Section id="skills">
      <div className="flex flex-col gap-10">
        <Reveal>
          <div className="flex items-center justify-between gap-4">
            <SectionTitle>{t(content.skills.title)}</SectionTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => scrollBy("left")}
                aria-label="Scroll left"
                className="hidden sm:flex"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? "Play" : "Pause"}
              >
                {isPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => scrollBy("right")}
                aria-label="Scroll right"
                className="hidden sm:flex"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </Reveal>

        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent" />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-hidden py-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onScroll={(e) => {
              const left = (e.currentTarget as HTMLDivElement).scrollLeft
              scrollPosRef.current = left
              updateActiveIndex(left)
            }}
          >
            {duplicatedCategories.map((cat, i) => {
              const Icon = categoryIcons[(i % categories.length) % categoryIcons.length]
              return (
                <motion.div
                  key={`${cat.name}-${i}`}
                  className="flex-shrink-0 w-[280px]"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    data-skill-card
                    className="glass-card group flex flex-col gap-3 rounded-xl p-5 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <Icon className="size-4" />
                      </div>
                      <h3 className="text-sm font-semibold text-card-foreground">{cat.name}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => {
                        const ItemIcon = itemIconMap[item]
                        return (
                          <Badge
                            key={item}
                            variant="secondary"
                            className="gap-1 text-xs font-normal transition-colors hover:bg-primary/10 hover:text-primary"
                          >
                            {ItemIcon && <ItemIcon className="size-3" />}
                            {item}
                          </Badge>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Progress indicator dots */}
        <div className="flex justify-center gap-1.5">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              type="button"
              className={`size-1.5 rounded-full transition-colors ${i === activeIndex ? "bg-primary" : "bg-primary/20"}`}
              aria-label={`Go to ${cat.name}`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
