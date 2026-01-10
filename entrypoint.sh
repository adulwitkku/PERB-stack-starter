#!/bin/sh
set -e

echo "Running database migrations..."

# Generate migration files if needed
if [ ! -d "./drizzle" ] || [ -z "$(ls -A ./drizzle)" ]; then
  echo "Generating migration files..."
  bun run generate
fi

# Run migrations
echo "Applying migrations..."
bun run migrate

echo "Starting Next.js server..."
exec bun ./server.js