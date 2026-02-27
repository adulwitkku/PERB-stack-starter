"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useTranslations } from "next-intl"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Plus, Trash2, Loader2, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
    const inputRef = useRef<HTMLInputElement>(null)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const fetchTodos = useCallback(async () => {
        try {
            const res = await fetch("/api/v2/todo", { credentials: "include" })
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
            const res = await fetch("/api/v2/todo", {
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
            requestAnimationFrame(() => inputRef.current?.focus())
        }
    }

    const toggleTodo = async (id: string, completed: boolean) => {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, completed } : t)),
        )
        await fetch(`/api/v2/todo/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ completed }),
        })
    }

    const deleteTodo = async (id: string) => {
        setTodos((prev) => prev.filter((t) => t.id !== id))
        await fetch(`/api/v2/todo/${id}`, {
            method: "DELETE",
            credentials: "include",
        })
    }

    const columns: ColumnDef<Todo>[] = [
        {
            id: "index",
            header: "#",
            cell: ({ row }) => (
                <span className="text-muted-foreground">{row.index + 1}</span>
            ),
            enableSorting: false,
        },
        {
            id: "completed",
            header: t("status"),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.original.completed}
                    onCheckedChange={(checked) =>
                        toggleTodo(row.original.id, checked === true)
                    }
                />
            ),
            enableSorting: false,
        },
        {
            accessorKey: "title",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("columnTitle")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <span
                    className={
                        row.original.completed
                            ? "text-muted-foreground line-through"
                            : ""
                    }
                >
                    {row.original.title}
                </span>
            ),
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("createdAt")}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-muted-foreground text-sm">
                    {new Date(row.original.createdAt).toLocaleString()}
                </span>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="text-right">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => deleteTodo(row.original.id)}
                    >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                </div>
            ),
        },
    ]

    const table = useReactTable({
        data: todos,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: { sorting, columnFilters },
        initialState: { pagination: { pageSize: 10 } },
    })

    return (
        <div className="w-full space-y-4">
            <h2 className="text-2xl font-bold">{t("title")}</h2>

            <form onSubmit={addTodo} className="flex gap-2">
                <Input
                    ref={inputRef}
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

            <div className="flex items-center gap-2">
                <Input
                    placeholder={t("filterPlaceholder")}
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(e) =>
                        table.getColumn("title")?.setFilterValue(e.target.value)
                    }
                    className="max-w-sm"
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <>
                    <div className="overflow-hidden rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            {t("empty")}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            {t("totalItems", { count: table.getFilteredRowModel().rows.length })}
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {t("previous")}
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                {t("pageInfo", {
                                    current: table.getState().pagination.pageIndex + 1,
                                    total: table.getPageCount(),
                                })}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {t("next")}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
