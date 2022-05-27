# Create image based on the official Node 8 image from the dockerhub
FROM node:alpine as builder
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
# Copy files
COPY . .
# Install dependecies
RUN npm install
#Build
RUN npm run build

# In order to clean from building, we restarted from the original image (multi-stage build)
FROM nginx:1.22.0-alpine as runner
# Clean the directory where our app will be placed
RUN rm -rf /usr/share/nginx/html/*
# Copy files
COPY nginx.conf nginx.tpl.conf
COPY --from=builder /usr/src/app/dist/frontend /usr/share/nginx/html
COPY src/assets/settings.prod.json /usr/share/nginx/html/assets/settings.json
# Expose the port the app runs in
EXPOSE 8080
ENV CATEGORIES_API_URL=http://localhost/api/categories
# Serve the app
CMD ["/bin/sh",  "-c",  "envsubst '${CATEGORIES_API_URL}' < nginx.tpl.conf > /etc/nginx/nginx.conf && cat  /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]

