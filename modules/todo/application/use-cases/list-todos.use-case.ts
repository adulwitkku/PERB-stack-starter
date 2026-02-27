import { inject, injectable } from "tsyringe"
import type { IListTodosUseCase } from "../ports/in/todo.use-case"
import {
    TODO_REPOSITORY_TOKEN,
    type ITodoRepository,
} from "../ports/out/todo-repository.port"
import type { TodoEntity } from "../../domain/todo.entity"

@injectable()
export class ListTodosUseCase implements IListTodosUseCase {
    constructor(
        @inject(TODO_REPOSITORY_TOKEN) private readonly repo: ITodoRepository,
    ) {}

    async execute(userId: string): Promise<TodoEntity[]> {
        return this.repo.findAllByUserId(userId)
    }
}
