# frontend/Dockerfile
# Multi-stage build for production Next.js 14 application

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies based on available lock file
RUN \
  if [ -f yarn.lock ]; then yarn install --frozen-lockfile --silent; \
  elif [ -f package-lock.json ]; then npm ci --silent; \
  else npm install --silent; \
  fi

# ============================================
# Stage 2: Builder
# ============================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time environment variables
# These are inlined at build time by Next.js
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build arguments for build-time only vars
# Note: NEXT_PUBLIC_* vars are inlined at build time
# For runtime config, we use relative URLs + reverse proxy
ARG NEXT_PUBLIC_SITE_URL=https://aicoelektronik.com
ARG NEXT_PUBLIC_IMAGE_DOMAINS=

ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_IMAGE_DOMAINS=${NEXT_PUBLIC_IMAGE_DOMAINS}

# Build the application with standalone output
RUN npm run build

# ============================================
# Stage 3: Production Runner
# ============================================
FROM node:18-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Add non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only necessary files from builder
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set runtime environment variables
# These can be overridden at container runtime
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the Next.js server
CMD ["node", "server.js"]
