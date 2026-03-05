# Create image based on the official Node LTS image from dockerhub
FROM node:lts-alpine AS builder
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
# Copy root files and apps
COPY package*.json ./
COPY .nx ./.nx
COPY nx.json tsconfig.base.json ./
COPY apps/backend ./apps/backend
# Install dependencies
RUN npm ci --legacy-peer-deps
# Build backend via Nx
RUN npm run backend:build

# In order to clean from building, we restarted from the original image (multi-stage build)
FROM node:lts-alpine AS runner
# Upgrade image packages
RUN apk update && apk upgrade --no-cache
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
# Copy package files
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/apps/backend/.snyk .
COPY --from=builder /usr/src/app/dist/apps/backend dist/
# Remove map files
RUN find . -name "*.js.map" -type f -delete
# Install only dependencies (not dev)
RUN npm install --legacy-peer-deps --ignore-scripts --only=prod
# Fix SonarQube: The node image runs with root as the default user
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot
USER nonroot
# Expose the port the app runs in
EXPOSE 4000
ENV MONGO_DB_URL=localhost:27017
# Serve the app
CMD ["node", "dist/server.js"]
