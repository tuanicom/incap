# CI/CD and Code Analysis

## Overview

This repository uses an Nx monorepo layout with separate frontend and backend applications under `apps/`. CI is split across GitHub Actions, CircleCI, and AppVeyor:

- GitHub Actions runs rebuild jobs on Ubuntu for Node.js 20, 22, and 24.
- GitHub Actions also builds Docker images and pushes them to Docker Hub on `master`.
- CircleCI rebuilds frontend and backend, then uploads coverage to Coveralls and Codacy.
- AppVeyor runs the Windows rebuild path, uploads test results and coverage, monitors dependencies with Snyk, and submits SonarCloud analysis.

## Repository Layout Used by CI

- Frontend app: `apps/frontend`
- Backend app: `apps/backend`
- Nx workspace config: `nx.json`
- Root package manifest: `package.json`
- Windows rebuild scripts: `rebuild.cmd`, `rebuild.ps1`
- POSIX rebuild script: `rebuild.sh`

## Shared Rebuild Scripts

The rebuild scripts are the main entry points used by CI.

### `rebuild.cmd`

`rebuild.cmd` installs dependencies with `npm ci --legacy-peer-deps` and then runs Nx targets for either `frontend`, `backend`, or both:

- `npm run build:frontend` / `npm run build:backend`
- `npm run test:frontend:coverage` / `npm run test:backend:coverage`
- `npm run lint:frontend` / `npm run lint:backend`

When no argument is provided, it runs the full workspace build, coverage, and lint flow.

### `rebuild.ps1`

`rebuild.ps1` starts two background jobs and runs `rebuild.cmd frontend` and `rebuild.cmd backend` in parallel. This script is useful on Windows, but the current AppVeyor pipeline invokes `rebuild.cmd` directly rather than `rebuild.ps1`.

### `rebuild.sh`

`rebuild.sh` mirrors the same Nx-based behavior for Linux runners and is used by GitHub Actions and CircleCI.

## GitHub Actions

### Rebuild Workflow

**File**: `.github/workflows/rebuild.yml`

This workflow runs on:

- `push` to `master`
- `pull_request` targeting `master`
- published releases

It defines two jobs:

- `build-frontend`
- `build-backend`

Each job runs on `ubuntu-latest` and tests a Node.js matrix of `20`, `22`, and `24`. The frontend job additionally installs Angular CLI before running `bash rebuild.sh frontend`.

### Docker Image Workflow

**File**: `.github/workflows/docker-image.yml`

This workflow runs on:

- `push` to `master`
- `pull_request` targeting `master`
- published releases

It builds Docker images from:

- `apps/frontend/Dockerfile`
- `apps/backend/Dockerfile`

Image push happens only when `github.ref == 'refs/heads/master'`. Pull requests and releases still build the images, but they do not push unless the workflow is running on the `master` branch.

Published image names:

- `tuanicom/incap-frontend:latest`
- `tuanicom/incap-backend:latest`

## CircleCI

**File**: `.circleci/config.yml`

CircleCI defines three jobs:

- `build-frontend`
- `build-backend`
- `finalize`

### Frontend job

The frontend job uses `cimg/node:lts-browsers`, installs Chrome and Chromedriver, runs `bash rebuild.sh frontend`, then uploads coverage:

- Coveralls input: `apps/frontend/coverage/frontend/lcov.info`
- Codacy input: `apps/frontend/coverage/frontend/lcov.info`

Stored outputs:

- test results from `apps/frontend/tests-results`
- coverage artifacts from `apps/frontend/coverage`

### Backend job

The backend job uses `cimg/node:lts`, runs `bash rebuild.sh backend`, then uploads coverage:

- Coveralls input: `coverage/apps/backend/lcov.info`
- Codacy input: `coverage/apps/backend/lcov.info`

Stored outputs:

- test results from `apps/backend/tests-results`
- coverage artifacts from `coverage/apps/backend`

### Finalize job

The `finalize` job runs after both build jobs complete and finalizes parallel coverage reporting for:

- Coveralls
- Codacy

## AppVeyor

**File**: `appveyor.yml`

AppVeyor runs on `Visual Studio 2022` and currently:

- installs Node.js `24.13.0`
- installs `sonar-scanner`
- installs `snyk`
- installs `codecov-cli` with `pip`
- runs `rebuild.cmd`
- uploads JUnit XML test results from both apps
- uploads coverage via `codecovcli`
- runs `snyk monitor`
- runs SonarCloud analysis with PR-aware arguments when applicable

Current cache entries:

- `C:\Users\appveyor\AppData\Roaming\npm\node_modules`
- `C:\Users\appveyor\AppData\Roaming\npm-cache`
- `node_modules`

Artifacts published by AppVeyor:

- `apps/frontend/coverage`
- `coverage/apps/backend`
- `apps/frontend/eslint.json`
- `apps/backend/eslint.json`

## Nx Commands Used by CI

These root scripts are defined in `package.json`:

- `npm run build`
- `npm run build:frontend`
- `npm run build:backend`
- `npm run test`
- `npm run test:frontend`
- `npm run test:backend`
- `npm run test:coverage`
- `npm run test:frontend:coverage`
- `npm run test:backend:coverage`
- `npm run lint`
- `npm run lint:frontend`
- `npm run lint:backend`

The workspace is currently on Nx `22.6.3`.

## Test and Coverage Outputs

The repository currently uses different coverage output locations for the two apps:

- Frontend LCOV: `apps/frontend/coverage/frontend/lcov.info`
- Backend LCOV: `coverage/apps/backend/lcov.info`

JUnit test result locations used in CI:

- `apps/frontend/tests-results/tests-results.xml`
- `apps/backend/tests-results/tests-results.xml`

## SonarCloud

**File**: `sonar-project.properties`

SonarCloud is configured with:

- organization: `tuanicom-github`
- project key: `tuanicom_incap`
- sources: `apps/frontend/src/app,apps/backend/src`
- tests: `apps/frontend/src/app,apps/backend/src`
- LCOV paths:
  - `apps/frontend/coverage/frontend/lcov.info`
  - `coverage/apps/backend/lcov.info`
- ESLint reports:
  - `apps/frontend/eslint.json`
  - `apps/backend/eslint.json`

AppVeyor passes either PR analysis arguments or branch analysis arguments before calling `sonar-scanner`.

## Security Scanning

Snyk is currently integrated through AppVeyor, which runs:

- `snyk auth %snyk_token%`
- `snyk monitor --non-interactive --fail-fast`

The repository also includes `snyk` and `@snyk/protect` as dependencies, but there are no root `package.json` scripts dedicated to Snyk at the moment.

## Branch and Trigger Notes

The active CI workflows shown in this repository are branch-based on `master`, not `main`.

That applies to:

- `.github/workflows/rebuild.yml`
- `.github/workflows/docker-image.yml`
- README badges that reference `master`

## Local CI Simulation

To run the same high-level workflow locally from the repository root:

```bash
# All projects
npm ci --legacy-peer-deps
npm run build
npm run test:coverage
npm run lint
```

Or use the helper scripts:

```bash
bash rebuild.sh frontend
bash rebuild.sh backend
```

On Windows:

```powershell
.\rebuild.cmd frontend
.\rebuild.cmd backend
.\rebuild.ps1
```

## Related Files

- [Deployment Guide](./deployment.md)
- [README](../README.md)
