# AGENTS.md

## Nx Monorepo Migration Agents & Automation

This document describes the automated agents, scripts, and CI/CD bots involved in the Nx monorepo setup and maintenance for this repository.

---

## 1. Nx CLI & Nx Cloud

- **Purpose:** Orchestrates builds, tests, linting, and affected commands across all apps and libraries in the monorepo.
- **Key Commands:**
  - `npx nx build <project>`
  - `npx nx test <project>`
  - `npx nx lint <project>`
  - `npx nx affected:*`
- **Automation:** Used in all build scripts and CI/CD pipelines.

## 2. CI/CD Agents

### GitHub Actions

- **Workflow:** `.github/workflows/docker-image.yml`
- **Purpose:** Builds and pushes Docker images for frontend and backend on push/PR/Release.
- **Key Steps:**
  - Build Docker images using Nx outputs
  - Push to Docker Hub

### CircleCI

- **Workflow:** `.circleci/config.yml`
- **Purpose:** Runs Nx build, test, and lint for all projects. Uploads coverage to Coveralls and Codacy.
- **Key Steps:**
  - `npm ci --legacy-peer-deps`
  - `npx nx build/test/lint <project>`
  - Coverage upload

### AppVeyor

- **Config:** `appveyor.yml`
- **Purpose:** Windows CI for Nx monorepo. Runs build/test/lint using PowerShell.

## 3. Build & Maintenance Scripts

- **rebuild.sh / rebuild.cmd / rebuild.ps1**
  - Unified scripts for building, testing, and linting all apps using Nx CLI.
  - Accepts parameters for backend/frontend/all.

## 4. Nx Agents (Copilot/Automation)

- **Copilot/AI Agents:**
  - Used for migration, code refactoring, and CI/CD updates.
  - Ensures dependency alignment, .gitignore management, and monorepo best practices.

## 5. Source Control Automation

- **.gitignore:** Now includes `.nx` to prevent workspace state from being tracked.
- **Automated Cleanup:**
  - Run `git rm -r --cached .nx` after adding to .gitignore to remove from history.

---

## Summary
All automation and agents are now aligned for Nx 21 + Angular 21 monorepo development. CI/CD, build scripts, and source control ignore rules are up to date. For any new automation, update this file to document the agent's role and configuration.
