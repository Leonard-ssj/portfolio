"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { content } from "@/content/content"

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName.toLowerCase()
  if (tag === "input" || tag === "textarea" || tag === "select") return true
  if (target.isContentEditable) return true
  return false
}

function scrollToAnchor(anchor: string) {
  const el = document.getElementById(anchor)
  if (!el) return false
  const y = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" })
  history.pushState(null, "", `#${anchor}`)
  return true
}

export function ScrollNavigation() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const programmaticRef = useRef(false)

  useEffect(() => {
    if (!isHome) return

    const anchors = content.navAnchors

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isHome) return
      if (isTypingTarget(e.target)) return

      const key = e.key
      const forward = key === " " || key === "PageDown" || key === "ArrowDown"
      const backward = key === "PageUp" || key === "ArrowUp"
      if (!forward && !backward) return

      e.preventDefault()

      const visibleIdx = (() => {
        let bestIdx = 0
        let bestDist = Number.POSITIVE_INFINITY
        for (let i = 0; i < anchors.length; i++) {
          const el = document.getElementById(anchors[i])
          if (!el) continue
          const dist = Math.abs(el.getBoundingClientRect().top - 80)
          if (dist < bestDist) {
            bestDist = dist
            bestIdx = i
          }
        }
        return bestIdx
      })()

      const nextIdx = forward
        ? Math.min(anchors.length - 1, visibleIdx + 1)
        : Math.max(0, visibleIdx - 1)

      programmaticRef.current = true
      scrollToAnchor(anchors[nextIdx])
      window.setTimeout(() => {
        programmaticRef.current = false
      }, 450)
    }

    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (!hash) return
      programmaticRef.current = true
      scrollToAnchor(hash)
      window.setTimeout(() => {
        programmaticRef.current = false
      }, 450)
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("hashchange", onHashChange)

    if (window.location.hash) onHashChange()

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [isHome])

  return null
}
