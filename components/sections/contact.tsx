"use client"

import { useState, useCallback } from "react"
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Music2, Copy, Check, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Section, SectionTitle } from "@/components/section"
import { Reveal, StaggerContainer, StaggerItem } from "@/components/reveal"
import { useLang } from "@/context/lang-context"
import { content, siteConfig } from "@/content/content"

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function FieldError({ error }: { error?: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0, y: -4 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 text-xs text-destructive-foreground"
        >
          <AlertCircle className="size-3 flex-shrink-0" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export function ContactSection() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const telNumber = siteConfig.phone.replace(/[^\d+]/g, "")
  const telHref = `tel:${telNumber}`
  const mailHref = `mailto:${siteConfig.email}`

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(siteConfig.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const copyPhone = useCallback(() => {
    navigator.clipboard.writeText(telNumber)
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2000)
  }, [telNumber])

  const validationMessages = {
    nameRequired: t({ es: "El nombre es obligatorio", en: "Name is required" }),
    nameMin: t({ es: "Minimo 2 caracteres", en: "Minimum 2 characters" }),
    emailRequired: t({ es: "El correo es obligatorio", en: "Email is required" }),
    emailInvalid: t({ es: "Correo electronico invalido", en: "Invalid email address" }),
    messageRequired: t({ es: "El mensaje es obligatorio", en: "Message is required" }),
    messageMin: t({ es: "Minimo 10 caracteres", en: "Minimum 10 characters" }),
  }

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return validationMessages.nameRequired
        if (value.trim().length < 2) return validationMessages.nameMin
        return undefined
      case "email":
        if (!value.trim()) return validationMessages.emailRequired
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return validationMessages.emailInvalid
        return undefined
      case "message":
        if (!value.trim()) return validationMessages.messageRequired
        if (value.trim().length < 10) return validationMessages.messageMin
        return undefined
      default:
        return undefined
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
    }
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, formData[field as keyof typeof formData]),
    }))
  }

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    }
    setErrors(newErrors)
    setTouched({ name: true, email: true, message: true })
    return !newErrors.name && !newErrors.email && !newErrors.message
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateAll()) return

    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  const inputClass = (field: string) =>
    `h-10 rounded-lg border px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-all ${
      errors[field as keyof FormErrors]
        ? "border-destructive-foreground bg-destructive/5 focus:ring-destructive/30"
        : "border-input bg-background focus:ring-ring/50"
    }`

  return (
    <Section id="contact">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionTitle>{t(content.contact.title)}</SectionTitle>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass-card flex flex-col gap-5 rounded-xl p-6" noValidate>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-sm font-medium text-card-foreground">
                  {t(content.contact.form.name)} <span className="text-destructive-foreground">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={inputClass("name")}
                  placeholder={t({ es: "Tu nombre", en: "Your name" })}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                <FieldError error={errors.name} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-sm font-medium text-card-foreground">
                  {t(content.contact.form.email)} <span className="text-destructive-foreground">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  className={inputClass("email")}
                  placeholder={t({ es: "tu@email.com", en: "you@email.com" })}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <FieldError error={errors.email} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="text-sm font-medium text-card-foreground">
                  {t(content.contact.form.message)} <span className="text-destructive-foreground">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                  className={`rounded-lg border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 resize-none transition-all ${
                    errors.message
                      ? "border-destructive-foreground bg-destructive/5 focus:ring-destructive/30"
                      : "border-input bg-background focus:ring-ring/50"
                  }`}
                  placeholder={t({ es: "Tu mensaje (min. 10 caracteres)...", en: "Your message (min. 10 characters)..." })}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                <div className="flex items-center justify-between">
                  <FieldError error={errors.message} />
                  <span className="text-xs text-muted-foreground ml-auto">
                    {formData.message.length}/10 min
                  </span>
                </div>
              </div>
              <Button type="submit" className="w-full">
                <Mail className="size-4" />
                {t(content.contact.form.send)}
              </Button>
            </form>
          </Reveal>

          {/* Contact info + map */}
          <Reveal delay={0.2}>
            <div className="flex flex-col gap-6">
              <StaggerContainer className="flex flex-col gap-4" staggerDelay={0.1}>
                <StaggerItem>
                  <div className="glass-card flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Mail className="size-5" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-xs text-muted-foreground">Email</span>
                      <span className="text-sm font-medium text-card-foreground">{siteConfig.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={mailHref} aria-label={t({ es: "Enviar email", en: "Send email" })}>
                          <Mail className="size-4" />
                          {t({ es: "Email", en: "Email" })}
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={copyEmail} aria-label={t(content.contact.form.copyEmail)}>
                        {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
                      </Button>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="glass-card flex items-center gap-4 rounded-xl p-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Phone className="size-5" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="text-xs text-muted-foreground">{t({ es: "Telefono", en: "Phone" })}</span>
                      <a href={telHref} className="text-sm font-medium text-card-foreground hover:text-primary transition-colors">
                        {siteConfig.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={telHref} aria-label={t({ es: "Llamar", en: "Call" })}>
                          <Phone className="size-4" />
                          {t({ es: "Llamar", en: "Call" })}
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={copyPhone}
                        aria-label={t({ es: "Copiar telefono", en: "Copy phone" })}
                      >
                        {copiedPhone ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
                      </Button>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="glass-card flex items-center gap-4 rounded-xl p-4">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="size-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">{t({ es: "Ubicacion", en: "Location" })}</span>
                      <span className="text-sm font-medium text-card-foreground">{siteConfig.location}</span>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                        <Github className="size-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="size-4" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="size-4" />
                        Instagram
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer">
                        <Music2 className="size-4" />
                        TikTok
                      </a>
                    </Button>
                  </div>
                </StaggerItem>
              </StaggerContainer>

              {/* Map embed */}
              <div className="glass-card overflow-hidden rounded-xl">
                <div className="relative aspect-video w-full">
                  <iframe
                    title={t(content.contact.mapTitle)}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d240838.55873932704!2d-99.26055019453956!3d19.39078272549257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0026db097507%3A0x54061076265ee841!2sMexico%20City%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                    className="absolute inset-0 size-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
