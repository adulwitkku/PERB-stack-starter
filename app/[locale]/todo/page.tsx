"use client"

import { TodoList } from "@/components/todo-list"

export default function TodoPage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
            <TodoList />
        </div>
    )
}
