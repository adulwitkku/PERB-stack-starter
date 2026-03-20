import { inject, injectable } from 'tsyringe';

import { type TodoEntity, TodoNotFoundError } from '../../domain/todo.entity';
import type { IGetTodoByIdUseCase } from '../ports/in/todo.use-case';
import { type ITodoRepository, TODO_REPOSITORY_TOKEN } from '../ports/out/todo-repository.port';

@injectable()
export class GetTodoByIdUseCase implements IGetTodoByIdUseCase {
  constructor(@inject(TODO_REPOSITORY_TOKEN) private readonly repo: ITodoRepository) {}

  async execute(id: string, userId: string): Promise<TodoEntity> {
    const todo = await this.repo.findById(id, userId);
    if (!todo) throw new TodoNotFoundError(id);
    return todo;
  }
}
