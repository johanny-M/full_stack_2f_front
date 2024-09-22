# Frontend Dockerfile for Next.js
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json from root
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:16-alpine AS production

# Set working directory
WORKDIR /app

# Copy necessary files from build stage
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
COPY --from=build /app/.next ./
COPY --from=build /app/public ./public

# Install production dependencies
RUN npm install --production

# Expose the application port
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
