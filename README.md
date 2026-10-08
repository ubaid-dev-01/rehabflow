<div align="center">

# RehabFlow

**Clinic rehab operations — patients, exercises, schedule, billing**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)

[Repository](https://github.com/ubaid-dev-01/rehabflow) · [Author](https://github.com/ubaid-dev-01) · [Portfolio](https://ubaid-dev-01.vercel.app)

</div>

---

## Overview

RehabFlow is a Vite + React clinical operations UI for rehabilitation practices: patient roster, exercise programs, scheduling, notes, and billing views. Built with shadcn/ui patterns, TanStack Query, and GSAP motion.

## Features

- Patient management
- Exercise library and assignments
- Schedule and booking surfaces
- Clinical notes
- Billing overview
- Staff dashboard shell

## Architecture

SPA client with routed public + dashboard surfaces. Data layer is ready for API wiring via TanStack Query; replace mock/context sources with authenticated APIs as needed.

## Tech stack

- React
- Vite
- TypeScript
- TanStack Query
- React Router
- Tailwind + shadcn/ui
- GSAP

## Project structure

```text
RehabFlow/
├── src/pages/
├── src/components/ context/ hooks/ lib/
└── docs/
```

## Getting started

```bash
npm install
npm run dev
npm run test
```

## Environment

No secrets required for UI-only local preview. Add `VITE_*` API URLs when connecting a backend.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Production build |
| `npm run test` | Unit tests |

## Documentation

| Doc | Purpose |
| --- | --- |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System shape, data flow, boundaries |
| [docs/SETUP.md](docs/SETUP.md) | Local install, env, runbook |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Branching, commits, PR checklist |


## Author

**M Ubaid Javaid** — Software Engineer (MERN / Next.js)

- GitHub: [https://github.com/ubaid-dev-01](https://github.com/ubaid-dev-01)
- Portfolio: [https://ubaid-dev-01.vercel.app](https://ubaid-dev-01.vercel.app)
- Email: mubaidjavaid97@gmail.com

## License

Source is published for portfolio and engineering review. Client product ownership is not implied unless stated in a case study.

