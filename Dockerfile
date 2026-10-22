# Multi-stage build for TridionX Enterprise Platform
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production runtime stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/services ./services
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

EXPOSE 3009 4001
CMD ["npm", "run", "preview", "--", "--port", "3009", "--host"]
