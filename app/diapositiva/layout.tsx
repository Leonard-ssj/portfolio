import { Outfit } from "next/font/google"

import "reveal.js/dist/reveal.css"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export default function DiapositivaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className={`${outfit.variable}`}>{children}</div>
}

