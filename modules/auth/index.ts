import { Elysia } from "elysia"
import { AuthService } from "./service"

export const authModule = new Elysia({ name: "Auth.Module" })
    .all("/auth/*", ({ request }) => AuthService.handleRequest(request))
