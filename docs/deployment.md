# Deployment Guide

## Overview

This repository ships deployment assets for three main scenarios:

- local runtime wiring with `docker-compose.yml`
- local image build or image pull flows with `docker-compose-build.yml` and `docker-compose-image.yml`
- Kubernetes manifests under `deploy/`

The frontend and backend Dockerfiles live in the Nx monorepo under:

- `apps/frontend/Dockerfile`
- `apps/backend/Dockerfile`

## Docker Images

### Frontend Image

**File**: `apps/frontend/Dockerfile`

The frontend image is built from the monorepo root context.

Build stage:

- base image: `node:22-alpine`
- copies `package*.json`, `nx.json`, `tsconfig.base.json`, and `apps/frontend`
- installs dependencies with `npm ci --legacy-peer-deps`
- runs `npm run build:frontend`

Runtime stage:

- base image: `nginx:1.29.4-alpine3.23-slim`
- serves files from `dist/apps/frontend/browser/`
- exposes port `8080`
- injects runtime API endpoints into nginx config via `envsubst`

Default runtime environment variables:

- `CATEGORIES_API_URL=http://localhost/api/categories`
- `USERS_API_URL=http://localhost/api/users`
- `ARTICLES_API_URL=http://localhost/api/articles`

Published image tag:

- `tuanicom/incap-frontend:latest`

### Backend Image

**File**: `apps/backend/Dockerfile`

The backend image is also built from the monorepo root context.

Build stage:

- base image: `node:22-alpine`
- copies `package*.json` and `apps/backend`
- installs dependencies with `npm ci --legacy-peer-deps`
- runs `npm --prefix apps/backend run build`

Runtime stage:

- base image: `node:22-alpine`
- copies `apps/backend/dist/server.js` into the runtime image
- creates and uses a non-root user
- exposes port `4000`

Default runtime environment variables:

- `NODE_ENV=production`
- `MONGO_DB_URL=localhost:27017`

Published image tag:

- `tuanicom/incap-backend:latest`

## Compose Files

### `docker-compose.yml`

This file documents runtime relationships between the three services and is the simplest local orchestration entry point.

Defined services:

- `frontend`
- `backend`
- `mongodb`

Current configuration in the file:

- frontend publishes `8080:8080`
- frontend uses:
  - `CATEGORIES_API_URL=http://backend:4000/categories`
  - `USERS_API_URL=http://backend:4000/users`
  - `ARTICLES_API_URL=http://backend:4000/articles`
- backend uses `MONGO_DB_URL=mongodb:27017`
- mongodb uses the official `mongo` image

Important limitation: this file does not currently declare `build`, `image`, backend port publishing, MongoDB port publishing, or a persistent volume. It is useful as a lightweight wiring reference, but it is not a fully self-contained production compose stack.

### `docker-compose-build.yml`

This file builds local images from source:

- frontend build context: `apps/frontend`
- backend build context: `apps/backend`
- mongodb image: `mongo`

Use it when you want Docker to build the application images locally.

### `docker-compose-image.yml`

This file pulls prebuilt images instead of building them:

- `tuanicom/incap-frontend`
- `tuanicom/incap-backend`

Both services use `pull_policy: always`.

### `deploy/docker-compose.yml`

This file is a separate deployment-oriented compose reference under `deploy/`. It uses service names `incap-frontend` and `incap-backend`, publishes both application ports, and points the frontend category API to `http://localhost:4000/categories`.

Unlike the root `docker-compose.yml`, it does not define all three frontend API environment variables.

## Running with Docker

Examples from the repository root:

```bash
# Start the lightweight runtime compose file
docker-compose up -d

# Build local images from source definitions
docker-compose -f docker-compose-build.yml build

# Run using published images
docker-compose -f docker-compose-image.yml pull
docker-compose -f docker-compose-image.yml up -d
```

## Kubernetes Manifests

Kubernetes assets are stored in `deploy/`:

- `deploy/backend-deployment.yaml`
- `deploy/backend-service.yaml`
- `deploy/frontend-deployment.yaml`
- `deploy/frontend-service.yaml`
- `deploy/mongodb-deployment.yaml`
- `deploy/mongodb-service.yaml`

These files appear to be Kompose-generated manifests derived from an older compose definition and should be treated as baseline manifests rather than polished production Kubernetes resources.

### Backend Deployment

**File**: `deploy/backend-deployment.yaml`

Current characteristics:

- `apiVersion: extensions/v1beta1`
- image: `tuanicom/incap-backend`
- env: `MONGO_DB_URL=mongodb:27017`
- container port: `4000`
- security context sets `allowPrivilegeEscalation: false`, `runAsNonRoot: true`, and drops all capabilities

### Backend Service

**File**: `deploy/backend-service.yaml`

Current characteristics:

- service type: `NodePort`
- service port: `4000`
- target port: `4000`
- node port: `30400`

### Frontend Deployment

**File**: `deploy/frontend-deployment.yaml`

Current characteristics:

- `apiVersion: extensions/v1beta1`
- image: `tuanicom/incap-frontend`
- only one env variable is present: `CATEGORIES_API_URL=http://localhost:4000`
- container port: `8080`

Note that this does not mirror the frontend Dockerfile defaults, which define three API URL variables.

### Frontend Service

**File**: `deploy/frontend-service.yaml`

Current characteristics:

- service type: `NodePort`
- service port: `8080`
- target port: `8080`
- node port: `30080`

### MongoDB

**Files**:

- `deploy/mongodb-deployment.yaml`
- `deploy/mongodb-service.yaml`

Current characteristics:

- image: `mongo`
- service port: `27017`
- no persistent volume claim is defined in the repository

## Applying the Kubernetes Manifests

```bash
kubectl create namespace incap
kubectl apply -f deploy/mongodb-service.yaml -n incap
kubectl apply -f deploy/mongodb-deployment.yaml -n incap
kubectl apply -f deploy/backend-service.yaml -n incap
kubectl apply -f deploy/backend-deployment.yaml -n incap
kubectl apply -f deploy/frontend-service.yaml -n incap
kubectl apply -f deploy/frontend-deployment.yaml -n incap
```

## Configuration Summary

### Frontend

The frontend runtime can be configured with:

- `CATEGORIES_API_URL`
- `USERS_API_URL`
- `ARTICLES_API_URL`

Those variables are consumed by `apps/frontend/nginx.conf` and substituted at container startup by the frontend Docker image.

The application code also still contains `assets/settings.json` support, so there are effectively two configuration mechanisms in the repository today:

- static/runtime file-based app settings inside the frontend app
- nginx proxy endpoint injection through container environment variables

### Backend

The backend runtime currently depends on:

- `MONGO_DB_URL`

The default value in the server code and Dockerfile is `localhost:27017`.

## Known Gaps in the Current Deployment Assets

These are important operational caveats in the repository as it exists today:

- The root `docker-compose.yml` is incomplete for a full fresh deployment because it does not specify image builds or published backend and MongoDB ports.
- The root compose file also does not define a named volume for MongoDB persistence.
- The Kubernetes deployments still use deprecated `extensions/v1beta1` API versions.
- The Kubernetes services are `NodePort`, not `ClusterIP` or `LoadBalancer`.
- The frontend Kubernetes deployment sets only `CATEGORIES_API_URL`, while the frontend Docker image expects three API URL variables.
- No health probes are defined in the Kubernetes manifests.
- No persistent storage manifest for MongoDB is present under `deploy/`.

## Related Files

- [CI/CD and Code Analysis](./cicd-and-analysis.md)
- [README](../README.md)
