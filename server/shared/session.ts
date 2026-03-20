import { Elysia } from 'elysia';

import { auth } from '@/lib/auth';

export const sessionPlugin = new Elysia({ name: 'Session.Plugin' }).derive(
  { as: 'scoped' },
  async ({ request }) => {
    const session = await auth.api.getSession({ headers: request.headers });
    return { session };
  },
);
