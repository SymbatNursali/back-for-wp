# Architecture Notes

## Monorepo layout

- `apps/backend`: HTTP API and domain orchestration.
- `apps/admin`: Next.js admin console.
- `packages/*`: shared cross-cutting libraries.

## Backend module boundaries

Each module under `apps/backend/src/modules/*` owns:

- route registration
- application service orchestration
- module-specific DTOs and adapters (to be expanded)

This starter only includes route stubs for future implementation.
