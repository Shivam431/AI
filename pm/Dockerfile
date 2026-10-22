# Multi-stage Dockerfile for NextJS Frontend + Node.js (Express) Backend

# Stage 1: Build the Frontend static export
FROM node:22-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Stage 2: Build the Backend TypeScript
FROM node:22-alpine AS backend-builder
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./
RUN npm run build

# Stage 3: Runtime container
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy built backend
COPY --from=backend-builder /app/backend/dist ./dist
# Copy static frontend export into public
COPY --from=frontend-builder /app/frontend/out ./public

# Data directory for SQLite
RUN mkdir -p /app/backend/data

EXPOSE 3000

CMD ["node", "dist/server.js"]
