# Create image based on the official Node 8 image from the dockerhub
FROM node:23.11.1-alpine3.21 AS builder
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
# Copy files
COPY . .
# Install dependencies
RUN npm ci
# Build
RUN npm run grunt ts:default

# In order to clean from building, we restarted from the original image (multi-stage build)
FROM node:23.11.1-alpine3.21 AS runner
# Upgrade image packages
RUN apk update && apk upgrade --no-cache
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
# Copy files
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/.snyk .
COPY --from=builder /usr/src/app/dist .
# Remove map files
RUN find . -name "*.js.map" -type f -delete
# Install only dependencies (not dev)
RUN npm install --ignore-scripts --only=prod --cache-min 999999 --force
# Fix SonarQube: The node image runs with root as the default user
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot
USER nonroot
# Expose the port the app runs in
EXPOSE 4000
ENV MONGO_DB_URL=localhost:27017
# Serve the app
CMD ["node", "server.js"]
