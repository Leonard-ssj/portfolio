"use client"

import { useEffect, useRef } from "react"

type CursorState = "default" | "hover" | "down"

const INTERACTIVE_SELECTOR =
  'a,button,input,textarea,select,[role="button"],[data-cursor="hover"]'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function getIsEnabled() {
  if (typeof window === "undefined") return false
  const coarse = window.matchMedia?.("(pointer: coarse)").matches ?? false
  const fine = window.matchMedia?.("(pointer: fine)").matches ?? false
  const wide = window.innerWidth >= 768
  return fine && !coarse && wide
}

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)

  const enabledRef = useRef(false)
  const visibleRef = useRef(false)
  const hoveringRef = useRef(false)
  const downRef = useRef(false)

  const targetXRef = useRef(0)
  const targetYRef = useRef(0)
  const ringXRef = useRef(0)
  const ringYRef = useRef(0)
  const dotXRef = useRef(0)
  const dotYRef = useRef(0)

  const rafRef = useRef<number | null>(null)
  const stateRef = useRef<CursorState>("default")

  useEffect(() => {
    const root = rootRef.current
    const ring = ringRef.current
    const dot = dotRef.current
    if (!root || !ring || !dot) return

    const setVisible = (next: boolean) => {
      if (visibleRef.current === next) return
      visibleRef.current = next
      root.dataset.visible = next ? "true" : "false"
    }

    const setState = (next: CursorState) => {
      if (stateRef.current === next) return
      stateRef.current = next
      root.dataset.state = next
    }

    const syncState = () => {
      if (downRef.current) return setState("down")
      if (hoveringRef.current) return setState("hover")
      return setState("default")
    }

    const disable = () => {
      enabledRef.current = false
      setVisible(false)
      document.documentElement.classList.remove("has-custom-cursor")
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    const enable = () => {
      enabledRef.current = true
      document.documentElement.classList.add("has-custom-cursor")
      setState("default")
      setVisible(false)
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      targetXRef.current = cx
      targetYRef.current = cy
      ringXRef.current = cx
      ringYRef.current = cy
      dotXRef.current = cx
      dotYRef.current = cy
      ring.style.left = `${cx}px`
      ring.style.top = `${cy}px`
      dot.style.left = `${cx}px`
      dot.style.top = `${cy}px`
      loop()
    }

    const evaluate = () => {
      const next = getIsEnabled()
      if (next && !enabledRef.current) enable()
      if (!next && enabledRef.current) disable()
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!enabledRef.current) return
      targetXRef.current = e.clientX
      targetYRef.current = e.clientY
      if (!visibleRef.current) setVisible(true)
    }

    const isInteractive = (el: EventTarget | null) => {
      if (!(el instanceof Element)) return false
      const interactive = el.closest(INTERACTIVE_SELECTOR)
      if (!interactive) return false
      if (interactive instanceof HTMLButtonElement && interactive.disabled) return false
      if (interactive instanceof HTMLInputElement && interactive.disabled) return false
      if (interactive instanceof HTMLTextAreaElement && interactive.disabled) return false
      if (interactive instanceof HTMLSelectElement && interactive.disabled) return false
      return true
    }

    const onPointerOver = (e: PointerEvent) => {
      if (!enabledRef.current) return
      hoveringRef.current = isInteractive(e.target)
      syncState()
    }

    const onPointerOut = (e: PointerEvent) => {
      if (!enabledRef.current) return
      hoveringRef.current = isInteractive(e.relatedTarget)
      syncState()
    }

    const onPointerDown = () => {
      if (!enabledRef.current) return
      downRef.current = true
      syncState()
    }

    const onPointerUp = () => {
      if (!enabledRef.current) return
      downRef.current = false
      syncState()
    }

    const onMouseLeave = () => {
      if (!enabledRef.current) return
      setVisible(false)
    }

    const loop = () => {
      if (!enabledRef.current) return

      ringXRef.current = lerp(ringXRef.current, targetXRef.current, 0.14)
      ringYRef.current = lerp(ringYRef.current, targetYRef.current, 0.14)
      dotXRef.current = lerp(dotXRef.current, targetXRef.current, 0.35)
      dotYRef.current = lerp(dotYRef.current, targetYRef.current, 0.35)

      ring.style.left = `${ringXRef.current}px`
      ring.style.top = `${ringYRef.current}px`
      dot.style.left = `${dotXRef.current}px`
      dot.style.top = `${dotYRef.current}px`

      rafRef.current = requestAnimationFrame(loop)
    }

    evaluate()

    window.addEventListener("resize", evaluate)
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("pointerover", onPointerOver, { passive: true })
    window.addEventListener("pointerout", onPointerOut, { passive: true })
    window.addEventListener("pointerdown", onPointerDown, { passive: true })
    window.addEventListener("pointerup", onPointerUp, { passive: true })
    window.addEventListener("mouseleave", onMouseLeave)

    const fineMedia = window.matchMedia?.("(pointer: fine)")
    const coarseMedia = window.matchMedia?.("(pointer: coarse)")
    fineMedia?.addEventListener?.("change", evaluate)
    coarseMedia?.addEventListener?.("change", evaluate)

    return () => {
      disable()
      window.removeEventListener("resize", evaluate)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("pointerover", onPointerOver)
      window.removeEventListener("pointerout", onPointerOut)
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointerup", onPointerUp)
      window.removeEventListener("mouseleave", onMouseLeave)
      fineMedia?.removeEventListener?.("change", evaluate)
      coarseMedia?.removeEventListener?.("change", evaluate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={rootRef}
      className="custom-cursor"
      data-state="default"
      data-visible="false"
      aria-hidden="true"
    >
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}

