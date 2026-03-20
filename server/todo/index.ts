import 'reflect-metadata';
import { container } from 'tsyringe';

import { TodoController } from './infrastructure/adapters/in/todo.controller';
import './infrastructure/di/todo.module';

const todoController = container.resolve(TodoController);
export const todoModule = todoController.registerRoutes();
