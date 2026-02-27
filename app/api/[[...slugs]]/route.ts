import { Elysia } from "elysia"
import cors from "@elysiajs/cors"
import openapi from "@elysiajs/openapi"
import { authModule } from "@/modules/auth"
import { todoV1Module } from "@/modules/todo-v1"
import { todoV2Module } from "@/modules/todo"

const app = new Elysia({ prefix: "/api" })
    .use(cors())
    .use(openapi())
    .use(authModule)
    .use(todoV1Module)
    .use(todoV2Module)
    .get("/", "Hello Nextjs")

export type App = typeof app

export const GET = app.fetch
export const POST = app.fetch
export const PATCH = app.fetch
export const DELETE = app.fetch
export const OPTIONS = app.fetch
