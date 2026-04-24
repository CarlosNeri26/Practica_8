# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- `artifacts/cafeteria-flor-cordoba` — Landing page para "Cafetería La Flor de Córdoba" (Guadalajara). Sitio estático escrito en HTML/CSS/JS puros (`index.html`, `styles.css`, `script.js`) servido por Vite. Incluye header con navegación, hero, sección "Sobre nosotros / Instalaciones" con `<img>` reemplazable (foto del local de Google Maps), formulario de contacto con validación JS y footer con `<img class="logo">` y el crédito "Desarrollado por Carlos Emmanuel Neri Saldivar".
