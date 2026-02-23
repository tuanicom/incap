#!/bin/bash
set -e

# Use Nx to build, test, and lint the specified app or all apps
if [ $# -eq 0 ] || [ "$1" = "all" ]; then
    echo "Building all apps with Nx..."
    npm ci --legacy-peer-deps
    npm run build
    npm run test
    npm run lint
elif [ "$1" = "frontend" ]; then
    echo "Building frontend with Nx..."
    npm ci --legacy-peer-deps
    npx nx build frontend
    npx nx test frontend
    npx nx lint frontend
elif [ "$1" = "backend" ]; then
    echo "Building backend with Nx..."
    npm ci --legacy-peer-deps
    npx nx build backend
    npx nx test backend
    npx nx lint backend
else
    echo "Usage: $0 [frontend|backend|all]"
    exit 1
fi