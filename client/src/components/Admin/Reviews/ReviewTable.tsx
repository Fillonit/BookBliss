'use client'

import * as React from 'react'
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import {
    HiOutlineClipboardCopy,
    HiOutlineEye,
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineCheck,
    HiOutlineFolderDownload,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
} from 'react-icons/hi'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { API_URL } from '@/util/envExport'
export type Review = {
    id: number
    rating: number
    comment: string
    bookId: number
    userId: number
    createdAt: string
    updatedAt: string
}

export const columns: ColumnDef<Review>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'bookId',
        header: 'Book ID',
        cell: ({ row }) => <div>{row.getValue('bookId')}</div>,
    },
    {
        accessorKey: 'userId',
        header: 'User ID',
        cell: ({ row }) => <div>{row.getValue('userId')}</div>,
    },
    {
        accessorKey: 'rating',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Rating
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="lowercase hover:text-amber-600">
                <a href={`mailto:${row.getValue('rating')}`}>
                    {row.getValue('rating')}
                </a>
            </div>
        ),
    },
    {
        accessorKey: 'comment',
        header: 'Comment',
        cell: ({ row }) => <div>{row.getValue('comment')}</div>,
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'))
            return <div>{new Intl.DateTimeFormat('en-US').format(date)}</div>
        },
    },
    {
        accessorKey: 'updatedAt',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Updated At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('updatedAt'))
            return <div>{new Intl.DateTimeFormat('en-US').format(date)}</div>
        },
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const review = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    review.id.toString()
                                )
                            }
                        >
                            <HiOutlineClipboardCopy className="mr-2 h-4 w-4" />
                            Copy Review ID
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    review.rating.toString()
                                )
                            }
                        >
                            <HiOutlineClipboardCopy className="mr-2 h-4 w-4" />
                            Copy Review Rating
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() =>
                                (window.location.href = `/view-review/${review.id}`)
                            }
                        >
                            <HiOutlineEye className="mr-2 h-4 w-4" />
                            View Review Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <HiOutlinePencil className="mr-2 h-4 w-4" />
                            Edit Review Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 font-bold hover:text-red-700 hover:bg-red-700">
                            <HiOutlineTrash className="mr-2 h-4 w-4" />
                            Delete Review
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
export default function ReviewTable() {
    const [data, setData] = useState<Review[]>([])
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        fetch(`${API_URL}/api/reviews`)
            .then((response) => response.json())
            .then((data) => setData(data))
    }, [])

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter rating..."
                    value={
                        (table
                            .getColumn('rating')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('rating')
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
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
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Dialog onOpenChange={() => setIsCopied(false)}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={
                                    table.getFilteredSelectedRowModel().rows
                                        .length === 0
                                }
                            >
                                <HiOutlineFolderDownload className="mr-2 h-4 w-4 text-amber-600 font-bold" />
                                Export Selected Rows
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Export Data</DialogTitle>
                                <DialogDescription>
                                    You are exporting sensitive data including
                                    hidden columns.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                        Link
                                    </Label>
                                    <Input
                                        id="link"
                                        defaultValue={JSON.stringify(
                                            table
                                                .getFilteredSelectedRowModel()
                                                .rows.map((row) => row.original)
                                        )}
                                        readOnly
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="sm"
                                    className={`px-3 ${
                                        isCopied
                                            ? 'text-white bg-amber-600 font-bold'
                                            : ''
                                    }`}
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            JSON.stringify(
                                                table
                                                    .getFilteredSelectedRowModel()
                                                    .rows.map(
                                                        (row) => row.original
                                                    )
                                            )
                                        )
                                        setIsCopied(true)
                                        toast.success('Copied to clipboard!', {
                                            theme:
                                                localStorage.getItem(
                                                    'flowbite-theme-mode'
                                                ) === 'dark'
                                                    ? 'dark'
                                                    : 'light',
                                        })
                                    }}
                                >
                                    <span className="sr-only">Copy</span>
                                    {isCopied ? (
                                        <HiOutlineCheck className="h-4 w-4" />
                                    ) : (
                                        <HiOutlineClipboardCopy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setIsCopied(false)}
                                    >
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <HiOutlineChevronLeft className="h-4 w-4" />
                        {/* Previous */}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {/* Next */}
                        <HiOutlineChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}
