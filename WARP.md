# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Repository overview
- Stack: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, ESLint (flat config with next/core-web-vitals), Prettier. State/data fetching via TanStack Query. Supabase SDKs are present as dependencies and may be used for data access.
- Package manager: npm (package-lock.json present). Prefer npm commands below.

Common commands
- Start dev server (with Turbopack):
  npm run dev
  # opens http://localhost:3000

- Build production bundle:
  npm run build

- Run production server (after build):
  npm run start

- Lint the codebase (Next.js ESLint config):
  npm run lint

- Format code with Prettier (no script defined):
  npx prettier . --write

- Run a single test: Not configured. There is no test framework or test scripts defined yet.

Key configuration files
- package.json: defines scripts for dev/build/start/lint and lists core dependencies (Next.js, React, TanStack Query, Supabase, Zustand) and dev tools (TypeScript, Tailwind v4, ESLint, Prettier).
- eslint.config.mjs: flat config extending next/core-web-vitals and next/typescript via @eslint/eslintrc compat.
- .prettierrc: project formatting rules.
- README.md: standard create-next-app quickstart and links.

High-level architecture
- Next.js App Router under src/app
  - Providers: src/app/providers/QueryProvider.tsx wraps the app tree with TanStack Query’s QueryClientProvider and includes ReactQueryDevtools for local debugging.
    - This implies a shared QueryClient instance at '@/shared/api/queryClient' (ensure it exists and is a singleton for caching and mutations).
- Feature-oriented UI composition (FSD-inspired)
  - Widgets layer: src/widgets
    - Table widget: src/widgets/table with its own README describing a TransactionTable built atop a generic Table component.
  - Shared UI layer (implied by docs): '@/shared/ui/Table' provides a reusable Table with typed columns, sorting, search, pagination, and render hooks. The TransactionTable composes this base Table and adds domain-specific behavior for financial transactions.

Notable behavior and conventions
- Data fetching/caching: Centralized through TanStack Query. Co-locate server interactions and cache keys with features/widgets where practical, and wrap the application subtree with QueryProvider to enable React Query across routes.
- Styling: Tailwind CSS v4 is present; component examples in the table README reference a design palette used via Tailwind utility classes.
- Supabase: @supabase/supabase-js and @supabase/ssr are installed. If you integrate auth or data fetching with Supabase, place SSR-specific logic in server components or route handlers and keep credentials in environment variables (not in code).

Component documentation in-repo
- src/widgets/table/README.md provides usage, props, and an example for a TransactionTable, plus notes on the underlying reusable Table. If extending tables elsewhere in the app, follow this pattern to keep a generic base in shared/ui and domain-specific composition in widgets.

Notes for future automation
- Tests are not configured. If you add a test runner (e.g., Vitest/Jest/Playwright), add npm scripts such as test, test:watch, and document single-test invocation here.
- If you introduce additional providers (e.g., theme, Zustand store hydration), colocate them in src/app/providers and compose them in a single Providers component imported by app/layout.tsx.

