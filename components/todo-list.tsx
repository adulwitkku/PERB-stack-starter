"use client"

import { useState, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"
import { Plus, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Todo {
    id: string
    title: string
    completed: boolean
    createdAt: string
}

export function TodoList() {
    const t = useTranslations("todo")
    const [todos, setTodos] = useState<Todo[]>([])
    const [newTitle, setNewTitle] = useState("")
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)

    const fetchTodos = useCallback(async () => {
        try {
            const res = await fetch("/api/todo", { credentials: "include" })
            if (res.ok) setTodos(await res.json())
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])

    const addTodo = async (e: React.FormEvent) => {
        e.preventDefault()
        const title = newTitle.trim()
        if (!title) return

        setAdding(true)
        try {
            const res = await fetch("/api/todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ title }),
            })
            if (res.ok) {
                const todo = await res.json()
                setTodos((prev) => [todo, ...prev])
                setNewTitle("")
            }
        } finally {
            setAdding(false)
        }
    }

    const toggleTodo = async (id: string, completed: boolean) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed } : t)),
        )
        await fetch(`/api/todo/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ completed }),
        })
    }

    const deleteTodo = async (id: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== id))
        await fetch(`/api/todo/${id}`, {
            method: "DELETE",
            credentials: "include",
        })
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-2xl">{t("title")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={addTodo} className="flex gap-2">
                    <Input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder={t("addPlaceholder")}
                        disabled={adding}
                        autoFocus
                    />
                    <Button type="submit" size="icon" disabled={adding || !newTitle.trim()}>
                        {adding ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Plus className="h-4 w-4" />
                        )}
                    </Button>
                </form>

                {loading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : todos.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                        {t("empty")}
                    </p>
                ) : (
                    <ul className="space-y-1">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="group flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/50"
                            >
                                <Checkbox
                                    checked={todo.completed}
                                    onCheckedChange={(checked) =>
                                        toggleTodo(todo.id, checked === true)
                                    }
                                />
                                <span
                                    className={`flex-1 text-sm ${
                                        todo.completed
                                            ? "text-muted-foreground line-through"
                                            : ""
                                    }`}
                                >
                                    {todo.title}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    )
}
