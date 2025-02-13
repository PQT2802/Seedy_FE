# Stage 1: Build the Next.js app
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy package files first to optimize caching
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the project
COPY . .

# Build Next.js for production
RUN npm run build

# Stage 2: Create minimal production image
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

# Expose port and run the application
EXPOSE 3000
CMD ["npm", "run", "start"]
