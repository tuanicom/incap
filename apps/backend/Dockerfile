# Build the bundled backend from the monorepo root context.
FROM node:22-alpine AS builder

# Install dependencies for native modules if needed
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Copy dependency files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps --omit=dev

# Copy source files
COPY apps/backend ./apps/backend

# Build the application
RUN npm --prefix apps/backend run build

# Runner stage
FROM node:22-alpine AS runner

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /usr/src/app

# Create non-root user
RUN addgroup -S node && adduser -S node -G node

# Copy built assets from builder
COPY --from=builder --chown=node:node /usr/src/app/apps/backend/dist/server.js ./server.js

# Switch to non-root user
USER node

EXPOSE 4000

ENV NODE_ENV=production
ENV MONGO_DB_URL=localhost:27017

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
