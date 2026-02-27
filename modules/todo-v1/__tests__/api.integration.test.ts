/**
 * V1 MVC Integration Test — API Endpoints
 *
 * ทดสอบ Elysia routes ผ่าน app.handle() ตาม Elysia best practice
 * @see https://elysiajs.com/patterns/unit-test.html
 *
 * ต้องการ DB จริง → ต้อง seed test user ก่อน
 *
 * รัน: bun run test:unit
 */
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest"
import { Elysia } from "elysia"
import { db } from "@/db"
import { user, todo } from "@/db/schema"
import { eq } from "drizzle-orm"

const TEST_USER_ID = "test-user-v1-integration"

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

const { todoV1Module } = await import("../index")

const app = new Elysia({ prefix: "/api" }).use(todoV1Module)

describe("V1 MVC — API Integration", () => {
    beforeAll(async () => {
        await db.insert(user).values({
            id: TEST_USER_ID,
            name: "Test User V1",
            email: "test-v1-integration@example.com",
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

    it("POST /api/v1/todo — should create a todo", async () => {
        const res = await app.handle(
            new Request("http://localhost/api/v1/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "V1 Integration Test" }),
            }),
        )
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body.title).toBe("V1 Integration Test")
        expect(body.completed).toBe(false)
        createdIds.push(body.id)
    })

    it("GET /api/v1/todo — should list todos", async () => {
        const res = await app.handle(
            new Request("http://localhost/api/v1/todo"),
        )
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(Array.isArray(body)).toBe(true)
        expect(body.length).toBeGreaterThanOrEqual(1)
    })

    it("GET /api/v1/todo/:id — should get a single todo", async () => {
        const res = await app.handle(
            new Request(`http://localhost/api/v1/todo/${createdIds[0]}`),
        )
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body.id).toBe(createdIds[0])
    })

    it("PATCH /api/v1/todo/:id — should update a todo", async () => {
        const res = await app.handle(
            new Request(`http://localhost/api/v1/todo/${createdIds[0]}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: true }),
            }),
        )
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body.completed).toBe(true)
    })

    it("DELETE /api/v1/todo/:id — should delete a todo", async () => {
        const createRes = await app.handle(
            new Request("http://localhost/api/v1/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: "To be deleted" }),
            }),
        )
        const created = await createRes.json()

        const res = await app.handle(
            new Request(`http://localhost/api/v1/todo/${created.id}`, { method: "DELETE" }),
        )
        expect(res.status).toBe(200)
        const body = await res.json()
        expect(body.id).toBe(created.id)
    })

    it("GET /api/v1/todo/:id — should return 404 for non-existent", async () => {
        const res = await app.handle(
            new Request("http://localhost/api/v1/todo/non-existent-id-12345"),
        )
        expect(res.status).toBe(404)
    })
})
