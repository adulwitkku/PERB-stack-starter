# Introduction
URL: /

undefined

***

title: Introduction
icon: Album
-----------

import Image from "next/image"

<div className="flex -mt-8 -mb-4">
  <Image src="/better-auth-ui-promo-dark.webp" priority width="2000" height="1338" alt="better-auth-ui" className="hidden dark:block" />

  <Image src="/better-auth-ui-promo-light.webp" priority width="2000" height="1338" alt="better-auth-ui" className="dark:hidden" />
</div>

`@daveyplate/better-auth-ui` provides ready-to-use shadcn/ui styled components for rapidly implementing authentication features in your Next.js and React applications, seamlessly integrating with [`better-auth`](https://better-auth.com).

## Why choose Better Auth UI?

* **Easy** – Plug & play authentication components.
* **Customizable** – Fully styled with TailwindCSS and shadcn/ui, easy to extend to your needs.
* **Robust** – Made with modern best practices, built to work seamlessly with existing React projects.

## Key Features

* Fully Responsive UI components
* TailwindCSS and shadcn/ui styling support
* First-class integration with [`better-auth`](https://better-auth.com)

## Screenshots

Below are examples of the components provided by `@daveyplate/better-auth-ui`.

<div className="grid grid-cols-2 gap-4">
  <div>
    ### Sign In

    <img alt="Sign In Dark" src="/screenshots/sign-in-dark.png" className="rounded-xl hidden dark:block w-sm mt-0 mb-0" />

    <img alt="Sign In Light" src="/screenshots/sign-in-light.png" className="rounded-xl dark:hidden w-sm mt-0 mb-0" />
  </div>

  <div>
    ### Sign Up

    <img alt="Sign Up Dark" src="/screenshots/sign-up-dark.png" className="rounded-xl hidden dark:block w-sm mt-0 mb-0" />

    <img alt="Sign Up Light" src="/screenshots/sign-up-light.png" className="rounded-xl dark:hidden w-sm mt-0 mb-0" />
  </div>

  <div>
    ### Forgot Password

    <img alt="Forgot Password Dark" src="/screenshots/forgot-password-dark.png" className="rounded-xl hidden dark:block w-sm mt-0 mb-0" />

    <img alt="Forgot Password Light" src="/screenshots/forgot-password-light.png" className="rounded-xl dark:hidden w-sm mt-0 mb-0" />
  </div>

  <div>
    ### User Button

    <div className="flex gap-2 mt-0">
      <img alt="Seto" src="/avatars/seto.png" className="size-8 rounded-full mt-0 mb-3" />

      <img alt="Seto" src="/avatars/dark.png" className="size-8 rounded-full hidden dark:block mt-0 mb-3" />

      <img alt="Seto" src="/avatars/light.png" className="size-8 rounded-full dark:hidden mt-0 mb-3" />
    </div>

    <div className="flex items-center gap-3">
      <img alt="Seto" src="/screenshots/user-button-dark.png" className="w-64 rounded-md hidden dark:block mt-0 mb-0" />

      <img alt="Seto" src="/screenshots/user-button-light.png" className="w-64 rounded-md dark:hidden mt-0 mb-0" />
    </div>

    <img alt="User Dropdown Dark" src="/screenshots/user-dropdown-dark.png" className="rounded-md border-r w-44 hidden dark:block mt-4 mb-0" />

    <img alt="User Dropdown Light" src="/screenshots/user-dropdown-light.png" className="rounded-md border-r w-44 dark:hidden mt-4 mb-0" />
  </div>

  <div>
    ### Email Template

    <img alt="Email Template Dark" src="/screenshots/email-template-dark.png" className="rounded-xl hidden dark:block w-sm mt-0 mb-0" />

    <img alt="Email Template Light" src="/screenshots/email-template-light.png" className="rounded-xl dark:hidden w-sm mt-0 mb-0" />
  </div>

  <div>
    ### Settings Cards

    <img alt="Settings Cards Dark" src="/screenshots/settings-cards-dark.png" className="rounded-xl hidden dark:block w-lg mt-0 mb-0" />

    <img alt="Settings Cards Light" src="/screenshots/settings-cards-light.png" className="rounded-xl dark:hidden w-lg mt-0 mb-0" />
  </div>
</div>

## Next Steps

Before starting the installation, please ensure you have everything that's required to integrate `@daveyplate/better-auth-ui` seamlessly.

* [Requirements](/getting-started/requirements)
* [Installation](/getting-started/installation)

## LLMS.txt

Better Auth UI provides an LLMs.txt file that helps AI models understand how to interact with your auth UI. You can find it at [https://better-auth-ui.com/llms.txt](https://better-auth-ui.com/llms.txt).


# Additional Fields
URL: /advanced/additional-fields

undefined

***

title: Additional Fields
icon: UserPen
-------------

## Advanced Configuration

### Create Custom Authentication Flow

You may use `additionalFields` to define extra fields required during signup or settings:

```tsx
<AuthUIProvider
  authClient={authClient}
  additionalFields={{
    company: {
      label: "Company",
      placeholder: "Your company name",
      description: "Enter your company name",
      required: true,
      type: "string"
    },
    age: {
      label: "Age",
      placeholder: "Your age",
      description: "Enter your age",
      instructions: "You must be 18 or older",
      required: true,
      type: "number",
      validate: (value: string) => parseInt(value) >= 18
    }
  }}
  settings={{
    fields: ["company", "age"]
  }}
  signUp={{
    fields: ["company", "age"]
  }}
>
  {children}
</AuthUIProvider>
```


# API Keys
URL: /advanced/api-keys

undefined

***

title: API Keys
icon: Key
---------

API Keys provide a secure way for applications and services to authenticate with your API programmatically. Better Auth UI includes a complete API key management system with creation, expiration, and revocation capabilities.

## Overview

The API key system provides:

* **Secure Generation**: Cryptographically secure key generation
* **Expiration Management**: Set expiration dates for keys
* **Custom Prefixes**: Add custom prefixes to identify key types
* **Metadata Support**: Attach metadata to keys for tracking
* **One-Time Display**: Keys are shown only once after creation
* **Secure Storage**: Keys are hashed before storage

## Enabling API Keys

To enable API keys, configure the `apiKey` prop in your `AuthUIProvider`:

```tsx title="providers.tsx"
<AuthUIProvider
  authClient={authClient}
  apiKey={true} // Simple enable
>
  {children}
</AuthUIProvider>
```

### Advanced Configuration

```tsx title="providers.tsx"
<AuthUIProvider
  authClient={authClient}
  apiKey={{
    prefix: "app_",  // Custom prefix for all keys
    metadata: {      // Default metadata for new keys
      environment: "production",
      version: "v1"
    }
  }}
>
  {children}
</AuthUIProvider>
```

## Key Components

### ApiKeysCard

The main component for managing API keys:

```tsx
import { ApiKeysCard } from '@daveyplate/better-auth-ui'

<ApiKeysCard />
```

### In SettingsCards

API keys automatically appear in settings when enabled:

```tsx
import { SettingsCards } from '@daveyplate/better-auth-ui'

// Shows API keys management when view="API_KEYS"
<SettingsCards view="API_KEYS" />
```

## API Key Structure

Generated API keys follow this structure:

```
[prefix][random_string]
```

Example: `app_sk_live_a1b2c3d4e5f6g7h8i9j0`

## Using API Keys

### Client-Side Generation

```tsx
const { authClient } = useContext(AuthUIContext)

// Create a new API key
const { key } = await authClient.apiKey.create({
  name: "Production API Key",
  expiresIn: 30 * 24 * 60 * 60, // 30 days in seconds
  prefix: "prod_",
  metadata: {
    service: "payment-processor"
  }
})

console.log(key) // This is the only time you'll see the full key
```

### Server-Side Validation

```ts
// In your API endpoint
import { auth } from '@/lib/auth'

export async function POST(request: Request) {
  const apiKey = request.headers.get('x-api-key')
  
  if (!apiKey) {
    return new Response('API key required', { status: 401 })
  }
  
  const session = await auth.api.validateApiKey({
    apiKey
  })
  
  if (!session) {
    return new Response('Invalid API key', { status: 401 })
  }
  
  // Access user and metadata
  console.log(session.user)
  console.log(session.apiKey.metadata)
  
  // Process request...
}
```

## Security Features

### One-Time Display

* Keys are shown in full only once after creation
* Users must copy the key immediately
* Lost keys cannot be recovered

### Secure Storage

* Keys are hashed using bcrypt before storage
* Original keys are never stored in the database
* Only the first few characters are stored for identification

### Expiration

* Keys can have expiration dates
* Expired keys are automatically rejected
* No expiration option available for long-lived keys

## Best Practices

1. **Naming Convention**
   ```
   "Production - Payment Service"
   "Development - Local Testing"
   "CI/CD - GitHub Actions"
   ```

2. **Expiration Policy**
   * Development keys: 7-30 days
   * Production keys: 90-365 days
   * CI/CD keys: No expiration with rotation

3. **Key Rotation**
   * Rotate production keys every 90 days
   * Implement overlap period for smooth transition
   * Log key usage for audit trails

4. **Access Control**
   * Limit who can create API keys
   * Log all key operations
   * Monitor key usage patterns

5. **Environment Separation**
   ```tsx
   apiKey={{
     prefix: process.env.NODE_ENV === 'production' ? 'pk_' : 'sk_test_'
   }}
   ```

## Metadata Usage

Attach metadata to track key usage:

```tsx
await authClient.apiKey.create({
  name: "Analytics Service",
  metadata: {
    service: "analytics",
    environment: "production",
    permissions: ["read:analytics", "write:reports"],
    rateLimit: 1000
  }
})
```

## Rate Limiting

Implement rate limiting based on metadata:

```ts
// Server-side
const session = await auth.api.validateApiKey({ apiKey })
const rateLimit = session.apiKey.metadata.rateLimit || 100

// Apply rate limiting logic
```

## Monitoring

Track API key usage:

1. **Usage Metrics**: Track requests per key
2. **Error Rates**: Monitor failed authentications
3. **Expiration Alerts**: Notify before keys expire
4. **Anomaly Detection**: Detect unusual usage patterns

## Error Handling

Common API key errors:

* `API_KEY_INVALID`: Key doesn't exist or is malformed
* `API_KEY_EXPIRED`: Key has passed expiration date
* `API_KEY_REVOKED`: Key has been manually revoked
* `API_KEY_RATE_LIMITED`: Key has exceeded rate limits


# Custom Auth Paths
URL: /advanced/custom-auth-paths

undefined

***

title: Custom Auth Paths
icon: Route
-----------

Here's a complete guide on how to customize view paths using the `AuthUIProvider` component. This example will show you how to change the auth routes from `/auth/sign-in` and `/auth/sign-out` to use custom paths such as `/auth/login` and `/auth/logout`, respectively.

### Step 1: Customize Auth View Paths

First, customize the default built-in auth paths by providing your custom routes through the `viewPaths` prop on the `<AuthUIProvider />` component. The `viewPaths` prop controls authentication pages like sign-in, sign-up, forgot password, etc.

```tsx
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            Link={Link}
            viewPaths={{
                SIGN_IN: "login",
                SIGN_OUT: "logout",
                SIGN_UP: "register",
                FORGOT_PASSWORD: "forgot",
                RESET_PASSWORD: "reset",
                MAGIC_LINK: "magic"
            }}
        >
            {children}
        </AuthUIProvider>
    )
}
```

Now your newly configured `viewPaths` object is as follows:

| Default Path            | Custom Path      |
| ----------------------- | ---------------- |
| `/auth/sign-in`         | `/auth/login`    |
| `/auth/sign-out`        | `/auth/logout`   |
| `/auth/sign-up`         | `/auth/register` |
| `/auth/forgot-password` | `/auth/forgot`   |
| `/auth/reset-password`  | `/auth/reset`    |
| `/auth/magic-link`      | `/auth/magic`    |

### Customizing Account View Paths

Account settings paths (like settings, security, api-keys) are configured separately using the `account.viewPaths` prop:

```tsx
<AuthUIProvider
    authClient={authClient}
    account={{
        viewPaths: {
            SETTINGS: "profile",
            SECURITY: "password",
            API_KEYS: "keys",
            ORGANIZATIONS: "orgs"
        }
    }}
>
    {children}
</AuthUIProvider>
```

This would change the paths from `/account/settings` to `/account/profile`, etc.

## Adjusting Dynamic Auth Route

Next, your authentication page route can dynamically handle these paths. Set up your dynamic authentication page based on these custom routes.

Using Next.js App Router (`app` router):

```tsx
import { AuthView } from "@daveyplate/better-auth-ui"
import { authViewPaths } from "@daveyplate/better-auth-ui"

export function generateStaticParams() {
    return Object.values({
        ...authViewPaths,
        SIGN_IN: "login",
        SIGN_OUT: "logout",
        SIGN_UP: "register",
        FORGOT_PASSWORD: "forgot",
        RESET_PASSWORD: "reset",
        MAGIC_LINK: "magic"
    }).map((pathname) => ({ pathname }))
}

export default async function AuthPage({ params }: { params: Promise<{ pathname: string }> }) {
    const { pathname } = await params

    return (
        <div className="flex flex-col grow size-full items-center justify-center gap-3">
            <AuthView pathname={pathname} />
        </div>
    )
}
```

> **Note**: The `authViewPaths` object only includes authentication pages, not account settings pages. Account pages are handled separately via the `account` prop configuration.

### Example usage across your app:

#### Linking to new auth views:

```tsx
import Link from "next/link"

export default function Navbar() {
    return (
        <nav className="flex gap-4">
            <Link href="/auth/login">Login</Link>
            <Link href="/auth/register">Register</Link>
            <Link href="/auth/forgot">Forgot Password</Link>
        </nav>
    )
}
```

### Summary of Steps (Recap):

* Defined custom auth view paths within `AuthUIProvider` using the `viewPaths` prop
* Optionally defined custom account view paths using `account.viewPaths`
* Updated dynamic auth page to handle correct paths within `generateStaticParams`
* Revised links throughout your app to use the newly specified paths

You have now successfully customized your authentication and account URLs using the available customization options while preserving all the other features and integrations seamlessly.


# Custom Account Settings
URL: /advanced/custom-settings

undefined

***

title: Custom Account Settings
icon: Cog
---------

The `@daveyplate/better-auth-ui` library provides built-in account settings views accessible through the `account` configuration. By default, these views are located at `/account/settings`, `/account/security`, `/account/api-keys`, and `/account/organizations`.

However, for advanced use cases, you may want to:

1. Move the built-in account views to a different base path (using `account.basePath`)
2. Build your own account page layout using `<AccountView />` component
3. Build completely custom settings using individual components

## Overview

You have three primary ways to customize the account settings experience:

1. **Move account views to a different path**: Use `account.basePath` to relocate all built-in account views while keeping their functionality
2. **Use AccountView component**: Use `<AccountView />` to render the full account management UI with navigation
3. **Build custom layouts**: Import individual settings components (`AccountSettingsCards`, `SecuritySettingsCards`, etc.) to create your own layouts

### Quick Comparison

| Option                | Use Case                                               | Configuration                         | Result                                                              |
| --------------------- | ------------------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------- |
| `account.basePath`    | Keep built-in account views but move to different path | `account: { basePath: "/dashboard" }` | Account views at `/dashboard/settings`, `/dashboard/security`, etc. |
| `<AccountView />`     | Use the full account UI with navigation                | Import and use component              | Renders complete account management with sidebar navigation         |
| Individual components | Build custom layouts with specific components          | Import components directly            | Full control over layout and functionality                          |

## Option 1: Moving Account Views to a Different Base Path

If you want to keep the built-in account functionality but move it to a different location (e.g., from `/account/settings` to `/dashboard/settings`), use the `account.basePath` option:

```tsx title="app/providers.tsx"
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            account={{
                basePath: "/dashboard" // Account views will be at /dashboard/settings, /dashboard/security, etc.
            }}
            Link={Link}
        >
            {children}
        </AuthUIProvider>
    )
}
```

With this configuration:

* Auth views remain at: `/auth/sign-in`, `/auth/sign-up`, etc.
* Account views move to: `/dashboard/settings`, `/dashboard/security`, `/dashboard/api-keys`, `/dashboard/organizations`
* The `<UserButton />` component automatically uses the new base path for the settings link

You can combine `basePath` with other account options:

```tsx
account={{
    basePath: "/dashboard",
    fields: ["image", "name", "age"] // Specify which fields to show in account settings
}}
```

### Using AccountView with pathname

When using `account.basePath`, you can pass the `pathname` prop to `<AccountView />` to automatically determine the current view:

```tsx title="app/dashboard/[...account]/page.tsx"
import { AccountView } from "@daveyplate/better-auth-ui"

export default function AccountPage({
    params
}: {
    params: { account: string[] }
}) {
    const pathname = `/dashboard/${params.account?.join("/") || "settings"}`

    return (
        <div className="mx-auto max-w-4xl py-12 px-4">
            <AccountView pathname={pathname} />
        </div>
    )
}
```

## Option 2: Using the AccountView Component

The `<AccountView />` component provides the complete account management UI with sidebar navigation. You can use it on any custom route:

```tsx title="app/dashboard/account/page.tsx"
import { AccountView } from "@daveyplate/better-auth-ui"

export default function CustomAccountPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <AccountView />
        </div>
    )
}
```

The `<AccountView />` component automatically:

* Renders a sidebar navigation for switching between Settings, Security, API Keys, and Organizations
* Displays the appropriate content based on the current view
* Handles responsive layouts (drawer menu on mobile, sidebar on desktop)
* Protects the page (redirects to sign-in if not authenticated)

## Option 3: Building Custom Settings Layouts

For maximum control, you can build your own settings page layouts using individual components.

### Using Settings Card Components

You can use the pre-built card components to compose your own settings layouts:

* **`<AccountSettingsCards />`** - Displays all account-related settings (avatar, name, username, email, additional fields)
* **`<SecuritySettingsCards />`** - Displays security settings (password, sessions, two-factor, passkeys, delete account)

```tsx title="app/dashboard/settings/page.tsx"
import { AccountSettingsCards, SecuritySettingsCards } from "@daveyplate/better-auth-ui"

export default function UserSettingsPage() {
    return (
        <div className="mx-auto max-w-xl py-12 px-4 space-y-6">
            <AccountSettingsCards />
            <SecuritySettingsCards />
        </div>
    )
}
```

You can customize the appearance using TailwindCSS classes through `classNames` props:

```tsx
<AccountSettingsCards
    className="mx-auto max-w-xl"
    classNames={{
        card: {
            base: "border-primary/50",
            header: "bg-primary/10",
            content: "bg-background",
            footer: "bg-primary/10",
            button: "bg-primary hover:bg-primary/80",
            input: "bg-transparent placeholder-muted-foreground/50"
        }
    }}
/>
```

### Individually Using Settings Components

For finer-grained control, selectively import the components you want:

| Component                | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `<UpdateAvatarCard />`   | User avatar management                                  |
| `<UpdateNameCard />`     | Update user's name                                      |
| `<UpdateUsernameCard />` | Manage username (if applicable/username set via plugin) |
| `<ChangeEmailCard />`    | Changing the user's email address                       |
| `<ChangePasswordCard />` | Allow user to securely update password                  |
| `<ProvidersCard />`      | Linking/Unlinking social provider accounts              |
| `<SessionsCard />`       | Active session management                               |
| `<DeleteAccountCard />`  | Deleting the user account securely                      |
| `<UpdateFieldCard />`    | Add or update additional custom user fields             |

Here's a complete example demonstrating an individually composed user settings page:

```tsx title="app/dashboard/settings/page.tsx"
import {
    UpdateAvatarCard,
    UpdateNameCard,
    UpdateUsernameCard,
    ChangeEmailCard,
    ChangePasswordCard,
    ProvidersCard,
    SessionsCard,
    DeleteAccountCard,
    UpdateFieldCard
} from "@daveyplate/better-auth-ui"

export default function CustomSettingsPage() {
    return (
        <div className="flex flex-col gap-6 max-w-xl mx-auto py-12 px-4">
            <UpdateAvatarCard />

            <UpdateNameCard />

            <UpdateUsernameCard />

            <ChangeEmailCard />

            <ChangePasswordCard />

            <ProvidersCard />

            <SessionsCard />

            <DeleteAccountCard />

            <UpdateFieldCard
                field="age"
                label="Age"
                description="Update your age"
                placeholder="Enter your current age"
                type="number"
            />
        </div>
    )
}
```

This example assumes `additionalFields` are configured via your `<AuthUIProvider />`:

```tsx title="app/providers.tsx"
<AuthUIProvider
    authClient={authClient}
    additionalFields={{
        age: {
            label: "Age",
            placeholder: "Your age",
            description: "Enter your age",
            required: false,
            type: "number"
        }
    }}
    account={{
        fields: ["image", "name", "age"] // Include custom fields in account settings
    }}
>
    {children}
</AuthUIProvider>
```

## Handling Authentication for Account Pages

It's essential that your custom account/settings pages are protected and accessible only by authenticated users. You can use the `<RedirectToSignIn />` and `<SignedIn>` components to ensure your pages are secured:

### Example:

```tsx title="app/dashboard/settings/page.tsx"
import {
    RedirectToSignIn,
    SignedIn,
    AccountSettingsCards
} from "@daveyplate/better-auth-ui"

export default function CustomSettingsPage() {
    return (
        <>
            <RedirectToSignIn />

            <SignedIn>
                <div className="container mx-auto py-12 px-4">
                    <AccountSettingsCards />
                </div>
            </SignedIn>
        </>
    )
}
```

Note: The `<AccountView />` component already includes authentication protection, so you don't need to add `<RedirectToSignIn />` when using it.


# Localization
URL: /advanced/localization

undefined

***

title: Localization
icon: Languages
---------------

## Localization Overview

You can fully customize the text strings displayed across all `@daveyplate/better-auth-ui` components through the provided `localization` prop. The library ships with a full default localization object [`AuthLocalization`](/api-reference/auth-localization), but you can override any of these defaults easily with custom strings.

## Modifying Strings

To modify default strings, you need to provide your custom localization object within your `<AuthUIProvider />` or individual components.

Here's an example of modifying some default strings globally across your application using `<AuthUIProvider />`:

```tsx title="app/providers.tsx"
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      Link={Link}
      localization={{
        SIGN_IN: "Log in",
        SIGN_IN_DESCRIPTION: "Use your email and password to log in.",
        SIGN_UP: "Create Account",
        FORGOT_PASSWORD: "Reset Password",
        EMAIL_PLACEHOLDER: "your-email@example.com",
        PASSWORD_PLACEHOLDER: "Secret password",
        MAGIC_LINK_EMAIL: "Check your inbox for your login link!",
        FORGOT_PASSWORD_EMAIL: "Check your inbox for the password reset link.",
        RESET_PASSWORD_SUCCESS: "You can now sign in with your new password!",
        CHANGE_PASSWORD_SUCCESS: "Your password has been successfully updated.",
        DELETE_ACCOUNT_SUCCESS: "Your account has been permanently deleted.",
      }}
    >
      {children}
    </AuthUIProvider>
  )
}
```

## Customizing Strings Per Component

You can also provide overridden strings on an individual component basis. Here's how you can override strings for just one instance, such as the `<AuthCard>`:

```tsx
import { AuthCard } from "@daveyplate/better-auth-ui"

export default function AuthPage({ params }: { params: { pathname: string } }) {
  return (
    <div className="flex justify-center items-center">
      <AuthCard
        pathname={params.pathname}
        localization={{
          SIGN_IN: "Log In",
          SIGN_UP: "Register an Account",
          FORGOT_PASSWORD: "Forgot Your Password?",
          SIGN_IN_DESCRIPTION: "Log in and start using your account.",
          MAGIC_LINK: "Log in via Email",
        }}
      />
    </div>
  )
}
```

## Using Backend Error Messages

By default, `@daveyplate/better-auth-ui` localizes all error messages using the provided `localization` prop. However, if your backend already returns translated error messages (for example, when using multilingual plugins like `better-auth-localization`), you can configure the provider to use the backend error messages directly instead of the localized strings.

To enable this behavior, set the `localizeErrors` prop to `false` on your `<AuthUIProvider />`:

```tsx title="app/providers.tsx"
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <AuthUIProvider
            ...
            localizeErrors={false}
        >
            {children}
        </AuthUIProvider>
    )
}
```

When `localizeErrors` is set to `false`, all error messages in toast notifications will use the backend error messages directly. In the backend response payload you must return the error message as `error.message` or `error.error.message`.

This is particularly useful when:

* Using multilingual plugins that translate backend messages
* Your backend already provides user-friendly, translated error messages
* You want to ensure consistency between backend and frontend error messages

**Note:** When `localizeErrors` is `false`, the `localization` prop will still be used for all UI strings (buttons, labels, placeholders, etc.), but error messages on toast notifications will come directly from the backend.

You can find all available strings to override in the [`AuthLocalization`](/api-reference/auth-localization) reference.


# Organizations
URL: /advanced/organizations

undefined

***

title: Organizations
icon: Users
-----------

Organizations allow users to create and manage teams, workspaces, or companies within your application. This feature provides a complete multi-tenant system with role-based access control, member management, and invitation workflows.

## Overview

The organization system in Better Auth UI provides:

* **Multi-organization Support**: Users can create and belong to multiple organizations
* **Role-Based Access Control**: Built-in roles (owner, admin, member) plus custom roles
* **Member Management**: Invite, remove, and manage organization members
* **Organization Switching**: Seamlessly switch between organizations and personal accounts
* **Permission System**: Fine-grained permissions for different actions
* **Invitation Workflow**: Email-based invitation system with expiration

## Enabling Organizations

To enable organizations, configure the `organization` prop in your `AuthUIProvider`:

```tsx title="providers.tsx"
<AuthUIProvider
  authClient={authClient}
  organization={{
    logo: {
      upload: async (file) => {
        // Your upload logic
        return uploadedUrl
      },
      size: 256,
      extension: "png"
    },
    customRoles: [
      { role: "developer", label: "Developer" },
      { role: "viewer", label: "Viewer" }
    ]
  }}
>
  {children}
</AuthUIProvider>
```

## Key Components

### OrganizationSwitcher

The main component for switching between organizations and personal accounts:

```tsx
import { OrganizationSwitcher } from '@daveyplate/better-auth-ui'

<OrganizationSwitcher />
```

### SettingsCards with Organization View

The settings component automatically shows organization options when enabled:

```tsx
import { SettingsCards } from '@daveyplate/better-auth-ui'

// Shows organization settings when view="ORGANIZATION"
<SettingsCards view="ORGANIZATION" />

// Shows organization members when view="MEMBERS"
<SettingsCards view="MEMBERS" />

// Shows all organizations when view="ORGANIZATIONS"
<SettingsCards view="ORGANIZATIONS" />
```

### Organization-Specific Components

* `<OrganizationSettingsCards />` - Organization settings management
* `<OrganizationMembersCard />` - Member management
* `<OrganizationInvitationsCard />` - Pending invitations
* `<OrganizationsCard />` - List all user's organizations
* `<AcceptInvitationCard />` - Accept invitation flow

## Built-in Roles

Organizations come with three built-in roles:

1. **Owner**
   * Full control over the organization
   * Can delete the organization
   * Can transfer ownership
   * Can manage all members and settings

2. **Admin**
   * Can manage organization settings
   * Can invite and remove members
   * Can update member roles (except owner)
   * Cannot delete the organization

3. **Member**
   * Basic access to the organization
   * Cannot manage settings or members
   * Can leave the organization

## Custom Roles

You can define additional roles for your specific needs:

```tsx
organization={{
  customRoles: [
    { role: "developer", label: "Developer" },
    { role: "viewer", label: "View Only" },
    { role: "billing", label: "Billing Administrator" }
  ]
}}
```

## Organization Hooks

Access organization data programmatically:

```tsx
import { useContext } from 'react'
import { AuthUIContext } from '@daveyplate/better-auth-ui'

function MyComponent() {
  const { hooks } = useContext(AuthUIContext)
  
  // Get active organization
  const { data: activeOrg } = hooks.useActiveOrganization()
  
  // List all organizations
  const { data: organizations } = hooks.useListOrganizations()
  
  // Check permissions
  const { data: hasPermission } = hooks.useHasPermission({
    permissions: {
      organization: ["update"],
      member: ["create", "delete"]
    }
  })
  
  return (
    <div>
      Current org: {activeOrg?.name}
    </div>
  )
}
```

## Invitation Flow

1. **Send Invitation**: Admin/Owner sends invitation via email
2. **Email Delivery**: Recipient receives invitation email
3. **Accept/Reject**: User clicks link to accept or reject
4. **Join Organization**: User becomes a member with assigned role

## Best Practices

1. **Logo Configuration**: Set up logo upload for better branding
2. **Role Planning**: Define custom roles based on your needs
3. **Permission Checks**: Always check permissions before sensitive actions
4. **Invitation Expiry**: Set reasonable expiration times
5. **Member Limits**: Consider implementing member limits for plans

## Security Considerations

* **Session Freshness**: Some actions require fresh authentication
* **Permission Validation**: All actions are permission-checked server-side
* **Invitation Security**: Invitations include secure tokens
* **Data Isolation**: Organization data is properly isolated
* **Audit Trail**: Consider logging organization actions


# AdditionalField
URL: /api-reference/additional-field

undefined

***

## title: AdditionalField

Below is the `AdditionalField` interface which allows you to define custom fields for your authentication flow such as signup or user settings.

<AutoTypeTable path="../src/types/additional-fields.ts" name="AdditionalField" />


# AdditionalFields
URL: /api-reference/additional-fields

undefined

***

## title: AdditionalFields

The `AdditionalFields` interface allows you to define custom fields for your authentication flow such as signup or user settings.

## Usage

You can configure `additionalFields` like this:

```tsx
<AuthUIProvider
  authClient={authClient}
  additionalFields={{
    age: {
      label: "Age",
      placeholder: "Your age",
      description: "Enter your age",
      required: true,
      type: "number"
    },
    newsletter: {
      label: "Newsletter Opt-In",
      description: "Subscribe to the newsletter",
      required: false,
      type: "boolean",
    }
  }}
>
  {children}
</AuthUIProvider>
```

## AdditionalField

<AutoTypeTable path="../src/types/additional-fields.ts" name="AdditionalField" />


# AuthFormClassNames
URL: /api-reference/auth-form-class-names

undefined

***

## title: AuthFormClassNames

The following class names can be passed to the `<AuthCard />` component to customize the appearance of the Auth form:

<AutoTypeTable path="../src/components/auth/auth-form.tsx" name="AuthFormClassNames" />


# AuthHooks
URL: /api-reference/auth-hooks

undefined

***

## title: AuthHooks

The `AuthHooks` type defines the set of authentication-related hooks used by the UI provider and components.

<AutoTypeTable path="../src/types/auth-hooks.ts" name="AuthHooks" />


# AuthLocalization
URL: /api-reference/auth-localization

undefined

***

## title: AuthLocalization

You can customize the text and messages displayed by the authentication components by providing an `AuthLocalization` object to the [`<AuthUIProvider />`](/components/auth-ui-provider) component.

<AutoTypeTable path="../src/localization/auth-localization.ts" name="AuthLocalization" />


# AuthMutators
URL: /api-reference/auth-mutators

undefined

***

## title: AuthMutators

The `AuthMutators` interface defines mutation functions for updating authentication state, such as updating the user, revoking sessions, and more.

<AutoTypeTable path="../src/types/auth-mutators.ts" name="AuthMutators" />


# AuthViewClassNames
URL: /api-reference/auth-view-class-names

undefined

***

## title: AuthViewClassNames

The following class names can be passed to the [`<AuthView />`](/components/auth-view) component to customize the appearance of the Auth cards:

<AutoTypeTable path="../src/components/auth/auth-view.tsx" name="AuthViewClassNames" />


# AuthViewPaths
URL: /api-reference/auth-view-paths

undefined

***

## title: AuthViewPaths

You can customize the paths for the authentication views by providing an `AuthViewPaths` object to the [`<AuthUIProvider />`](/components/auth-ui-provider) component.

<AutoTypeTable path="../src/lib/view-paths.ts" name="AuthViewPaths" />


# AuthView
URL: /api-reference/auth-view

undefined

***

## title: AuthView

The `AuthView` type defines the available authentication views.

## Available Options

The following authentication views are supported:

* `"signIn"`
* `"signUp"`
* `"magicLink"`
* `"emailOTP"`
* `"forgotPassword"`
* `"resetPassword"`
* `"signOut"`
* `"settings"`
* `"callback"`


# EmailTemplateClassNames
URL: /api-reference/email-template-class-names

undefined

***

## title: EmailTemplateClassNames

The following class names can be passed to the [`<EmailTemplate />`](/components/email-template) component to customize the appearance of the Email Template:

<AutoTypeTable path="../src/components/email/email-template.tsx" name="EmailTemplateClassNames" />


# FetchError
URL: /api-reference/fetch-error

undefined

***

## title: FetchError

The `FetchError` type represents an error object returned from authentication or API requests.

<AutoTypeTable path="../src/types/fetch-error.ts" name="FetchError" />


# ModelNames
URL: /api-reference/model-names

undefined

***

## title: ModelNames

The `ModelNames` type defines the mapping of model namespaces to their string names for use with InstantDB and Triplit integrations.

## InstantDB

<AutoTypeTable path="../src/lib/instantdb/model-names.ts" name="ModelNames" />

## Triplit

<AutoTypeTable path="../src/lib/triplit/model-names.ts" name="ModelNames" />


# Profile
URL: /api-reference/profile

undefined

***

## title: Profile

The `Profile` type represents a user profile object, used for displaying user information in the UI.

<AutoTypeTable path="../src/types/profile.ts" name="Profile" />


# SettingsCardClassNames
URL: /api-reference/settings-card-class-names

undefined

***

## title: SettingsCardClassNames

The following class names can be passed to a Settings Card component to customize the appearance:

<AutoTypeTable path="../src/components/settings/shared/settings-card.tsx" name="SettingsCardClassNames" />


# UserAvatarClassNames
URL: /api-reference/user-avatar-class-names

undefined

***

## title: UserAvatarClassNames

The following class names can be passed to the [`<UserAvatar />`](/components/user-avatar) component to customize the appearance of the user avatar:

<AutoTypeTable path="../src/components/user-avatar.tsx" name="UserAvatarClassNames" />


# UserButtonClassNames
URL: /api-reference/user-button-class-names

undefined

***

## title: UserButtonClassNames

The following class names can be passed to the [`<UserButton />`](/components/user-button) component to customize the appearance of the user button:

<AutoTypeTable path="../src/components/user-button.tsx" name="UserButtonClassNames" />


# InstantDB
URL: /data/instantdb

undefined

***

title: InstantDB
icon: "InstantDB"
-----------------

[InstantDB](https://instantdb.com/) is a simple and powerful database solution that works well with Better Auth UI.

## Prerequisites

Set up your project with the [@daveyplate/better-auth-instantdb](https://github.com/daveyplate/better-auth-instantdb) package.

## Integration with Auth UI Providers

You can pass the InstantDB hooks and mutators to both the `AuthUIProvider` and `AuthUIProviderTanstack` components:

```tsx
import { useInstantAuth } from "@daveyplate/better-auth-instantdb"
import { useInstantOptions } from "@daveyplate/better-auth-ui/instantdb"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { useSession } from "@/lib/auth-client"
import { db } from "@/lib/db"

function Providers({ children }) {
    const { data: sessionData, isPending } = useSession()
    useInstantAuth({ db, sessionData, isPending })
    const { user } = db.useAuth()
    const { hooks, mutators } = useInstantOptions({ 
        db, 
        sessionData, 
        isPending, 
        user, 
        usePlural: true 
    })
    
    return (
        <AuthUIProvider
            // ...other props
            hooks={hooks}
            mutators={mutators}
        >
            {children}
        </AuthUIProvider>
    )
}
```

The same pattern works for `AuthUIProviderTanstack` as well. This is the recommended for use with a Persist Client for offline authentication.


# TanStack Query
URL: /data/tanstack-query

undefined

***

title: TanStack Query
icon: "ReactQuery"
------------------

In order to use `@daveyplate/better-auth-ui` with the [`@daveyplate/better-auth-tanstack`](https://github.com/daveyplate/better-auth-tanstack) package, all you need to do is change your [`<AuthUIProvider />`](/components/auth-ui-provider) into an `<AuthUIProviderTanstack />` component. It accepts all of the same props and configuration options.

The main difference is the `persistClient` prop which is only required if you are using a [`persistQueryClient`](https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient) for offline Authentication. This prop will tell the authentication methods to use the `/auth/callback` path for all authentication methods that leave the site, which will clear your query cache for you automatically.

```tsx title="app/providers.tsx"
"use client"

import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack"
import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { authClient } from "@/lib/auth-client"

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <AuthQueryProvider>
            <AuthUIProviderTanstack
                authClient={authClient}
                navigate={router.push}
                persistClient={false}
                replace={router.replace}
                onSessionChange={() => router.refresh()}
                Link={Link}
            >
                {children}
            </AuthUIProviderTanstack>
        </AuthQueryProvider>
    )
}
```


# Triplit
URL: /data/triplit

undefined

***

title: Triplit
icon: "Triplit"
---------------

[Triplit](https://triplit.dev/) is a simple and powerful database solution that works well with Better Auth UI.

## Prerequisites

Set up your project with the [@daveyplate/better-auth-triplit](https://github.com/daveyplate/better-auth-triplit) package.

## Integration with Auth UI Providers

You can pass the Triplit hooks to both the `AuthUIProvider` and `AuthUIProviderTanstack` components:

```tsx
import { useTriplitHooks } from "@daveyplate/better-auth-ui/triplit"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { useSession } from "@/lib/auth-client"
import { triplit } from "@/lib/triplit"

function Providers({ children }) {
    const { data: sessionData, isPending } = useSession()
    const { hooks } = useTriplitHooks({ 
        triplit, 
        sessionData, 
        isPending, 
        usePlural: true 
    })
    
    return (
        <AuthUIProvider
            // ...other props
            hooks={hooks}
        >
            {children}
        </AuthUIProvider>
    )
}
```

The same pattern works for `AuthUIProviderTanstack` as well. This is recommended for use with a Persist Client for offline authentication.


# Installation
URL: /getting-started/installation

undefined

***

title: Installation
icon: Download
--------------

import { Step, Steps } from 'fumadocs-ui/components/steps';

Follow the steps below to install the `@daveyplate/better-auth-ui` library.

<Steps>
  <Step>
    ## Install the Package

    Install the `@daveyplate/better-auth-ui` library using your preferred package manager.

    ```package-install
    @daveyplate/better-auth-ui@latest
    ```
  </Step>

  <Step>
    ## TailwindCSS Configuration

    For [TailwindCSS](https://tailwindcss.com) `v4`, add the following `@import` to your global css:

    ```css title="styles/globals.css"
    @import "@daveyplate/better-auth-ui/css";
    ```

    For [TailwindCSS](https://tailwindcss.com) `v3` <span className="text-sm text-fd-muted-foreground">*(Deprecated)*</span>, add the following `content` to your Tailwind config:

    ```ts
    content: [
        "./node_modules/@daveyplate/better-auth-ui/dist/**/*.{js,ts,jsx,tsx,mdx}"
    ]
    ```
  </Step>

  <Step>
    ## Integrations

    Now that you've installed `@daveyplate/better-auth-ui`, follow one of the guides below to integrate it with your preferred framework:
  </Step>
</Steps>

<div className="grid sm:grid-cols-2 gap-4 mt-8 sm:gap-6">
  <Card href="/integrations/next-js">
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-fd-foreground justify-self-center" fill="currentColor">
      <title>Next.js</title>

      <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z" />
    </svg>

    <p className="font-medium mt-2 text-fd-foreground justify-self-center">Next.js</p>
  </Card>

  <Card href="/integrations/tanstack-start">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tree-palm-icon lucide-tree-palm w-10 h-10 justify-self-center text-fd-foreground">
      <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4" />

      <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3" />

      <path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35" />

      <path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14" />
    </svg>

    <p className="font-medium mt-2 text-fd-foreground justify-self-center">TanStack Start</p>
  </Card>

  <Card href="/integrations/react">
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-fd-foreground justify-self-center" fill="currentColor">
      <title>React</title>

      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
    </svg>

    <p className="font-medium mt-2 text-fd-foreground justify-self-center">React</p>
  </Card>

  {/* <Card href="/docs/installation/vite">
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        fill="foreground"
      >
        <title>Vite</title>
        <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z" />
      </svg>
      <p className="font-medium mt-2">Vite</p>
    </Card>
    <Card href="/docs/installation/laravel">
      <svg
        role="img"
        viewBox="0 0 62 65"
        fill="foreground"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
      >
        <path d="M61.8548 14.6253C61.8778 14.7102 61.8895 14.7978 61.8897 14.8858V28.5615C61.8898 28.737 61.8434 28.9095 61.7554 29.0614C61.6675 29.2132 61.5409 29.3392 61.3887 29.4265L49.9104 36.0351V49.1337C49.9104 49.4902 49.7209 49.8192 49.4118 49.9987L25.4519 63.7916C25.3971 63.8227 25.3372 63.8427 25.2774 63.8639C25.255 63.8714 25.2338 63.8851 25.2101 63.8913C25.0426 63.9354 24.8666 63.9354 24.6991 63.8913C24.6716 63.8838 24.6467 63.8689 24.6205 63.8589C24.5657 63.8389 24.5084 63.8215 24.456 63.7916L0.501061 49.9987C0.348882 49.9113 0.222437 49.7853 0.134469 49.6334C0.0465019 49.4816 0.000120578 49.3092 0 49.1337L0 8.10652C0 8.01678 0.0124642 7.92953 0.0348998 7.84477C0.0423783 7.8161 0.0598282 7.78993 0.0697995 7.76126C0.0884958 7.70891 0.105946 7.65531 0.133367 7.6067C0.152063 7.5743 0.179485 7.54812 0.20192 7.51821C0.230588 7.47832 0.256763 7.43719 0.290416 7.40229C0.319084 7.37362 0.356476 7.35243 0.388883 7.32751C0.425029 7.29759 0.457436 7.26518 0.498568 7.2415L12.4779 0.345059C12.6296 0.257786 12.8015 0.211853 12.9765 0.211853C13.1515 0.211853 13.3234 0.257786 13.475 0.345059L25.4531 7.2415H25.4556C25.4955 7.26643 25.5292 7.29759 25.5653 7.32626C25.5977 7.35119 25.6339 7.37362 25.6625 7.40104C25.6974 7.43719 25.7224 7.47832 25.7523 7.51821C25.7735 7.54812 25.8021 7.5743 25.8196 7.6067C25.8483 7.65656 25.8645 7.70891 25.8844 7.76126C25.8944 7.78993 25.9118 7.8161 25.9193 7.84602C25.9423 7.93096 25.954 8.01853 25.9542 8.10652V33.7317L35.9355 27.9844V14.8846C35.9355 14.7973 35.948 14.7088 35.9704 14.6253C35.9792 14.5954 35.9954 14.5692 36.0053 14.5405C36.0253 14.4882 36.0427 14.4346 36.0702 14.386C36.0888 14.3536 36.1163 14.3274 36.1375 14.2975C36.1674 14.2576 36.1923 14.2165 36.2272 14.1816C36.2559 14.1529 36.292 14.1317 36.3244 14.1068C36.3618 14.0769 36.3942 14.0445 36.4341 14.0208L48.4147 7.12434C48.5663 7.03694 48.7383 6.99094 48.9133 6.99094C49.0883 6.99094 49.2602 7.03694 49.4118 7.12434L61.3899 14.0208C61.4323 14.0457 61.4647 14.0769 61.5021 14.1055C61.5333 14.1305 61.5694 14.1529 61.5981 14.1803C61.633 14.2165 61.6579 14.2576 61.6878 14.2975C61.7103 14.3274 61.7377 14.3536 61.7551 14.386C61.7838 14.4346 61.8 14.4882 61.8199 14.5405C61.8312 14.5692 61.8474 14.5954 61.8548 14.6253ZM59.893 27.9844V16.6121L55.7013 19.0252L49.9104 22.3593V33.7317L59.8942 27.9844H59.893ZM47.9149 48.5566V37.1768L42.2187 40.4299L25.953 49.7133V61.2003L47.9149 48.5566ZM1.99677 9.83281V48.5566L23.9562 61.199V49.7145L12.4841 43.2219L12.4804 43.2194L12.4754 43.2169C12.4368 43.1945 12.4044 43.1621 12.3682 43.1347C12.3371 43.1097 12.3009 43.0898 12.2735 43.0624L12.271 43.0586C12.2386 43.0275 12.2162 42.9888 12.1887 42.9539C12.1638 42.9203 12.1339 42.8916 12.114 42.8567L12.1127 42.853C12.0903 42.8156 12.0766 42.7707 12.0604 42.7283C12.0442 42.6909 12.023 42.656 12.013 42.6161C12.0005 42.5688 11.998 42.5177 11.9931 42.4691C11.9881 42.4317 11.9781 42.3943 11.9781 42.3569V15.5801L6.18848 12.2446L1.99677 9.83281ZM12.9777 2.36177L2.99764 8.10652L12.9752 13.8513L22.9541 8.10527L12.9752 2.36177H12.9777ZM18.1678 38.2138L23.9574 34.8809V9.83281L19.7657 12.2459L13.9749 15.5801V40.6281L18.1678 38.2138ZM48.9133 9.14105L38.9344 14.8858L48.9133 20.6305L58.8909 14.8846L48.9133 9.14105ZM47.9149 22.3593L42.124 19.0252L37.9323 16.6121V27.9844L43.7219 31.3174L47.9149 33.7317V22.3593ZM24.9533 47.987L39.59 39.631L46.9065 35.4555L36.9352 29.7145L25.4544 36.3242L14.9907 42.3482L24.9533 47.987Z" />
      </svg>
      <p className="font-medium mt-2">Laravel</p>
    </Card>
    <Card href="/docs/installation/react-router">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-10 h-10"
        fill="foreground"
      >
        <path d="M12.118 5.466a2.306 2.306 0 0 0-.623.08c-.278.067-.702.332-.953.583-.41.423-.49.609-.662 1.469-.08.423.41 1.43.847 1.734.45.317 1.085.502 2.065.608 1.429.16 1.84.636 1.84 2.197 0 1.377-.385 1.747-1.96 1.906-1.707.172-2.58.834-2.765 2.117-.106.781.41 1.76 1.125 2.091 1.627.768 3.15-.198 3.467-2.196.211-1.284.622-1.642 1.998-1.747 1.588-.133 2.409-.675 2.713-1.787.278-1.02-.304-2.157-1.297-2.554-.264-.106-.873-.238-1.35-.291-1.495-.16-1.879-.424-2.038-1.39-.225-1.337-.317-1.562-.794-2.09a2.174 2.174 0 0 0-1.613-.73zm-4.785 4.36a2.145 2.145 0 0 0-.497.048c-1.469.318-2.17 2.051-1.35 3.295 1.178 1.774 3.944.953 3.97-1.177.012-1.193-.98-2.143-2.123-2.166zM2.089 14.19a2.22 2.22 0 0 0-.427.052c-2.158.476-2.237 3.626-.106 4.182.53.145.582.145 1.111.013 1.191-.318 1.866-1.456 1.549-2.607-.278-1.02-1.144-1.664-2.127-1.64zm19.824.008c-.233.002-.477.058-.784.162-1.39.477-1.866 2.092-.98 3.336.557.794 1.96 1.058 2.82.516 1.416-.874 1.363-3.057-.093-3.746-.38-.186-.663-.271-.963-.268z" />
      </svg>
      <p className="font-medium mt-2">React Router</p>
    </Card>
    <Card href="/docs/installation/astro">
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        fill="foreground"
      >
        <title>Astro</title>
        <path
          d="M16.074 16.86C15.354 17.476 13.917 17.895 12.262 17.895C10.23 17.895 8.527 17.263 8.075 16.412C7.914 16.9 7.877 17.458 7.877 17.814C7.877 17.814 7.771 19.564 8.988 20.782C8.988 20.15 9.501 19.637 10.133 19.637C11.216 19.637 11.215 20.582 11.214 21.349V21.418C11.214 22.582 11.925 23.579 12.937 24C12.7812 23.6794 12.7005 23.3275 12.701 22.971C12.701 21.861 13.353 21.448 14.111 20.968C14.713 20.585 15.383 20.161 15.844 19.308C16.0926 18.8493 16.2225 18.3357 16.222 17.814C16.2221 17.4903 16.1722 17.1685 16.074 16.86ZM15.551 0.6C15.747 0.844 15.847 1.172 16.047 1.829L20.415 16.176C18.7743 15.3246 17.0134 14.7284 15.193 14.408L12.35 4.8C12.3273 4.72337 12.2803 4.65616 12.2162 4.60844C12.152 4.56072 12.0742 4.53505 11.9943 4.53528C11.9143 4.5355 11.8366 4.56161 11.7727 4.60969C11.7089 4.65777 11.6623 4.72524 11.64 4.802L8.83 14.405C7.00149 14.724 5.23264 15.3213 3.585 16.176L7.974 1.827C8.174 1.171 8.274 0.843 8.471 0.6C8.64406 0.385433 8.86922 0.218799 9.125 0.116C9.415 0 9.757 0 10.443 0H13.578C14.264 0 14.608 0 14.898 0.117C15.1529 0.219851 15.3783 0.386105 15.551 0.6Z"
          fill="foreground"
        />
      </svg>
      <p className="font-medium mt-2">Astro</p>
    </Card>

    <Card href="/docs/installation/gatsby">
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        fill="foreground"
      >
        <title>Gatsby</title>
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 2.571c3.171 0 5.915 1.543 7.629 3.858l-1.286 1.115C16.886 5.572 14.571 4.286 12 4.286c-3.343 0-6.171 2.143-7.286 5.143l9.857 9.857c2.486-.857 4.373-3 4.973-5.572h-4.115V12h6c0 4.457-3.172 8.228-7.372 9.17L2.83 9.944C3.772 5.743 7.543 2.57 12 2.57zm-9.429 9.6l9.344 9.258c-2.4-.086-4.801-.943-6.601-2.743-1.8-1.8-2.743-4.201-2.743-6.515z" />
      </svg>
      <p className="font-medium mt-2">Gatsby</p>
    </Card>
    <Card href="/docs/installation/manual">
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        fill="foreground"
      >
        <title>React</title>
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
      </svg>
      <p className="font-medium mt-2">Manual</p>
    </Card> */}
</div>


# Requirements
URL: /getting-started/requirements

undefined

***

title: Requirements
icon: PackageCheck
------------------

In order to use `@daveyplate/better-auth-ui`, your application must meet the following requirements.

## Prerequisites

* You must have [shadcn/ui](https://ui.shadcn.com) installed with CSS variables enabled.
* Configure a [Sonner](https://ui.shadcn.com/docs/components/sonner) `<Toaster />` component for toast notifications.
* Ensure you have [TailwindCSS](https://tailwindcss.com) `v4` set up and configured correctly.
* You must have [better-auth](https://better-auth.com) `v1.3` or greater installed and configured.


# <AcceptInvitationCard />
URL: /components/accept-invitation-card

undefined

***

## title: <AcceptInvitationCard />

The `<AcceptInvitationCard />` component handles the organization invitation acceptance flow. It displays invitation details and allows users to accept or reject organization invitations.

## Usage

This component is typically used on a dedicated invitation acceptance page:

```tsx
import { AcceptInvitationCard } from '@daveyplate/better-auth-ui'

export function AcceptInvitationPage() {
  return (
    <AcceptInvitationCard />
  )
}
```

## Features

* **Invitation Display**: Shows organization details and assigned role
* **Accept/Reject Actions**: Allow users to accept or reject invitations
* **Authentication Check**: Automatically redirects to sign-in if not authenticated
* **Expiration Handling**: Validates invitation expiration
* **Error Handling**: Displays appropriate error messages

## URL Parameters

The component expects an `invitationId` in the URL query parameters:

```
/auth/accept-invitation?invitationId=inv_123456
```

## Reference

<AutoTypeTable path="../src/components/organization/accept-invitation-card.tsx" name="AcceptInvitationCardProps" />

## Examples

### Basic Usage

```tsx
// app/auth/accept-invitation/page.tsx
import { AcceptInvitationCard } from '@daveyplate/better-auth-ui'

export default function AcceptInvitationPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AcceptInvitationCard />
    </div>
  )
}
```

### With Custom Class Names

```tsx
<AcceptInvitationCard 
  classNames={{
    base: "max-w-md",
    header: "text-center",
    button: "rounded-full"
  }}
/>
```

### With Custom Localization

```tsx
<AcceptInvitationCard 
  localization={{
    ACCEPT_INVITATION: "Join Team",
    REJECT: "Decline",
    ACCEPT: "Join"
  }}
/>
```

## Invitation Flow

1. **Email Sent**: User receives invitation email with link
2. **Click Link**: User clicks invitation link with ID
3. **Authentication**: If not signed in, redirected to sign-in
4. **View Invitation**: Component displays organization and role
5. **Accept/Reject**: User chooses to accept or reject
6. **Join Organization**: On accept, user joins organization

## Displayed Information

The card shows:

* Organization name and logo
* Organization slug/URL
* Assigned role (Owner, Admin, Member, or custom)
* Accept and reject buttons

## Error States

The component handles various error scenarios:

* **Invalid Invitation**: Invitation ID not found
* **Expired Invitation**: Past expiration date
* **Already Processed**: Invitation already accepted/rejected
* **Authentication Required**: User not signed in

## Security

* Invitation IDs are secure random tokens
* Server-side validation of invitation status
* Expiration dates are enforced
* User authentication is required

## Integration

Set up the invitation route in your auth configuration:

```tsx
// Using AuthCard with ACCEPT_INVITATION view
<AuthCard view="ACCEPT_INVITATION" />

// Or direct component usage
<AcceptInvitationCard />
```

## Best Practices

1. **Custom Domain**: Use your app domain for invitation links
2. **Expiration Time**: Set reasonable expiration (7-14 days)
3. **Email Template**: Customize invitation email design
4. **Success Redirect**: Configure post-acceptance redirect
5. **Error Pages**: Handle invalid invitation gracefully


# <AccountSettingsCards />
URL: /components/account-settings-cards

A collection of account management cards for user profile settings

***

title: <AccountSettingsCards />
description: A collection of account management cards for user profile settings
-------------------------------------------------------------------------------

## Import

```tsx
import { AccountSettingsCards } from "@daveyplate/better-auth-ui"
```

## Usage

```tsx
<AccountSettingsCards />
```

## Props

| Name           | Type                        | Default     | Description                              |
| -------------- | --------------------------- | ----------- | ---------------------------------------- |
| `className`    | `string`                    | `undefined` | Additional CSS classes for the container |
| `classNames`   | `SettingsCardsClassNames`   | `undefined` | Class names for individual components    |
| `localization` | `Partial<AuthLocalization>` | `undefined` | Localization object for translations     |

## Example

```tsx
import { AccountSettingsCards } from "@daveyplate/better-auth-ui"

export function AccountSettings() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
            <AccountSettingsCards />
        </div>
    )
}
```

## Custom Styling

```tsx
<AccountSettingsCards
    className="space-y-8"
    classNames={{
        cards: "gap-6",
        card: {
            base: "border-2",
            header: "bg-gray-50"
        }
    }}
/>
```

## Features

The `AccountSettingsCards` component automatically renders relevant account management cards based on your Better Auth configuration:

### Included Cards

* **Update Avatar Card** - If avatar support is enabled
* **Update Username Card** - If username credentials are enabled
* **Update Name Card** - If name field is included in settings
* **Change Email Card** - If email changes are enabled
* **Custom Fields** - Any additional fields configured in your auth setup
* **Accounts Card** - If multi-session support is enabled

### Conditional Rendering

Cards are conditionally rendered based on your Better Auth configuration. For example:

* Avatar card only appears if `avatar` is configured
* Username card only appears if `credentials.username` is enabled
* Custom fields are rendered dynamically based on `additionalFields`

## Localization

The component supports full localization through the `localization` prop:

```tsx
<AccountSettingsCards
    localization={{
        accountSettings: {
            title: "Paramètres du compte",
            updateAvatar: "Mettre à jour l'avatar",
            updateName: "Mettre à jour le nom"
            // ... other translations
        }
    }}
/>
```

## Related Components

* [`<SettingsCards />`](/docs/components/settings-cards) - Parent component with navigation
* [`<UpdateAvatarCard />`](/docs/components/update-avatar-card) - Individual avatar update card
* [`<UpdateNameCard />`](/docs/components/update-name-card) - Individual name update card
* [`<AccountsCard />`](/docs/components/accounts-card) - Linked accounts management


# <AccountsCard />
URL: /components/accounts-card

Displays and manages linked social accounts

***

title: <AccountsCard />
description: Displays and manages linked social accounts
--------------------------------------------------------

## Import

```tsx
import { AccountsCard } from "@better-auth/ui-react/components"
```

## Usage

```tsx
<AccountsCard />
```

## Props

| Name           | Type                        | Default     | Description                                |
| -------------- | --------------------------- | ----------- | ------------------------------------------ |
| `className`    | `string`                    | `undefined` | Additional CSS classes for styling         |
| `classNames`   | `SettingsCardClassNames`    | `undefined` | Class names for individual card components |
| `localization` | `Partial<AuthLocalization>` | `undefined` | Localization object for translations       |

## Example

```tsx
import { AccountsCard } from "@better-auth/ui-react/components"

export function AccountSettings() {
    return (
        <div className="space-y-4">
            <AccountsCard />
        </div>
    )
}
```

## Features

* View all linked social accounts (Google, GitHub, Discord, etc.)
* Link new social accounts
* Unlink existing social accounts
* Shows provider icons and account information
* Built-in loading states
* Prevents unlinking if it's the only authentication method


# <ApiKeysCard />
URL: /components/api-keys-card

undefined

***

## title: <ApiKeysCard />

The `<ApiKeysCard />` component provides a complete interface for managing API keys, including creating, viewing, and deleting API keys for programmatic access to your application.

## Usage

```tsx
import { ApiKeysCard } from '@daveyplate/better-auth-ui'

export function ApiKeysSettingsPage() {
  return (
    <ApiKeysCard />
  )
}
```

## Features

* **Create API Keys**: Generate new API keys with custom names and expiration
* **View API Keys**: List all active API keys with masked values
* **Delete API Keys**: Remove API keys that are no longer needed
* **Expiration Management**: Set expiration dates for API keys
* **Copy to Clipboard**: Easy copying of newly created keys

## Reference

<AutoTypeTable path="../src/components/settings/shared/settings-card.tsx" name="SettingsCardProps" />

## Examples

### Basic Usage

```tsx
<ApiKeysCard />
```

### With Custom Class Names

```tsx
<ApiKeysCard 
  classNames={{
    base: "shadow-md",
    button: "rounded-full",
    cell: "hover:bg-accent"
  }}
/>
```

### With Custom Localization

```tsx
<ApiKeysCard 
  localization={{
    API_KEYS: "Developer Keys",
    CREATE_API_KEY: "Generate New Key",
    DELETE: "Revoke"
  }}
/>
```

## API Key Creation

When creating a new API key, users can:

1. **Set a Name**: Identify the key's purpose
2. **Set Expiration**: Choose from predefined durations or no expiration
   * 1 day
   * 7 days
   * 30 days
   * 60 days
   * 90 days
   * 180 days
   * 1 year
   * No expiration

## Security Features

* **One-Time Display**: API keys are shown only once after creation
* **Masked Display**: Only the first few characters are shown in the list
* **Secure Storage**: Keys are hashed and stored securely
* **Immediate Revocation**: Keys can be deleted instantly

## Requirements

The API Key plugin must be enabled in your auth configuration:

```tsx title="providers.tsx"
<AuthUIProvider
  authClient={authClient}
  apiKey={{
    prefix: "app_", // Optional: Custom prefix for keys
    metadata: {      // Optional: Additional metadata
      environment: "production"
    }
  }}
>
  {children}
</AuthUIProvider>
```

## Display Components

### API Key List

Shows all active API keys with:

* Key name
* Masked key value (first 4 characters + asterisks)
* Expiration date or "Never expires"
* Delete button

### Create Dialog

Modal for creating new keys with:

* Name input field
* Expiration dropdown
* Create button with loading state

### Display Dialog

Shows newly created key with:

* Full API key value
* Copy to clipboard button
* Warning about one-time display
* Done button to close

## Best Practices

1. **Naming Convention**: Use descriptive names for keys
2. **Expiration Policy**: Always set expiration for production keys
3. **Key Rotation**: Regularly rotate API keys
4. **Access Control**: Limit who can create/delete keys
5. **Monitoring**: Track API key usage


# <AuthLoading />
URL: /components/auth-loading

undefined

***

## title: <AuthLoading />

The `<AuthLoading />` component renders its children only during an authentication session loading. This provides an easy way for you to insert loading states or skeleton loaders into your UI, enhancing user experience during data fetching.

## Usage

Wrap loading placeholders or loader components with `<AuthLoading />` to conditionally render them whenever authentication session data is being fetched.

```tsx
import { AuthLoading } from "@daveyplate/better-auth-ui"

export default function LoadingExample() {
  return (
    <AuthLoading>
      <YourLoadingSkeleton />
    </AuthLoading>
  )
}
```

## Example

Here's a complete example of using `<AuthLoading />` with loading skeletons and managing unauthenticated user sessions using the [`<RedirectToSignIn />`](/components/redirect-to-sign-in) and [`<SignedIn />`](/components/signed-in) components.

```tsx title="ProtectedPage.tsx"
import { AuthLoading, RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui"
import { YourCustomSkeleton } from "@/components/your-custom-skeleton"
import { DashboardContent } from "@/components/dashboard-content"

export default function ProtectedPage() {
  return (
    <>
      <AuthLoading>
        <YourCustomSkeleton />
      </AuthLoading>

      <RedirectToSignIn />

      <SignedIn>
        <DashboardContent />
      </SignedIn>
    </>
  )
}
```

### Explanation

* `<AuthLoading />` will render the loading skeleton (`<YourCustomSkeleton />`) while authentication or session data is initializing or fetching.
* `<RedirectToSignIn />` automatically pushes any unauthenticated users to the sign-in page, ensuring pages that require authentication are protected from unauthorized access.
* `<SignedIn />` ensures the enclosed content (`<DashboardContent />`) only displays for authenticated users.

This combined approach offers seamless handling of loading states, authentication redirection, and conditional rendering based on user authentication state, greatly improving the overall user experience.

***

## Skeleton Loaders

In practice, your skeleton loader will likely be customized. Here's a basic example you can easily customize to fit your use-case:

```tsx title="components/your-custom-skeleton.tsx"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function YourCustomSkeleton() {
  return (
    <Card className="w-full mx-auto max-w-md">
      <CardHeader>
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>

      <CardContent className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </CardContent>
    </Card>
  )
}
```

This example skeleton provides placeholder components resembling the size and shape of loaded content, greatly reducing UI flicker and enhancing user-perceived loading performance.


# <AuthUIProvider />
URL: /components/auth-ui-provider

undefined

***

## title: <AuthUIProvider />

The `<AuthUIProvider />` wraps your application with authentication context, providing essential hooks, settings, and methods required by authentication-related components and hooks throughout your app.

## Usage

```tsx title="providers.tsx"
"use client"

import { AuthUIProvider } from '@daveyplate/better-auth-ui'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      Link={Link}
    >
      {children}
    </AuthUIProvider>
  )
}
```

## Reference

The following props can be passed to the `<AuthUIProvider />` component:

<AutoTypeTable path="../src/lib/auth-ui-provider.tsx" name="AuthUIProviderProps" />

## Example

A minimal Next.js layout file using the `AuthUIProvider`:

```tsx
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <html lang="en">
      <body>
        <AuthUIProvider
          authClient={authClient}
          navigate={router.push}
          replace={router.replace}
          onSessionChange={() => router.refresh()}
          social={{
            providers: ["github", "google", "facebook", "apple"]
          }}
          multiSession
          magicLink
          passkey
          avatar={{
            upload: async (file) => {
              const formData = new FormData()
              formData.append("avatar", file)

              const res = await fetch("/api/uploadAvatar", { method: "POST", body: formData })
              const { data } = await res.json()

              return data.url
            },
            delete: async (url) => {
              await fetch("/api/deleteAvatar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
              })
            },
            // Custom Image component for rendering avatar images
            // Useful for CDN optimization (Cloudinary, Imgix, ImgProxy, etc.)
            Image: Image // Use Next.js Image component for avatars
          }}
          captcha={{
            provider: "google-recaptcha-v3",
            siteKey: "your-site-key",
          }}
          account={{
            basePath: "/dashboard",
            fields: ["image", "name"]
          }}
          twoFactor={["otp", "totp"]}
          Link={Link}
          localizeErrors={false}
        >
          {children}
        </AuthUIProvider>
      </body>
    </html>
  )
}
```


# <AuthView />
URL: /components/auth-view

undefined

***

## title: <AuthView />

The `<AuthView />` component provides an interactive and customizable authentication interface that seamlessly integrates with your authentication flow. It supports multiple authentication methods, including email/password, magic links, passkey (WebAuthn), and social providers.

## Reference

The following props can be passed to `<AuthView />` for customization:

<AutoTypeTable path="../src/components/auth/auth-view.tsx" name="AuthViewProps" />

## Examples

Below are practical usage examples demonstrating common scenarios:

### Specifying Initial View

You can specify the current view manually using the `view` prop:

```tsx
<AuthView view="SIGN_IN" />
```

### Custom Redirect After Authentication

Customize the navigation after successful authentication using the `redirectTo` prop:

```tsx
<AuthView redirectTo="/dashboard" />
```

## Localization

You can pass custom localization texts to fit different languages or contexts:

```tsx
<AuthView
    localization={{
        SIGN_IN: "Log in",
        SIGN_UP: "Register",
        MAGIC_LINK: "Sign in with Email",
    }}
/>
```

## Styling

You can thoroughly customize `<AuthView />` components using TailwindCSS utility classes and the provided `classNames` prop:

```tsx
<AuthView
    classNames={{
        base: "border-2 border-destructive max-w-xs",
        header: "bg-destructive/30",
        title: "text-xl text-destructive font-semibold",
        footerLink: "text-destructive hover:text-foreground",
    }}
/>
```


# <ChangeEmailCard />
URL: /components/change-email-card

undefined

***

## title: <ChangeEmailCard />

The `<ChangeEmailCard />` component provides a simple and secure UI that allows users to change their account email address, including verification emails sent to the updated address, if email verification is enabled.

<img alt="Change Email Card" src="/screenshots/change-email-card-dark.png" className="rounded-xl hidden dark:block w-lg mt-0 mb-0" />

<img alt="Change Email Card" src="/screenshots/change-email-card-light.png" className="rounded-xl dark:hidden w-lg mt-0 mb-0" />

## Usage

Here's how to implement `<ChangeEmailCard />` on your custom settings page:

```tsx
import { ChangeEmailCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <ChangeEmailCard />
        </div>
    )
}
```

The component automatically integrates with your [`AuthUIProvider`](../components/auth-ui-provider) context and handles email verification workflows seamlessly.

## Reference

These are the available props for `<ChangeEmailCard />`:

<AutoTypeTable path="../src/components/settings/shared/settings-card.tsx" name="SettingsCardProps" />

## Styling

You can customize the styles using the provided `classNames` prop:

```tsx
<ChangeEmailCard
    classNames={{
        base: "border-primary shadow",
        header: "bg-primary-foreground text-primary",
        title: "text-xl font-semibold",
        description: "text-muted-foreground",
        content: "bg-background",
        footer: "bg-muted",
        input: "bg-transparent border-primary placeholder:text-muted-foreground"
    }}
/>
```

## Localization

You can pass custom text via the `localization` prop:

```tsx
<ChangeEmailCard
    localization={{
        EMAIL: "Your Email",
        EMAIL_DESCRIPTION: "You can update your email here.",
        EMAIL_INSTRUCTIONS: "We'll send you a verification link to your new email address.",
        EMAIL_PLACEHOLDER: "you@example.com",
        EMAIL_VERIFY_CHANGE: "Check your inbox for the verification link!"
    }}
/>
```


# <ChangePasswordCard />
URL: /components/change-password-card

undefined

***

## title: <ChangePasswordCard />

The `<ChangePasswordCard />` provides a secure and user-friendly interface for users to update their account passwords, seamlessly integrated with your authentication flow. It supports verification workflows to ensure passwords are securely updated, revoking other active sessions when the password changes.

<img alt="Change Password Card" src="/screenshots/change-password-card-dark.png" className="rounded-xl hidden dark:block w-lg mt-0 mb-0" />

<img alt="Change Password Card" src="/screenshots/change-password-card-light.png" className="rounded-xl dark:hidden w-lg mt-0 mb-0" />

## Usage

Here's how you can include `<ChangePasswordCard />` in your user account settings page:

```tsx
import { ChangePasswordCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <ChangePasswordCard />
        </div>
    )
}
```

This component automatically utilizes the context provided by the [`AuthUIProvider`](/components/auth-ui-provider) and manages password update workflows seamlessly, including revoking other active sessions upon successful password changes.

## Reference

The following props can be utilized to further customize `<ChangePasswordCard />`:

<AutoTypeTable path="../src/components/settings/security/change-password-card.tsx" name="ChangePasswordCardProps" />

## Styling

Customize the component styles extensively by providing Tailwind CSS utility classes through the `classNames` prop:

```tsx
<ChangePasswordCard
    classNames={{
        base: "border-primary shadow",
        header: "bg-primary-foreground",
        title: "text-primary font-semibold text-xl",
        description: "text-muted-foreground",
        content: "bg-background",
        footer: "bg-muted",
        input: "bg-background placeholder:text-muted-foreground",
        button: "bg-primary hover:bg-primary-foreground text-white"
    }}
/>
```

### Using with linked social accounts (Set Password)

If a user's account was initially created via a social provider without setting a password, the card automatically transforms into a convenient "Set Password" button. Clicking this button triggers sending the user an email with a link to set their password securely.

You don't have to configure anything extra; this behavior is automatic based on your account setup.

***

## Localization

You can easily adjust the displayed texts via the localization prop:

```tsx
<ChangePasswordCard
    localization={{
        CHANGE_PASSWORD: "Update your password",
        CHANGE_PASSWORD_DESCRIPTION: "Set a new password for your account",
        CURRENT_PASSWORD: "Current Password",
        NEW_PASSWORD: "New Password",
        CHANGE_PASSWORD_SUCCESS: "Password successfully updated!",
        SET_PASSWORD: "Set Password",
        SET_PASSWORD_DESCRIPTION: "Add a password to your social account for easy future logins.",
        SET_PASSWORD_EMAIL_SENT: "Check your mailbox to set your new password!"
    }}
/>
```


# <DeleteAccountCard />
URL: /components/delete-account-card

undefined

***

## title: <DeleteAccountCard />

The `<DeleteAccountCard />` component provides users a streamlined UI to delete their account. It supports verification flows, such as password confirmation or email verification, before account deletion.

<img alt="Delete Account Card" src="/screenshots/delete-account-card-dark.png" className="rounded-xl hidden dark:block w-lg mt-0 mb-0" />

<img alt="Delete Account Card" src="/screenshots/delete-account-card-light.png" className="rounded-xl dark:hidden w-lg mt-0 mb-0" />

## Usage

Include the `<DeleteAccountCard />` component on your user settings page:

```tsx
import { DeleteAccountCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <DeleteAccountCard />
        </div>
    )
}
```

This component leverages the [`AuthUIProvider`](/components/auth-ui-provider) context to handle account deletion (and optional verification) seamlessly.

## Reference

These are the available props for `<DeleteAccountCard />`:

<AutoTypeTable path="../src/components/settings/account/delete-account-card.tsx" name="DeleteAccountCardProps" />

## Styling

You can customize styling using the provided `classNames` prop with TailwindCSS classes:

```tsx
<DeleteAccountCard
    classNames={{
        base: "border-destructive",
        header: "bg-destructive/10",
        title: "text-destructive text-xl font-semibold",
        description: "text-destructive",
        footer: "bg-destructive/30",
        button: "bg-destructive hover:bg-destructive/80 text-white"
    }}
/>
```

## Localization

Adjust the text within the component for specific requirements or languages:

```tsx
<DeleteAccountCard
    localization={{
        DELETE_ACCOUNT: "Delete My Account",
        DELETE_ACCOUNT_DESCRIPTION: "This action permanently deletes your account and is irreversible.",
        DELETE_ACCOUNT_INSTRUCTIONS: "Please provide your password to confirm deletion.",
        DELETE_ACCOUNT_NOT_FRESH: "Sign out and back in to delete your account.",
    }}
/>
```


# <EmailTemplate />
URL: /components/email-template

undefined

***

## title: <EmailTemplate />

The `<EmailTemplate />` component lets you easily build responsive HTML emails with consistent styling for your authentication flows. It's specifically designed to integrate seamlessly with Better Auth.

<img alt="Email Template" src="/screenshots/email-template-dark.png" className="rounded-xl hidden dark:block w-sm mt-0 mb-0" />

<img alt="Email Template" src="/screenshots/email-template-light.png" className="rounded-xl dark:hidden w-sm mt-0 mb-0" />

## Usage

This example demonstrates implementing the email verification notification with the `<EmailTemplate />`:

```tsx title="lib/auth.tsx"
import { Resend } from "resend"
import { EmailTemplate } from "@daveyplate/better-auth-ui/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            const name = user.name || user.email.split("@")[0]

            await resend.emails.send({
                from: fromEmail,
                to: user.email,
                subject: "Verify your email address",
                react: EmailTemplate({
                    action: "Verify Email",
                    content: (
                        <>
                            <p>
                                {`Hello ${name},`}
                            </p>

                            <p>
                                Click the button below to verify your email address.
                            </p>
                        </>
                    ),
                    heading: "Verify Email",
                    siteName: "NEW-TECH",
                    baseUrl: "https://newtech.dev",
                    url
                })
            })
        },
        autoSignInAfterVerification: true,
        sendOnSignUp: true
    }
})
```

This example demonstrates using the component specifically to send email verification messages. You can easily adapt it to suit other use cases like password reset, magic links, and more, by adjusting the `content`, `action`, and `heading`.

## Reference

The following props can be passed to the `<EmailTemplate />` component:

<AutoTypeTable path="../src/components/email/email-template.tsx" name="EmailTemplateProps" />


# <OrganizationMembersCard />
URL: /components/organization-members-card

undefined

***

## title: <OrganizationMembersCard />

The `<OrganizationMembersCard />` component provides a comprehensive interface for managing organization members, including inviting new members, updating roles, and removing members.

## Usage

```tsx
import { OrganizationMembersCard } from '@daveyplate/better-auth-ui'

export function OrganizationMembersPage() {
  return (
    <OrganizationMembersCard />
  )
}
```

## Features

* **Member List**: View all organization members with their roles
* **Invite Members**: Send email invitations to new members
* **Role Management**: Update member roles (owner, admin, member, custom)
* **Remove Members**: Remove members from the organization
* **Permission Control**: Actions based on user permissions

## Reference

<AutoTypeTable path="../src/components/settings/shared/settings-card.tsx" name="SettingsCardProps" />

## Examples

### Basic Usage

```tsx
<OrganizationMembersCard />
```

### With Custom Class Names

```tsx
<OrganizationMembersCard 
  classNames={{
    base: "shadow-lg",
    cell: "hover:bg-accent",
    button: "rounded-full"
  }}
/>
```

### With Custom Localization

```tsx
<OrganizationMembersCard 
  localization={{
    MEMBERS: "Team Members",
    INVITE_MEMBER: "Add Team Member",
    OWNER: "Team Owner",
    ADMIN: "Team Admin",
    MEMBER: "Team Member"
  }}
/>
```

## Member Management Features

### Member Display

Each member shows:

* User avatar and name
* Email address
* Current role
* Actions dropdown (based on permissions)

### Role Hierarchy

1. **Owner**: Full control, can transfer ownership
2. **Admin**: Can manage members and settings
3. **Member**: Basic access
4. **Custom Roles**: Additional roles defined in configuration

### Invite Process

1. Enter email address
2. Select role for new member
3. Send invitation
4. Member receives email with invitation link
5. Member accepts invitation to join

## Permissions

Actions are permission-based:

* **Invite Members**: Requires `invitation:create` permission
* **Update Roles**: Requires `member:update` permission
* **Remove Members**: Requires `member:delete` permission

## Requirements

Enable organization plugin with proper configuration:

```tsx title="providers.tsx"
<AuthUIProvider
  authClient={authClient}
  organization={{
    customRoles: [
      { role: "developer", label: "Developer" },
      { role: "viewer", label: "Viewer" },
      { role: "billing", label: "Billing Admin" }
    ]
  }}
>
  {children}
</AuthUIProvider>
```

## Related Components

### Invite Member Dialog

* Email input with validation
* Role selection dropdown
* Send invitation with loading state

### Update Role Dialog

* Current member display
* Role selection
* Update with confirmation

### Remove Member Dialog

* Confirmation prompt
* Member details display
* Remove action with loading state

## Best Practices

1. **Role Assignment**: Assign minimal necessary permissions
2. **Regular Audits**: Review member list periodically
3. **Invitation Expiry**: Set reasonable expiration for invites
4. **Owner Protection**: Prevent accidental owner removal
5. **Clear Labels**: Use descriptive role names


# <OrganizationSettingsCards />
URL: /components/organization-settings-cards

undefined

***

## title: <OrganizationSettingsCards />

The `<OrganizationSettingsCards />` component provides a comprehensive set of cards for managing organization settings, including organization details, logo, and deletion options.

## Usage

```tsx
import { OrganizationSettingsCards } from '@daveyplate/better-auth-ui'

export function OrganizationSettingsPage() {
  return (
    <OrganizationSettingsCards />
  )
}
```

## Features

* **Organization Logo**: Upload and manage organization logo
* **Organization Name**: Update organization name
* **Organization Slug**: Update organization slug/identifier
* **Delete Organization**: Delete the organization (owner only)

## Reference

<AutoTypeTable path="../src/components/organization/organization-settings-cards.tsx" name="OrganizationSettingsCardsProps" />

## Examples

### Basic Usage

```tsx
<OrganizationSettingsCards />
```

### With Custom Class Names

```tsx
<OrganizationSettingsCards 
  classNames={{
    cards: "gap-8",
    card: {
      base: "shadow-lg",
      title: "text-2xl",
      button: "rounded-full"
    }
  }}
/>
```

### With Custom Localization

```tsx
<OrganizationSettingsCards 
  localization={{
    ORGANIZATION_NAME: "Team Name",
    ORGANIZATION_SLUG: "Team URL",
    DELETE_ORGANIZATION: "Delete Team"
  }}
/>
```

## Included Cards

### Organization Logo Card

* Upload custom organization logo
* Delete existing logo
* Automatic image resizing and cropping
* Support for custom upload functions

### Organization Name Card

* Update organization display name
* Real-time validation
* Permission-based access control

### Organization Slug Card

* Update organization URL identifier
* Slug format validation (lowercase, hyphens)
* Uniqueness checking

### Delete Organization Card

* Owner-only access
* Confirmation dialog
* Automatic cleanup of related data

## Requirements

The organization plugin must be enabled with proper configuration:

```tsx title="providers.tsx"
<AuthUIProvider
  authClient={authClient}
  organization={{
    logo: {
      upload: async (file) => {
        // Your upload logic
        return uploadedUrl
      },
      delete: async (url) => {
        // Optional: clean up your storage/CDN on delete
        await myCdn.delete(url)
      },
      size: 256,
      extension: "png"
    }
  }}
>
  {children}
</AuthUIProvider>
```

## Permissions

* **View Settings**: All organization members
* **Update Name/Slug**: Admin and Owner roles
* **Upload Logo**: Admin and Owner roles
* **Delete Organization**: Owner role only


# <OrganizationSwitcher />
URL: /components/organization-switcher

undefined

***

## title: <OrganizationSwitcher />

The `<OrganizationSwitcher />` is a comprehensive component that provides organization and personal account switching functionality. It displays the currently active organization or personal account and allows users to switch between them, create new organizations, and manage their organization settings.

## Usage

```tsx
import { OrganizationSwitcher } from '@daveyplate/better-auth-ui'

export function Header() {
  return (
    <nav>
      <OrganizationSwitcher />
    </nav>
  )
}
```

## Features

* **Organization Selection**: Switch between different organizations
* **Personal Account**: Switch back to personal account
* **Create Organization**: Create new organizations directly from the switcher
* **Organization Settings**: Quick access to organization settings
* **Responsive Design**: Adapts to different screen sizes
* **Custom Trigger**: Use your own trigger element
* **Hide Personal Mode**: Option to enforce organization-only usage

## Reference

<AutoTypeTable path="../src/components/organization/organization-switcher.tsx" name="OrganizationSwitcherProps" />

## Examples

### Basic Usage

```tsx
<OrganizationSwitcher />
```

### With Custom Size

```tsx
<OrganizationSwitcher size="icon" />
```

### With Custom Alignment

```tsx
<OrganizationSwitcher align="start" />
```

### With Custom Trigger

```tsx
import { Button } from '@/components/ui/button'

<OrganizationSwitcher 
  trigger={
    <Button variant="outline">
      Switch Organization
    </Button>
  }
/>
```

### With onSetActive Callback

```tsx
<OrganizationSwitcher 
  onSetActive={(organizationId) => {
    console.log('Switched to:', organizationId)
  }}
/>
```

### With Custom Localization

```tsx
<OrganizationSwitcher 
  localization={{
    ORGANIZATION: "Team",
    CREATE_ORGANIZATION: "Create Team",
    PERSONAL_ACCOUNT: "Personal Workspace"
  }}
/>
```

### With Custom Class Names

```tsx
<OrganizationSwitcher 
  classNames={{
    trigger: {
      base: "bg-primary text-primary-foreground",
      avatar: {
        base: "size-8"
      }
    },
    content: {
      base: "w-80",
      menuItem: "gap-3"
    }
  }}
/>
```

### Hide Personal Account

For applications that require users to always work within an organization context, you can hide the personal account option:

```tsx
<OrganizationSwitcher hidePersonal />
```

When `hidePersonal` is set to `true`:

* The personal account option is removed from the dropdown
* If no organization is active, the first available organization is automatically selected
* Users cannot switch back to their personal account
* The switcher only shows and allows switching between organizations

## Behavior

* **Initial State**: Shows the active organization or personal account
* **Loading State**: Displays skeleton loader while fetching data
* **Empty State**: Shows "Sign In" option when not authenticated
* **Error Handling**: Displays toast notifications for errors
* **Automatic Updates**: Refreshes when organization changes

## Requirements

The `OrganizationSwitcher` requires the organization plugin to be configured in your auth client:

```tsx title="providers.tsx"
<AuthUIProvider
  authClient={authClient}
  organization={{
    logo: true,
    customRoles: [
      { role: "developer", label: "Developer" },
      { role: "viewer", label: "Viewer" }
    ]
  }}
>
  {children}
</AuthUIProvider>
```


# <PasskeysCard />
URL: /components/passkeys-card

Displays and manages user's passkeys/WebAuthn credentials

***

title: <PasskeysCard />
description: Displays and manages user's passkeys/WebAuthn credentials
----------------------------------------------------------------------

## Import

```tsx
import { PasskeysCard } from "@better-auth/ui-react/components"
```

## Usage

```tsx
<PasskeysCard />
```

## Props

| Name           | Type               | Default     | Description                          |
| -------------- | ------------------ | ----------- | ------------------------------------ |
| `className`    | `string`           | `undefined` | Additional CSS classes for styling   |
| `localization` | `AuthLocalization` | `undefined` | Localization object for translations |

## Example

```tsx
import { PasskeysCard } from "@better-auth/ui-react/components"

export function SecuritySettings() {
    return (
        <div className="space-y-4">
            <PasskeysCard />
        </div>
    )
}
```

## Features

* View all registered passkeys
* Add new passkeys
* Delete existing passkeys
* Shows passkey creation date and device info
* Built-in loading states


# <ProvidersCard />
URL: /components/providers-card

undefined

***

## title: <ProvidersCard />

The `<ProvidersCard />` component provides a simple interface for managing linked social providers. It allows users to link or unlink third-party social accounts with a clean, customizable UI out of the box.

**Note:** You must configure the `providers` option in your [`AuthUIProvider`](../components/auth-ui-provider) context to use this component.

<img alt="Providers Card" src="/screenshots/providers-card-dark.png" className="rounded-xl hidden dark:block w-lg mt-0 mb-0" />

<img alt="Providers Card" src="/screenshots/providers-card-light.png" className="rounded-xl dark:hidden w-lg mt-0 mb-0" />

## Usage

Here's how you can include `<ProvidersCard />` on your user settings or account management page:

```tsx
import { ProvidersCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <ProvidersCard />
        </div>
    )
}
```

This component seamlessly pulls in settings from your [`AuthUIProvider`](../components/auth-ui-provider) context, automatically handling provider link and unlink workflows.

## Reference

You can use the following props to further customize `<ProvidersCard />`:

<AutoTypeTable path="../src/components/settings/providers/providers-card.tsx" name="ProvidersCardProps" />

## Styling

Customize the styling of your `<ProvidersCard />` through the `classNames` prop:

```tsx
<ProvidersCard
    classNames={{
        base: "border-primary shadow",
        header: "bg-primary-foreground",
        title: "text-xl font-semibold text-primary",
        description: "text-muted-foreground",
        content: "bg-background",
        footer: "bg-muted",
        button: "bg-primary hover:bg-primary-foreground text-white"
    }}
/>
```

## Localization

Adjust displayed texts via the `localization` prop to fit your application's localization:

```tsx
<ProvidersCard
    localization={{
        PROVIDERS: "Social Accounts",
        PROVIDERS_DESCRIPTION: "Link or unlink your third-party social accounts.",
        LINK: "Link Account",
        UNLINK: "Unlink",
    }}
/>
```

## Usage in Settings Page

You usually integrate the `<ProvidersCard />` with other settings components. Here's a typical example configuration:

```tsx title="app/dashboard/settings/page.tsx"
import {
    ProvidersCard,  
    ChangeEmailCard,
    SettingsCards,
} from "@daveyplate/better-auth-ui";

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6 mx-auto max-w-xl">
            <UpdateAvatarCard />
            <UpdateUsernameCard />
            <ChangeEmailCard />
            <ChangePasswordCard />
            <ProvidersCard />
            <SessionsCard />
            <DeleteAccountCard />
        </div>
    )
}
```

This complete implementation shows how you can use `<ProvidersCard />` along with other available settings cards to build a comprehensive, managed user settings experience quickly.


# <RedirectToSignIn />
URL: /components/redirect-to-sign-in

undefined

***

## title: <RedirectToSignIn />

The `<RedirectToSignIn />` component automatically redirects unauthenticated users to the sign-in page. If the user is already authenticated, this component will render nothing and allow the user to view the content normally.

Useful for wrapping pages or routes that require users to be signed in.

## Usage

```tsx
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui"

export default function ProtectedPage() {
    return (
        <>
            <RedirectToSignIn />

            <SignedIn>
                You can see this content only if you are authenticated.
            </SignedIn>
        </>
    )
}
```

## Example

Here's a practical example of enforcing authentication for private routes:

```tsx title="PrivateRoute.tsx"
import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui"

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RedirectToSignIn />
      
      <SignedIn>
        {children}
      </SignedIn>
    </>
  )
}
```

In this example, we're ensuring that the user is redirected to the sign-in page if they are not logged in.


# <RedirectToSignUp />
URL: /components/redirect-to-sign-up

undefined

***

## title: "<RedirectToSignUp />"

The `<RedirectToSignUp />` component ensures users are redirected to the sign-up page if they are not authenticated. If the user is signed in, it does nothing. It's useful for protected pages in your application, specifically when you want unauthenticated users to immediately register instead of logging in.

## Usage

```tsx
import { RedirectToSignUp, SignedIn } from "@daveyplate/better-auth-ui"

export default function ProtectedPage() {
  return (
    <>
      <RedirectToSignUp />

      <SignedIn>
        Welcome! You are signed in.
      </SignedIn>
    </div>
  )
}
```


# <SecuritySettingsCards />
URL: /components/security-settings-cards

A collection of security-related settings cards for user account protection

***

title: <SecuritySettingsCards />
description: A collection of security-related settings cards for user account protection
----------------------------------------------------------------------------------------

## Import

```tsx
import { SecuritySettingsCards } from "@daveyplate/better-auth-ui"
```

## Usage

```tsx
<SecuritySettingsCards />
```

## Props

| Name           | Type                        | Default     | Description                              |
| -------------- | --------------------------- | ----------- | ---------------------------------------- |
| `className`    | `string`                    | `undefined` | Additional CSS classes for the container |
| `classNames`   | `SettingsCardsClassNames`   | `undefined` | Class names for individual components    |
| `localization` | `Partial<AuthLocalization>` | `undefined` | Localization object for translations     |

## Example

```tsx
import { SecuritySettingsCards } from "@daveyplate/better-auth-ui"

export function SecuritySettings() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
            <SecuritySettingsCards />
        </div>
    )
}
```

## Custom Styling

```tsx
<SecuritySettingsCards
    className="space-y-8"
    classNames={{
        cards: "gap-6",
        card: {
            base: "border-dashed",
            header: "bg-red-50 dark:bg-red-950"
        }
    }}
/>
```

## Features

The `SecuritySettingsCards` component automatically renders security-related cards based on your Better Auth configuration:

### Included Cards

* **Change Password Card** - For updating account password (if credentials are enabled)
* **Providers Card** - Manage linked social accounts (if social providers are configured)
* **Two-Factor Authentication Card** - Enable/disable 2FA (if two-factor is enabled and credentials are linked)
* **Passkeys Card** - Manage passkeys for passwordless authentication (if passkeys are enabled)
* **Sessions Card** - View and manage active sessions
* **Delete Account Card** - Allow users to delete their account (if delete user is enabled)

### Conditional Rendering

Cards are conditionally rendered based on:

* Your Better Auth configuration
* User's current authentication state
* Available authentication methods

For example:

* Password card only appears if `credentials` is enabled
* Two-factor card requires both `twoFactor` enabled and a credential-linked account
* Providers card appears if either `social.providers` or `genericOAuth.providers` are configured

## Localization

The component supports full localization through the `localization` prop:

```tsx
<SecuritySettingsCards
    localization={{
        security: {
            title: "Sécurité",
            changePassword: "Changer le mot de passe",
            twoFactorAuth: "Authentification à deux facteurs",
            sessions: "Sessions actives"
            // ... other translations
        }
    }}
/>
```

## Security Considerations

This component handles sensitive security settings. It includes:

* Session freshness checks for critical operations
* Proper authentication state validation
* Secure password change flows
* Safe account deletion with confirmation

## Related Components

* [`<SettingsCards />`](/docs/components/settings-cards) - Parent component with navigation
* [`<ChangePasswordCard />`](/docs/components/change-password-card) - Individual password change card
* [`<TwoFactorCard />`](/docs/components/two-factor-card) - Two-factor authentication management
* [`<SessionsCard />`](/docs/components/sessions-card) - Active sessions management
* [`<DeleteAccountCard />`](/docs/components/delete-account-card) - Account deletion


# <SessionsCard />
URL: /components/sessions-card

undefined

***

## title: <SessionsCard />

The `<SessionsCard />` component provides users with an intuitive interface for viewing and managing their active authentication sessions. Users can easily revoke active sessions, enhancing security by maintaining control over their account access across multiple devices and browsers.

<img alt="Sessions Card" src="/screenshots/sessions-card-dark.png" className="rounded-xl hidden dark:block w-lg mt-0 mb-0" />

<img alt="Sessions Card" src="/screenshots/sessions-card-light.png" className="rounded-xl dark:hidden w-lg mt-0 mb-0" />

## Usage

Include the `<SessionsCard />` component within your account settings page or security settings page:

```tsx
import { SessionsCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <SessionsCard />
        </div>
    )
}
```

## Reference

Below are the available props for customizing `<SessionsCard />`:

<AutoTypeTable path="../src/components/settings/security/sessions-card.tsx" name="SessionsCardProps" />

## Styling

You can customize the appearance of `<SessionsCard />` using Tailwind CSS classes provided via the `classNames` prop:

```tsx
<SessionsCard
    classNames={{
        base: "border-blue-500",
        header: "bg-blue-50",
        title: "text-xl text-blue-600",
        description: "text-muted-foreground",
        content: "bg-background space-y-3",
        footer: "bg-blue-300",
        button: "bg-blue-600 hover:bg-blue-700 text-white"
    }}
/>
```

## Localization

The text within `<SessionsCard />` can be customized through the `localization` prop, allowing you to adapt it to different languages or contexts:

```tsx
<SessionsCard
    localization={{
        SESSIONS: "Active Devices",
        SESSIONS_DESCRIPTION: "Review and revoke access from active devices and sessions.",
        CURRENT_SESSION: "This Device",
        REVOKE: "Remove Access"
    }}
/>
```

***


# <AccountSettingsCards />
URL: /components/settings-cards

undefined

***

## title: <AccountSettingsCards />

The `<AccountSettingsCards />` component provides a convenient plug-and-play UI for managing user account information. It displays all account-related settings such as avatar, name, username, email, and any custom additional fields you've configured.

This component automatically leverages the account features you have enabled via the [`<AuthUIProvider />`](/components/auth-ui-provider) and provides a seamless account settings UI out of the box.

<img alt="Settings Cards" src="/screenshots/settings-cards-dark.png" className="rounded-xl hidden dark:block w-lg mt-0 mb-0" />

<img alt="Settings Cards" src="/screenshots/settings-cards-light.png" className="rounded-xl dark:hidden w-lg mt-0 mb-0" />

## Using AccountSettingsCards

The `<AccountSettingsCards />` component is perfect for building custom account/settings pages. It can be used standalone or combined with other settings components:

```tsx title="app/account/settings/page.tsx"
import { AccountSettingsCards } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
  return (
    <div className="flex justify-center py-12 px-4">
      <AccountSettingsCards className="max-w-xl" />
    </div>
  )
}
```

***

## Using with AccountView

For a complete account management UI with navigation, use the [`<AccountView />`](/components/account-view) component instead. It includes `<AccountSettingsCards />` along with security settings, API keys, and organizations (if enabled):

```tsx title="app/account/page.tsx"
import { AccountView } from "@daveyplate/better-auth-ui"

export default function AccountPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <AccountView />
    </div>
  )
}
```

***

## Customization Options

You can customize the UI extensively by passing TailwindCSS classes or customizing provided class names through the `classNames` prop.

### Customizing Styles with classNames

Using Tailwind utility classes, you can fully customize all card states. Here's an example to illustrate significant styling customization:

```tsx
<AccountSettingsCards
  className="max-w-xl mx-auto"
  classNames={{
    card: {
      base: "border-blue-500",
      header: "bg-blue-50",
      title: "text-blue-600 text-xl",
      description: "text-muted-foreground",
      content: "bg-blue-50",
      footer: "bg-blue-500/5",
      button: "text-white bg-blue-600 hover:bg-blue-700",
      input: "bg-background placeholder:text-muted-foreground/50"
    }
  }}
/>
```

### Settings Included in AccountSettingsCards

* **Avatar** (if `avatar` prop is configured in AuthUIProvider)
* **Username** (if username plugin is enabled via `credentials.username`)
* **Name** (if included in `account.fields`)
* **Email** (if `changeEmail` is enabled)
* **Additional Custom Fields** (any fields specified in `account.fields`)
* **Accounts** (if multi-session is enabled)

#### Custom Additional Fields

The `<AccountSettingsCards />` component displays any custom `additionalFields` you've configured via the `account.fields` prop of the `<AuthUIProvider />`:

```tsx title="app/providers.tsx"
<AuthUIProvider
  authClient={authClient}
  additionalFields={{
    age: {
      label: "Age",
      placeholder: "Your age",
      description: "Please enter your age",
      required: true,
      type: "number",
    },
    newsletter: {
      label: "Receive our newsletter",
      description: "Subscribe to receive newsletters.",
      required: false,
      type: "boolean",
    }
  }}
  account={{
    fields: ["image", "name", "age", "newsletter"]
  }}
>
  {children}
</AuthUIProvider>
```

These custom fields will appear alongside the existing account setting cards automatically.

***


# <SignedIn />
URL: /components/signed-in

undefined

***

## title: <SignedIn />

The `<SignedIn />` component conditionally renders its child components based on whether a user is authenticated.

Use it to display content only visible to logged-in users.

## Usage

Basic usage example:

```tsx
import { SignedIn } from "@daveyplate/better-auth-ui"

export default function UserDashboard() {
    return (
        <SignedIn>
            <p>
                Only signed-in users will see this!
            </p>
        </SignedIn>
    )
}
```

## Example

Here's an example demonstrating `<SignedIn />` in a practical scenario:

```tsx
import { SignedIn, SignedOut, UserButton } from "@daveyplate/better-auth-ui"

export default function Navbar() {
    return (
        <nav className="h-16 flex justify-between items-center px-4">
            <Link href="/">
                Home
            </Link>

            <SignedIn>
                <UserButton />
            </SignedIn>

            <SignedOut>
                <Link href="/auth/sign-in">
                    Sign In
                </Link>
            </SignedOut>
        </nav>
    )
}
```

In this example, the [`<UserButton />`](/components/user-button) component is displayed only if the user has an active session. Otherwise, visitors are prompted with a sign-in link.


# <SignedOut />
URL: /components/signed-out

undefined

***

## title: <SignedOut />

The `<SignedOut />` component conditionally renders its children only when the user is not authenticated. It is a simple helper for handling UI components or pages that should only be accessible by guests (unauthenticated users).

Use this component to conditionally hide or show content based on the user's authentication status.

## Usage

Wrap any content that should be displayed only to signed-out (unauthenticated) users within the `<SignedOut>` component:

```tsx
import { SignedOut } from "@daveyplate/better-auth-ui"

export default function Example() {
    return (
        <SignedOut>
            <div>You need to log in to access this feature.</div>
        </SignedOut>
    )
}
```

## Example

A practical view managing authentication states using both [`<SignedIn>`](/components/signed-in) and `<SignedOut>` components together:

```tsx
import { SignedIn, SignedOut, UserButton } from "@daveyplate/better-auth-ui"

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-4 h-14 border-b">
            <h1 className="text-lg font-semibold">
                Better Auth UI
            </h1>

            <div className="flex gap-3 items-center">
                <SignedOut>
                    <a href="/auth/sign-in" className="text-sm font-medium">
                        Sign In
                    </a>
                </SignedOut>

                <SignedOut>
                    <a href="/auth/sign-up" className="text-sm font-medium">
                        Create account
                    </a>
                </SignedOut>

                <UserButton />
            </div>
        </nav>
    )
}
```


# <TwoFactorCard />
URL: /components/two-factor-card

undefined

***

## title: <TwoFactorCard />

The `<TwoFactorCard />` provides a secure interface for managing two-factor authentication (2FA), allowing users to enable or disable 2FA with password confirmation. It handles the complete setup flow including QR code scanning and backup codes generation.

## Usage

Here's how you can include `<TwoFactorCard />` in your settings page:

```tsx
import { TwoFactorCard } from "@daveyplate/better-auth-ui"

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-6">
            <TwoFactorCard />
        </div>
    )
}
```

## Styling

Customize the component appearance using Tailwind CSS classes through the `classNames` prop:

```tsx
<TwoFactorCard
    classNames={{
        base: "border-primary shadow",
        header: "bg-primary-foreground",
        title: "text-primary font-semibold text-xl",
        description: "text-muted-foreground",
        content: "bg-background",
        footer: "bg-muted",
        button: "bg-primary hover:bg-primary-foreground",
        instructions: "text-muted-foreground"
    }}
/>
```


# <UpdateAvatarCard />
URL: /components/update-avatar-card

undefined

***

## title: <UpdateAvatarCard />

The `<UpdateAvatarCard />` component is a pre-built UI element for users to easily manage and update their avatar image. It seamlessly integrates with the [`AuthUIProvider`](../components/auth-ui-provider) and utilizes either a custom or built-in avatar upload implementation.

<img alt="Update Avatar Card" src="/screenshots/update-avatar-card-dark.png" className="rounded-xl hidden dark:block w-lg mt-0 mb-0" />

<img alt="Update Avatar Card" src="/screenshots/update-avatar-card-light.png" className="rounded-xl dark:hidden w-lg mt-0 mb-0" />

## Usage

Here's how to include the `<UpdateAvatarCard />` component within your custom settings page. If you don't provide an `avatar.upload` function, the component will store the avatar image as a base64 string in database.

```tsx
import { UpdateAvatarCard } from "@daveyplate/better-auth-ui"

export default function CustomSettings() {
    return (
        <div className="flex flex-col gap-6">
            <UpdateAvatarCard />
        </div>
    )
}
```

You can optionally provide `avatar.upload` prop within your [`AuthUIProvider`](../components/auth-ui-provider). You can also provide an optional `avatar.delete` function that will be called when the user deletes their avatar so you can clean up your storage/CDN:

```tsx title="providers.tsx"
"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    return (
        <AuthUIProvider
            authClient={authClient}
            navigate={router.push}
            replace={router.replace}
            onSessionChange={() => router.refresh()}
            avatar={{
                upload: async (file: File) => {
                    const formData = new FormData()
                    formData.append("avatar", file)

                    const res = await fetch("/api/uploadAvatar", {
                        method: "POST",
                        body: formData,
                    })

                    const { data } = await res.json()
                    return data.url
                },
                delete: async (url: string) => {
                    await fetch("/api/deleteAvatar", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ url })
                    })
                }
            }}
            Link={Link}
        >
            {children}
        </AuthUIProvider>
    )
}
```

## Reference

These are the available props for `<UpdateAvatarCard />`:

<AutoTypeTable path="../src/components/settings/account/update-avatar-card.tsx" name="UpdateAvatarCardProps" />

## Styling

The `classNames` prop is useful for customizing inner elements using Tailwind classes:

```tsx
<UpdateAvatarCard
    classNames={{
        base: "border-blue-500",
        avatar: {
            base: "border-4 border-blue-400",
            fallback: "bg-blue-400 text-white"
        },
        footer: "bg-blue-50"
    }}
/>
```

## Notes

Avatars are auto-cropped, optimized, and resized before uploading:

* **Cropping**: The image is automatically center-cropped into a square.
* **Sizing**: Default `avatar.size` is set to:
  * `128px` (when using built-in storage - base64)
  * `256px` (when using custom `avatar.upload`)
* **File Format**: You can customize the uploaded image file format via `avatar.extension` prop in [`AuthUIProvider`](../components/auth-ui-provider). It defaults to `"png"`.


# <UpdateFieldCard />
URL: /components/update-field-card

Generic settings card for updating custom user fields

***

title: <UpdateFieldCard />
description: Generic settings card for updating custom user fields
------------------------------------------------------------------

## Import

```tsx
import { UpdateFieldCard } from "@better-auth/ui-react/components"
```

## Usage

```tsx
<UpdateFieldCard 
    name="phoneNumber"
    label="Phone Number"
    type="text"
    placeholder="Enter your phone number"
/>
```

## Props

| Name           | Type                                             | Default     | Description                                |
| -------------- | ------------------------------------------------ | ----------- | ------------------------------------------ |
| `name`         | `string`                                         | (required)  | Field name in the user object              |
| `label`        | `ReactNode`                                      | `undefined` | Display label for the field                |
| `type`         | `"text" \| "number" \| "boolean"`                | `"text"`    | Input type for the field                   |
| `value`        | `unknown`                                        | `undefined` | Current field value                        |
| `placeholder`  | `string`                                         | `undefined` | Input placeholder text                     |
| `required`     | `boolean`                                        | `false`     | Whether the field is required              |
| `description`  | `ReactNode`                                      | `undefined` | Description text shown below the title     |
| `instructions` | `ReactNode`                                      | `undefined` | Additional instructions shown in the card  |
| `validate`     | `(value: string) => boolean \| Promise<boolean>` | `undefined` | Custom validation function                 |
| `className`    | `string`                                         | `undefined` | Additional CSS classes for styling         |
| `classNames`   | `SettingsCardClassNames`                         | `undefined` | Class names for individual card components |
| `localization` | `Partial<AuthLocalization>`                      | `undefined` | Localization object for translations       |

## Examples

### Text Field

```tsx
<UpdateFieldCard 
    name="bio"
    label="Bio"
    type="text"
    placeholder="Tell us about yourself"
    description="A short description about you"
/>
```

### Number Field

```tsx
<UpdateFieldCard 
    name="age"
    label="Age"
    type="number"
    required
    validate={(value) => Number(value) >= 18}
/>
```

### Boolean Field

```tsx
<UpdateFieldCard 
    name="newsletter"
    label="Subscribe to newsletter"
    type="boolean"
    description="Receive updates about new features"
/>
```

## Features

* Supports text, number, and boolean field types
* Built-in form validation
* Custom validation support
* Success/error feedback
* Loading states during update
* Checkbox UI for boolean fields
* Integrated with Better Auth additional fields


# <UpdateNameCard />
URL: /components/update-name-card

Settings card for updating user's display name

***

title: <UpdateNameCard />
description: Settings card for updating user's display name
-----------------------------------------------------------

## Import

```tsx
import { UpdateNameCard } from "@better-auth/ui-react/components"
```

## Usage

```tsx
<UpdateNameCard />
```

## Props

| Name           | Type               | Default     | Description                          |
| -------------- | ------------------ | ----------- | ------------------------------------ |
| `className`    | `string`           | `undefined` | Additional CSS classes for styling   |
| `localization` | `AuthLocalization` | `undefined` | Localization object for translations |

## Example

```tsx
import { UpdateNameCard } from "@better-auth/ui-react/components"

export function AccountSettings() {
    return (
        <div className="space-y-4">
            <UpdateNameCard />
        </div>
    )
}
```

## Features

* Update user's display name
* Built-in form validation
* Success/error feedback
* Loading states during update
* Integrated with Better Auth session management


# <UpdateUsernameCard />
URL: /components/update-username-card

undefined

***

## title: <UpdateUsernameCard />

The `<UpdateUsernameCard />` component provides a simple, intuitive UI that enables users to update their account username within the authentication system. This component automatically integrates with the [`AuthUIProvider`](/components/auth-ui-provider) context, leveraging the username configuration set by your authentication framework.

## Usage

Include the `<UpdateUsernameCard />` in your custom settings or profile page:

```tsx
import { UpdateUsernameCard } from "@daveyplate/better-auth-ui"

export default function CustomSettings() {
    return (
        <div className="flex flex-col gap-6">
            <UpdateUsernameCard />
        </div>
    )
}
```

## Reference

These are the available props for `<UpdateUsernameCard />`:

<AutoTypeTable path="../src/components/settings/shared/settings-card.tsx" name="SettingsCardProps" />

## Styling

The styles can be customized precisely with Tailwind classes via the `classNames` prop:

```tsx
<UpdateUsernameCard
    classNames={{
        base: "border-blue-500",
        header: "bg-blue-50",
        title: "text-blue-500",
        description: "text-muted-foreground",
        content: "bg-blue-50",
        footer: "bg-blue-50",
        input: "bg-background border-blue-500 placeholder:text-muted",
    }}
/>
```


# useAuthenticate()
URL: /components/use-authenticate

undefined

***

## title: useAuthenticate()

The `useAuthenticate()` hook automatically redirects unauthenticated users to the sign-in page. If the user is already authenticated, this hook does nothing and allows the user to view the content normally.

This is a hook alternative to the `<RedirectToSignIn />` component, useful for redirecting users programmatically.

## Usage

```tsx
import { useAuthenticate } from "@daveyplate/better-auth-ui"

export default function ProtectedPage() {
    // Will redirect to sign-in if user is not authenticated
    useAuthenticate()
    
    return <div>Protected content visible only to authenticated users</div>
}
```

## Options

The hook accepts an options object with the following properties:

```tsx
interface AuthenticateOptions {
    authView?: "signIn" | "signUp" // Default: "signIn"
    enabled?: boolean // Default: true
}
```

* `authView`: The authentication view to redirect to. Can be either "signIn" or "signUp".
* `enabled`: Whether the authentication check is enabled. When set to `false`, no redirection will occur.

## Example with Options

```tsx
import { useAuthenticate } from "@daveyplate/better-auth-ui"

export default function ProtectedSignUpPage() {
    // Will redirect to sign-up instead of sign-in if user is not authenticated
    useAuthenticate({
        authView: "signUp",
    })
    
    return <div>Protected content</div>
}
```

## Disabling the Redirect

You can conditionally disable the redirection with the `enabled` option:

```tsx
import { useAuthenticate } from "@daveyplate/better-auth-ui"

export default function ConditionalProtectedPage({ isProtected }: { isProtected: boolean }) {
    // Only redirect if isProtected is true
    useAuthenticate({
        enabled: isProtected
    })
    
    return <div>This content may or may not be protected</div>
}
```


# <UserAvatar />
URL: /components/user-avatar

undefined

***

## title: <UserAvatar />

The `<UserAvatar />` component renders a user's avatar image based on the provided user object. If the user does not have an avatar image, a fallback with the first 2 letters of their name or email will be displayed.

<div className="flex gap-2 -mt-8 -mb-8">
  <img alt="Seto" src="/avatars/seto.png" className="size-8 rounded-full" />

  <img alt="Seto" src="/avatars/dark.png" className="size-8 rounded-full hidden dark:block" />

  <img alt="Seto" src="/avatars/light.png" className="size-8 rounded-full dark:hidden" />
</div>

## Usage

```tsx
import { UserAvatar } from "@daveyplate/better-auth-ui"

export default function Example() {
    const user = {
        name: "Seto",
        email: "seto@better-auth.dev",
        image: "https://better-auth-ui.com/avatars/seto.png"
    }

    return <UserAvatar user={user} />
}
```

## Reference

The following props can be passed to the `<UserAvatar />` component:

<AutoTypeTable path="../src/components/user-avatar.tsx" name="UserAvatarProps" />

## Example

Here is a practical example demonstrating customized styles and fallback customization:

```tsx
import { UserAvatar } from "@daveyplate/better-auth-ui"

export default function Example() {
    const user = {
        name: "Seto",
        email: "seto@better-auth.dev",
        image: "https://better-auth-ui.com/avatars/seto.png"
    }

    return (
        <UserAvatar
            user={user}
            className="size-12 border-2 border-destructive"
            classNames={{
                fallback: "bg-black text-white",
            }}
        />
    )
}
```


# <UserButton />
URL: /components/user-button

undefined

***

## title: <UserButton />

The `<UserButton />` component provides an easy-to-use dropdown menu button that displays user account information and session management actions. It includes an avatar, provides quick access to user settings, linked accounts, and session management actions.

<img alt="Seto" src="/avatars/seto.png" className="size-8 rounded-full -mb-6 -mt-2" />

<img alt="User Dropdown Dark" src="/screenshots/user-dropdown-dark.png" className="border-r rounded-lg hidden dark:block w-44" />

<img alt="User Dropdown Light" src="/screenshots/user-dropdown-light.png" className="border-r rounded-lg dark:hidden w-44" />

## Usage

```tsx
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Example() {
  return <UserButton />;
}
```

## Reference

These are the available props for the `<UserButton />` component:

<AutoTypeTable path="../src/components/user-button.tsx" name="UserButtonProps" />

## Examples

### Icon Size Button

The `size="icon"` prop turns the UserButton into a small button, showing only the user's avatar. This is the default size.

<img alt="Seto" src="/avatars/seto.png" className="size-8 rounded-full -mb-6" />

<img alt="User Dropdown Dark" src="/screenshots/user-dropdown-dark.png" className="border-r rounded-lg hidden dark:block w-44" />

<img alt="User Dropdown Light" src="/screenshots/user-dropdown-light.png" className="border-r rounded-lg dark:hidden w-44" />

```tsx
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Example() {
  return (
    <UserButton />
  )
}
```

### Full Width Button

The `size="full"` prop turns the UserButton into a wide button, showing the user's avatar, name or email, and dropdown arrow. Recommended for desktop user menus.

<img alt="Seto" src="/screenshots/user-button-dark.png" className="rounded-lg hidden dark:block w-64" />

<img alt="Seto" src="/screenshots/user-button-light.png" className="rounded-lg dark:hidden w-64" />

```tsx
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Example() {
  return <UserButton size="full" />
}
```

### Styling

You can fully customize the appearance of the UserButton component with [`UserButtonClassNames`](/api-reference/user-button-class-names) using the `classNames` prop.

Here's an example that drastically customizes the styling:

<img alt="Seto" src="/screenshots/custom-user-button-dark.png" className="rounded-lg hidden dark:block w-64" />

<img alt="Seto" src="/screenshots/custom-user-button-light.png" className="rounded-lg dark:hidden w-64" />

```tsx
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Example() {
  return (
    <UserButton
      className="border-destructive w-64 bg-destructive/30"
      classNames={{
        content: {
          avatar: {
            fallback: "bg-destructive text-white"
          }
        }
      }}
      size="full"
    />
  )
}
```


# Next.js
URL: /integrations/next-js

undefined

***

title: Next.js
icon: NextJs
------------

import { Step, Steps } from "fumadocs-ui/components/steps";

This guide covers integrating `@daveyplate/better-auth-ui` into your Next.js project.

## Starter Project

Want to skip the installation? Check out the starter here:

* App Router: [GitHub](https://github.com/daveyplate/better-auth-nextjs-starter) - [Demo](https://nextjs.better-auth-starter.com)

* Pages Router:  [GitHub](https://github.com/daveyplate/better-auth-nextjs-pages-starter) - [Demo](https://nextjs-pages.better-auth-starter.com)

## App Router

Follow these steps to set up `@daveyplate/better-auth-ui` in your [Next.js](https://nextjs.org) project using the **App Router**:

<Steps>
  <Step>
    ### AuthUIProvider

    The first step is to set up the [`<AuthUIProvider />`](/components/auth-ui-provider) client component with your [`authClient`](https://www.better-auth.com/docs/installation#create-client-instance), wrapping your layout. This is required to provide the context & hooks to your authentication components across your application.

    ```tsx title="app/providers.tsx"
    "use client"

    import { AuthUIProvider } from "@daveyplate/better-auth-ui"
    import Link from "next/link"
    import { useRouter } from "next/navigation"
    import type { ReactNode } from "react"

    import { authClient } from "@/lib/auth-client"

    export function Providers({ children }: { children: ReactNode }) {
        const router = useRouter()

        return (
            <AuthUIProvider
                authClient={authClient}
                navigate={router.push}
                replace={router.replace}
                onSessionChange={() => {
                    // Clear router cache (protected routes)
                    router.refresh()
                }}
                Link={Link}
            >
                {children}
            </AuthUIProvider>
        )
    }
    ```

    <small>
      **Note**: Since the Next.js **App Router** caches routes by default, navigation to protected routes may fail until you perform a `router.refresh()` to clear the cache. To prevent this issue, you must use `router.refresh()` in the provided `onSessionChange` callback. This forces Next.js to clear the router cache and reload middleware-protected content, ensuring subsequent navigations accurately reflect the current auth state.
    </small>

    Once configured, wrap your layout component with the `Providers` component:

    ```tsx title="app/layout.tsx"
    import type { ReactNode } from "react"
    import { Providers } from "./providers"

    export default function RootLayout({ children }: { children: ReactNode }) {
        return (
            <html lang="en">
                <body>
                    <Providers>{children}</Providers>
                </body>
            </html>
        )
    }
    ```

    The [`<AuthUIProvider />`](/components/auth-ui-provider) can be fully customized with plugins, styles, localization and more. For more information and all available props, see the [`<AuthUIProvider />`](/components/auth-ui-provider) component documentation.
  </Step>

  <Step>
    ### Auth Pages

    Create a dynamic route segment for authentication views in `app/auth/[path]/page.tsx`.

    ```tsx title="app/auth/[path]/page.tsx"
    import { AuthView } from "@daveyplate/better-auth-ui"
    import { authViewPaths } from "@daveyplate/better-auth-ui/server"

    export const dynamicParams = false

    export function generateStaticParams() {
        return Object.values(authViewPaths).map((path) => ({ path }))
    }

    export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
        const { path } = await params
        
        return (
            <main className="container flex grow flex-col items-center justify-center self-center p-4 md:p-6">
                <AuthView path={path} />
            </main>
        )
    }
    ```

    The newly created dynamic route covers the following paths by default:

    * `/auth/sign-in` – Sign in via email/password and social providers
    * `/auth/sign-up` – New account registration
    * `/auth/magic-link` – Email login without a password
    * `/auth/forgot-password` – Trigger email to reset forgotten password
    * `/auth/two-factor` – Two-factor authentication
    * `/auth/recover-account` – Recover account via backup code
    * `/auth/reset-password` – Set new password after receiving reset link
    * `/auth/sign-out` – Log the user out of the application
    * `/auth/callback` – Internal route to handle Auth callbacks
    * `/auth/accept-invitation` – Accept an invitation to an organization

    Ensure that any links to the authentication process utilize these routes accordingly. All routes will render the `<AuthView />` component and automatically handle navigation and authentication flow.
  </Step>

  <Step>
    ### Account Pages

    ```tsx title="app/account/[path]/page.tsx"
    import { AccountView } from "@daveyplate/better-auth-ui"
    import { accountViewPaths } from "@daveyplate/better-auth-ui/server"

    export const dynamicParams = false

    export function generateStaticParams() {
        return Object.values(accountViewPaths).map((path) => ({ path }))
    }

    export default async function AccountPage({ params }: { params: Promise<{ path: string }> }) {
        const { path } = await params

        return (
            <main className="container p-4 md:p-6">
                <AccountView path={path} />
            </main>
        )
    }
    ```
  </Step>

  <Step>
    ### Organization Pages

    ```tsx title="app/organization/[path]/page.tsx"
    import { OrganizationView } from "@daveyplate/better-auth-ui"
    import { organizationViewPaths } from "@daveyplate/better-auth-ui/server"

    export const dynamicParams = false

    export function generateStaticParams() {
        return Object.values(organizationViewPaths).map((path) => ({ path }))
    }

    export default async function OrganizationPage({ params }: { params: Promise<{ path: string }> }) {
        const { path } = await params

        return (
            <main className="container p-4 md:p-6">
                <OrganizationView path={path} />
            </main>
        )
    }
    ```

    If you prefer slug-based org URLs, set `organization={{ pathMode: "slug", basePath: "/organization", slug: currentSlug }}` in the `AuthUIProvider` and structure your routes accordingly:

    ```tsx title="app/organization/[slug]/[path]/page.tsx"
    import { OrganizationView } from "@daveyplate/better-auth-ui"
    import { organizationViewPaths } from "@daveyplate/better-auth-ui/server"

    export default async function OrganizationPage({ params }: { params: Promise<{ path: string }> }) {
        const { path } = await params

        return (
            <main className="container p-4 md:p-6">
                <OrganizationView path={path} />
            </main>
        )
    }
    ```
  </Step>
</Steps>

## Pages Router

Follow these steps to set up `@daveyplate/better-auth-ui` in your [Next.js](https://nextjs.org) project using the **Pages Router**:

<Steps>
  <Step>
    ### AuthUIProvider

    First set up the [`<AuthUIProvider />`](/components/auth-ui-provider) within your custom App component in `_app.tsx`.

    ```tsx title="pages/_app.tsx"
    import type { AppProps } from "next/app"
    import { AuthUIProvider } from "@daveyplate/better-auth-ui"
    import { useRouter } from "next/router"
    import Link from "next/link"

    import { authClient } from "@/lib/auth-client"

    export default function App({ Component, pageProps }: AppProps) {
        const router = useRouter()

        return (
            <AuthUIProvider
                authClient={authClient}
                navigate={router.push}
                replace={router.replace}
                Link={Link}
            >
                <Component {...pageProps} />
            </AuthUIProvider>
        )
    }
    ```

    Now the authentication context is available across your entire application.
  </Step>

  <Step>
    ### Auth Pages

    Create a page with a dynamic segment in your Pages directory in `pages/auth/[authView].tsx`

    ```tsx title="pages/auth/[path].tsx"
    import { AuthView } from "@daveyplate/better-auth-ui"
    import { authViewPaths } from "@daveyplate/better-auth-ui/server"

    export default function AuthPage({ path }: { path: string }) {
        return (
            <main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
                <AuthView path={path} />
            </main>
        )
    }

    export async function getStaticPaths() {
        return {
            paths: Object.values(authViewPaths).map((path) => ({ params: { path } })),
            fallback: false
        }
    }

    export async function getStaticProps({ params }: { params: { path: string } }) {
        return { props: { path: params.path } }
    }
    ```

    These routes match the list shown in the App Router section above.
  </Step>

  <Step>
    ### Account Pages

    ```tsx title="pages/account/[path].tsx"
    import { AccountView } from "@daveyplate/better-auth-ui"
    import { accountViewPaths } from "@daveyplate/better-auth-ui/server"

    export default function AccountPage({ path }: { path: string }) {
        return (
            <main className="container mx-auto p-4 md:p-6">
                <AccountView path={path} />
            </main>
        )
    }

    export async function getStaticPaths() {
        return {
            paths: Object.values(accountViewPaths).map((path) => ({ params: { path } })),
            fallback: false
        }
    }

    export async function getStaticProps({ params }: { params: { path: string } }) {
        return { props: { path: params.path } }
    }
    ```
  </Step>

  <Step>
    ### Organization Pages

    ```tsx title="pages/organization/[path].tsx"
    import { OrganizationView } from "@daveyplate/better-auth-ui"
    import { organizationViewPaths } from "@daveyplate/better-auth-ui/server"

    export default function OrganizationPage({ path }: { path: string }) {
        return (
            <main className="container mx-auto p-4 md:p-6">
                <OrganizationView path={path} />
            </main>
        )
    }

    export async function getStaticPaths() {
        return {
            paths: Object.values(organizationViewPaths).map((path) => ({ params: { path } })),
            fallback: false
        }
    }

    export async function getStaticProps({ params }: { params: { path: string } }) {
        return { props: { organizationView: params.path } }
    }
    ```
  </Step>
</Steps>


# React
URL: /integrations/react

undefined

***

title: React
icon: React
-----------

import { Step, Steps } from 'fumadocs-ui/components/steps';

This guide covers integrating `@daveyplate/better-auth-ui` into your React project.

<Steps>
  <Step>
    ## Setting up AuthUIProvider

    First, set up [`<AuthUIProvider />`](/components/auth-ui-provider) as it provides context and hooks required by all subsequent authentication components. Create a top-level provider to encapsulate your app:

    ```tsx title="src/providers.tsx"
    import { AuthUIProvider } from "@daveyplate/better-auth-ui"
    import { authClient } from "@/lib/auth-client"
    import { useNavigate, NavLink } from "react-router-dom"

    export function Providers({ children }: { children: React.ReactNode }) {
      const navigate = useNavigate()

      return (
          <AuthUIProvider
            authClient={authClient}
            navigate={navigate}
            Link={NavLink}
          >
              {children}
          </AuthUIProvider>
        )
    }
    ```

    Wrap your root component with the newly created Providers component in your main app entry point, typically in `src/main.tsx` or `src/index.tsx`.

    ```tsx title="src/main.tsx"
    import ReactDOM from "react-dom/client"
    import App from "./App.tsx"
    import { BrowserRouter } from "react-router-dom"
    import { Providers } from "./Providers"

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <BrowserRouter>
        <Providers>
          <App />
        </Providers>
      </BrowserRouter>
    )
    ```
  </Step>

  <Step>
    ## Creating Auth Pages

    Configure routes to render [`<AuthView>`](/components/auth-ui-provider) for authentication views using React Router.

    Create a dynamic authentication route such as `auth/[pathname].tsx` inside your `src` directory. Here's a recommended setup:

    ```tsx title="src/pages/auth/AuthPage.tsx"
    import { useParams } from "react-router-dom"
    import { AuthView } from "@daveyplate/better-auth-ui"

    export default function AuthPage() {
      const { pathname } = useParams()

      return (
        <main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
          <AuthView pathname={pathname} />
        </main>
      )
    }
    ```

    Use React Router to configure these dynamic authentication routes:

    ```tsx title="src/App.tsx"
    import { Routes, Route } from "react-router-dom"
    import AuthPage from "./pages/auth/AuthPage"

    function App() {
      return (
        <Routes>
          <Route path="/auth/:pathname" element={<AuthPage />} />
        </Routes>
      )
    }
    ```

    The dynamic segment `[pathname]` covers the following default authentication views:

    * `/auth/sign-in` – Sign in via email, password, social providers, or passkey (WebAuthn)
    * `/auth/sign-up` – New account registration, with additional fields supported
    * `/auth/magic-link` – Email login without password
    * `/auth/forgot-password` – Trigger password reset email
    * `/auth/reset-password` – Allow users to reset forgotten passwords
    * `/auth/sign-out` – Log out action
    * `/auth/settings` – User account management page (authentication required)
    * `/auth/callback` – Internal OAuth/Auth callback handler (do not use directly)

    Your authentication flow is now completely set up and supporting full customization capabilities.
  </Step>
</Steps>


# TanStack Start
URL: /integrations/tanstack-start

undefined

***

title: TanStack Start
icon: TreePalm
--------------

import { Step, Steps } from "fumadocs-ui/components/steps";

This guide covers integrating `@daveyplate/better-auth-ui` v3 with TanStack Start. We also install [@daveyplate/better-auth-tanstack](https://github.com/daveyplate/better-auth-tanstack) to handle the authentication state and queries.

## Starter Project

Want to skip the installation? Check out the starter here:

[GitHub](https://github.com/daveyplate/better-auth-tanstack-starter) - [Demo](https://tanstack.better-auth-starter.com)

## Installation

<Steps>
  <Step>
    ### Set up the Auth Provider

    TanStack Start requires setting up providers slightly differently than a standard React application. Create a root-level provider component:

    ```tsx title="app/providers.tsx"
    import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack"
    import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack"
    import { Link, useRouter } from "@tanstack/react-router"
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
    import type { ReactNode } from "react"

    import { authClient } from "./lib/auth-client"

    // Create a client
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60
            }
        }
    })

    export function Providers({ children }: { children: ReactNode }) {
        const router = useRouter()
        
        return (
            <QueryClientProvider client={queryClient}>
                <AuthQueryProvider>
                    <AuthUIProviderTanstack
                        authClient={authClient}
                        navigate={(href) => router.navigate({ href })}
                        replace={(href) => router.navigate({ href, replace: true })}
                        Link={({ href, ...props }) => <Link to={href} {...props} />}
                    >
                        {children}
                    </AuthUIProviderTanstack>
                </AuthQueryProvider>
            </QueryClientProvider>
        )
    }
    ```

    Note how we use TanStack Router's `useRouter` hook and `Link` component to handle navigation.
  </Step>

  <Step>
    ### Configure the Root Route

    Update your root route to use the Providers component:

    ```tsx title="app/routes/__root.tsx"
    import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"
    import type { ReactNode } from "react"

    import { Header } from "@/components/header"
    import globalsCss from "@/styles/globals.css?url"
    import { Providers } from "../providers"

    export const Route = createRootRoute({
        head: () => ({
            meta: [
                {
                    charSet: "utf-8"
                },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1"
                },
                {
                    title: "Better Auth TanStack Starter"
                }
            ],
            links: [
                { rel: "stylesheet", href: globalsCss },
                { rel: "icon", href: "/favicon.ico" },
                { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
                { rel: "manifest", href: "/manifest.webmanifest" }
            ]
        }),
        component: RootComponent
    })

    function RootComponent() {
        return (
            <RootDocument>
                <Outlet />
            </RootDocument>
        )
    }

    function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
        return (
            <html lang="en" suppressHydrationWarning>
                <head>
                    <meta
                        name="viewport"
                        content="initial-scale=1, viewport-fit=cover, width=device-width"
                    />
                    <meta
                        name="theme-color"
                        media="(prefers-color-scheme: light)"
                        content="oklch(1 0 0)"
                    />
                    <meta
                        name="theme-color"
                        media="(prefers-color-scheme: dark)"
                        content="oklch(0.145 0 0)"
                    />

                    <HeadContent />
                </head>

                <body>
                    <Providers>
                        {children}
                    </Providers>

                    <Scripts />
                </body>
            </html>
        )
    }
    ```
  </Step>
</Steps>

## Setting Up Routes

TanStack Start uses a file-based routing system. Here's how to set up your authentication, account, and organization routes using the new v3 containers.

<Steps>
  <Step>
    ### Auth Pages

    Create the following route for authentication views:

    ```tsx title="app/routes/auth/$authView.tsx"
    import { cn } from "@/lib/utils"
    import { AuthView } from "@daveyplate/better-auth-ui"
    import { createFileRoute } from "@tanstack/react-router"

    export const Route = createFileRoute("/auth/$authView")({
        component: RouteComponent
    })

    function RouteComponent() {
        const { authView } = Route.useParams()

        return (
            <main className="container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6">
                <AuthView pathname={authView} />

                <p className={cn(["callback", "sign-out"].includes(authView) && "hidden", "text-muted-foreground text-xs")}>
                    Powered by{" "}
                    <a className="text-warning underline" href="https://better-auth.com" target="_blank" rel="noreferrer">
                        better-auth.
                    </a>
                </p>
            </main>
        )
    }
    ```

    This dynamic route covers all authentication paths, such as `sign-in`, `sign-up`, `magic-link`, `forgot-password`, `two-factor`, `recover-account`, `reset-password`, `sign-out`, and the internal `callback`.
  </Step>

  <Step>
    ### Account Pages

    Create a dynamic route for account settings using the `AccountView` container (defaults to the `/account` base path):

    ```tsx title="app/routes/account/$accountView.tsx"
    import { AccountView } from "@daveyplate/better-auth-ui"
    import { createFileRoute } from "@tanstack/react-router"

    export const Route = createFileRoute("/account/$accountView")({
        component: RouteComponent
    })

    function RouteComponent() {
        const { accountView } = Route.useParams()
        return (
            <main className="container mx-auto p-4 md:p-6">
                <AccountView pathname={accountView} />
            </main>
        )
    }
    ```

    You can customize the base path via the provider using `account={{ basePath: "/account" }}` if needed.
  </Step>

  <Step>
    ### Organization Pages

    Create a dynamic route for organization settings using the `OrganizationView` container (defaults to the `/organization` base path):

    ```tsx title="app/routes/organization/$organizationView.tsx"
    import { OrganizationView } from "@daveyplate/better-auth-ui"
    import { createFileRoute } from "@tanstack/react-router"

    export const Route = createFileRoute("/organization/$organizationView")({
        component: RouteComponent
    })

    function RouteComponent() {
        const { organizationView } = Route.useParams()
        return (
            <main className="container mx-auto p-4 md:p-6">
                <OrganizationView pathname={organizationView} />
            </main>
        )
    }
    ```

    If you prefer slug-based org URLs, set `organization={{ pathMode: "slug", basePath: "/organization", slug: currentSlug }}` in the provider and structure your routes accordingly:

    ```tsx title="app/routes/organization/$slug/$organizationView.tsx"
    import { OrganizationView } from "@daveyplate/better-auth-ui"
    import { createFileRoute } from "@tanstack/react-router"

    export const Route = createFileRoute("/organization/$slug/$organizationView")({
        component: RouteComponent
    })

    function RouteComponent() {
        const { organizationView } = Route.useParams()
        return (
            <main className="container mx-auto p-4 md:p-6">
                <OrganizationView pathname={organizationView} />
            </main>
        )
    }
    ```
  </Step>
</Steps>

This setup provides a solid foundation for integrating Better Auth UI v3 with TanStack Start. You'll get all the benefits of TanStack's powerful routing system along with Better Auth UI's new container-based authentication and settings experiences.
