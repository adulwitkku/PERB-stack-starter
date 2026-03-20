import { inject, injectable } from 'tsyringe';

import { TodoEntity } from '../../domain/todo.entity';
import type { ICreateTodoUseCase } from '../ports/in/todo.use-case';
import { type ITodoRepository, TODO_REPOSITORY_TOKEN } from '../ports/out/todo-repository.port';

@injectable()
export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(@inject(TODO_REPOSITORY_TOKEN) private readonly repo: ITodoRepository) {}

  async execute(userId: string, data: { title: string }): Promise<TodoEntity> {
    const todo = TodoEntity.create({
      id: crypto.randomUUID(),
      title: data.title,
      userId,
    });
    return this.repo.save(todo);
  }
}
