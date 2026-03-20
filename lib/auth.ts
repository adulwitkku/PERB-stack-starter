import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { bearer, openAPI } from 'better-auth/plugins';

import { db } from '@/db';
import * as schema from '@/db/schema';

// Trusted origins สำหรับ Better Auth
const trustedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'tauri://localhost',
  'https://tauri.localhost',
  'http://tauri.localhost',
  process.env.NEXT_PUBLIC_API_URL,
].filter(Boolean) as string[];

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    forgotPassword: true,
    sendResetPassword: async () => {
      // TODO: Send reset password email
    },
    resetPasswordTokenExpiresIn: 3600,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [openAPI(), bearer()],
});
