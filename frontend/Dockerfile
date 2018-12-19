# Create image based on the official Node 8 image from the dockerhub
FROM node:alpine as builder
# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app
# Copy files
COPY . /usr/src/app
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
# Install dependecies
RUN npm install
#Build
RUN npm run build

# In order to clean from building, we restarted from the original image (multi-stage build)
FROM nginx:alpine as runner
# Clean the directory where our app will be placed
RUN rm -rf /usr/share/nginx/html/*
# Copy files
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/app/dist/frontend /usr/share/nginx/html
# Expose the port the app runs in
EXPOSE 8080
# Serve the app
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/settings.template.json > /usr/share/nginx/html/assets/settings.json && exec nginx -g 'daemon off;'"]

