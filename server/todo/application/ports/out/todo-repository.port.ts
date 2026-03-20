import type { TodoEntity } from '@/server/todo/domain/todo.entity';

export interface ITodoRepository {
  findAllByUserId(userId: string): Promise<TodoEntity[]>;
  findById(id: string, userId: string): Promise<TodoEntity | null>;
  save(todo: TodoEntity): Promise<TodoEntity>;
  update(todo: TodoEntity): Promise<TodoEntity | null>;
  delete(id: string, userId: string): Promise<TodoEntity | null>;
}

const TODO_REPOSITORY_TOKEN_SYMBOL: unique symbol = Symbol('ITodoRepository');
export const TODO_REPOSITORY_TOKEN = TODO_REPOSITORY_TOKEN_SYMBOL.toString();
