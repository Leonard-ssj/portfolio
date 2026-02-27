"use client"

import Link from "next/link"
import { ArrowLeft, Download, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { AnimatedBackground } from "@/components/animated-background"
import { Footer } from "@/components/footer"
import { Reveal } from "@/components/reveal"
import { useLang } from "@/context/lang-context"
import { content, siteConfig } from "@/content/content"

export default function ResumePage() {
  const { t } = useLang()

  return (
    <>
      <AnimatedBackground />
      <Header />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-6">
          <Reveal>
            <div className="flex flex-col gap-6 mb-10">
              <Button variant="ghost" size="sm" asChild className="w-fit">
                <Link href="/">
                  <ArrowLeft className="size-3.5" />
                  {t({ es: "Volver al inicio", en: "Back to home" })}
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl text-balance">
                {t(content.resume.title)}
              </h1>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6">
              {/* Download buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild>
                  <a href={siteConfig.cv} download>
                    <Download className="size-4" />
                    {t(content.resume.downloadPdf)}
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={siteConfig.cvAts} download>
                    <FileText className="size-4" />
                    {t(content.resume.downloadDocx)}
                  </a>
                </Button>
              </div>

              {/* ATS note */}
              <div className="glass-card flex items-start gap-3 rounded-xl p-4">
                <AlertCircle className="size-5 shrink-0 text-primary mt-0.5" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(content.resume.atsNote)}
                </p>
              </div>

              {/* ATS Preview */}
              <div className="flex flex-col gap-4" id="ats">
                <h2 className="text-xl font-semibold text-foreground">
                  {t(content.resume.atsTitle)}
                </h2>
                <div className="glass-card rounded-xl p-6 lg:p-8">
                  <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-muted-foreground">
                    {content.resume.atsContent}
                  </pre>
                </div>
              </div>

              {/* PDF preview */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-foreground">
                  {t({ es: "Vista previa PDF", en: "PDF Preview" })}
                </h2>
                <div className="glass-card overflow-hidden rounded-xl">
                  <div className="relative aspect-[8.5/11] w-full">
                    <iframe
                      src={siteConfig.cv}
                      title="CV Preview"
                      className="absolute inset-0 size-full border-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  )
}
