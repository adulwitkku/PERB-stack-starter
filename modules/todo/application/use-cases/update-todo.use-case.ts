import { inject, injectable } from "tsyringe"
import type { IUpdateTodoUseCase } from "../ports/in/todo.use-case"
import {
    TODO_REPOSITORY_TOKEN,
    type ITodoRepository,
} from "../ports/out/todo-repository.port"
import { TodoNotFoundError, type TodoEntity } from "../../domain/todo.entity"

@injectable()
export class UpdateTodoUseCase implements IUpdateTodoUseCase {
    constructor(
        @inject(TODO_REPOSITORY_TOKEN) private readonly repo: ITodoRepository,
    ) {}

    async execute(
        id: string,
        userId: string,
        data: { title?: string; completed?: boolean },
    ): Promise<TodoEntity> {
        const todo = await this.repo.findById(id, userId)
        if (!todo) throw new TodoNotFoundError(id)

        if (data.title !== undefined) todo.rename(data.title)
        if (data.completed === true) todo.markComplete()
        if (data.completed === false) todo.markIncomplete()

        const updated = await this.repo.update(todo)
        if (!updated) throw new TodoNotFoundError(id)
        return updated
    }
}
