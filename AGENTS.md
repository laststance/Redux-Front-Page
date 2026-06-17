# AGENTS.md

## Cursor Cloud specific instructions

This is a single-package **Next.js 16** (App Router, Turbopack) front page app, using **pnpm** and **Node 22**. The whole UI lives under `src/app/` (a single `/` route). There is no backend, database, or env vars required to run it.

### Services / commands

| Task       | Command                       | Notes                                                                                 |
| ---------- | ----------------------------- | ------------------------------------------------------------------------------------- |
| Dev server | `pnpm dev`                    | Serves on `http://localhost:3000`. Free the port first if needed.                     |
| Build      | `pnpm build`                  | Production build; works out of the box.                                               |
| Typecheck  | `pnpm exec tsc --noEmit`      | Passes cleanly. Use this for type validation since `pnpm lint` is broken (see below). |
| Lint       | `pnpm lint` / `pnpm lint:fix` | **Both currently broken** — see below.                                                |

### Known gotchas

- **`pnpm lint` is broken**: the script runs `next lint`, which was **removed in Next.js 16**. It misinterprets `lint` as a directory and fails with `Invalid project directory provided, no such directory: /workspace/lint`.
- **`pnpm lint:fix` is also broken**: it runs `eslint . -c eslint.config.mjs`, but `eslint.config.mjs` extends `ts-prefixer` via `FlatCompat`, and the installed `eslint-config-ts-prefixer` ships a flat config that `FlatCompat` tries to parse as legacy YAML, throwing `YAMLException`. This is a pre-existing dependency/config incompatibility, not an environment problem.
- For type safety, prefer `pnpm exec tsc --noEmit` until the lint setup is fixed.
- The pre-commit hook (`.husky/pre-commit`) runs `lint-staged`, which only runs `prettier --write` on changed files (not ESLint), so commits are unaffected by the lint breakage.
