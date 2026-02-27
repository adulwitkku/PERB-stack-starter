import { container } from "tsyringe"
import { TODO_REPOSITORY_TOKEN } from "@/modules/todo/application/ports/out/todo-repository.port"
import { DrizzleTodoRepository } from "../adapters/out/drizzle-todo.repository"
import { ListTodosUseCase } from "@/modules/todo/application/use-cases/list-todos.use-case"
import { GetTodoByIdUseCase } from "@/modules/todo/application/use-cases/get-todo-by-id.use-case"
import { CreateTodoUseCase } from "@/modules/todo/application/use-cases/create-todo.use-case"
import { UpdateTodoUseCase } from "@/modules/todo/application/use-cases/update-todo.use-case"
import { DeleteTodoUseCase } from "@/modules/todo/application/use-cases/delete-todo.use-case"
import { TodoController } from "../adapters/in/todo.controller"

// Driven Adapters (output)
container.register(TODO_REPOSITORY_TOKEN, { useClass: DrizzleTodoRepository })

// Use Cases
container.register(ListTodosUseCase, { useClass: ListTodosUseCase })
container.register(GetTodoByIdUseCase, { useClass: GetTodoByIdUseCase })
container.register(CreateTodoUseCase, { useClass: CreateTodoUseCase })
container.register(UpdateTodoUseCase, { useClass: UpdateTodoUseCase })
container.register(DeleteTodoUseCase, { useClass: DeleteTodoUseCase })

// Driving Adapters (input)
container.register(TodoController, { useClass: TodoController })

export { container as todoContainer }
