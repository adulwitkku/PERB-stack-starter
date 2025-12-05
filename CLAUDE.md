# Project Context and Knowledge Base

## Project Overview
This is a PERB-stack-starter project using:
- **P**ostgreSQL (Database)
- **E**lysiaJS (Backend API Framework)
- **R**eact/Next.js (Frontend)
- **B**un (Runtime)

The project integrates ElysiaJS for backend API services with Next.js frontend, featuring authentication via Better Auth.

## ElysiaJS Framework Knowledge

### Core Concepts
ElysiaJS is an ergonomic web framework for building backend servers with Bun. Key characteristics:
- **Type-Safe**: Automatic type inference without explicit TypeScript declarations
- **Performance**: Optimized for Bun runtime, comparable to Golang/Rust frameworks
- **Standard Compliant**: Supports OpenAPI, WinterTC, and Standard Schema
- **Platform Agnostic**: Works on Bun, Cloudflare Workers, Vercel Edge Functions

### Basic Usage
```typescript
import { Elysia, t } from 'elysia'

new Elysia()
    .get('/', 'Hello Elysia')
    .get('/user/:id', ({ params: { id }}) => id)
    .post('/form', ({ body }) => body)
    .listen(3000)
```

### Type System and Validation
- Use `Elysia.t` schema builder for runtime and compile-time validation
- Supports Standard Schema (Zod, Valibot, ArkType, Effect Schema, Yup, Joi)
- Automatic type inference from route definitions and validation schemas

```typescript
import { Elysia, t } from 'elysia'

new Elysia()
    .get('/user/:id', ({ params: { id } }) => id, {
        params: t.Object({
            id: t.Number()
        })
    })
    .listen(3000)
```

### Best Practices - Folder Structure
Recommended feature-based folder structure:
```
src/
  modules/
    auth/
      index.ts (Elysia controller)
      service.ts (business logic)
      model.ts (validation schemas)
    user/
      index.ts
      service.ts
      model.ts
  utils/
```

### Essential Patterns
- **Route**: HTTP method registration (.get, .post, .put, .delete, .patch)
- **Handler**: Request processing with context (params, query, body, headers, cookie, set)
- **Validation**: Schema validation for params, query, body, headers, response
- **Lifecycle**: beforeHandle, afterHandle, onError, transform hooks
- **Plugin**: Modular code organization and reusability
- **Guard**: Scoped validation and lifecycle hooks

### Integration with Next.js
When integrating ElysiaJS with Next.js (as in this project):
1. Create API route handler in `app/api/[[...slugs]]/route.ts`
2. Export Elysia app type for end-to-end type safety
3. Use Eden Treaty for type-safe API calls from frontend

```typescript
// app/api/[[...slugs]]/route.ts
import { Elysia } from 'elysia'

const app = new Elysia({ prefix: '/api' })
    .get('/hello', () => 'Hello from Elysia')

export const GET = app.handle
export const POST = app.handle
export type App = typeof app
```

### End-to-End Type Safety with Eden
```typescript
// Frontend
import { treaty } from '@elysiajs/eden'
import type { App } from './server'

const api = treaty<App>('localhost:3000')
const { data } = await api.user({ id: 617 }).get()
```

### Official Plugins
- **@elysiajs/bearer**: Bearer token authentication
- **@elysiajs/cors**: Cross-Origin Resource Sharing
- **@elysiajs/jwt**: JSON Web Token support
- **@elysiajs/openapi**: OpenAPI/Swagger documentation
- **@elysiajs/static**: Static file serving
- **@elysiajs/html**: HTML rendering
- **@elysiajs/apollo**: Apollo GraphQL integration

### Integration Support
- Better Auth integration for authentication
- Drizzle ORM for database operations
- Prisma ORM alternative
- React Email for email templates
- AI SDK integration
- WebSocket support

### Documentation References
Full ElysiaJS documentation available in:
- `llms/elysiajs-full.txt` - Complete documentation (22,118 lines)
- `llms/elysiajs.txt` - Quick reference table of contents

## Better Auth UI Knowledge

### Overview
`@daveyplate/better-auth-ui` provides ready-to-use shadcn/ui styled components for authentication features, seamlessly integrating with `better-auth`.

### Key Features
- Fully responsive UI components
- TailwindCSS and shadcn/ui styling
- First-class integration with better-auth
- Customizable and themeable
- Built for Next.js and React applications

### Core Components

#### Authentication Components
- `<AuthView />`: Main authentication view handler
- `<AuthCard />`: Card-based auth forms
- `<SignInCard />`: Sign-in form
- `<SignUpCard />`: Sign-up form
- `<ForgotPasswordCard />`: Password reset request
- `<ResetPasswordCard />`: New password form
- `<MagicLinkCard />`: Passwordless authentication

#### Account Management
- `<AccountView />`: Complete account management UI with navigation
- `<AccountSettingsCards />`: All account-related settings
- `<SecuritySettingsCards />`: Security settings (password, sessions, 2FA)
- `<UpdateAvatarCard />`: User avatar management
- `<UpdateNameCard />`: Name updates
- `<UpdateUsernameCard />`: Username management
- `<ChangeEmailCard />`: Email change
- `<ChangePasswordCard />`: Password updates
- `<ProvidersCard />`: Social provider linking
- `<SessionsCard />`: Active session management
- `<DeleteAccountCard />`: Account deletion

