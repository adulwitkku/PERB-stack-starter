import { Elysia, Context, t } from 'elysia'
import { auth } from "@/lib/auth";
import cors from '@elysiajs/cors'
import openapi from '@elysiajs/openapi'
const betterAuthView = (context: Context) => {
    const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"]
    // validate request method
    if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
        return auth.handler(context.request);
    } else {
        return context.status(405, "Method Not Allowed")
    }
}

const app = new Elysia({ prefix: '/api' })
    .use(cors())
    .use(openapi())
    .get('/', 'Hello Nextjs')
    .post('/', ({ body }) => body, {
        body: t.Object({
            name: t.String()
        })
    })
    .all("/auth/*", betterAuthView)

export const GET = app.fetch
export const POST = app.fetch 