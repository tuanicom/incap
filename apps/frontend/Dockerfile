# Build the Angular app from the monorepo root context.
FROM node:22-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
COPY nx.json tsconfig.base.json ./
COPY apps/frontend ./apps/frontend

RUN npm ci --legacy-peer-deps
RUN npm run build:frontend

FROM nginx:1.29.4-alpine3.23-slim AS runner

RUN rm -rf /usr/share/nginx/html/*
COPY apps/frontend/nginx.conf /src/nginx.conf
COPY --from=builder /usr/src/app/dist/apps/frontend/browser/ /usr/share/nginx/html/

EXPOSE 8080
ENV CATEGORIES_API_URL=http://localhost/api/categories
ENV USERS_API_URL=http://localhost/api/users
ENV ARTICLES_API_URL=http://localhost/api/articles

CMD ["/bin/sh", "-c", "envsubst '$CATEGORIES_API_URL,$USERS_API_URL,$ARTICLES_API_URL' < /src/nginx.conf > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]