#### User Interface
- `<UserButton />`: User menu button with dropdown
- `<RedirectToSignIn />`: Authentication guard
- `<SignedIn>` / `<SignedOut>`: Conditional rendering

### Provider Configuration
```typescript
"use client"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            Link={Link}
            viewPaths={{
                SIGN_IN: "sign-in",
                SIGN_OUT: "sign-out",
                SIGN_UP: "sign-up",
                FORGOT_PASSWORD: "forgot-password",
                RESET_PASSWORD: "reset-password",
                MAGIC_LINK: "magic-link"
            }}
            account={{
                basePath: "/account",
                viewPaths: {
                    SETTINGS: "settings",
                    SECURITY: "security",
                    API_KEYS: "api-keys",
                    ORGANIZATIONS: "organizations"
                }
            }}
        >
            {children}
        </AuthUIProvider>
    )
}
```

### Advanced Features

#### Additional Fields
Define custom fields for signup and settings:
```typescript
<AuthUIProvider
    additionalFields={{
        company: {
            label: "Company",
            placeholder: "Your company name",
            required: true,
            type: "string"
        },
        age: {
            label: "Age",
            type: "number",
            validate: (value: string) => parseInt(value) >= 18
        }
    }}
    settings={{ fields: ["company", "age"] }}
    signUp={{ fields: ["company", "age"] }}
/>
```

#### API Keys Management
Enable programmatic API authentication:
```typescript
<AuthUIProvider
    apiKey={{
        prefix: "app_",
        metadata: {
            environment: "production",
            version: "v1"
        }
    }}
/>
```

#### Organizations Support
Multi-tenant system with role-based access:
```typescript
<AuthUIProvider
    organization={{
        logo: {
            upload: async (file) => uploadedUrl,
            size: 256,
            extension: "png"
        },
        customRoles: [
            { role: "developer", label: "Developer" },
            { role: "viewer", label: "Viewer" }
        ]
    }}
/>
```

### Customization

#### Custom Auth Paths
```typescript
viewPaths={{
    SIGN_IN: "login",
    SIGN_OUT: "logout",
    SIGN_UP: "register"
}}
```

#### Localization
```typescript
localization={{
    SIGN_IN: "Log in",
    SIGN_UP: "Create Account",
    EMAIL_PLACEHOLDER: "your-email@example.com"
}}
```

#### Using Backend Error Messages
```typescript
<AuthUIProvider
    localizeErrors={false}  // Use backend-provided error messages
/>
```

### Documentation Reference
Full Better Auth UI documentation available in:
- `llms/better-auth-ui.txt` - Complete documentation (5,194 lines)

## Project-Specific Integration

### Current Setup
The project integrates ElysiaJS backend with Next.js frontend:
- API routes handled by ElysiaJS at `app/api/[[...slugs]]/route.ts`
- Authentication managed by Better Auth with UI components
- Database: PostgreSQL with Drizzle ORM
- Type-safe API calls using Eden Treaty
- Docker support for containerized deployment

### Authentication Flow
1. Better Auth handles authentication logic
2. Better Auth UI provides React components
3. ElysiaJS API routes process authentication requests
4. Client-side auth state managed via Better Auth client
5. Protected routes use authentication guards

### File Structure
```
app/
  api/[[...slugs]]/route.ts  # ElysiaJS API handler
  auth/[path]/page.tsx        # Auth pages
  account/[path]/page.tsx     # Account management
  providers.tsx               # Auth UI Provider setup
db/
  index.ts                    # Database connection
  schema.ts                   # Drizzle schema
lib/
  auth.ts                     # Better Auth configuration
  auth-client.ts              # Client-side auth
llms/
  elysiajs-full.txt          # ElysiaJS documentation
  elysiajs.txt               # ElysiaJS TOC
  better-auth-ui.txt         # Better Auth UI documentation
```

## Development Guidelines

### When Building Features
1. Use ElysiaJS patterns for backend API routes
2. Leverage Better Auth UI components for authentication UI
3. Follow type-safe practices with Elysia.t or Standard Schema
4. Use Eden Treaty for frontend-to-backend communication
5. Organize code in feature-based folders

### Type Safety
- Export ElysiaJS app type for frontend consumption
- Use Eden Treaty for type-safe API calls
- Leverage automatic type inference from validation schemas
- Define response types in route schemas

### Best Practices
- Keep business logic in service layers
- Use Elysia controllers for HTTP handling only
- Define validation schemas in model files
- Use guard for shared validation/authentication
- Leverage lifecycle hooks for cross-cutting concerns

### Testing
- Use Elysia's built-in testing utilities
- Test API endpoints with Eden Treaty
- Follow test patterns from ElysiaJS documentation

---

**Note**: This project follows modern TypeScript best practices with emphasis on type safety, developer experience, and performance optimization. Refer to the documentation files in `llms/` for detailed API references and examples.

