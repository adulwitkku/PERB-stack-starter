# PERB Stack Starter

> **P**ostgres + **E**lysia + **R**eact (Next.js) + **B**un
> Universal Starter Template for building Web, iOS, Android apps from a single codebase

## 🎯 Project Overview

PERB Stack Starter is a full-stack template that includes:
- **Frontend**: Next.js 16 + React 19 + Tailwind CSS 4
- **Backend API**: Elysia.js (Bun runtime) - runs as Next.js API routes
- **Database**: PostgreSQL + Drizzle ORM
- **Authentication**: Better Auth (email/password + OAuth)
- **Mobile/Desktop**: Tauri 2 (iOS, Android, macOS, Windows, Linux)
- **i18n**: next-intl (EN/TH)
- **UI Components**: shadcn/ui (built on Radix UI primitives)
- **Testing**: Playwright

---

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── [locale]/           # i18n routes (en, th)
│   │   ├── auth/           # Authentication pages (sign-in, sign-up, etc.)
│   │   ├── account/        # User account pages (settings, profile)
│   │   ├── organization/   # Organization management
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── providers.tsx   # Theme, Auth, i18n providers
│   │   └── page.tsx        # Homepage
│   └── api/
│       └── [[...slugs]]/   # Elysia API catch-all route
│           └── route.ts    # API entry point
├── components/
│   ├── navbar.tsx          # Main navigation
│   └── ui/                 # shadcn/ui components
├── db/
│   ├── index.ts            # Database connection
│   └── schema.ts           # Drizzle schema (user, session, account, verification)
├── i18n/
│   ├── routing.ts          # Locale configuration
│   └── request.ts          # Server-side locale
├── lib/
│   ├── auth.ts             # Better Auth server config
│   ├── auth-client.ts      # Better Auth client (+ Tauri support)
│   └── utils.ts            # Utility functions (cn)
├── messages/               # Translation files
│   ├── en.json
│   └── th.json
├── src-tauri/              # Tauri native app config
├── tests/                  # Playwright E2E tests
├── llms/                   # LLM documentation files
└── drizzle/                # Database migrations (auto-generated)
```

---

## 🚀 Quick Commands

```bash
# Development
bun dev                    # Start Next.js dev server (http://localhost:3000)
bun run studio             # Open Drizzle Studio (database GUI)

# Database
bun run generate           # Generate migrations from schema changes
bun run migrate            # Apply migrations to database

# Mobile/Desktop (Tauri)
bun run android            # Run Android dev build
bun run ios                # Run iOS dev build (iPhone 15)
bun run tauri              # Tauri CLI commands

# Testing
bun run test               # Run Playwright tests
bun run test:ui            # Run tests with UI

