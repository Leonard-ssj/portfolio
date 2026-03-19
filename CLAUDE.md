# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Architecture

**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Framer Motion

**Path alias:** `@/` maps to the project root.

### Key Directories

- `app/` — Next.js App Router pages. Root layout sets up providers (ThemeProvider, LangProvider, Toaster) and global features (custom cursor, scroll navigation, WhatsApp FAB, Vercel Analytics).
- `components/sections/` — Modular sections assembled in `app/page.tsx`: Hero, About, Skills, Experience, Projects, Docs, NotesPreview, Contact, Play.
- `components/ui/` — shadcn/ui + Radix UI primitives (do not edit these manually; use the shadcn CLI).
- `content/content.ts` — Static portfolio data (text, projects, experience, etc.). Edit this for content changes.
- `context/lang-context.tsx` — Language/i18n context. All user-facing strings should come from here.
- `lib/utils.ts` — `cn()` helper for merging Tailwind classes.

### Routes

| Route | Purpose |
|---|---|
| `/` | Main portfolio (single-page, section-based) |
| `/resume` | CV/resume page |
| `/notes` | Notes page |
| `/diapositiva` | Reveal.js presentation |
| `/diapositivaspresentacion` | Alternative presentation route |

### Notable Config

- `next.config.mjs` ignores TypeScript build errors and disables image optimization (`unoptimized: true`).
- shadcn/ui is configured with the "new-york" style and neutral base color (`components.json`).
- Tailwind v4 uses PostCSS plugin (not the legacy `tailwind.config.js`).
- Presentations use reveal.js and pptxgenjs; image export uses html-to-image.

### Content Updates

- Projects are driven by `content.projects.items` in `content/content.ts` (ES/EN entries must stay in sync).
