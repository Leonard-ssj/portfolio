import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LangProvider } from "@/context/lang-context"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: "Leonardo Alonso Aldana | IT Architecture Portfolio",
  description:
    "Portfolio de Leonardo Alonso Aldana - Becario Arquitecto de TI, Arquitectura de Soluciones. Experiencia en integracion de APIs, Google Cloud y metodologias agiles.",
  openGraph: {
    title: "Leonardo Alonso Aldana | IT Architecture Portfolio",
    description:
      "Systems Engineering student with production experience in development and QA. API integrations, Google Cloud, and Agile.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonardo Alonso Aldana | IT Architecture Portfolio",
    description:
      "Systems Engineering student with production experience in development and QA.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LangProvider>
            {children}
            <Toaster />
          </LangProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
