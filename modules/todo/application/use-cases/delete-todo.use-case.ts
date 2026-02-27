import { inject, injectable } from "tsyringe"
import type { IDeleteTodoUseCase } from "../ports/in/todo.use-case"
import {
    TODO_REPOSITORY_TOKEN,
    type ITodoRepository,
} from "../ports/out/todo-repository.port"
import { TodoNotFoundError, type TodoEntity } from "../../domain/todo.entity"

@injectable()
export class DeleteTodoUseCase implements IDeleteTodoUseCase {
    constructor(
        @inject(TODO_REPOSITORY_TOKEN) private readonly repo: ITodoRepository,
    ) {}

    async execute(id: string, userId: string): Promise<TodoEntity> {
        const deleted = await this.repo.delete(id, userId)
        if (!deleted) throw new TodoNotFoundError(id)
        return deleted
    }
}
