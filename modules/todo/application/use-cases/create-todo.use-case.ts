import { inject, injectable } from "tsyringe"
import type { ICreateTodoUseCase } from "../ports/in/todo.use-case"
import {
    TODO_REPOSITORY_TOKEN,
    type ITodoRepository,
} from "../ports/out/todo-repository.port"
import { TodoEntity } from "../../domain/todo.entity"

@injectable()
export class CreateTodoUseCase implements ICreateTodoUseCase {
    constructor(
        @inject(TODO_REPOSITORY_TOKEN) private readonly repo: ITodoRepository,
    ) {}

    async execute(
        userId: string,
        data: { title: string },
    ): Promise<TodoEntity> {
        const todo = TodoEntity.create({
            id: crypto.randomUUID(),
            title: data.title,
            userId,
        })
        return this.repo.save(todo)
    }
}
