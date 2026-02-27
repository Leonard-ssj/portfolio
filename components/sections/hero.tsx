"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Download, Github, Linkedin, Instagram, Music2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/section"
import { useLang } from "@/context/lang-context"
import { siteConfig, content } from "@/content/content"

const roleVariants = {
  es: [
    "Construyendo soluciones con impacto",
    "Aprendiendo y creando cada dia",
    "Impulsando mejora continua",
    "Calidad y colaboracion primero",
  ],
  en: [
    "Building solutions with impact",
    "Learning and creating every day",
    "Driving continuous improvement",
    "Quality and collaboration first",
  ],
}

function TypewriterRole() {
  const { lang } = useLang()
  const [text, setText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  const roles = roleVariants[lang]

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && text === currentRole) {
      // Pause at full text
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && text === "") {
      // Move to next role
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        setText(currentRole.slice(0, text.length - 1))
      }, 30)
    } else {
      timeout = setTimeout(() => {
        setText(currentRole.slice(0, text.length + 1))
      }, 60)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, roleIndex, roles])

  // Reset when language changes
  useEffect(() => {
    setText("")
    setRoleIndex(0)
    setIsDeleting(false)
  }, [lang])

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative inline-block min-h-[2rem]">
      <p className="text-lg font-medium text-primary sm:text-xl">
        {text}
        <span
          className={`inline-block w-[2px] h-5 bg-primary ml-0.5 align-middle transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`}
        />
      </p>
    </div>
  )
}

function AnimatedName() {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const spans = el.querySelectorAll<HTMLSpanElement>(".letter")
    spans.forEach((span, i) => {
      span.style.opacity = "0"
      span.style.transform = "translateY(20px)"
      span.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`
    })
    requestAnimationFrame(() => {
      spans.forEach((span) => {
        span.style.opacity = "1"
        span.style.transform = "translateY(0)"
      })
    })
  }, [])

  return (
    <h1 ref={containerRef} className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
      {siteConfig.name.split("").map((char, i) => (
        <span key={i} className="letter inline-block" style={{ opacity: 0 }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  )
}

export function HeroSection() {
  const { t } = useLang()

  return (
    <Section id="hero" className="pt-28 lg:pt-36">
      <div className="flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative size-28 overflow-hidden rounded-full border-2 border-primary/30 lg:size-32 shadow-lg shadow-primary/10">
            <Image
              src={siteConfig.avatar}
              alt={`${siteConfig.name} avatar`}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <AnimatedName />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <TypewriterRole />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg"
          >
            {t(content.hero.subtitle)}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild>
            <a href={siteConfig.cv} download>
              <Download className="size-4" />
              {t(content.hero.buttons.downloadCv)}
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="size-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="size-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram className="size-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <Music2 className="size-5" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {t(content.hero.chips).map((chip) => (
            <Badge key={chip} variant="secondary" className="font-normal">
              {chip}
            </Badge>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
