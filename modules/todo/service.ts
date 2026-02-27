import { eq, and } from "drizzle-orm"
import { db } from "@/db"
import { todo } from "@/db/schema"

export abstract class TodoService {
    static async list(userId: string) {
        return db.select().from(todo).where(eq(todo.userId, userId))
    }

    static async getById(id: string, userId: string) {
        const [result] = await db
            .select()
            .from(todo)
            .where(and(eq(todo.id, id), eq(todo.userId, userId)))
        return result ?? null
    }

    static async create(userId: string, data: { title: string }) {
        const [result] = await db
            .insert(todo)
            .values({ title: data.title, userId })
            .returning()
        return result
    }

    static async update(
        id: string,
        userId: string,
        data: { title?: string; completed?: boolean },
    ) {
        const [result] = await db
            .update(todo)
            .set(data)
            .where(and(eq(todo.id, id), eq(todo.userId, userId)))
            .returning()
        return result ?? null
    }

    static async delete(id: string, userId: string) {
        const [result] = await db
            .delete(todo)
            .where(and(eq(todo.id, id), eq(todo.userId, userId)))
            .returning()
        return result ?? null
    }
}
