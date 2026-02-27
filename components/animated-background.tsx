"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  hue: number
}

interface FloatingOrb {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  hue: number
  opacity: number
  phase: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    // Floating particles
    const particles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      hue: 175 + Math.random() * 20,
    }))

    // Larger floating orbs with glow
    const orbs: FloatingOrb[] = Array.from({ length: 5 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 120 + 60,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      hue: 170 + Math.random() * 30,
      opacity: Math.random() * 0.06 + 0.02,
      phase: Math.random() * Math.PI * 2,
    }))

    // Connection distance
    const maxDist = 150

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.08
            ctx!.beginPath()
            ctx!.strokeStyle = `oklch(0.65 0.17 175 / ${alpha})`
            ctx!.lineWidth = 0.5
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }
    }

    let time = 0

    function animate() {
      time += 0.005
      ctx!.clearRect(0, 0, width, height)

      // Draw orbs with pulsing glow
      for (const orb of orbs) {
        const pulse = Math.sin(time * 2 + orb.phase) * 0.3 + 1
        const gradient = ctx!.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.radius * pulse
        )
        gradient.addColorStop(0, `oklch(0.65 0.17 ${orb.hue} / ${orb.opacity * 1.5})`)
        gradient.addColorStop(0.5, `oklch(0.65 0.17 ${orb.hue} / ${orb.opacity * 0.5})`)
        gradient.addColorStop(1, `oklch(0.65 0.17 ${orb.hue} / 0)`)
        ctx!.beginPath()
        ctx!.fillStyle = gradient
        ctx!.arc(orb.x, orb.y, orb.radius * pulse, 0, Math.PI * 2)
        ctx!.fill()

        orb.x += orb.speedX + Math.sin(time + orb.phase) * 0.2
        orb.y += orb.speedY + Math.cos(time + orb.phase) * 0.2

        if (orb.x < -orb.radius) orb.x = width + orb.radius
        if (orb.x > width + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = height + orb.radius
        if (orb.y > height + orb.radius) orb.y = -orb.radius
      }

      // Draw connections
      drawConnections()

      // Draw particles
      for (const p of particles) {
        const pulse = Math.sin(time * 3 + p.x * 0.01) * 0.3 + 1
        ctx!.beginPath()
        ctx!.fillStyle = `oklch(0.65 0.17 ${p.hue} / ${p.opacity * pulse})`
        ctx!.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2)
        ctx!.fill()

        p.x += p.speedX
        p.y += p.speedY

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden="true"
      />
      {/* Keep original gradient blobs behind canvas for depth */}
      <div className="fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-10%] h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px] animate-blob-delay-2" />
        <div className="absolute bottom-[-10%] left-[30%] h-[450px] w-[450px] rounded-full bg-primary/6 blur-[110px] animate-blob-delay-4" />
      </div>
    </>
  )
}
