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

import { ArrowUpDown, ChevronDown, MoreHorizontal, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
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
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
export type Review = {
    id: number
    rating: number
    comment: string
    bookId: number
    book: {
        id: number
        title: string
        cover: string
        author: string
    }
    userId: number
    user: {
        id: number
        name: string
        email: string
        avatar: string
    }
    createdAt: string
    updatedAt: string
}


export default function ReviewTable() {
    const [isSheetOpen, setSheetOpen] = useState(false)
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedReview, setSelectedReview] = useState<Review | null>(null)
    const [reviewData, setReviewData] = useState({ rating: 0, comment: '', bookId: 0, userId: 0 })
    const [isViewDetailsSheetOpen, setViewDetailsSheetOpen] = useState(false)
    const [viewDetailsReview, setViewDetailsReview] = useState({
        rating: 0,
        comment: '',
        bookId: 0,
        book: {
        id: 0,
        title: '',
        cover: '',
        author: ''
    },
        userId: 0,
        user: {
        id: 0,
        name: '',
        email: '',
        avatar: ''
    }
    })
    const [data, setData] = useState<Review[]>([])
    const [isCopied, setIsCopied] = useState(false)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/reviews`
                )
                const jsonData = await response.json()
                setData(jsonData)
                console.log(jsonData)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [page, pageSize])

    useEffect(() => {
        if (selectedReview) {
            setReviewData({
                ...selectedReview,
            })
        }
    }, [selectedReview])

    const handleInputChange = (name: string, value: any) => {
        setReviewData({
            ...reviewData,
            [name]: value,
        })
    }

    const handleSaveChanges = async () => {
        if (selectedReview) {
            console.log(setReviewData)
            const response = await fetch(
                `http://localhost:5000/api/review/${selectedReview.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reviewData),
                }
            )

            if (!response.ok) {
                toast.error('Failed to save changes', {
                    theme:
                        localStorage.getItem('flowbite-theme-mode') === 'dark'
                            ? 'dark'
                            : 'light',
                })
            }

            toast.success('Changes saved successfully', {
                theme:
                    localStorage.getItem('flowbite-theme-mode') === 'dark'
                        ? 'dark'
                        : 'light',
            })
            setSheetOpen(false)
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        `http://localhost:5000/api/reviews`
                    )
                    const jsonData = await response.json()
                    setData(jsonData)
                } catch (error) {
                    console.error('Error fetching data:', error)
                    }
                }

                fetchData()
            }
        }
        const columns: ColumnDef<Review>[] = [
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
            accessorKey: 'book',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Book
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{(row.getValue('book') as { title: string }).title}</div>,
        },
        {
            accessorKey: 'user',
            header: 'User',
            cell: ({ row }) => <div>{(row.getValue('user') as { name: string }).name}</div>,
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                    onClick={() => {
                                        setViewDetailsReview(review)
                                        setViewDetailsSheetOpen(true)
                                    }}
                                >
                                    <HiOutlineEye className="mr-2 h-4 w-4" />
                                    View Review Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedReview(review)
                                    setSheetOpen(true)
                                }}
                            >
                                <HiOutlinePencil className="mr-2 h-4 w-4" />
                                Edit Review Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setDeleteDialogOpen(true)
                                    setSelectedReview(review)
                                }}
                                className="text-red-500 font-bold hover:text-red-700 hover:bg-red-700"
                            >
                                <HiOutlineTrash className="mr-2 h-4 w-4" />
                                Delete Review
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
        ]

    

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
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className={'ml-2'}>
                            Rows <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        <DropdownMenuLabel>Rows per Page</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={pageSize.toString()}
                            onValueChange={(value: any) =>
                                setPageSize(Number(value))
                            }
                        >
                            <DropdownMenuRadioItem value={'5'}>
                                5
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value={'10'}>
                                10
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value={'20'}>
                                20
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
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
                                                    header.column.columnDef.header,
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
                                    className={`px-3 ${isCopied
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
                        onClick={() => setPage(Math.max(0, page - 1))}
                        disabled={page === 0}
                    >
                        <HiOutlineChevronLeft className="h-4 w-4" />
                        
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page + 1)}
                        disabled={data.length < pageSize}
                    >
                        
                        <HiOutlineChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <ToastContainer />
                {isSheetOpen && selectedReview && (
                    <Sheet
                        open={isSheetOpen}
                        onOpenChange={() => setSheetOpen(false)}
                    >
                        <SheetTrigger asChild>
                            <Button variant="outline">Open</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit review</SheetTitle>
                                <SheetDescription>
                                    Make changes to your review here. Click
                                    save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Rating
                                    </Label>
                                    <Input
                                        id="rating"
                                        value={reviewData.rating}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'rating',
                                                Number(event.target.value)
                                            )
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="email"
                                        className="text-right"
                                    >
                                        Comment
                                    </Label>
                                    <Input
                                        id="comment"
                                        value={reviewData.comment}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'comment',
                                                event.target.value
                                            )
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="message"
                                        className="text-right"
                                    >
                                        BookId
                                    </Label>
                                    <Input
                                        id="bookId"
                                        value={reviewData.bookId}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'bookId',
                                                event.target.value
                                            )
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button
                                        type="submit"
                                        onClick={handleSaveChanges}
                                    >
                                        Save changes
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                )}
                {isViewDetailsSheetOpen && viewDetailsReview && (
                    <Sheet
                        open={isViewDetailsSheetOpen}
                        onOpenChange={() => setViewDetailsSheetOpen(false)}
                    >
                        <SheetTrigger asChild>
                            <Button variant="outline">Open</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>View profile</SheetTitle>
                                <SheetDescription>
                                    View details of the selected review here.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Rating
                                    </Label>
                                    <Input
                                        id="name"
                                        value={viewDetailsReview.rating}
                                        disabled
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="email"
                                        className="text-right"
                                    >
                                        BookId
                                    </Label>
                                    <Input
                                        id="bookId"
                                        value={viewDetailsReview.bookId}
                                        disabled
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button
                                        onClick={() =>
                                            setViewDetailsSheetOpen(false)
                                        }
                                    >
                                        Close
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                )}
                {isDeleteDialogOpen && selectedReview && (
                    <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button variant="outline">Open</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Review</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this review?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button
                                        onClick={() =>
                                            setDeleteDialogOpen(false)
                                        }
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    onClick={async () => {
                                        const response = await fetch(
                                            `http://localhost:5000/api/review/${selectedReview.id}`,
                                            {
                                                method: 'DELETE',
                                            }
                                        )

                                        if (!response.ok) {
                                            toast.error(
                                                'Failed to delete review',
                                                {
                                                    theme:
                                                        localStorage.getItem(
                                                            'flowbite-theme-mode'
                                                        ) === 'dark'
                                                            ? 'dark'
                                                            : 'light',
                                                }
                                            )
                                        }

                                        toast.success(
                                            'review deleted successfully',
                                            {
                                                theme:
                                                    localStorage.getItem(
                                                        'flowbite-theme-mode'
                                                    ) === 'dark'
                                                        ? 'dark'
                                                        : 'light',
                                            }
                                        )
                                        setDeleteDialogOpen(false)
                                        const fetchData = async () => {
                                            try {
                                                const response = await fetch(
                                                    `http://localhost:5000/api/reviews`
                                                )
                                                const jsonData = await response.json()
                                                setData(jsonData)
                                            } catch (error) {
                                                console.error('Error fetching data:', error)
                                            }
                                        }
                                    
                                    
                                    fetchData()
                                    }}
                                    className="text-white font-bold bg-red-600 hover:bg-red-700"
                                >
                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    )
}
