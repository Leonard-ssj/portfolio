"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Github,
  Linkedin,
  Globe,
  GraduationCap,
  Briefcase,
  Layers,
  Database,
  Cloud,
  Wrench,
  Code2,
  Coffee,
  Box,
  GitBranch,
  Ticket,
  BookOpen,
  Send,
  Activity,
  Settings,
} from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
}

export function ProfileSlide({
  mode = "preview",
  theme = "dark",
  variant = "single",
}: {
  mode?: "preview" | "export"
  theme?: "dark" | "light"
  variant?: "single" | "deck1" | "deck2" | "deck3"
}) {
  const instant = mode === "export"
  const isDark = theme !== "light"
  const ease = [0.16, 1, 0.3, 1] as const
  const entryTransition = instant ? { duration: 0 } : { duration: 0.55, ease }
  const entryTransitionDelayed = instant ? { duration: 0 } : { duration: 0.55, ease, delay: 0.06 }
  const entryTransitionDelayed2 = instant ? { duration: 0 } : { duration: 0.55, ease, delay: 0.12 }

  const frameClass = isDark ? "border-white/10 bg-[#02070A] shadow-black/40" : "border-black/10 bg-[#F8FAFC] shadow-black/10"
  const leftAsideClass = isDark ? "bg-[#07161A]/92 text-white" : "bg-white/80 text-slate-900"
  const cardClass = isDark ? "border-white/10 bg-white/5 text-white" : "border-black/10 bg-white/85 text-slate-900"
  const subtleText = isDark ? "text-white/70" : "text-slate-600"
  const softerText = isDark ? "text-white/60" : "text-slate-500"
  const microText = isDark ? "text-white/55" : "text-slate-500"
  const chipClass = isDark
    ? "bg-white/10 text-white hover:bg-white/15"
    : "bg-slate-900/5 text-slate-800 hover:bg-slate-900/10"
  const chipAccentClass = isDark
    ? "bg-[#22E6D2]/15 text-[#22E6D2] hover:bg-[#22E6D2]/20"
    : "bg-[#22E6D2]/20 text-[#0A5E57] hover:bg-[#22E6D2]/25"

  const techIcon = (name: string) => {
    const map: Record<string, React.ComponentType<{ className?: string }>> = {
      "Python (Flask)": Code2,
      "Java (Spring Boot)": Coffee,
      SQL: Database,
      MySQL: Database,
      PostgreSQL: Database,
      Redis: Database,
      "Google Cloud": Cloud,
      Docker: Box,
      "GitHub Actions": Activity,
      Jenkins: Settings,
      Git: GitBranch,
      Postman: Send,
      Jira: Ticket,
      Confluence: BookOpen,
    }
    return map[name] ?? Layers
  }

  const TechBadge = ({ name }: { name: string }) => {
    const Icon = techIcon(name)
    return (
      <Badge className={`${chipClass} text-[9.5px] font-normal px-2 py-0.5 gap-1`}>
        <Icon className="size-3.5 text-[#22E6D2]" />
        {name}
      </Badge>
    )
  }

  if (variant !== "single") {
    return (
      <div className={`relative h-[720px] w-[1280px] overflow-hidden rounded-2xl border shadow-2xl ${frameClass}`}>
        <div className="pointer-events-none absolute inset-0">
          {isDark ? (
            <>
              <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_25%,rgba(15,201,183,0.22)_0%,rgba(15,201,183,0.0)_55%),radial-gradient(circle_at_75%_70%,rgba(15,201,183,0.14)_0%,rgba(15,201,183,0.0)_55%)]" />
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.62)_100%)]" />
            </>
          ) : (
            <>
              <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_25%,rgba(15,201,183,0.20)_0%,rgba(15,201,183,0.0)_60%),radial-gradient(circle_at_75%_70%,rgba(15,201,183,0.12)_0%,rgba(15,201,183,0.0)_60%)]" />
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(2,6,23,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,6,23,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0)_55%,rgba(2,6,23,0.08)_100%)]" />
            </>
          )}
        </div>

        {variant === "deck1" ? (
          <div className="relative grid h-full grid-cols-[440px_1fr] gap-5 p-6">
            <motion.aside
              initial={instant ? "show" : "hidden"}
              animate="show"
              variants={fadeUp}
              transition={entryTransition}
              className={`flex h-full flex-col gap-4 rounded-2xl border p-4 shadow-sm ${
                isDark ? "border-white/10 bg-[#07161A]/92" : "border-black/10 bg-white/80"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className={`absolute -inset-3 rounded-full blur-lg ${isDark ? "bg-[#22E6D2]/12" : "bg-[#22E6D2]/18"}`} />
                  <div
                    className={`relative size-[136px] rounded-full p-[2px] shadow-[0_18px_36px_rgba(0,0,0,0.22)] ${
                      isDark
                        ? "bg-[conic-gradient(from_180deg,rgba(34,230,210,0.80),rgba(255,255,255,0.18),rgba(34,230,210,0.32),rgba(255,255,255,0.10),rgba(34,230,210,0.80))]"
                        : "bg-[conic-gradient(from_180deg,rgba(34,230,210,0.55),rgba(2,6,23,0.10),rgba(34,230,210,0.32),rgba(2,6,23,0.08),rgba(34,230,210,0.55))]"
                    }`}
                  >
                    <div
                      className={`relative h-full w-full overflow-hidden rounded-full ring-2 ${
                        isDark ? "ring-white/15 bg-[#07161A]" : "ring-black/10 bg-white"
                      }`}
                    >
                      <Image
                        src="/avatar.jpg"
                        alt="Leonardo Alonso Aldana"
                        fill
                        className="object-cover object-[center_14%] scale-110"
                        priority
                      />
                    </div>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className={`text-balance break-words text-[32px] font-semibold leading-[1.05] ${isDark ? "text-white" : "text-slate-900"}`}>
                    Leonardo Alonso Aldana
                  </div>
                  <div className={`mt-2 text-[12px] leading-snug ${subtleText}`}>
                    <div>Estudiante de Ingeniería en Sistemas Computacionales</div>
                    <div>Universidad Tecnológica de México (UNITEC)</div>
                  </div>
                  <div className={`mt-2 text-[12px] leading-snug ${softerText}`}>
                    Interesado en arquitectura de sistemas, desarrollo de software y tecnologías cloud.
                  </div>
                </div>
              </div>

              <Card className={`${cardClass} gap-2.5 p-4`}>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Layers className="size-4 text-[#22E6D2]" />
                  Resumen rápido
                </div>
                <div className="mt-1 flex flex-wrap gap-2">
                  <Badge className={`${chipClass} text-xs`}>CDMX</Badge>
                  <Badge className={`${chipClass} text-xs`}>Scrum</Badge>
                  <Badge className={`${chipClass} text-xs`}>Integración de APIs</Badge>
                  <Badge className={`${chipClass} text-xs`}>Google Cloud</Badge>
                </div>
                <div className={`mt-2 text-[12.5px] leading-relaxed ${subtleText}`}>
                  Me gusta entender el flujo de punta a punta, proponer soluciones claras y ejecutar con orden: desarrollo, validación y entrega con trazabilidad.
                </div>
              </Card>

              <Card className={`${cardClass} gap-2.5 p-4`}>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Briefcase className="size-4 text-[#22E6D2]" />
                  Fortalezas
                </div>
                <ul className={`mt-1 grid gap-1.5 text-[12.5px] ${isDark ? "text-white/75" : "text-slate-700"}`}>
                  {[
                    "Aprendizaje rápido y mentalidad de mejora continua",
                    "Atención al detalle y enfoque en calidad",
                    "Comunicación y colaboración en equipo",
                    "Documentación y orden para evitar retrabajo",
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#22E6D2]/80" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.aside>

            <motion.section
              initial={instant ? "show" : "hidden"}
              animate="show"
              variants={fadeUp}
              transition={entryTransitionDelayed}
              className="flex h-full flex-col gap-4"
            >
              <div>
                <div className={`text-[40px] font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>Presentación Personal</div>
              </div>

              <Card className={`${cardClass} gap-3 p-5`}>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <GraduationCap className="size-4 text-[#22E6D2]" />
                  Perfil
                </div>
                <p className={`mt-2 text-[15px] leading-relaxed ${subtleText}`}>
                  Soy estudiante de Ingeniería en Sistemas y actualmente apoyo en desarrollo y QA en entornos reales. Me gusta aprender rápido, cuidar la calidad y trabajar en equipo para entregar soluciones claras y confiables.
                </p>
                <div className={`text-[13px] leading-relaxed ${softerText}`}>
                  Busco crecer especialmente en arquitectura de sistemas, integración de servicios y buenas prácticas de ingeniería.
                </div>
              </Card>

              <Card className={`${cardClass} gap-3 p-5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Layers className="size-4 text-[#22E6D2]" />
                    Intereses
                  </div>
                  <div className={`text-xs ${microText}`}>Áreas</div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  <Badge className={`${chipAccentClass} text-sm gap-1`}>
                    <Layers className="size-3.5" />
                    Arquitectura de TI
                  </Badge>
                  <Badge className={`${chipClass} text-sm gap-1`}>
                    <Code2 className="size-3.5 text-[#22E6D2]" />
                    Desarrollo de Software
                  </Badge>
                  <Badge className={`${chipClass} text-sm gap-1`}>
                    <Cloud className="size-3.5 text-[#22E6D2]" />
                    Cloud Computing
                  </Badge>
                </div>
                <div className={`mt-3 text-[13px] leading-relaxed ${softerText}`}>
                  Me gusta entender cómo se conectan las piezas (front, back, datos y nube) para diseñar soluciones claras, seguras y mantenibles.
                </div>
              </Card>

              <Card className={`${cardClass} gap-3 p-5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Box className="size-4 text-[#22E6D2]" />
                    Proyectos destacados
                  </div>
                  <div className={`text-xs ${microText}`}>Selección</div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {[
                    {
                      title: "ProGest (Gestión de Proyectos)",
                      status: "En desarrollo",
                      stack: ["Flask", "React/Next.js", "Roles", "Multi-tenant"],
                    },
                    {
                      title: "Agenda360 (Gestión de Citas)",
                      status: "En construcción",
                      stack: ["Next.js", "JWT", "Cloud", "Calendario"],
                    },
                  ].map((p) => (
                    <div
                      key={p.title}
                      className={`rounded-xl border p-3 ${isDark ? "border-white/10 bg-white/4" : "border-black/10 bg-white/70"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 text-[13px] font-semibold leading-snug">{p.title}</div>
                        <Badge className={`${chipClass} text-[11px] font-normal`}>{p.status}</Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <Badge key={s} className={`${chipClass} text-[11px] font-normal`}>
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.section>
          </div>
        ) : variant === "deck2" ? (
          <div className="relative grid h-full grid-cols-[1fr_420px] gap-5 p-6">
            <div className="flex h-full flex-col gap-4">
              <div>
                <div className={`text-[40px] font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>Experiencia Profesional</div>
                <div className={`mt-1 text-[13px] ${subtleText}`}>Becario Desarrollo de Software y QA · CHUBB-CDS</div>
              </div>

              <Card className={`${cardClass} gap-3 p-5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Briefcase className="size-4 text-[#22E6D2]" />
                    Responsabilidades
                  </div>
                  <Badge className={`${chipClass} text-[12px] font-normal`}>Actual</Badge>
                </div>
                <ul className={`mt-2 grid gap-2 text-[14px] ${isDark ? "text-white/75" : "text-slate-700"}`}>
                  {[
                    "Desarrollo y mantenimiento de funcionalidades en aplicaciones empresariales",
                    "Integración de APIs con servicios externos",
                    "Pruebas funcionales del sistema",
                    "Soporte a despliegues en Google Cloud",
                    "Trabajo bajo metodología Scrum",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#22E6D2]/80" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className={`${cardClass} gap-3 p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Box className="size-4 text-[#22E6D2]" />
                    Proyectos (personales)
                  </div>
                  <div className={`text-xs ${microText}`}>En progreso y públicos</div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {[
                    {
                      title: "CRM Moderno (Fullstack)",
                      status: "Público",
                      stack: ["React + TS", "Spring Boot", "MySQL", "JWT"],
                    },
                    {
                      title: "Portafolio Personal (Esta página)",
                      status: "En línea",
                      stack: ["Next.js", "Tailwind", "Framer Motion", "PPTX Export"],
                    },
                  ].map((p) => (
                    <div
                      key={p.title}
                      className={`rounded-xl border p-4 ${isDark ? "border-white/10 bg-white/4" : "border-black/10 bg-white/70"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0 text-[14px] font-semibold leading-snug">{p.title}</div>
                        <Badge className={`${chipClass} text-[12px] font-normal`}>{p.status}</Badge>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <Badge key={s} className={`${chipClass} text-[12px] font-normal`}>
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="flex h-full flex-col gap-4">
              <div className={`text-[24px] font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Certificaciones y Motivación</div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { title: "Google Analytics Certification", meta: "Google" },
                  { title: "CCNA – Introduction to Networks", meta: "Cisco Networking Academy" },
                  { title: "Introducción a IoT con Java", meta: "UNITEC" },
                ].map((c) => (
                  <Card key={c.title} className={`${cardClass} gap-2.5 p-5`}>
                    <div className="flex items-start gap-2">
                      <GraduationCap className="mt-0.5 size-4 text-[#22E6D2]" />
                      <div className="min-w-0">
                        <div className="text-[14px] font-semibold leading-snug">{c.title}</div>
                        <div className={`mt-1 text-[12.5px] leading-snug ${softerText}`}>{c.meta}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className={`${cardClass} gap-3 p-5`}>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <GraduationCap className="size-4 text-[#22E6D2]" />
                  Motivación (Semillero)
                </div>
                <p className={`mt-2 text-[14px] leading-relaxed ${subtleText}`}>
                  Quiero participar para aportar y aprender en proyectos reales, recibir retroalimentación y fortalecer buenas prácticas: calidad, documentación y trabajo en equipo. También busco crecer con valores como responsabilidad, disciplina y mejora continua.
                </p>
              </Card>
            </div>
          </div>
        ) : (
          <div className="relative grid h-full grid-cols-[1fr_420px] gap-5 p-6">
            <div className="col-span-2">
              <div className={`text-[40px] font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>Tecnologías y Motivación</div>
              <div className={`mt-1 text-[13px] ${subtleText}`}>Stack tecnológico · Contacto</div>
            </div>

            <div className="flex h-full flex-col gap-4">
              <Card className={`${cardClass} gap-3 p-4`}>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`${isDark ? "rounded-xl border border-white/10 bg-white/3" : "rounded-xl border border-black/10 bg-white/60"} p-3`}>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Layers className="size-3.5 text-[#22E6D2]" />
                      Backend
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["Python (Flask)", "Java (Spring Boot)"].map((item) => (
                        <TechBadge key={item} name={item} />
                      ))}
                    </div>
                  </div>
                  <div className={`${isDark ? "rounded-xl border border-white/10 bg-white/3" : "rounded-xl border border-black/10 bg-white/60"} p-3`}>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Database className="size-3.5 text-[#22E6D2]" />
                      Data
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["SQL", "MySQL", "PostgreSQL", "Redis"].map((item) => (
                        <TechBadge key={item} name={item} />
                      ))}
                    </div>
                  </div>
                  <div className={`${isDark ? "rounded-xl border border-white/10 bg-white/3" : "rounded-xl border border-black/10 bg-white/60"} p-3`}>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Cloud className="size-3.5 text-[#22E6D2]" />
                      Cloud / DevOps
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["Google Cloud", "Docker", "GitHub Actions", "Jenkins"].map((item) => (
                        <TechBadge key={item} name={item} />
                      ))}
                    </div>
                  </div>
                  <div className={`${isDark ? "rounded-xl border border-white/10 bg-white/3" : "rounded-xl border border-black/10 bg-white/60"} p-3`}>
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Wrench className="size-3.5 text-[#22E6D2]" />
                      Tools
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {["Git", "Postman", "Jira", "Confluence"].map((item) => (
                        <TechBadge key={item} name={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex h-full flex-col gap-4">
              <Card className={`${cardClass} gap-3 p-5`}>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Globe className="size-4 text-[#22E6D2]" />
                  Contacto
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <a
                    data-export-link="linkedin"
                    className={`flex items-center justify-center gap-2 rounded-md border px-3 py-3 text-[13px] transition-colors ${
                      isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white/70 hover:bg-slate-900/5"
                    }`}
                    href="https://linkedin.com/in/leonardoalonsoaldana"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="size-4 text-[#22E6D2]" />
                    LinkedIn
                  </a>
                  <a
                    data-export-link="github"
                    className={`flex items-center justify-center gap-2 rounded-md border px-3 py-3 text-[13px] transition-colors ${
                      isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white/70 hover:bg-slate-900/5"
                    }`}
                    href="https://github.com/Leonard-ssj"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="size-4 text-[#22E6D2]" />
                    GitHub
                  </a>
                  <a
                    data-export-link="portfolio"
                    className={`flex items-center justify-center gap-2 rounded-md border px-3 py-3 text-[13px] transition-colors ${
                      isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white/70 hover:bg-slate-900/5"
                    }`}
                    href="https://leonardo-aldana.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Portafolio"
                  >
                    <Globe className="size-4 text-[#22E6D2]" />
                    Portafolio
                  </a>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative h-[720px] w-[1280px] overflow-hidden rounded-2xl border shadow-2xl ${frameClass}`}>
      <div className="pointer-events-none absolute inset-0">
        {isDark ? (
          <>
            <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_25%,rgba(15,201,183,0.22)_0%,rgba(15,201,183,0.0)_55%),radial-gradient(circle_at_75%_70%,rgba(15,201,183,0.14)_0%,rgba(15,201,183,0.0)_55%)]" />
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,0,0,0)_55%,rgba(0,0,0,0.62)_100%)]" />
          </>
        ) : (
          <>
            <div className="absolute -inset-24 bg-[radial-gradient(circle_at_20%_25%,rgba(15,201,183,0.20)_0%,rgba(15,201,183,0.0)_60%),radial-gradient(circle_at_75%_70%,rgba(15,201,183,0.12)_0%,rgba(15,201,183,0.0)_60%)]" />
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(2,6,23,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,6,23,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0)_55%,rgba(2,6,23,0.08)_100%)]" />
          </>
        )}
      </div>

      <div className="relative grid h-full grid-cols-[300px_1fr_280px]">
        <motion.aside
          initial={instant ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
          transition={entryTransition}
          className={`flex h-full flex-col gap-1 p-3 ${leftAsideClass}`}
        >
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className={`absolute -inset-3 rounded-full blur-lg ${isDark ? "bg-[#22E6D2]/12" : "bg-[#22E6D2]/18"}`} />
              <div
                className={`relative size-[96px] rounded-full p-[2px] shadow-[0_14px_30px_rgba(0,0,0,0.22)] ${
                  isDark
                    ? "bg-[conic-gradient(from_180deg,rgba(34,230,210,0.75),rgba(255,255,255,0.18),rgba(34,230,210,0.35),rgba(255,255,255,0.10),rgba(34,230,210,0.75))]"
                    : "bg-[conic-gradient(from_180deg,rgba(34,230,210,0.55),rgba(2,6,23,0.10),rgba(34,230,210,0.35),rgba(2,6,23,0.08),rgba(34,230,210,0.55))]"
                }`}
              >
                <div
                  className={`relative h-full w-full overflow-hidden rounded-full ring-2 ${
                    isDark ? "ring-white/15 bg-[#07161A]" : "ring-black/10 bg-white"
                  }`}
                >
                  <Image
                    src="/avatar.jpg"
                    alt="Leonardo Alonso Aldana"
                    fill
                    className="object-cover object-[center_14%] scale-110"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-balance break-words text-[17px] font-semibold leading-[1.1]">Leonardo Alonso Aldana</div>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <Card className={`${cardClass} gap-1.5 p-2.5`}>
              <div className={`text-[11px] leading-snug ${subtleText}`}>
                <div>Estudiante de Ingeniería en Sistemas Computacionales</div>
                <div>Universidad Tecnológica de México (UNITEC)</div>
              </div>
            </Card>

            <div className={`rounded-xl border px-3 py-3 ${isDark ? "border-white/10 bg-white/5" : "border-black/10 bg-white/70"}`}>
              <div className="flex items-center gap-2 text-xs font-semibold">
                <GraduationCap className="size-3.5 text-[#22E6D2]" />
                INTERESES
              </div>
              <div className={`mt-1.5 text-[12px] leading-snug ${subtleText}`}>
                <span className="font-semibold text-[#22E6D2]">Arquitectura de TI</span>
                <span className={isDark ? "text-white/40" : "text-slate-400"}> · </span>
                <span>Desarrollo de Software</span>
                <span className={isDark ? "text-white/40" : "text-slate-400"}> · </span>
                <span>Cloud Computing</span>
              </div>
              <div className={`mt-2 text-[11px] leading-snug ${softerText}`}>
                Me apasiona la tecnología porque siempre hay algo nuevo por descubrir; especialmente la arquitectura de software y TI, donde puedo ver el panorama completo y crear soluciones.
              </div>
            </div>

            <Card className={`${cardClass} gap-2 p-2.5`}>
              <div className={`text-xs font-semibold ${isDark ? "text-white/90" : "text-slate-900"}`}>Certificaciones</div>
              <ul className={`mt-1 space-y-0.5 text-[11px] leading-snug ${subtleText}`}>
                {[
                  "Google Analytics Certification",
                  "CCNA – Introduction to Networks (Cisco Networking Academy)",
                  "Introducción a IoT con Java (UNITEC)",
                  "Curso Intro Desarrollo Web: HTML y CSS (Google)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#22E6D2]/80" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className={`${cardClass} gap-2 p-2.5`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Globe className="size-3.5 text-[#22E6D2]" />
                  CONTACTO
                </div>
                <span className={`text-[10px] ${microText}`}>Links</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <a
                  data-export-link="linkedin"
                  className={`inline-flex size-9 items-center justify-center rounded-md border transition-colors ${
                    isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white/70 hover:bg-slate-900/5"
                  }`}
                  href="https://linkedin.com/in/leonardoalonsoaldana"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-4 text-[#22E6D2]" />
                </a>
                <a
                  data-export-link="github"
                  className={`inline-flex size-9 items-center justify-center rounded-md border transition-colors ${
                    isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white/70 hover:bg-slate-900/5"
                  }`}
                  href="https://github.com/Leonard-ssj"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="size-4 text-[#22E6D2]" />
                </a>
                <a
                  data-export-link="portfolio"
                  className={`inline-flex size-9 items-center justify-center rounded-md border transition-colors ${
                    isDark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-black/10 bg-white/70 hover:bg-slate-900/5"
                  }`}
                  href="https://leonardo-aldana.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Portafolio"
                >
                  <Globe className="size-4 text-[#22E6D2]" />
                </a>
              </div>
            </Card>
          </div>
        </motion.aside>

        <motion.section
          initial={instant ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
          transition={entryTransitionDelayed}
          className="flex h-full flex-col gap-2.5 p-4"
        >
          <div>
            <div className={`text-[26px] font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>Perfil Profesional</div>
            <div className={`mt-1 text-[12px] ${subtleText}`}>Becario Desarrollo de Software y QA · CHUBB-CDS</div>
          </div>

          <Card className={`${cardClass} gap-3 p-3.5`}>
            <div className="text-sm font-semibold">Perfil</div>
            <p className={`mt-2 text-[12px] leading-relaxed ${subtleText}`}>
              Soy estudiante de Ingeniería en Sistemas y actualmente apoyo en desarrollo y QA en entornos reales.
              Me gusta aprender rápido, cuidar la calidad y trabajar en equipo para entregar soluciones claras y confiables.
            </p>
          </Card>

          <Card className={`${cardClass} gap-3 p-3.5`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Briefcase className="size-4 text-[#22E6D2]" />
                Experiencia
              </div>
              <span className={`text-xs ${softerText}`}>Becario Desarrollo de Software y QA · CHUBB-CDS</span>
            </div>
            <div className="mt-3 text-xs font-semibold text-[#22E6D2]/90">Responsabilidades</div>
            <ul className={`mt-2 grid gap-1 text-[12px] ${isDark ? "text-white/75" : "text-slate-700"}`}>
              {[
                "Desarrollo y mantenimiento de funcionalidades en aplicaciones empresariales",
                "Integración de APIs con servicios externos",
                "Pruebas funcionales del sistema",
                "Soporte a despliegues en Google Cloud",
                "Trabajo bajo metodología Scrum",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#22E6D2]/80" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className={`${cardClass} gap-3 p-3.5`}>
            <div className="flex items-center gap-2">
              <div
                className={`inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 text-xs font-medium transition-colors ${chipAccentClass}`}
              >
                Semillero tecnológico
              </div>
              <div
                className={`inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 text-xs font-medium transition-colors ${chipClass}`}
              >
                Puerto de Liverpool
              </div>
            </div>
            <div className="text-sm font-semibold">Motivación (Semillero)</div>
            <div className="mt-1 text-xs font-medium text-[#22E6D2]/90">¿Por qué te interesa participar en este semillero?</div>
            <p className={`mt-2 text-[12px] leading-relaxed ${subtleText}`}>
              Me interesa participar en este semillero para aportar y aprender en proyectos reales, colaborar con profesionales y seguir creciendo en áreas como arquitectura de sistemas, desarrollo de software y cloud.
              También quiero fortalecer mis valores: responsabilidad, respeto, disciplina y una mentalidad de mejora continua para crecer como persona.
            </p>
          </Card>
        </motion.section>

        <motion.aside
          initial={instant ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
          transition={entryTransitionDelayed2}
          className="flex h-full flex-col gap-1.5 p-3"
        >
          <div className="flex items-center justify-between">
            <div className={`text-xs font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>Stack Tecnológico</div>
            <Badge className={`${chipClass} text-[11px] font-normal`}>
              Actual
            </Badge>
          </div>

          <Card className={`${cardClass} gap-1.5 p-2`}>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Layers className="size-3.5 text-[#22E6D2]" />
              Backend
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {["Python (Flask)", "Java (Spring Boot)"].map((item) => (
                <TechBadge key={item} name={item} />
              ))}
            </div>
          </Card>

          <Card className={`${cardClass} gap-1.5 p-2`}>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Database className="size-3.5 text-[#22E6D2]" />
              Data
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {["SQL", "MySQL", "PostgreSQL", "Redis"].map((item) => (
                <TechBadge key={item} name={item} />
              ))}
            </div>
          </Card>

          <Card className={`${cardClass} gap-1.5 p-2`}>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Cloud className="size-3.5 text-[#22E6D2]" />
              Cloud / DevOps
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {["Google Cloud", "Docker", "GitHub Actions", "Jenkins"].map((item) => (
                <TechBadge key={item} name={item} />
              ))}
            </div>
          </Card>

          <Card className={`${cardClass} gap-1.5 p-2`}>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Wrench className="size-3.5 text-[#22E6D2]" />
              Tools
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {["Git", "Postman", "Jira", "Confluence"].map((item) => (
                <TechBadge key={item} name={item} />
              ))}
            </div>
          </Card>

          <Card className={`${cardClass} gap-1.5 p-2`}>
            <div className={`text-xs font-semibold ${isDark ? "text-white/90" : "text-slate-900"}`}>Pasatiempos</div>
            <div className={`text-[10.5px] leading-snug ${subtleText}`}>
              <div className="flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#22E6D2]/80" />
                <div>Ir al gym y mantenerme activo.</div>
              </div>
              <div className="mt-1 flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#22E6D2]/80" />
                <div>Jugar videojuegos y seguir el fútbol.</div>
              </div>
              <div className="mt-1 flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#22E6D2]/80" />
                <div>Salir con mi familia y amigos cuando tengo tiempo.</div>
              </div>
              <div className="mt-1 flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#22E6D2]/80" />
                <div>Escuchar música y desconectarme un rato.</div>
              </div>
              <div className="mt-1 flex items-start gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#22E6D2]/80" />
                <div>Hacer proyectos personales y tomar cursos constantemente.</div>
              </div>
            </div>
          </Card>
        </motion.aside>
      </div>
    </div>
  )
}
