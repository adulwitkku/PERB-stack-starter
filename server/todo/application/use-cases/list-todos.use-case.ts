import { inject, injectable } from 'tsyringe';

import type { TodoEntity } from '../../domain/todo.entity';
import type { IListTodosUseCase } from '../ports/in/todo.use-case';
import { type ITodoRepository, TODO_REPOSITORY_TOKEN } from '../ports/out/todo-repository.port';

@injectable()
export class ListTodosUseCase implements IListTodosUseCase {
  constructor(@inject(TODO_REPOSITORY_TOKEN) private readonly repo: ITodoRepository) {}

  async execute(userId: string): Promise<TodoEntity[]> {
    return this.repo.findAllByUserId(userId);
  }
}
