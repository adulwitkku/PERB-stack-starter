# -----------------------------------------------------------------------------
# This Dockerfile.bun is specifically configured for projects using Bun
# For npm/pnpm or yarn, refer to the Dockerfile instead
# -----------------------------------------------------------------------------

# Use Bun's official image
FROM oven/bun:1 AS base

WORKDIR /app

# Install dependencies with bun
FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --no-save --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder --chown=nextjs:nodejs /app/db ./db

# Create drizzle directory with proper permissions for migrations
RUN mkdir -p drizzle && chown nextjs:nodejs drizzle

# Copy drizzle-kit and required dependencies from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.bin/drizzle-kit /usr/local/bin/drizzle-kit
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/drizzle-kit /app/node_modules/drizzle-kit
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/drizzle-orm /app/node_modules/drizzle-orm
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/pg /app/node_modules/pg

USER nextjs

EXPOSE 3000

CMD ["bun", "./server.js"]