"use client"

import { useEffect, useMemo, useState } from "react"
import { FileText, Image as ImageIcon, FileJson, Download } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Section, SectionTitle } from "@/components/section"
import { Reveal, StaggerContainer, StaggerItem } from "@/components/reveal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLang } from "@/context/lang-context"
import { content } from "@/content/content"

const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  PDF: FileText,
  PNG: ImageIcon,
  JSON: FileJson,
}

export function DocsSection() {
  const { t } = useLang()
  const items = t(content.docs.items) as Array<{
    title: string
    type: "PDF" | "PNG" | "JSON" | string
    href: string
  }>
  const [active, setActive] = useState(0)
  const [jsonData, setJsonData] = useState<unknown | null>(null)
  const [jsonStatus, setJsonStatus] = useState<"idle" | "loading" | "ready" | "error">("idle")

  const current = items[Math.min(active, Math.max(0, items.length - 1))]
  const currentHref = current?.href
  const currentType = current?.type
  const CurrentIcon = useMemo(() => typeIcon[current?.type] || FileText, [current?.type])

  useEffect(() => {
    let cancelled = false
    setJsonData(null)
    setJsonStatus("idle")
    if (!currentHref || currentType !== "JSON") return
    setJsonStatus("loading")
    fetch(currentHref)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        setJsonData(data)
        setJsonStatus("ready")
      })
      .catch(() => {
        if (cancelled) return
        setJsonStatus("error")
      })
    return () => {
      cancelled = true
    }
  }, [currentHref, currentType])

  const postmanSummary = useMemo(() => {
    if (!jsonData || typeof jsonData !== "object") return null
    const data = jsonData as Record<string, unknown>
    const info = (data.info && typeof data.info === "object" ? (data.info as Record<string, unknown>) : null) ?? null
    const name = typeof info?.name === "string" ? info.name : null
    const schema = typeof info?.schema === "string" ? info.schema : null
    const variable = Array.isArray(data.variable) ? data.variable : null
    const itemsRoot = Array.isArray(data.item) ? (data.item as unknown[]) : null

    type ReqRow = { name: string; method: string; url: string }

    const normalizeUrl = (url: unknown) => {
      if (typeof url === "string") return url
      if (!url || typeof url !== "object") return ""
      const u = url as Record<string, unknown>
      if (typeof u.raw === "string") return u.raw
      const protocol = typeof u.protocol === "string" ? `${u.protocol}://` : ""
      const host = Array.isArray(u.host) ? (u.host as unknown[]).filter((x) => typeof x === "string").join(".") : ""
      const path = Array.isArray(u.path) ? (u.path as unknown[]).filter((x) => typeof x === "string").join("/") : ""
      const combined = `${protocol}${host}${path ? `/${path}` : ""}`
      return combined
    }

    const extract = (nodes: unknown[], prefix: string[]): ReqRow[] => {
      const rows: ReqRow[] = []
      for (const n of nodes) {
        if (!n || typeof n !== "object") continue
        const node = n as Record<string, unknown>
        const nodeName = typeof node.name === "string" ? node.name : "Untitled"
        const path = [...prefix, nodeName]
        if (Array.isArray(node.item)) {
          rows.push(...extract(node.item as unknown[], path))
          continue
        }
        const request = node.request && typeof node.request === "object" ? (node.request as Record<string, unknown>) : null
        if (!request) continue
        const method = typeof request.method === "string" ? request.method.toUpperCase() : "REQ"
        const url = normalizeUrl(request.url)
        rows.push({
          name: path.join(" / "),
          method,
          url,
        })
      }
      return rows
    }

    const requests = itemsRoot ? extract(itemsRoot, []) : []
    return {
      name,
      schema,
      requestCount: requests.length,
      variableCount: variable?.length ?? 0,
      requests,
      rawKeys: Object.keys(data),
    }
  }, [jsonData])

  return (
    <Section id="docs">
      <div className="flex flex-col gap-12">
        <Reveal>
          <div className="flex flex-col gap-3">
            <SectionTitle>{t(content.docs.title)}</SectionTitle>
            {"subtitle" in content.docs && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-3xl text-sm leading-relaxed text-muted-foreground"
              >
                {t((content.docs as { subtitle: { es: string; en: string } }).subtitle)}
              </motion.p>
            )}
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <StaggerContainer className="flex flex-col gap-3" staggerDelay={0.08}>
            {items.map((doc, i) => {
              const Icon = typeIcon[doc.type] || FileText
              const isActive = i === active
              return (
                <StaggerItem key={doc.href}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`glass-card group flex w-full items-center gap-4 rounded-xl p-5 text-left transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 ${isActive ? "ring-1 ring-primary/30" : ""}`}
                  >
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3 className="text-sm font-semibold text-card-foreground">{doc.title}</h3>
                      <span className="text-xs text-muted-foreground">{doc.type}</span>
                    </div>
                    <span
                      className={`size-1.5 rounded-full transition-colors ${isActive ? "bg-primary" : "bg-primary/20"}`}
                      aria-hidden="true"
                    />
                  </button>
                </StaggerItem>
              )
            })}
          </StaggerContainer>

          <Reveal delay={0.05}>
            <div className="glass-card min-w-0 overflow-hidden rounded-xl">
              <div className="px-5 pt-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {current && <CurrentIcon className="size-5" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-card-foreground">{current?.title}</span>
                      <span className="text-xs text-muted-foreground">{current?.href}</span>
                    </div>
                  </div>

                  {current && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={current.href} target="_blank" rel="noopener noreferrer">
                          {t({ es: "Ver", en: "Open" })}
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon-sm" asChild>
                        <a href={current.href} download aria-label={`Download ${current.title}`}>
                          <Download className="size-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-4 h-px w-full overflow-hidden rounded-full bg-border/60">
                  <div className="h-full w-full animate-shimmer opacity-20" />
                </div>
              </div>

              <div className="p-5 pt-4">
                <AnimatePresence mode="wait">
                  {current?.type === "PNG" && (
                    <motion.div
                      key={current.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden rounded-lg border border-border/60 bg-background"
                    >
                      <img
                        src={current.href}
                        alt={current.title}
                        className="h-auto w-full"
                        loading="lazy"
                      />
                    </motion.div>
                  )}

                  {current?.type === "PDF" && (
                    <motion.div
                      key={current.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden rounded-lg border border-border/60 bg-background"
                    >
                      <iframe
                        title={current.title}
                        src={current.href}
                        className="h-[520px] w-full"
                      />
                    </motion.div>
                  )}

                  {current?.type === "JSON" && (
                    <motion.div
                      key={current.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="min-w-0 overflow-hidden rounded-lg border border-border/60 bg-background"
                    >
                      <div className="min-w-0 p-4">
                        {jsonStatus === "loading" && (
                          <div className="flex items-center justify-center py-14">
                            <span className="text-sm text-muted-foreground">
                              {t({ es: "Cargando coleccion...", en: "Loading collection..." })}
                            </span>
                          </div>
                        )}

                        {jsonStatus === "error" && (
                          <div className="flex items-center justify-center py-14">
                            <span className="text-sm text-muted-foreground">
                              {t({ es: "Vista previa no disponible.", en: "Preview not available." })}
                            </span>
                          </div>
                        )}

                        {jsonStatus === "ready" && (
                          <div className="min-w-0 space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="secondary" className="text-xs font-normal">
                                {t({ es: "Postman", en: "Postman" })}
                              </Badge>
                              <Badge variant="secondary" className="text-xs font-normal">
                                {t({ es: "Requests", en: "Requests" })}: {postmanSummary?.requestCount ?? 0}
                              </Badge>
                              <Badge variant="secondary" className="text-xs font-normal">
                                {t({ es: "Variables", en: "Variables" })}: {postmanSummary?.variableCount ?? 0}
                              </Badge>
                              {postmanSummary?.name && (
                                <Badge variant="secondary" className="text-xs font-normal">
                                  {postmanSummary.name}
                                </Badge>
                              )}
                            </div>

                            {postmanSummary?.schema && (
                              <div className="text-xs text-muted-foreground break-words">
                                {t({ es: "Schema", en: "Schema" })}: {postmanSummary.schema}
                              </div>
                            )}

                            {postmanSummary && (postmanSummary.requests?.length ?? 0) > 0 ? (
                              <div className="max-h-[520px] min-w-0 overflow-auto rounded-lg border border-border/60">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="w-[92px]">Method</TableHead>
                                      <TableHead className="w-[40%]">{t({ es: "Endpoint", en: "Endpoint" })}</TableHead>
                                      <TableHead>{t({ es: "URL", en: "URL" })}</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {postmanSummary.requests.slice(0, 60).map((r, idx) => (
                                      <TableRow key={`${r.name}-${idx}`}>
                                        <TableCell>
                                          <Badge variant="secondary" className="text-[10px] font-normal">
                                            {r.method}
                                          </Badge>
                                        </TableCell>
                                        <TableCell className="whitespace-normal break-words text-xs text-muted-foreground">
                                          {r.name}
                                        </TableCell>
                                        <TableCell className="whitespace-normal break-words text-xs text-muted-foreground">
                                          {r.url || t({ es: "URL no disponible", en: "URL unavailable" })}
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                                {postmanSummary.requestCount > 60 && (
                                  <div className="border-t border-border/60 p-3 text-xs text-muted-foreground">
                                    {t({ es: "Mostrando primeras", en: "Showing first" })} 60 / {postmanSummary.requestCount}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="rounded-lg border border-border/60 p-4 text-sm text-muted-foreground">
                                {t({
                                  es: "No se encontraron requests para mostrar en vista previa.",
                                  en: "No requests found to show in the preview.",
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {current && current.type !== "PDF" && current.type !== "PNG" && current.type !== "JSON" && (
                    <motion.div
                      key={current.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-center rounded-lg border border-border/60 bg-background p-10"
                    >
                      <span className="text-sm text-muted-foreground">
                        {t({ es: "Vista previa no disponible.", en: "Preview not available." })}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
