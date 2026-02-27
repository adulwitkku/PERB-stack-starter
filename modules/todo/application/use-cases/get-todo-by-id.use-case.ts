import { inject, injectable } from "tsyringe"
import type { IGetTodoByIdUseCase } from "../ports/in/todo.use-case"
import {
    TODO_REPOSITORY_TOKEN,
    type ITodoRepository,
} from "../ports/out/todo-repository.port"
import { TodoNotFoundError, type TodoEntity } from "../../domain/todo.entity"

@injectable()
export class GetTodoByIdUseCase implements IGetTodoByIdUseCase {
    constructor(
        @inject(TODO_REPOSITORY_TOKEN) private readonly repo: ITodoRepository,
    ) {}

    async execute(id: string, userId: string): Promise<TodoEntity> {
        const todo = await this.repo.findById(id, userId)
        if (!todo) throw new TodoNotFoundError(id)
        return todo
    }
}
