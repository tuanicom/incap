# Create image based on the official Node image from dockerhub
FROM node:alpine AS builder
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
# Copy root files and apps
COPY package*.json ./
COPY .nx ./.nx
COPY nx.json tsconfig.base.json ./
COPY apps/frontend ./apps/frontend
# Install dependencies
RUN npm ci --legacy-peer-deps
# Build frontend via Nx
RUN npm run frontend:build

# In order to clean from building, we restarted from the original image (multi-stage build)
FROM nginx:1.29.4-alpine3.23-slim AS runner
# Upgrade image packages
# RUN apk update && apk upgrade --no-cache
# Clean the directory where our app will be placed
RUN rm -rf /usr/share/nginx/html/*
# Copy files
COPY apps/frontend/nginx.conf apps/frontend/nginx.tpl.conf /src/
COPY --from=builder /usr/src/app/dist/apps/frontend /usr/share/nginx/html
# Expose the port the app runs in
EXPOSE 8080
# ENV to specify REST API urls
ENV CATEGORIES_API_URL=http://localhost/api/categories
ENV USERS_API_URL=http://localhost/api/users
ENV ARTICLES_API_URL=http://localhost/api/articles
# Serve the app
CMD ["/bin/sh",  "-c",  "envsubst '$CATEGORIES_API_URL,$USERS_API_URL,$ARTICLES_API_URL' < /src/nginx.tpl.conf > /etc/nginx/nginx.conf && cat /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]

