import { auth } from '@/lib/auth';

const ACCEPT_METHODS = ['POST', 'GET'];

export function handleAuthRequest(request: Request) {
  if (!ACCEPT_METHODS.includes(request.method)) {
    return new Response('Method Not Allowed', { status: 405 });
  }
  return auth.handler(request);
}
