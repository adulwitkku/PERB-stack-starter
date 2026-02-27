import { Elysia } from "elysia"
import { auth } from "@/lib/auth"
import { TodoService } from "./service"
import { TodoModel } from "./model"

export const todoV1Module = new Elysia({ name: "Todo.V1.Module", prefix: "/v1/todo" })
    .derive(async ({ request }) => {
        const session = await auth.api.getSession({ headers: request.headers })
        return { session }
    })
    .guard({ as: "local" }, (app) =>
        app
            .onBeforeHandle(({ session, status }) => {
                if (!session) return status(401, { error: "Unauthorized" })
            })
            .get("/", ({ session }) =>
                TodoService.list(session!.user.id),
            )
            .get("/:id", async ({ session, params, status }) => {
                const todo = await TodoService.getById(params.id, session!.user.id)
                if (!todo) return status(404, { error: "Not found" })
                return todo
            }, {
                params: TodoModel.params,
            })
            .post("/", ({ session, body }) =>
                TodoService.create(session!.user.id, body),
            {
                body: TodoModel.create,
            })
            .patch("/:id", async ({ session, params, body, status }) => {
                const todo = await TodoService.update(params.id, session!.user.id, body)
                if (!todo) return status(404, { error: "Not found" })
                return todo
            }, {
                params: TodoModel.params,
                body: TodoModel.update,
            })
            .delete("/:id", async ({ session, params, status }) => {
                const todo = await TodoService.delete(params.id, session!.user.id)
                if (!todo) return status(404, { error: "Not found" })
                return todo
            }, {
                params: TodoModel.params,
            }),
    )
