"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileDown, Moon, Sun } from "lucide-react"
import { ProfileSlide } from "@/diapositiva presentacion/ProfileSlide"

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export default function DiapositivaPage() {
  const shellRef = useRef<HTMLDivElement | null>(null)
  const exportRef = useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = useState(1)
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme, setTheme } = useTheme()
  const currentTheme = mounted ? (resolvedTheme ?? theme ?? "dark") : "dark"
  const slideTheme = currentTheme === "light" ? "light" : "dark"

  useEffect(() => {
    const el = shellRef.current
    if (!el) return

    const compute = () => {
      const padding = 40
      const toolbar = 64
      const maxW = window.innerWidth - padding * 2
      const maxH = window.innerHeight - padding * 2 - toolbar
      const next = Math.min(maxW / 1280, maxH / 720, 1)
      setScale(clamp(next, 0.2, 1))
    }

    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const pxToIn = (px: number, totalPx: number, totalIn: number) => (px / totalPx) * totalIn

  const downloadPptx = async () => {
    const { default: PptxGenJS } = await import("pptxgenjs")
    const { toPng } = await import("html-to-image")

    const node = exportRef.current
    if (!node) return

    if ("fonts" in document) {
      const fonts = (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts
      await fonts.ready
    }

    const png = await toPng(node, {
      cacheBust: true,
      width: 1280,
      height: 720,
      pixelRatio: 2,
      backgroundColor: slideTheme === "light" ? "#F8FAFC" : "#02070A",
    })

    const pptx = new PptxGenJS()
    pptx.layout = "LAYOUT_WIDE"
    pptx.author = "Leonardo Alonso Aldana"
    pptx.company = "Portfolio"

    const slide = pptx.addSlide()
    const slideW = 13.333
    const slideH = 7.5
    slide.addImage({ data: png, x: 0, y: 0, w: slideW, h: slideH })

    const base = node.getBoundingClientRect()
    const addLinkOverlay = (key: string, url: string) => {
      const el = node.querySelector(`[data-export-link="${key}"]`) as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      const xPx = r.left - base.left
      const yPx = r.top - base.top
      const wPx = r.width
      const hPx = r.height

      const x = pxToIn(xPx, base.width, slideW)
      const y = pxToIn(yPx, base.height, slideH)
      const w = pxToIn(wPx, base.width, slideW)
      const h = pxToIn(hPx, base.height, slideH)

      slide.addShape(pptx.ShapeType.rect, {
        x,
        y,
        w,
        h,
        fill: { color: "FFFFFF", transparency: 100 },
        line: { color: "FFFFFF", transparency: 100 },
        hyperlink: { url },
      })
    }

    addLinkOverlay("linkedin", "https://linkedin.com/in/leonardoalonsoaldana")
    addLinkOverlay("github", "https://github.com/Leonard-ssj")
    addLinkOverlay("portfolio", "https://leonardo-aldana.vercel.app")

    await pptx.writeFile({ fileName: "SemilleroTecnologico-Leonardo-Alonso-Aldana.pptx" })
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_15%,color-mix(in_oklch,var(--primary)_16%,transparent)_0%,transparent_55%),radial-gradient(circle_at_70%_70%,color-mix(in_oklch,var(--primary)_14%,transparent)_0%,transparent_60%)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] items-center justify-center px-4 py-10">
        <div className="fixed left-4 top-4 z-50">
          <Button asChild variant="outline" size="sm">
            <Link href="/" aria-label="Volver al inicio">
              <ArrowLeft className="size-4" />
              Inicio
            </Link>
          </Button>
        </div>
        <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
          {mounted && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              aria-label="Cambiar tema"
            >
              {currentTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              Tema
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={downloadPptx}>
            <FileDown className="size-4" />
            Descargar PPTX
          </Button>
        </div>

        <div ref={shellRef} className="relative">
          <div
            className="origin-top-left"
            style={{
              width: 1280,
              height: 720,
              transform: `scale(${scale})`,
            }}
          >
            <ProfileSlide theme={slideTheme} />
          </div>
        </div>

        <div className="fixed left-0 top-0 h-[720px] w-[1280px] [transform:translateX(-160vw)]">
          <div ref={exportRef} className="h-[720px] w-[1280px]">
            <ProfileSlide mode="export" theme={slideTheme} />
          </div>
        </div>
      </div>
    </div>
  )
}
