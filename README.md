# Portfolio — Next.js

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, and Framer Motion.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v4
- shadcn/ui + Radix UI
- Framer Motion

## Local development

```bash
pnpm install
pnpm dev
```

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Routes

- `/` — Main portfolio (section-based landing)
- `/resume` — CV page (downloads + preview)
- `/notes` — Notes list
- `/notes/[slug]` — Note details
- `/diapositiva` — Single-slide export (PPTX)
- `/diapositivaspresentacion` — Multi-slide export (PPTX)

## Content

Most copy and data (ES/EN) lives in `content/content.ts`.
