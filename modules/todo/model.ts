import { t } from "elysia"
import { db as dbModel } from "@/db/model"

const { todo } = dbModel.insert

export const TodoModel = {
    create: t.Object({
        title: todo.title,
    }),
    update: t.Object({
        title: t.Optional(todo.title),
        completed: t.Optional(todo.completed),
    }),
    params: t.Object({
        id: t.String(),
    }),
} as const
