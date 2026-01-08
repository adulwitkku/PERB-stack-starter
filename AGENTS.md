# AGENTS.md - Repository Guidelines

## Build/Lint/Test Commands

- **Start development server**: `bun run dev`
- **Build production**: `bun run build`
- **Start production server**: `bun run start`
- **Run lint**: `bun run lint`
- **Run a single test**: `bun playwright test tests/example.spec.ts`
- **Run all tests**: `bun playwright test`
- **Generate Drizzle schema**: `bun run generate`
- **Migrate database**: `bun run migrate`
- **Open Drizzle Studio**: `bun run studio`

## Code Style Guidelines

### Imports
- Use absolute imports with `@/` prefix (e.g., `@/lib/auth.ts`)
- Group imports: built-in, external, local
- Sort alphabetically within groups
- Use named imports, avoid wildcard imports

### Formatting
- Follow ESLint + Next.js defaults (from eslint.config.mjs)
- Use TypeScript strict mode
- 2-space indentation
- 80-character line limit
- Use TypeScript interfaces/types for data structures

### Naming Conventions
- Components: PascalCase (e.g., `MyComponent.tsx`)
- Functions/variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Files: kebab-case (e.g., `my-component.tsx`)

### Error Handling
- Use try/catch for async operations
- Handle API errors gracefully
- Provide user-friendly error messages
- Log errors for debugging

### React/Next.js
- Use TypeScript with React 19
- Follow Next.js App Router patterns
- Use Server Components where possible
- Implement proper loading/error states

### Database (Drizzle)
- Use Drizzle ORM for database operations
- Define schema in `db/schema.ts`
- Use type-safe queries
- Handle migrations with `bun run migrate`

### API Development (Elysia)
- Follow MVC structure: `src/modules/{module}/index.ts` (controller), `service.ts`, `model.ts`
- Use Drizzle ORM for database operations
- Implement proper error handling
- Follow schema best practices

### Testing
- Use Playwright for E2E tests
- Test critical user flows
- Mock external services when needed
- Write descriptive test names

### Dependencies
- Keep dependencies updated
- Use exact versions in package.json
- Follow semantic versioning
- Remove unused dependencies regularly