# Create image based on the official Node 8 image from the dockerhub
FROM node:alpine as builder
# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app
# Copy files
COPY . /usr/src/app
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
# Install dependencies
RUN npm install
# Build
RUN npm run grunt ts:default

# In order to clean from building, we restarted from the original image (multi-stage build)
FROM node:alpine as runner
# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app
# Copy files
COPY --from=builder /usr/src/app/package.json /usr/src/app
COPY --from=builder /usr/src/app/dist /usr/src/app/
# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app
# Install only dependencies (not dev)
RUN npm install --only=prod --cache-min 999999 
# Expose the port the app runs in
EXPOSE 4000
# Serve the app
CMD ["node", "server.js"]