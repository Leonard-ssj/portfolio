import { Header } from "@/components/header"
import { AnimatedBackground } from "@/components/animated-background"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { SkillsSection } from "@/components/sections/skills"
import { ExperienceSection } from "@/components/sections/experience"
import { ProjectsSection } from "@/components/sections/projects"
import { DocsSection } from "@/components/sections/docs"
import { NotesPreviewSection } from "@/components/sections/notes-preview"
import { ContactSection } from "@/components/sections/contact"
import { PlaySection } from "@/components/sections/play"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <>
      <AnimatedBackground />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <DocsSection />
        <NotesPreviewSection />
        <ContactSection />
        <PlaySection />
      </main>
      <Footer />
    </>
  )
}
