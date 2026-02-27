/**
 * V2 Hexagonal Unit Test — Use Cases (Application Layer)
 *
 * ข้อดีของ Hexagonal: mock แค่ ITodoRepository interface (port)
 * ไม่ต้องรู้ว่าข้างหลังใช้ Drizzle, Prisma, หรือ in-memory
 * ถ้าเปลี่ยน ORM → test นี้ไม่ต้องแก้เลย
 */
import { describe, it, expect, vi, beforeEach } from "vitest"
import { TodoEntity, TodoNotFoundError } from "../domain/todo.entity"
import type { ITodoRepository } from "../application/ports/out/todo-repository.port"
import { CreateTodoUseCase } from "../application/use-cases/create-todo.use-case"
import { ListTodosUseCase } from "../application/use-cases/list-todos.use-case"
import { GetTodoByIdUseCase } from "../application/use-cases/get-todo-by-id.use-case"
import { UpdateTodoUseCase } from "../application/use-cases/update-todo.use-case"
import { DeleteTodoUseCase } from "../application/use-cases/delete-todo.use-case"

const createMockRepo = (): ITodoRepository => ({
    findAllByUserId: vi.fn(),
    findById: vi.fn(),
    save: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
})

const makeTodo = (id = "id-1", title = "Test Todo") =>
    new TodoEntity(id, title, false, "user-1", new Date(), new Date())

describe("V2 Hexagonal — Use Cases (unit)", () => {
    let repo: ReturnType<typeof createMockRepo>

    beforeEach(() => {
        repo = createMockRepo()
    })

    describe("ListTodosUseCase", () => {
        it("should return all todos for a user", async () => {
            const todos = [makeTodo("1"), makeTodo("2")]
            vi.mocked(repo.findAllByUserId).mockResolvedValue(todos)

            const useCase = new ListTodosUseCase(repo)
            const result = await useCase.execute("user-1")

            expect(repo.findAllByUserId).toHaveBeenCalledWith("user-1")
            expect(result).toHaveLength(2)
        })
    })

    describe("GetTodoByIdUseCase", () => {
        it("should return the todo if found", async () => {
            const todo = makeTodo()
            vi.mocked(repo.findById).mockResolvedValue(todo)

            const useCase = new GetTodoByIdUseCase(repo)
            const result = await useCase.execute("id-1", "user-1")

            expect(result).toBe(todo)
        })

        it("should throw TodoNotFoundError if not found", async () => {
            vi.mocked(repo.findById).mockResolvedValue(null)

            const useCase = new GetTodoByIdUseCase(repo)

            await expect(useCase.execute("nope", "user-1"))
                .rejects.toThrow(TodoNotFoundError)
        })
    })

    describe("CreateTodoUseCase", () => {
        it("should create a new todo via the repository", async () => {
            const saved = makeTodo()
            vi.mocked(repo.save).mockResolvedValue(saved)

            const useCase = new CreateTodoUseCase(repo)
            const result = await useCase.execute("user-1", { title: "New Todo" })

            expect(repo.save).toHaveBeenCalledOnce()
            const passedEntity = vi.mocked(repo.save).mock.calls[0][0]
            expect(passedEntity).toBeInstanceOf(TodoEntity)
            expect(passedEntity.title).toBe("New Todo")
            expect(passedEntity.completed).toBe(false)
            expect(result).toBe(saved)
        })
    })

    describe("UpdateTodoUseCase", () => {
        it("should rename via entity method and persist", async () => {
            const todo = makeTodo()
            vi.mocked(repo.findById).mockResolvedValue(todo)
            vi.mocked(repo.update).mockResolvedValue(
                new TodoEntity(todo.id, "Renamed", false, todo.userId, todo.createdAt, todo.updatedAt),
            )

            const useCase = new UpdateTodoUseCase(repo)
            const result = await useCase.execute("id-1", "user-1", { title: "Renamed" })

            expect(result.title).toBe("Renamed")
        })

        it("should mark complete via entity method", async () => {
            const todo = makeTodo()
            vi.mocked(repo.findById).mockResolvedValue(todo)
            vi.mocked(repo.update).mockResolvedValue(
                new TodoEntity(todo.id, todo.title, true, todo.userId, todo.createdAt, todo.updatedAt),
            )

            const useCase = new UpdateTodoUseCase(repo)
            const result = await useCase.execute("id-1", "user-1", { completed: true })

            expect(todo.completed).toBe(true) // entity was mutated
            expect(result.completed).toBe(true)
        })

        it("should throw TodoNotFoundError if todo doesn't exist", async () => {
            vi.mocked(repo.findById).mockResolvedValue(null)

            const useCase = new UpdateTodoUseCase(repo)

            await expect(useCase.execute("nope", "user-1", { title: "X" }))
                .rejects.toThrow(TodoNotFoundError)
        })
    })

    describe("DeleteTodoUseCase", () => {
        it("should delete and return the todo", async () => {
            const todo = makeTodo()
            vi.mocked(repo.delete).mockResolvedValue(todo)

            const useCase = new DeleteTodoUseCase(repo)
            const result = await useCase.execute("id-1", "user-1")

            expect(repo.delete).toHaveBeenCalledWith("id-1", "user-1")
            expect(result).toBe(todo)
        })

        it("should throw TodoNotFoundError if nothing to delete", async () => {
            vi.mocked(repo.delete).mockResolvedValue(null)

            const useCase = new DeleteTodoUseCase(repo)

            await expect(useCase.execute("nope", "user-1"))
                .rejects.toThrow(TodoNotFoundError)
        })
    })
})
