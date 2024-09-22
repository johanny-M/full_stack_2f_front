# Frontend Dockerfile for Next.js
FROM node:16-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies (frozen lockfile ensures versions match)
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Production stage
FROM node:16-alpine AS production

# Set working directory
WORKDIR /app

# Copy only necessary files from build stage
COPY --from=build /app/next.config.js ./
COPY --from=build /app/package.json ./
COPY --from=build /app/yarn.lock ./
COPY --from=build /app/.next ./
COPY --from=build /app/public ./public

# Install production dependencies
RUN yarn install --frozen-lockfile --production

# Expose the application port
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "start"]
