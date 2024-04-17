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
    // HiOutlineCheck,
    HiOutlineFolderDownload,
    HiOutlineChevronLeft,
    HiOutlineChevronRight,
} from 'react-icons/hi'
// import { FaGoogle } from 'react-icons/fa'
import {
    BsFiletypeJson,
    BsFiletypeXml,
    BsFiletypeCsv,
    BsFiletypeYml,
    BsFileZip,
    BsCopy,
} from 'react-icons/bs'

import { GiBookCover } from 'react-icons/gi'

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

import {
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'

import { API_URL } from '@/util/envExport'

export type Inventory = {
    id: number
    bookId: number
    quantity: number
    Book: {
        id: number
        title: string
        author: string
        authorId: number
        publisherId: number
    }
}

export default function InventoryTable() {
    const [isSheetOpen, setSheetOpen] = useState(false)
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [isViewDetailsSheetOpen, setViewDetailsSheetOpen] = useState(false)
    const [viewDetailsInventory, setViewDetailsInventory] =
        useState<Inventory | null>(null)
    const [selectedInventory, setSelectedInventory] =
        useState<Inventory | null>(null)
    const [inventoryData, setInventoryData] = useState({
        id: 1,
        bookId: 3,
        quantity: 10,
        // Book: {
        //     id: 0,
        //     title: '',
        //     author: '',
        //     authorId: 0,
        //     publisherId: 0,
        // },
    })

    useEffect(() => {
        if (selectedInventory) {
            setInventoryData({
                ...selectedInventory,
            })
        }
    }, [selectedInventory])

    const handleInputChange = (name: string, value: number) => {
        setInventoryData({
            ...inventoryData,
            [name]: value,
        })
    }

    const handleSaveChanges = async () => {
        if (selectedInventory) {
            console.log(inventoryData)
            const response = await fetch(
                `${API_URL}/api/inventory/${selectedInventory.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        session: localStorage.getItem('sessionToken') ?? '',
                    },
                    body: JSON.stringify(inventoryData),
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
                        `${API_URL}/api/inventory?limit=${pageSize}&offset=${
                            page * pageSize
                        }`
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

    const columns: ColumnDef<Inventory>[] = [
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
            accessorKey: 'Book',
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
            cell: ({ row }) => (
                <div
                    onClick={() => {
                        navigator.clipboard.writeText(row.getValue('email'))
                        toast.success('Copied Email to clipboard!', {
                            theme:
                                localStorage.getItem('flowbite-theme-mode') ===
                                'dark'
                                    ? 'dark'
                                    : 'light',
                        })
                    }}
                    className="hover:text-amber-600 hover:cursor-copy"
                >
                    <a href={`/books/${row.getValue('bookId')}`}>
                        {(row.getValue('Book') as { title: string }).title}
                    </a>
                </div>
            ),
        },
        {
            accessorKey: 'Cover',
            header: 'Cover',
            cell: ({ row }) => (
                <>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button variant="link" className="">
                                <GiBookCover className="text-xl mr-2" />
                                Preview
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-full">
                            <div className="w-full">
                                <img
                                    src={
                                        (
                                            row.getValue('Book') as {
                                                cover: string
                                            }
                                        ).cover
                                    }
                                    alt={
                                        (
                                            row.getValue('Book') as {
                                                title: string
                                            }
                                        ).title
                                    }
                                    className="w-full max-h-[30vh] object-contain rounded-md"
                                />
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </>
            ),
        },
        {
            accessorKey: 'quantity',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Quantity
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div
                    onClick={() => {
                        navigator.clipboard.writeText(row.getValue('quantity'))
                        toast.success('Copied quantity to clipboard!', {
                            theme:
                                localStorage.getItem('flowbite-theme-mode') ===
                                'dark'
                                    ? 'dark'
                                    : 'light',
                        })
                    }}
                    className="hover:text-amber-600 hover:cursor-copy"
                >
                    {row.getValue('quantity')}
                </div>
            ),
        },
        {
            accessorKey: 'author',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Author
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const book = row.getValue('Book') as Inventory['Book']
                return (
                    <>
                        {book && book.authorId != null ? (
                            <a href={`/author/${book.authorId}`}>
                                <div>{book.author}</div>
                            </a>
                        ) : (
                            <div>{book.author}</div>
                        )}
                    </>
                )
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const inventory = row.original

                return (
                    <>
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
                                            inventory.id.toString()
                                        )
                                    }
                                >
                                    <HiOutlineClipboardCopy className="mr-2 h-4 w-4" />
                                    Copy ID
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            inventory.quantity.toString()
                                        )
                                    }
                                >
                                    <HiOutlineClipboardCopy className="mr-2 h-4 w-4" />
                                    Copy Quantity
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => {
                                        setViewDetailsInventory(inventory)
                                        setViewDetailsSheetOpen(true)
                                    }}
                                >
                                    <HiOutlineEye className="mr-2 h-4 w-4" />
                                    View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setSelectedInventory(inventory)
                                        setSheetOpen(true)
                                    }}
                                >
                                    <HiOutlinePencil className="mr-2 h-4 w-4" />
                                    Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setDeleteDialogOpen(true)
                                        setSelectedInventory(inventory)
                                    }}
                                    className="text-red-500 font-bold hover:text-red-700 hover:bg-red-700"
                                >
                                    <HiOutlineTrash className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )
            },
        },
    ]

    const [data, setData] = useState<Inventory[]>([])
    // const [isCopied, setIsCopied] = useState(false)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/inventory?limit=${pageSize}&offset=${
                        page * pageSize
                    }`
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

    const getFormatIcon = (format: string) => {
        switch (format) {
            case 'json':
                return <BsFiletypeJson className="text-2xl font-bold" />
            case 'csv':
                return <BsFiletypeCsv className="text-2xl font-bold" />
            case 'xml':
                return <BsFiletypeXml className="text-2xl font-bold" />
            case 'yaml':
                return <BsFiletypeYml className="text-2xl font-bold" />
            case 'zip':
                return <BsFileZip className="text-2xl font-bold" />
            default:
                return <BsFiletypeJson className="text-2xl font-bold" />
        }
    }

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
                    placeholder="Filter emails..."
                    value={
                        (table
                            .getColumn('email')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('email')
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
                            onValueChange={(value) =>
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
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
                            <div className="flex flex-row items-center space-x-2 justify-center">
                                <div className="grid grid-flow-row gap-2 grid-cols-3 items-center">
                                    <Label htmlFor="link" className="sr-only">
                                        Link
                                    </Label>
                                    {['json', 'csv', 'xml', 'yaml', 'zip'].map(
                                        (format) => (
                                            <Button
                                                key={format}
                                                onClick={async () => {
                                                    const response =
                                                        await fetch(
                                                            `${API_URL}/api/export/${format}`,
                                                            {
                                                                method: 'POST',
                                                                headers: {
                                                                    'Content-Type':
                                                                        'application/json',
                                                                },
                                                                body: JSON.stringify(
                                                                    table
                                                                        .getFilteredSelectedRowModel()
                                                                        .rows.map(
                                                                            (
                                                                                row
                                                                            ) =>
                                                                                row.original
                                                                        )
                                                                ),
                                                            }
                                                        )
                                                    if (!response.ok) {
                                                        throw new Error(
                                                            'Network response was not ok'
                                                        )
                                                    }
                                                    const blob =
                                                        await response.blob()
                                                    const url =
                                                        window.URL.createObjectURL(
                                                            blob
                                                        )
                                                    const link =
                                                        document.createElement(
                                                            'a'
                                                        )
                                                    link.href = url
                                                    link.setAttribute(
                                                        'download',
                                                        `BookBliss Export - ${new Date()}.${format}`
                                                    )
                                                    document.body.appendChild(
                                                        link
                                                    )
                                                    link.click()
                                                    link.remove()
                                                }}
                                                className="text-white bg-amber-600 hover:bg-amber-500"
                                            >
                                                {getFormatIcon(format)}
                                                <p className="text-xs">
                                                    {format.toUpperCase()}
                                                </p>
                                            </Button>
                                        )
                                    )}
                                    <Button
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                JSON.stringify(
                                                    table
                                                        .getFilteredSelectedRowModel()
                                                        .rows.map(
                                                            (row) =>
                                                                row.original
                                                        )
                                                )
                                            )
                                            toast.success(
                                                'Copied to clipboard!',
                                                {
                                                    theme:
                                                        localStorage.getItem(
                                                            'flowbite-theme-mode'
                                                        ) === 'dark'
                                                            ? 'dark'
                                                            : 'light',
                                                }
                                            )
                                        }}
                                        className="text-white bg-amber-600 hover:bg-amber-500"
                                    >
                                        <BsCopy className="text-2xl font-bold" />
                                        <p className="text-xs ml-1">Copy</p>
                                    </Button>
                                </div>
                            </div>
                            {/* <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        // onClick={() => setIsCopied(false)}
                                    >
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter> */}
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex items-center space-x-2">
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
                {isSheetOpen && selectedInventory && (
                    <Sheet
                        open={isSheetOpen}
                        onOpenChange={() => setSheetOpen(false)}
                    >
                        <SheetTrigger asChild>
                            <Button variant="outline">Open</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit profile</SheetTitle>
                                <SheetDescription>
                                    Make changes to your profile here. Click
                                    save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Quantity
                                    </Label>
                                    <Input
                                        id="quantity"
                                        defaultValue={
                                            viewDetailsInventory?.quantity
                                        }
                                        onChange={(event) =>
                                            handleInputChange(
                                                'quantity',
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
                                        Book ID
                                    </Label>
                                    <Input
                                        id="bookID"
                                        defaultValue={
                                            viewDetailsInventory?.bookId
                                        }
                                        onChange={(event) =>
                                            handleInputChange(
                                                'bookID',
                                                Number(event.target.value)
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
                {isViewDetailsSheetOpen && viewDetailsInventory && (
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
                                    View details of the selected user here.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Book
                                    </Label>
                                    <Input
                                        id="name"
                                        value={viewDetailsInventory.Book.title}
                                        disabled
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="email"
                                        className="text-right"
                                    >
                                        Quantity
                                    </Label>
                                    <Input
                                        id="email"
                                        value={viewDetailsInventory.quantity}
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
                {isDeleteDialogOpen && selectedInventory && (
                    <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button variant="outline">Open</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete User</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this user?
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
                                            `${API_URL}/api/inventory/${selectedInventory.id}`,
                                            {
                                                method: 'DELETE',
                                            }
                                        )

                                        if (!response.ok) {
                                            toast.error(
                                                'Failed to delete user',
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
                                            'User deleted successfully',
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
                                                    `${API_URL}/api/inventory?limit=${pageSize}&offset=${
                                                        page * pageSize
                                                    }`
                                                )
                                                const jsonData =
                                                    await response.json()
                                                setData(jsonData)
                                            } catch (error) {
                                                console.error(
                                                    'Error fetching data:',
                                                    error
                                                )
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
