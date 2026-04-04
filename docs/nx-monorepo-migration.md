# Nx Monorepo Migration

## Overview

The project has migrated to an Nx monorepo structure for improved scalability, maintainability, and unified tooling across frontend and backend.

### Key Changes
- All apps are now under the `apps/` directory: `apps/frontend` and `apps/backend`.
- Nx CLI (`npx nx ...`) is used for all builds, tests, and linting.
- Dependencies are consolidated at the root `package.json`.
- CI/CD and Docker files updated for Nx structure.
- `.nx` folder is now ignored in source control.

## Nx Usage
- Build: `npx nx build <project>`
- Test: `npx nx test <project>`
- Lint: `npx nx lint <project>`
- Affected: `npx nx affected:build|test|lint`

## CI/CD
- All pipelines (CircleCI, GitHub Actions, AppVeyor) use Nx commands.
- Docker builds reference `apps/frontend` and `apps/backend`.

## Source Control
- `.nx` is ignored and removed from git history.

## See also
- [AGENTS.md](../AGENTS.md) for automation details.
