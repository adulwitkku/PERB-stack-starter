import { eq, and } from "drizzle-orm"
import { injectable } from "tsyringe"
import { db } from "@/db"
import { todo } from "@/db/schema"
import { TodoEntity } from "@/modules/todo/domain/todo.entity"
import type { ITodoRepository } from "@/modules/todo/application/ports/out/todo-repository.port"

@injectable()
export class DrizzleTodoRepository implements ITodoRepository {
    async findAllByUserId(userId: string): Promise<TodoEntity[]> {
        const rows = await db.select().from(todo).where(eq(todo.userId, userId))
        return rows.map(DrizzleTodoRepository.toDomain)
    }

    async findById(id: string, userId: string): Promise<TodoEntity | null> {
        const [row] = await db
            .select()
            .from(todo)
            .where(and(eq(todo.id, id), eq(todo.userId, userId)))
        return row ? DrizzleTodoRepository.toDomain(row) : null
    }

    async save(entity: TodoEntity): Promise<TodoEntity> {
        const [row] = await db
            .insert(todo)
            .values({
                id: entity.id,
                title: entity.title,
                completed: entity.completed,
                userId: entity.userId,
            })
            .returning()
        return DrizzleTodoRepository.toDomain(row)
    }

    async update(entity: TodoEntity): Promise<TodoEntity | null> {
        const [row] = await db
            .update(todo)
            .set({ title: entity.title, completed: entity.completed })
            .where(and(eq(todo.id, entity.id), eq(todo.userId, entity.userId)))
            .returning()
        return row ? DrizzleTodoRepository.toDomain(row) : null
    }

    async delete(id: string, userId: string): Promise<TodoEntity | null> {
        const [row] = await db
            .delete(todo)
            .where(and(eq(todo.id, id), eq(todo.userId, userId)))
            .returning()
        return row ? DrizzleTodoRepository.toDomain(row) : null
    }

    private static toDomain(row: typeof todo.$inferSelect): TodoEntity {
        return new TodoEntity(
            row.id,
            row.title,
            row.completed,
            row.userId,
            row.createdAt,
            row.updatedAt,
        )
    }
}
