# Use the official Node.js 14 Alpine image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src

# Copy package files for better caching during npm install
COPY package.json package-lock.json ./

# Copy package files for specific subdirectories
COPY apps/uci/web/package.json ./apps/uci/web/
COPY packages/chat-ui/package.json ./packages/chat-ui/
COPY packages/socket/package.json ./packages/socket/
COPY tsdx/socket-package/package.json ./tsdx/socket-package/

# Install Python and Node-gyp system dependencies
RUN apk update && apk add python3

# Set an environment variable for Python executable
ENV PYTHON=/usr/bin/python3

# Install the latest Node-gyp globally
RUN npm install -g node-gyp

# Install project dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Set the default command to run the application
CMD ["npm", "run", "dev"]