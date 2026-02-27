import "reflect-metadata"
import "./infrastructure/di/todo.module"

import { container } from "tsyringe"
import { TodoController } from "./infrastructure/adapters/in/todo.controller"

const todoController = container.resolve(TodoController)
export const todoV2Module = todoController.registerRoutes()
