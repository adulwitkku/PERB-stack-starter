import { container } from 'tsyringe';

import { TODO_REPOSITORY_TOKEN } from '@/server/todo/application/ports/out/todo-repository.port';
import { CreateTodoUseCase } from '@/server/todo/application/use-cases/create-todo.use-case';
import { DeleteTodoUseCase } from '@/server/todo/application/use-cases/delete-todo.use-case';
import { GetTodoByIdUseCase } from '@/server/todo/application/use-cases/get-todo-by-id.use-case';
import { ListTodosUseCase } from '@/server/todo/application/use-cases/list-todos.use-case';
import { UpdateTodoUseCase } from '@/server/todo/application/use-cases/update-todo.use-case';

import { TodoController } from '../adapters/in/todo.controller';
import { DrizzleTodoRepository } from '../adapters/out/drizzle-todo.repository';

// Driven Adapters (output)
container.register(TODO_REPOSITORY_TOKEN, { useClass: DrizzleTodoRepository });

// Use Cases
container.register(ListTodosUseCase, { useClass: ListTodosUseCase });
container.register(GetTodoByIdUseCase, { useClass: GetTodoByIdUseCase });
container.register(CreateTodoUseCase, { useClass: CreateTodoUseCase });
container.register(UpdateTodoUseCase, { useClass: UpdateTodoUseCase });
container.register(DeleteTodoUseCase, { useClass: DeleteTodoUseCase });

// Driving Adapters (input)
container.register(TodoController, { useClass: TodoController });

export { container as todoContainer };
