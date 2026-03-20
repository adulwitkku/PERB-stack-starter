'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
} from '@tanstack/react-table';
import { ArrowUpDown, Loader2, Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/lib/eden';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
}

function unwrap<T>(data: T | { error: string }): T {
  if (data && typeof data === 'object' && 'error' in data && Object.keys(data).length === 1) {
    throw new Error((data as { error: string }).error);
  }
  return data as T;
}

export function TodoList() {
  const tTodo = useTranslations('todo');
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: todos = [], isLoading: loading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data, error } = await api.v2.todo.get();
      if (error) throw error;
      return unwrap<Todo[]>(data);
    },
  });

  const addMutation = useMutation({
    mutationFn: async (title: string) => {
      const { data, error } = await api.v2.todo.post({ title });
      if (error) throw error;
      return unwrap<Todo>(data);
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => [newTodo, ...old]);
      setNewTitle('');
      requestAnimationFrame(() => inputRef.current?.focus());
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const { data, error } = await api.v2.todo({ id }).patch({ completed });
      if (error) throw error;
      return unwrap<Todo>(data);
    },
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previous = queryClient.getQueryData<Todo[]>(['todos']);
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map((t) => (t.id === id ? { ...t, completed } : t)),
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(['todos'], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.v2.todo({ id }).delete();
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previous = queryClient.getQueryData<Todo[]>(['todos']);
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => old.filter((t) => t.id !== id));
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(['todos'], context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    addMutation.mutate(title);
  };

  const toggleTodo = (id: string, completed: boolean) => {
    toggleMutation.mutate({ id, completed });
  };

  const deleteTodo = (id: string) => {
    deleteMutation.mutate(id);
  };

  const columns: ColumnDef<Todo>[] = [
    {
      id: 'index',
      header: '#',
      cell: ({ row }) => <span className="text-muted-foreground">{row.index + 1}</span>,
      enableSorting: false,
    },
    {
      id: 'completed',
      header: tTodo('status'),
      cell: ({ row }) => (
        <Checkbox
          checked={row.original.completed}
          onCheckedChange={(checked) => toggleTodo(row.original.id, checked === true)}
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {tTodo('columnTitle')}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className={row.original.completed ? 'text-muted-foreground line-through' : ''}>
          {row.original.title}
        </span>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          {tTodo('createdAt')}
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
      id: 'actions',
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
  ];

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
  });

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-bold">{tTodo('title')}</h2>

      <form onSubmit={addTodo} className="flex gap-2">
        <Input
          ref={inputRef}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder={tTodo('addPlaceholder')}
          disabled={addMutation.isPending}
          autoFocus
        />
        <Button type="submit" size="icon" disabled={addMutation.isPending || !newTitle.trim()}>
          {addMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </form>

      <div className="flex items-center gap-2">
        <Input
          placeholder={tTodo('filterPlaceholder')}
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(e) => table.getColumn('title')?.setFilterValue(e.target.value)}
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
                          : flexRender(header.column.columnDef.header, header.getContext())}
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
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      {tTodo('empty')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {tTodo('totalItems', { count: table.getFilteredRowModel().rows.length })}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {tTodo('previous')}
              </Button>
              <span className="text-sm text-muted-foreground">
                {tTodo('pageInfo', {
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
                {tTodo('next')}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
