'use client';

import { AuthUIProvider } from '@daveyplate/better-auth-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useTranslations } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';

import { authClient } from '@/lib/auth-client';
import { getAuthLocalization } from '@/lib/auth-localization';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const t = useTranslations('auth');
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AuthUIProvider
          authClient={authClient}
          navigate={router.push}
          replace={router.replace}
          redirectTo="/todo"
          onSessionChange={() => {
            router.refresh();
          }}
          Link={Link}
          social={{ providers: ['google'] }}
          localization={getAuthLocalization(t)}
        >
          {children}
        </AuthUIProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