# Docker
docker compose up          # Start PostgreSQL
docker compose down        # Stop PostgreSQL
```

---

## 🔐 Authentication Flow

### Server-side (lib/auth.ts)
```typescript
// Better Auth configuration
- Drizzle adapter (PostgreSQL)
- Email/Password enabled
- Forgot password enabled
- Google OAuth ready
- OpenAPI + Bearer token plugins
```

### Client-side (lib/auth-client.ts)
```typescript
// Supports both web and Tauri
- Auto-detects Tauri environment
- Bearer token storage for mobile
- Tauri HTTP plugin for Android WebView fix
```

### Auth Routes
- `/auth/sign-in` - Sign in page
- `/auth/sign-up` - Sign up page
- `/auth/forgot-password` - Password reset
- `/account/settings` - User settings

---

## 🗄️ Database Schema

**Tables** (defined in `db/schema.ts`):
- `user` - User accounts
- `session` - Active sessions
- `account` - OAuth accounts & credentials
- `verification` - Email verification tokens

---

## 🌍 Internationalization (i18n)

**Locales**: English (en), Thai (th)  
**Config**: `i18n/routing.ts`  
**Messages**: `messages/en.json`, `messages/th.json`

```typescript
// Usage in components
import { useTranslations } from 'next-intl';
const t = useTranslations('auth');
t('signIn') // => "Sign In" or "เข้าสู่ระบบ"
```

---

## 📱 Tauri (Mobile/Desktop)

**Config**: `src-tauri/tauri.conf.json`

Supported platforms:
- iOS (iPhone, iPad)
- Android
- macOS
- Windows
- Linux

**Important**: Android WebView has issues with POST body - the client uses `@tauri-apps/plugin-http` to fix this.

---

## 🔧 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Better Auth
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000

# OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# API URL (for Tauri apps)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 📚 Knowledge Sources & MCP Servers

### 📖 Local Documentation (llms/)

When you need information about frameworks or libraries, read from these files:

| File | Description | When to use |
|------|-------------|-------------|
| `llms/elysiajs.md` | Elysia.js quick reference | Basic API routing, handlers |
| `llms/elysiajs-full.md` | Elysia.js complete docs | Advanced patterns, plugins |
| `llms/drizzle-full.md` | Drizzle ORM complete docs | Database queries, migrations, schema |
| `llms/better-auth-ui.md` | Better Auth UI components | Auth UI customization |

### 🔌 MCP Servers

| Server | Purpose | Key Tools |
|--------|---------|-----------|
| `user-better-auth` | Better Auth documentation & help | `chat`, `search`, `list_files`, `get_file` |
| `user-shadcn` | shadcn/ui components | `search_items_in_registries`, `get_add_command_for_items` |
| `user-next-devtools` | Next.js docs & caching | `nextjs_docs`, `nextjs_index`, `enable_cache_components` |
| `user-playwright` | E2E testing automation | `browser_navigate`, `browser_click`, `browser_fill_form` |
| `cursor-browser-extension` | Browser testing in dev | Same as Playwright MCP |

### 🎯 When to Use Each Source

**Creating API endpoints?**
→ Read `llms/elysiajs.md` or `llms/elysiajs-full.md`

**Database operations?**
→ Read `llms/drizzle-full.md`

**Authentication features?**
→ Use MCP `user-better-auth` → `search` tool
→ Or read `llms/better-auth-ui.md` for UI components

**Adding UI components?**
→ Use MCP `user-shadcn` → `search_items_in_registries`

**Next.js features/caching?**
→ Use MCP `user-next-devtools` → `nextjs_docs`

**Writing E2E tests?**
→ Use MCP `user-playwright` for browser automation
→ See examples in `tests/` folder

---

## 🧪 Testing Patterns

**Test files**: `tests/TC*.spec.ts`

Existing tests:
- `TC001-change-theme.spec.ts` - Theme switching
- `TC002-change-language.spec.ts` - Language switching
- `TC003-sign-up.spec.ts` - User registration
- `TC004-sign-in.spec.ts` - User login
- `TC005-forgot-password.spec.ts` - Password reset

---

## 🎨 UI Components (shadcn/ui)

**Installed components** (in `components/ui/`):
- Avatar
- Button
- Dropdown Menu
- Sheet
- Sonner (Toast)

**Add new components**:
```bash
bunx shadcn@latest add <component-name>
```

Or use MCP `user-shadcn`:
1. `search_items_in_registries` → find component
2. `get_add_command_for_items` → get install command

---

## 🔄 Development Workflow

### Adding a New Feature

1. **Database changes?**
   - Edit `db/schema.ts`
   - Run `bun run generate` → `bun run migrate`

2. **New API endpoint?**
   - Edit `app/api/[[...slugs]]/route.ts`
   - Add new routes to Elysia app

3. **New page?**
   - Create file in `app/[locale]/your-page/page.tsx`
   - Add translations to `messages/*.json`

4. **New component?**
   - Add to `components/` or use shadcn/ui

### Module Structure (for complex features)

```
app/
├── [locale]/
│   └── feature/
│       └── page.tsx         # Page component
├── api/
│   └── [[...slugs]]/
│       └── route.ts         # Add routes here
```

For Elysia MVC pattern (recommended for large APIs):
```
modules/
├── user/
│   ├── index.ts    # Controller (Elysia routes)
│   ├── service.ts  # Business logic
│   └── model.ts    # Types/validation
```

---

## ⚠️ Important Notes

1. **Tauri + Android**: Must use `@tauri-apps/plugin-http` for POST requests
2. **Auth cookies**: Web uses cookies, Tauri uses Bearer tokens
3. **i18n routes**: All routes must be inside `[locale]/`
4. **Drizzle migrations**: Don't edit files in `drizzle/` directly - edit `db/schema.ts` and regenerate

---

## 🤖 For AI Assistants

When working on this project:

1. **Always check existing patterns** - Look at similar files before creating new ones
2. **Use MCP tools** for documentation lookup instead of guessing
3. **Read local llms/ docs** for framework-specific syntax
4. **Follow i18n pattern** - Add translations for any user-facing text
5. **Test with Playwright** - Use MCP tools for browser automation
6. **Check schema.ts** before database operations

### Common Tasks Quick Reference

| Task | Action |
|------|--------|
| Add shadcn component | `bunx shadcn@latest add <name>` |
| Create migration | Edit schema → `bun run generate` → `bun run migrate` |
| Add translation | Edit `messages/en.json` & `messages/th.json` |
| Test in browser | Use `cursor-browser-extension` or `user-playwright` MCP |
| Check auth docs | MCP `user-better-auth` → `search` |
| Check Next.js docs | MCP `user-next-devtools` → `nextjs_docs` |
