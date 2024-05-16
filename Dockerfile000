# Use Node.js image as base for development
FROM node:latest AS development

# Set environment variable to development
ENV NODE_ENV development

# Set working directory
WORKDIR /app

# Cache and install dependencies using package.json and yarn.lock
COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps

# Copy all application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app using npm
CMD [ "npm", "start" ]