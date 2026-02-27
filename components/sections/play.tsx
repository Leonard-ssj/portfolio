"use client"

import { Gamepad2 } from "lucide-react"
import { motion } from "framer-motion"
import { Section, SectionTitle } from "@/components/section"
import { Reveal } from "@/components/reveal"
import { MiniGame } from "@/components/mini-game"
import { useLang } from "@/context/lang-context"

export function PlaySection() {
  const { t } = useLang()

  return (
    <Section id="play">
      <div className="flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-3">
            <SectionTitle>{t({ es: "Mini juego", en: "Mini Game" })}</SectionTitle>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {t({
                es: "Un detalle interactivo para cerrar con energia. Si te divierte, imagina lo que puedo construir con el contexto correcto.",
                en: "A small interactive touch to end with energy. If this is fun, imagine what I can build with the right context.",
              })}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl">
              <motion.div
                aria-hidden="true"
                className="absolute -inset-6 rounded-2xl bg-gradient-to-tr from-primary/20 via-transparent to-primary/20 blur-2xl"
                animate={{ opacity: [0.65, 0.95, 0.65] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative">
                <div className="mb-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Gamepad2 className="size-4 text-primary" />
                  <span>{t({ es: "Tip: Space/↓ para moverte por secciones", en: "Tip: Space/↓ to move sections" })}</span>
                </div>
                <MiniGame />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

