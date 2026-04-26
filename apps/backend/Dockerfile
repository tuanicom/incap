# Build the bundled backend from the monorepo root context.
FROM node:22.22-alpine3.23 AS builder
WORKDIR /usr/src/app

COPY package*.json ./
COPY apps/backend ./apps/backend

RUN npm ci --legacy-peer-deps
RUN npm --prefix apps/backend run build

FROM node:22.22-alpine3.23 AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/apps/backend/dist/server.js ./server.js

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot
USER nonroot

EXPOSE 4000
ENV NODE_ENV=production
ENV MONGO_DB_URL=localhost:27017

CMD ["node", "server.js"]
