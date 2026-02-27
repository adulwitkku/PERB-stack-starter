/**
 * V1 MVC Unit Test — TodoService
 *
 * ข้อจำกัดของ MVC: Service ผูกกับ Drizzle/DB โดยตรง
 * ทำให้ unit test ต้อง mock ทั้ง module `@/db` ซึ่งเปราะบาง
 * เพราะถ้าเปลี่ยน ORM (เช่น Drizzle → Prisma) ต้องแก้ test ทั้งหมด
 */
import { describe, it, expect, vi, beforeEach } from "vitest"

const mockSelect = vi.fn()
const mockInsert = vi.fn()
const mockUpdate = vi.fn()
const mockDelete = vi.fn()
const mockFrom = vi.fn()
const mockWhere = vi.fn()
const mockValues = vi.fn()
const mockSet = vi.fn()
const mockReturning = vi.fn()

vi.mock("@/db", () => ({
    db: {
        select: () => ({ from: mockFrom }),
        insert: () => ({ values: mockValues }),
        update: () => ({ set: mockSet }),
        delete: () => ({ where: mockDelete }),
    },
}))

vi.mock("@/db/schema", () => ({
    todo: {
        id: "id",
        userId: "user_id",
        title: "title",
        completed: "completed",
    },
}))

mockFrom.mockReturnValue({ where: mockWhere })
mockValues.mockReturnValue({ returning: mockReturning })
mockSet.mockReturnValue({ where: vi.fn().mockReturnValue({ returning: mockReturning }) })

const { TodoService } = await import("../service")

describe("V1 MVC — TodoService (unit)", () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockFrom.mockReturnValue({ where: mockWhere })
        mockValues.mockReturnValue({ returning: mockReturning })
        mockSet.mockReturnValue({ where: vi.fn().mockReturnValue({ returning: mockReturning }) })
    })

    describe("list", () => {
        it("should call db.select().from(todo).where() with userId", async () => {
            const mockTodos = [
                { id: "1", title: "Test", completed: false, userId: "user-1" },
            ]
            mockWhere.mockResolvedValue(mockTodos)

            const result = await TodoService.list("user-1")

            expect(mockFrom).toHaveBeenCalled()
            expect(mockWhere).toHaveBeenCalled()
            expect(result).toEqual(mockTodos)
        })
    })

    describe("create", () => {
        it("should insert a new todo and return it", async () => {
            const created = { id: "1", title: "New", completed: false, userId: "user-1" }
            mockReturning.mockResolvedValue([created])

            const result = await TodoService.create("user-1", { title: "New" })

            expect(mockValues).toHaveBeenCalled()
            expect(result).toEqual(created)
        })
    })

    describe("getById", () => {
        it("should return null if not found", async () => {
            mockWhere.mockResolvedValue([])

            const result = await TodoService.getById("nonexistent", "user-1")

            expect(result).toBeNull()
        })

        it("should return the todo if found", async () => {
            const todo = { id: "1", title: "Test", completed: false, userId: "user-1" }
            mockWhere.mockResolvedValue([todo])

            const result = await TodoService.getById("1", "user-1")

            expect(result).toEqual(todo)
        })
    })
})
