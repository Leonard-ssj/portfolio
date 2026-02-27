"use client"

import { cn } from "@/lib/utils"
import { useRef, useEffect, useState, type ReactNode } from "react"

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 lg:py-28", className)}
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-6">
        {children}
      </div>
    </section>
  )
}

export function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <h2
      ref={ref}
      className={cn(
        "text-3xl font-bold tracking-tight lg:text-4xl text-balance transition-all duration-700",
        isVisible
          ? "opacity-100 translate-y-0 text-foreground"
          : "opacity-0 translate-y-4 text-muted-foreground",
        className
      )}
    >
      <span className={cn(
        "inline-block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text transition-colors duration-1000",
        isVisible ? "text-transparent" : ""
      )}>
        {children}
      </span>
    </h2>
  )
}
