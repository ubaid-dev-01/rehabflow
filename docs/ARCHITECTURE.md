# Architecture — RehabFlow

## Intent

RehabFlow is a Vite + React clinical operations UI for rehabilitation practices: patient roster, exercise programs, scheduling, notes, and billing views. Built with shadcn/ui patterns, TanStack Query, and GSAP motion.

## System shape

SPA client with routed public + dashboard surfaces. Data layer is ready for API wiring via TanStack Query; replace mock/context sources with authenticated APIs as needed.

## Stack decisions

- React
- Vite
- TypeScript
- TanStack Query
- React Router
- Tailwind + shadcn/ui
- GSAP

## Boundaries

- Secrets stay in environment variables / secret managers — never in git.
- Client bundles only receive public configuration (`NEXT_PUBLIC_*` / `VITE_*`).
- Tenant or role checks belong in middleware / server layers, not UI-only gates.
- Heavy or long-running work should not run inside short-lived serverless handlers unless designed for it.

## Quality bar

- Prefer typed contracts at API and domain boundaries.
- Ship a vertical slice (auth → persisted outcome) before a broad feature surface.
- Document trade-offs in PRs when changing data models or auth.

