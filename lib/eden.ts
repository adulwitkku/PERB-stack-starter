import { treaty } from '@elysiajs/eden';

import type { App } from '@/server/app';

export const api =
  typeof process !== 'undefined'
    ? treaty<App>(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000').api
    : treaty<App>(window.location.origin).api;
