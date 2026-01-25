# Create image based on the official Node 8 image from the dockerhub
FROM node:alpine AS builder
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
# Copy files
COPY . .
# Install dependecies
RUN npm ci
#Build
RUN npm run build

# In order to clean from building, we restarted from the original image (multi-stage build)
FROM nginx:1.29.4-alpine3.23-slim AS runner
# Upgrade image packages
# RUN apk update && apk upgrade --no-cache
# Clean the directory where our app will be placed
RUN rm -rf /usr/share/nginx/html/*
# Copy files
COPY nginx.conf nginx.tpl.conf
COPY --from=builder /usr/src/app/dist/frontend /usr/share/nginx/html
# Expose the port the app runs in
EXPOSE 8080
# ENV to specify REST API urls
ENV CATEGORIES_API_URL=http://localhost/api/categories
ENV USERS_API_URL=http://localhost/api/users
ENV ARTICLES_API_URL=http://localhost/api/articles
# Serve the app
CMD ["/bin/sh",  "-c",  "envsubst '$CATEGORIES_API_URL,$USERS_API_URL,$ARTICLES_API_URL' < nginx.tpl.conf > /etc/nginx/nginx.conf && cat /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]

