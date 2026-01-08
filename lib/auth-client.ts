import { createAuthClient } from "better-auth/react"

// ===== Constants =====

const BEARER_TOKEN_KEY = "bearer_token"
const DEFAULT_API_URL = "http://localhost:3000"
const TAURI_HOSTNAMES = ["localhost", "127.0.0.1", "tauri.localhost"]

// ===== Helper =====

const isBrowser = typeof window !== "undefined"

// ===== Platform Detection =====

const isTauriApp = () => {
    if (!isBrowser) return false
    const { protocol, hostname } = window.location
    return protocol === "tauri:" || TAURI_HOSTNAMES.includes(hostname)
}

const isAndroidTauri = () => {
    if (!isBrowser) return false
    return window.location.hostname === "tauri.localhost" &&
           navigator.userAgent.includes("Android")
}

// ===== Base URL =====

const getBaseURL = () => {
    if (!isBrowser) return DEFAULT_API_URL
    if (isTauriApp()) return process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL
    return window.location.origin
}

// ===== Token Storage (สำหรับ Tauri apps) =====

export const tokenStorage = {
    get: () => isBrowser ? localStorage.getItem(BEARER_TOKEN_KEY) ?? "" : "",
    set: (token: string) => isBrowser && localStorage.setItem(BEARER_TOKEN_KEY, token),
    remove: () => isBrowser && localStorage.removeItem(BEARER_TOKEN_KEY),
}

// ===== Tauri HTTP Plugin (แก้ปัญหา Android WebView ไม่ส่ง POST body) =====

let tauriFetchInitialized = false

export const initTauriFetch = async () => {
    if (tauriFetchInitialized || !isAndroidTauri()) return

    try {
        const { fetch: tauriFetch } = await import("@tauri-apps/plugin-http")
        const originalFetch = window.fetch

        window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
            const url = input instanceof Request ? input.url
                      : input instanceof URL ? input.href
                      : input

            if (url.includes("/api/")) {
                return tauriFetch(input as string | URL, init as RequestInit)
            }
            return originalFetch(input, init)
        }

        tauriFetchInitialized = true
    } catch {
        // Tauri plugin not available - fail silently
    }
}

// ===== Auth Client =====

const isTauri = isTauriApp()

export const authClient = createAuthClient({
    baseURL: getBaseURL(),
    fetchOptions: {
        credentials: "include",
        auth: isTauri ? { type: "Bearer", token: tokenStorage.get } : undefined,
        onSuccess: isTauri
            ? (ctx) => {
                const authToken = ctx.response.headers.get("set-auth-token")
                if (authToken) tokenStorage.set(authToken)
            }
            : undefined,
    },
})