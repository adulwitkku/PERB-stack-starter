/**
 * V2 Hexagonal Unit Test — TodoEntity (Domain Layer)
 *
 * ข้อดีของ Hexagonal: Domain entity เป็น pure TypeScript
 * ไม่มี dependency ใดๆ — ทดสอบได้ 100% โดยไม่ต้อง mock เลย
 */
import { describe, expect, it } from 'vitest';

import { TodoEntity, TodoNotFoundError, TodoValidationError } from '../domain/todo.entity';

describe('Hexagonal Todo — TodoEntity (unit)', () => {
  const makeTodo = (_overrides?: Partial<ConstructorParameters<typeof TodoEntity>>) => {
    return new TodoEntity(
      'id-1',
      'Buy groceries',
      false,
      'user-1',
      new Date('2025-01-01'),
      new Date('2025-01-01'),
    );
  };

  describe('create', () => {
    it('should create a new todo with completed=false', () => {
      const todo = TodoEntity.create({
        id: 'id-1',
        title: 'Learn Hexagonal',
        userId: 'user-1',
      });

      expect(todo.id).toBe('id-1');
      expect(todo.title).toBe('Learn Hexagonal');
      expect(todo.completed).toBe(false);
      expect(todo.userId).toBe('user-1');
    });
  });

  describe('markComplete', () => {
    it('should set completed to true', () => {
      const todo = makeTodo();
      expect(todo.completed).toBe(false);

      todo.markComplete();

      expect(todo.completed).toBe(true);
    });
  });

  describe('markIncomplete', () => {
    it('should set completed to false', () => {
      const todo = makeTodo();
      todo.markComplete();
      expect(todo.completed).toBe(true);

      todo.markIncomplete();

      expect(todo.completed).toBe(false);
    });
  });

  describe('rename', () => {
    it('should update the title', () => {
      const todo = makeTodo();

      todo.rename('New title');

      expect(todo.title).toBe('New title');
    });

    it('should throw TodoValidationError for empty title', () => {
      const todo = makeTodo();

      expect(() => todo.rename('')).toThrow(TodoValidationError);
      expect(() => todo.rename('   ')).toThrow(TodoValidationError);
    });

    it('should keep old title when rename fails', () => {
      const todo = makeTodo();
      const originalTitle = todo.title;

      try {
        todo.rename('');
      } catch {}

      expect(todo.title).toBe(originalTitle);
    });
  });

  describe('Domain Errors', () => {
    it('TodoNotFoundError should contain the id', () => {
      const error = new TodoNotFoundError('abc-123');

      expect(error.message).toContain('abc-123');
      expect(error.name).toBe('TodoNotFoundError');
    });

    it('TodoValidationError should have correct name', () => {
      const error = new TodoValidationError('bad input');

      expect(error.message).toBe('bad input');
      expect(error.name).toBe('TodoValidationError');
    });
  });
});
