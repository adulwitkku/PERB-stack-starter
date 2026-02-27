"use client"

import { useAuthenticate } from "@daveyplate/better-auth-ui"
import { TodoList } from "@/components/todo-list"

export default function TodoPage() {
    useAuthenticate()

    return (
        <div className="container mx-auto max-w-4xl px-4 py-10">
            <TodoList />
        </div>
    )
}
