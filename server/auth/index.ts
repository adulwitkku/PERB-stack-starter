import { Elysia } from 'elysia';

import { handleAuthRequest } from './service';

export const authModule = new Elysia({ name: 'Auth.Module' }).all('/auth/*', ({ request }) =>
  handleAuthRequest(request),
);
