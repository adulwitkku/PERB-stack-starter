"use client"

import { useAuthenticate } from "@daveyplate/better-auth-ui"
import { TodoList } from "@/components/todo-list"

export default function TodoPage() {
    useAuthenticate()

    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
            <TodoList />
        </div>
    )
}
