"use client"

import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import { authClient } from "@/lib/auth-client"

import { useTranslations } from 'next-intl';

export function Providers({ children }: { children: ReactNode }) {
    const router = useRouter()
    const t = useTranslations('auth');
    
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
            localization={{
                SIGN_IN: t("signIn"),
                SIGN_IN_DESCRIPTION: t("signInDescription"),
                SIGN_UP: t("signUp"),
                FORGOT_PASSWORD: t("forgotPassword"),
                EMAIL_PLACEHOLDER: t("emailPlaceholder"),
                PASSWORD_PLACEHOLDER: t("passwordPlaceholder"),
                MAGIC_LINK_EMAIL: t("magicLinkEmail"),
                FORGOT_PASSWORD_EMAIL: t("forgotPasswordEmail"),
                RESET_PASSWORD_SUCCESS: t("resetPasswordSuccess"),
                CHANGE_PASSWORD_SUCCESS: t("changePasswordSuccess"),
                DELETE_ACCOUNT_SUCCESS: t("deleteAccountSuccess"),
              }}
        
        >
            {children}
        </AuthUIProvider>
    )
}