"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, RotateCw, Target, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLang } from "@/context/lang-context"

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export function MiniGame() {
  const { t } = useLang()
  const [playing, setPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(20)
  const [duration, setDuration] = useState(20)
  const [intervalMs, setIntervalMs] = useState(650)
  const [active, setActive] = useState(0)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(0)
  const [streak, setStreak] = useState(0)
  const [missPulse, setMissPulse] = useState(0)
  const [celebrate, setCelebrate] = useState(false)
  const [difficulty, setDifficulty] = useState<"relax" | "normal" | "hard">("normal")
  const rafRef = useRef<number | null>(null)
  const tickRef = useRef<number | null>(null)

  const grid = useMemo(() => Array.from({ length: 9 }, (_, i) => i), [])
  const multiplier = useMemo(() => 1 + Math.floor(streak / 5), [streak])

  useEffect(() => {
    try {
      const raw = localStorage.getItem("miniGameBest")
      const parsed = raw ? Number(raw) : 0
      if (Number.isFinite(parsed)) setBest(clamp(parsed, 0, 9999))
    } catch {
      setBest(0)
    }
  }, [])

  useEffect(() => {
    if (!playing) return

    const start = performance.now()
    const durationMs = duration * 1000

    const pickNext = () => {
      setActive((prev) => {
        let next = Math.floor(Math.random() * 9)
        if (next === prev) next = (next + 1) % 9
        return next
      })
    }

    pickNext()
    tickRef.current = window.setInterval(pickNext, intervalMs)

    const loop = (now: number) => {
      const elapsed = now - start
      const remaining = Math.max(0, durationMs - elapsed)
      setTimeLeft(Math.ceil(remaining / 1000))
      if (remaining <= 0) {
        setPlaying(false)
        return
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      tickRef.current = null
      rafRef.current = null
    }
  }, [playing, duration, intervalMs])

  useEffect(() => {
    if (playing) return
    if (score === 0) return
    setBest((prev) => {
      const next = Math.max(prev, score)
      if (next > prev) setCelebrate(true)
      try {
        localStorage.setItem("miniGameBest", String(next))
      } catch {
        void 0
      }
      return next
    })
  }, [playing, score])

  useEffect(() => {
    if (!celebrate) return
    const tId = window.setTimeout(() => setCelebrate(false), 1200)
    return () => window.clearTimeout(tId)
  }, [celebrate])

  useEffect(() => {
    if (difficulty === "relax") {
      setDuration(25)
      setIntervalMs(780)
      return
    }
    if (difficulty === "hard") {
      setDuration(18)
      setIntervalMs(480)
      return
    }
    setDuration(20)
    setIntervalMs(650)
  }, [difficulty])

  const startGame = () => {
    setScore(0)
    setStreak(0)
    setMissPulse(0)
    setTimeLeft(duration)
    setPlaying(true)
  }

  const reset = () => {
    setPlaying(false)
    setScore(0)
    setStreak(0)
    setMissPulse(0)
    setTimeLeft(duration)
    setActive(0)
  }

  const tap = (idx: number) => {
    if (!playing) return
    if (idx === active) {
      setStreak((s) => s + 1)
      setScore((s) => s + multiplier)
      return
    }
    setStreak(0)
    setMissPulse((p) => p + 1)
  }

  return (
    <div className="glass-card relative overflow-hidden rounded-xl p-6">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-24 rounded-full bg-gradient-to-tr from-primary/12 via-transparent to-primary/12 blur-2xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-primary" />
          <div className="text-sm font-semibold text-card-foreground">
            {t({ es: "Mini juego", en: "Mini game" })}
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>
            {t({ es: "Tiempo", en: "Time" })}: {timeLeft}s
          </span>
          <span>
            {t({ es: "Score", en: "Score" })}: {score}
          </span>
          <span>
            {t({ es: "Best", en: "Best" })}: {best}
          </span>
        </div>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant={difficulty === "relax" ? "default" : "outline"}
            onClick={() => setDifficulty("relax")}
            disabled={playing}
          >
            {t({ es: "Relax", en: "Relax" })}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={difficulty === "normal" ? "default" : "outline"}
            onClick={() => setDifficulty("normal")}
            disabled={playing}
          >
            {t({ es: "Normal", en: "Normal" })}
          </Button>
          <Button
            type="button"
            size="sm"
            variant={difficulty === "hard" ? "default" : "outline"}
            onClick={() => setDifficulty("hard")}
            disabled={playing}
          >
            {t({ es: "Hard", en: "Hard" })}
          </Button>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Target className="size-3.5 text-primary" />
            x{multiplier}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="size-3.5 text-primary" />
            {streak}
          </span>
        </div>
      </div>

      <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
        {t({
          es: "Toca el nodo encendido. Racha = multiplicador. Si fallas, se reinicia la racha.",
          en: "Tap the lit node. Streak = multiplier. Misses reset your streak.",
        })}
      </p>

      <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-border/60">
        <motion.div
          className="h-full bg-primary/70"
          initial={false}
          animate={{ width: `${(timeLeft / Math.max(1, duration)) * 100}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <motion.div
        className="relative mt-5 grid grid-cols-3 gap-3"
        animate={missPulse ? { x: [0, -4, 4, -2, 2, 0] } : undefined}
        transition={{ duration: 0.28 }}
      >
        {grid.map((idx) => {
          const isOn = playing && idx === active
          return (
            <button
              key={idx}
              type="button"
              onClick={() => tap(idx)}
              className={`relative h-16 rounded-lg border transition-all ${
                isOn
                  ? "border-primary/50 bg-primary/10 shadow-lg shadow-primary/25"
                  : "border-border/60 bg-background/40 hover:bg-accent/40"
              }`}
              aria-label={t({ es: "Nodo", en: "Node" })}
            >
              <span className="absolute inset-0 rounded-lg opacity-0 transition-opacity group-hover:opacity-100" />
              <AnimatePresence>
                {isOn && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 rounded-lg"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(34,197,94,0.35)" }}
                  />
                )}
              </AnimatePresence>
              {isOn && (
                <motion.span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.8, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 0.55, ease: "easeInOut", repeat: Infinity }}
                />
              )}
            </button>
          )
        })}
      </motion.div>

      <div className="relative mt-5 flex flex-wrap items-center gap-2">
        <Button onClick={startGame} disabled={playing}>
          {t({ es: "Jugar", en: "Play" })}
        </Button>
        <Button variant="outline" onClick={reset}>
          <RotateCw className="size-4" />
          {t({ es: "Reiniciar", en: "Reset" })}
        </Button>
        {!playing && score > 0 && (
          <span className="text-xs text-muted-foreground">
            {t({ es: "Listo. Puedes intentarlo de nuevo.", en: "Done. Try again." })}
          </span>
        )}
      </div>

      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute inset-0"
          >
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute size-1.5 rounded-full bg-primary"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: `${(i * 13) % 100}%`,
                }}
                initial={{ opacity: 0, y: 8, scale: 0.8 }}
                animate={{ opacity: 0.9, y: -14, scale: 1.1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.015 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
