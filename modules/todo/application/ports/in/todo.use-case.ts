import type { TodoEntity } from "@/modules/todo/domain/todo.entity"

export interface IListTodosUseCase {
    execute(userId: string): Promise<TodoEntity[]>
}

export interface IGetTodoByIdUseCase {
    execute(id: string, userId: string): Promise<TodoEntity>
}

export interface ICreateTodoUseCase {
    execute(userId: string, data: { title: string }): Promise<TodoEntity>
}

export interface IUpdateTodoUseCase {
    execute(
        id: string,
        userId: string,
        data: { title?: string; completed?: boolean },
    ): Promise<TodoEntity>
}

export interface IDeleteTodoUseCase {
    execute(id: string, userId: string): Promise<TodoEntity>
}
