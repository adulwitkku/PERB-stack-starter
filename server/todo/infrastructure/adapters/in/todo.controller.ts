import { Elysia } from 'elysia';
import { inject, injectable } from 'tsyringe';

import { sessionPlugin } from '@/server/shared/session';
import { CreateTodoUseCase } from '@/server/todo/application/use-cases/create-todo.use-case';
import { DeleteTodoUseCase } from '@/server/todo/application/use-cases/delete-todo.use-case';
import { GetTodoByIdUseCase } from '@/server/todo/application/use-cases/get-todo-by-id.use-case';
import { ListTodosUseCase } from '@/server/todo/application/use-cases/list-todos.use-case';
import { UpdateTodoUseCase } from '@/server/todo/application/use-cases/update-todo.use-case';
import {
  TodoEntity,
  TodoNotFoundError,
  TodoValidationError,
} from '@/server/todo/domain/todo.entity';
import { TodoModel } from '@/server/todo/model';

function toResponse(entity: TodoEntity) {
  return {
    id: entity.id,
    title: entity.title,
    completed: entity.completed,
    userId: entity.userId,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
  };
}

@injectable()
export class TodoController {
  constructor(
    @inject(ListTodosUseCase) private readonly listTodos: ListTodosUseCase,
    @inject(GetTodoByIdUseCase) private readonly getTodoById: GetTodoByIdUseCase,
    @inject(CreateTodoUseCase) private readonly createTodo: CreateTodoUseCase,
    @inject(UpdateTodoUseCase) private readonly updateTodo: UpdateTodoUseCase,
    @inject(DeleteTodoUseCase) private readonly deleteTodo: DeleteTodoUseCase,
  ) {}

  registerRoutes() {
    return new Elysia({ name: 'Todo.Module', prefix: '/v2/todo' })
      .use(sessionPlugin)
      .onError(({ error, set }) => {
        if (error instanceof TodoNotFoundError) {
          set.status = 404;
          return { error: error.message };
        }
        if (error instanceof TodoValidationError) {
          set.status = 400;
          return { error: error.message };
        }
      })
      .guard({ as: 'local' }, (app) =>
        app
          .onBeforeHandle(({ session, status }) => {
            if (!session) return status(401, { error: 'Unauthorized' });
          })
          .get('/', async ({ session }) => {
            const todos = await this.listTodos.execute(session!.user.id);
            return todos.map(toResponse);
          })
          .get(
            '/:id',
            async ({ session, params }) => {
              const todo = await this.getTodoById.execute(params.id, session!.user.id);
              return toResponse(todo);
            },
            {
              params: TodoModel.params,
            },
          )
          .post(
            '/',
            async ({ session, body }) => {
              const todo = await this.createTodo.execute(session!.user.id, body);
              return toResponse(todo);
            },
            {
              body: TodoModel.create,
            },
          )
          .patch(
            '/:id',
            async ({ session, params, body }) => {
              const todo = await this.updateTodo.execute(params.id, session!.user.id, body);
              return toResponse(todo);
            },
            {
              params: TodoModel.params,
              body: TodoModel.update,
            },
          )
          .delete(
            '/:id',
            async ({ session, params }) => {
              const todo = await this.deleteTodo.execute(params.id, session!.user.id);
              return toResponse(todo);
            },
            {
              params: TodoModel.params,
            },
          ),
      );
  }
}
