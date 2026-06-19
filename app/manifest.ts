import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Leonardo Alonso Aldana | IT Architecture Portfolio",
    short_name: "Leonardo Aldana",
    description:
      "Portfolio de Leonardo Alonso Aldana - Arquitectura de soluciones, integracion de APIs y desarrollo fullstack.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b1014",
    theme_color: "#0b1014",
    lang: "es",
    categories: ["portfolio", "developer", "technology"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
