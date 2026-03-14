# back-for-wp monorepo

Monorepo for backend API, admin UI and shared packages.

## Structure

- `apps/backend` — Fastify API bootstrap with modular folders.
- `apps/admin` — Next.js admin app with auth guard and section stubs.
- `packages/shared-types` — shared TypeScript contracts.
- `packages/config` — config helpers.
- `packages/domain` — domain-level primitives.
- `packages/utils` — utility functions.
- `docs` — architecture and operational docs.

## Requirements

- Node.js 20+
- pnpm 9+

## Install

```bash
pnpm install
```

## Run dev environment

Run all apps/packages in watch mode:

```bash
pnpm dev
```

Run only backend:

```bash
pnpm --filter @repo/backend dev
```

Run only admin:

```bash
pnpm --filter @repo/admin dev
```

## Environment variables

Create `.env` in repository root or per-app files.

### Backend (`apps/backend`)

- `PORT` — API port (default: `4000`)
- `HOST` — bind host (default: `0.0.0.0`)
- `NODE_ENV` — environment (`development` by default)

### Admin (`apps/admin`)

- `NEXT_PUBLIC_API_URL` — backend base URL for browser requests.
- `ADMIN_AUTH_COOKIE` — optional override for auth cookie name (future use).

## Useful commands

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm format:check
```
