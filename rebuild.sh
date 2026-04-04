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
    npm run frontend:build
    npm run test:frontend
    npm run lint:frontend
elif [ "$1" = "backend" ]; then
    echo "Building backend with Nx..."
    npm ci --legacy-peer-deps
    npm run backend:build
    npm run test:backend
    npm run lint:backend
else
    echo "Usage: $0 [frontend|backend|all]"
    exit 1
fi
