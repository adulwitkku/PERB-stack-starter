import cors from '@elysiajs/cors';
import openapi from '@elysiajs/openapi';
import { Elysia } from 'elysia';

import { authModule } from './auth';
import { todoModule } from './todo';

export const app = new Elysia({ prefix: '/api' })
  .use(cors())
  .use(openapi())
  .use(authModule)
  .use(todoModule)
  .get('/', 'Hello Nextjs');

export type App = typeof app;
