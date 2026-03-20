import { inject, injectable } from 'tsyringe';

import { type TodoEntity, TodoNotFoundError } from '../../domain/todo.entity';
import type { IDeleteTodoUseCase } from '../ports/in/todo.use-case';
import { type ITodoRepository, TODO_REPOSITORY_TOKEN } from '../ports/out/todo-repository.port';

@injectable()
export class DeleteTodoUseCase implements IDeleteTodoUseCase {
  constructor(@inject(TODO_REPOSITORY_TOKEN) private readonly repo: ITodoRepository) {}

  async execute(id: string, userId: string): Promise<TodoEntity> {
    const deleted = await this.repo.delete(id, userId);
    if (!deleted) throw new TodoNotFoundError(id);
    return deleted;
  }
}
