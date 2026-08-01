# Build the Angular app from the monorepo root context.
FROM node:22-alpine AS builder

# Install dependencies for native modules if needed
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Copy dependency files first for better layer caching
COPY package*.json ./
COPY nx.json tsconfig.base.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps --omit=dev

# Copy source files
COPY apps/frontend ./apps/frontend

# Build the application
RUN npm run build:frontend

# Runner stage
FROM nginx:alpine AS runner

# Install wget for health check
RUN apk add --no-cache wget

# Create non-root user
RUN addgroup -S nginx && adduser -S nginx -G nginx

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx configuration
COPY apps/frontend/nginx.conf /etc/nginx/templates/nginx.conf.template

# Copy built assets from builder
COPY --from=builder --chown=nginx:nginx /usr/src/app/dist/apps/frontend/browser/ /usr/share/nginx/html/

# Set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html /etc/nginx/templates

# Switch to non-root user
USER nginx

EXPOSE 8080

ENV CATEGORIES_API_URL=http://incap-backend:4000/categories
ENV USERS_API_URL=http://incap-backend:4000/users
ENV ARTICLES_API_URL=http://incap-backend:4000/articles
ENV COMMENTS_API_URL=http://incap-backend:4000/comments

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

CMD ["/bin/sh", "-c", "envsubst '$CATEGORIES_API_URL,$USERS_API_URL,$ARTICLES_API_URL,$COMMENTS_API_URL' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
