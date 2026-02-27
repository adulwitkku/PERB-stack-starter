/**
 * V2 Hexagonal Integration Test — API Endpoints
 *
 * ทดสอบ Elysia routes ผ่าน app.handle() ตาม Elysia best practice
 * @see https://elysiajs.com/patterns/unit-test.html
 *
 * ต้องการ DB จริง → ต้อง seed test user ก่อน
 *
 * ความแตกต่างจาก V1:
 * - Error responses ใช้ domain error messages (เช่น "Todo with id ... not found")
 * - Business logic ผ่าน use cases → entity methods
 *
 * รัน: bun run test:unit
 */
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest"
import { Elysia } from "elysia"
import { db } from "@/db"
import { user, todo } from "@/db/schema"
import { eq } from "drizzle-orm"

const TEST_USER_ID = "test-user-v2-integration"

vi.mock("@/lib/auth", () => ({
    auth: {
        api: {
            getSession: vi.fn().mockResolvedValue({
                user: { id: TEST_USER_ID },
                session: { id: "session-1" },
            }),
        },
    },
}))

const { todoV2Module } = await import("../index")

const app = new Elysia({ prefix: "/api" }).use(todoV2Module)

describe("V2 Hexagonal — API Integration", () => {
    beforeAll(async () => {
        await db.insert(user).values({
            id: TEST_USER_ID,
            name: "Test User V2",
            email: "test-v2-integration@example.com",
            emailVerified: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }).onConflictDoNothing()
    })

    afterAll(async () => {
        await db.delete(todo).where(eq(todo.userId, TEST_USER_ID))
        await db.delete(user).where(eq(user.id, TEST_USER_ID))
    })

    const createdIds: string[] = []

    it("POST /api/v2/todo — should create a todo", async () => {
        const res = await app.handle(
            new Request("http://localhost/api/v2/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "V2 Integration Test" }),
            }),
        )
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body.title).toBe("V2 Integration Test")
        expect(body.completed).toBe(false)
        createdIds.push(body.id)
    })

    it("GET /api/v2/todo — should list todos", async () => {
        const res = await app.handle(
            new Request("http://localhost/api/v2/todo"),
        )
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(Array.isArray(body)).toBe(true)
        expect(body.length).toBeGreaterThanOrEqual(1)
    })

    it("GET /api/v2/todo/:id — should get a single todo", async () => {
        const res = await app.handle(
            new Request(`http://localhost/api/v2/todo/${createdIds[0]}`),
        )
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body.id).toBe(createdIds[0])
    })

    it("PATCH /api/v2/todo/:id — should update a todo", async () => {
        const res = await app.handle(
            new Request(`http://localhost/api/v2/todo/${createdIds[0]}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "Updated V2", completed: true }),
            }),
        )
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body.title).toBe("Updated V2")
        expect(body.completed).toBe(true)
    })

    it("DELETE /api/v2/todo/:id — should delete a todo", async () => {
        const createRes = await app.handle(
            new Request("http://localhost/api/v2/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "To be deleted V2" }),
            }),
        )
        const created = await createRes.json()

        const res = await app.handle(
            new Request(`http://localhost/api/v2/todo/${created.id}`, { method: "DELETE" }),
        )
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body.id).toBe(created.id)
    })

    it("GET /api/v2/todo/:id — should return 404 with domain error for non-existent", async () => {
        const res = await app.handle(
            new Request("http://localhost/api/v2/todo/non-existent-id-12345"),
        )
        expect(res.status).toBe(404)
        const body = await res.json()
        expect(body.error).toContain("non-existent-id-12345")
    })

    it("PATCH /api/v2/todo/:id — should return 404 for non-existent update", async () => {
        const res = await app.handle(
            new Request("http://localhost/api/v2/todo/non-existent-id-12345", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "Nope" }),
            }),
        )
        expect(res.status).toBe(404)
        const body = await res.json()
        expect(body.error).toContain("non-existent-id-12345")
    })
})
