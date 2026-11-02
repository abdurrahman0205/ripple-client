<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ripple-client

Single Next.js 16 App Router app (React 19.3, TS strict) — not a monorepo. All source is under `src/`: routes in `src/app`, components in `src/components`, helpers in `src/lib`. Alias `@/*` → `./src/*`. `README.md` is untouched create-next-app boilerplate; trust config/code over it.

## Commands

- `npm run dev` — dev server (Turbopack is the default bundler in Next 16).
- `npm run lint` — runs `biome check`, which **reports only; it does not write fixes** and currently fails on pre-existing issues in `src/components/navbar/` — don't assume your change broke it.
- `npm run format` — `biome format --write` (formatting only). For format + safe lint fixes + import sorting in one step: `npx biome check --write`.
- **No `test` or `typecheck` script exists.** Typecheck with `npx tsc --noEmit`. There are no test suites, no CI workflows, and no pre-commit hooks — before finishing, run `npm run lint && npx tsc --noEmit`.
- Add UI components with `npx shadcn add <component>` (`components.json` is already configured; local CLI, no network install needed).

## Stack quirks (differs from what you probably know)

- **shadcn components here build on `@base-ui/react`, not Radix** (style `base-nova`). Most shadcn examples/docs online assume Radix — don't "correct" imports back.
- `cn` is an npm package; `src/lib/utils.ts` only re-exports it. Existing code imports both `from "cn"` and `from "@/lib/utils"` — either is fine, don't churn.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`. Design tokens, `@theme`, and `@import "shadcn/tailwind.css"` live in `src/app/globals.css`, processed by the `@tailwindcss/turbopack` loader declared in `next.config.ts`. Dark mode = `.dark` class via `next-themes` (`ThemeProvider` wraps the app in `src/app/layout.tsx`).
- React Compiler is enabled (`reactCompiler: true` + `babel-plugin-react-compiler` in `package.json`): keep components pure, no render side effects, no manual `memo` needed.
- Layout/page components use the generated global helpers `LayoutProps<"/">` / `PageProps<...>` — no import required; types are generated into `.next/types` by `next dev` / `next build`.
- No env vars in use: nothing under `src/` reads `process.env`, and `.env*` is gitignored.
