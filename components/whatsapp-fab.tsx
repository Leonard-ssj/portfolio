"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLang } from "@/context/lang-context"
import { siteConfig } from "@/content/content"

function normalizePhoneForWhatsApp(input: string) {
  const digits = input.replace(/[^\d]/g, "")
  return digits
}

export function WhatsAppFab() {
  const { t } = useLang()
  const phone = normalizePhoneForWhatsApp(siteConfig.phone)
  const text = encodeURIComponent(
    t({
      es: "Hola Leonardo, vi tu portafolio y me gustaria contactarte.",
      en: "Hi Leonardo, I saw your portfolio and I'd like to get in touch.",
    }),
  )

  if (!phone) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="fixed bottom-5 right-5 z-50"
    >
      <motion.div
        animate={{ boxShadow: ["0 0 0 0 rgba(34,197,94,0.0)", "0 0 0 10px rgba(34,197,94,0.12)", "0 0 0 0 rgba(34,197,94,0.0)"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-full"
      >
        <Button asChild size="icon" className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
          <a
            href={`https://wa.me/${phone}?text=${text}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t({ es: "Enviar WhatsApp", en: "Send WhatsApp" })}
          >
            <MessageCircle className="size-5" />
          </a>
        </Button>
      </motion.div>
    </motion.div>
  )
}

