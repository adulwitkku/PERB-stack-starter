import { Elysia, t } from "elysia"
import cors from "@elysiajs/cors"
import openapi from "@elysiajs/openapi"
import { authModule } from "@/modules/auth"

const app = new Elysia({ prefix: "/api" })
    .use(cors())
    .use(openapi())
    .use(authModule)
    .get("/", "Hello Nextjs")
    .post("/", ({ body }) => body, {
        body: t.Object({ name: t.String() }),
    })

export type App = typeof app

export const GET = app.fetch
export const POST = app.fetch
export const OPTIONS = app.fetch
