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
    // HiOutlineEye,
    HiOutlinePencil,
    HiOutlineTrash,
    // HiOutlineCheck,
    // HiUserAdd,
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

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

//import DatePicker from '@/components/Admin/Books/DatePicker'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { API_URL } from '@/util/envExport'
import { BookCardProps } from '@/types/BookCardProps'
type EditableBook = Pick<BookCardProps, 'title' | 'description' | 'id'>
type BookCardType = Omit<BookCardProps, 'BookGenre'>

export default function BookTable() {
    const [isSheetOpen, setSheetOpen] = useState(false)
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState<BookCardProps | null>(null)
    const [bookData, setBookData] = useState<EditableBook>({
        title: '',
        description: '',
        id: -1,
    })
    const [isViewDetailsSheetOpen, setViewDetailsSheetOpen] = useState(false)
    const [viewDetailsBook, setViewDetailsBook] = useState<BookCardType>({
        title: '',
        description: '',
        id: -1,
        author: '',
        cover: '',
        rating: 0,
        price: 0,
        genre: '',
        hasPermission: true,
        ratingCount: 0,
        authorId: 0,
        pages: 0,
    })
    setViewDetailsBook({
        title: '',
        description: '',
        id: -1,
        author: '',
        cover: '',
        rating: 0,
        price: 0,
        genre: '',
        hasPermission: true,
        ratingCount: 0,
        authorId: 0,
        pages: 0,
    })
    useEffect(() => {
        if (selectedBook) {
            setBookData({
                ...selectedBook,
            })
        }
    }, [selectedBook])
    const handleInputChange = (name: string, value: string) => {
        setBookData({
            ...bookData,
            [name]: value,
        })
    }

    const handleSaveChanges = async () => {
        if (selectedBook) {
            const response = await fetch(
                `${API_URL}/api/books/${selectedBook.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        session: localStorage.getItem('sessionToken') as string,
                    },
                    body: JSON.stringify(bookData),
                }
            )

            if (!response.ok) {
                toast.error('Failed to save changes', {
                    theme:
                        localStorage.getItem('flowbite-theme-mode') === 'dark'
                            ? 'dark'
                            : 'light',
                })
                return
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
                        `${API_URL}/api/books?limit=${pageSize}&offset=${
                            page * pageSize
                        }`
                    )
                    const jsonData = await response.json()
                    setData(jsonData.data)
                } catch (error) {
                    console.error('Error fetching data:', error)
                }
            }

            fetchData()
        }
    }

    const columns: ColumnDef<BookCardProps>[] = [
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
            accessorKey: 'title',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Title
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div
                    onClick={() => {
                        navigator.clipboard.writeText(row.getValue('title'))
                        toast.success('Copied Title to clipboard!', {
                            theme:
                                localStorage.getItem('flowbite-theme-mode') ===
                                'dark'
                                    ? 'dark'
                                    : 'light',
                        })
                    }}
                    className="hover:text-amber-600 hover:cursor-copy lowercase"
                >
                    <a href={`mailto:${row.getValue('title')}`}>
                        {row.getValue('title')}
                    </a>
                </div>
            ),
        },
        {
            accessorKey: 'cover',
            header: 'Cover',
            cell: ({ row }) => (
                <Avatar>
                    <AvatarImage src={row.getValue('cover')} alt="@fillonit" />
                    <AvatarFallback className="uppercase">
                        {(row.getValue('cover') as string)
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                    </AvatarFallback>
                </Avatar>
            ),
        },
        {
            accessorKey: 'description',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Description
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div
                    onClick={() => {
                        navigator.clipboard.writeText(
                            row.getValue('description')
                        )
                        toast.success('Copied Description to clipboard!', {
                            theme:
                                localStorage.getItem('flowbite-theme-mode') ===
                                'dark'
                                    ? 'dark'
                                    : 'light',
                        })
                    }}
                    className="hover:text-amber-600 hover:cursor-copy"
                >
                    {row.getValue('description')}
                </div>
            ),
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
            cell: ({ row }) => <div>{row.getValue('rating')}</div>,
        },
        {
            accessorKey: 'price',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                return <div>{row.getValue('price')}</div>
            },
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
                return <div>{row.getValue('author')}</div>
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const user = row.original

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
                                            user.id.toString()
                                        )
                                    }
                                >
                                    <HiOutlineClipboardCopy className="mr-2 h-4 w-4" />
                                    Copy Book ID
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            user.title.toString()
                                        )
                                    }
                                >
                                    <HiOutlineClipboardCopy className="mr-2 h-4 w-4" />
                                    Copy Book Title
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setSelectedBook(user)
                                        setSheetOpen(true)
                                    }}
                                >
                                    <HiOutlinePencil className="mr-2 h-4 w-4" />
                                    Edit Book Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setDeleteDialogOpen(true)
                                        setSelectedBook(user)
                                    }}
                                    className="text-red-500 font-bold hover:text-red-700 hover:bg-red-700"
                                >
                                    <HiOutlineTrash className="mr-2 h-4 w-4" />
                                    Delete Book
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                )
            },
        },
    ]

    const [data, setData] = useState<BookCardProps[]>([])
    // const [isCopied, setIsCopied] = useState(false)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/books?limit=${pageSize}&offset=${
                        page * pageSize
                    }`
                )
                const jsonData = await response.json()
                setData(jsonData.data)
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
                    placeholder="Search"
                    value={
                        (table
                            .getColumn('title')
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn('title')
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
                            onValueChange={(value) => {
                                setPageSize(Number(value))
                                setPage(0)
                            }}
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
                        disabled={data.length < pageSize || data.length === 0}
                    >
                        <HiOutlineChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <ToastContainer />

                {isSheetOpen && selectedBook && (
                    <Sheet
                        open={isSheetOpen}
                        onOpenChange={() => setSheetOpen(false)}
                    >
                        <SheetTrigger asChild>
                            <Button variant="outline">Open</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit book</SheetTitle>
                                <SheetDescription>
                                    Make changes to this book here. Click save
                                    when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="title"
                                        className="text-right"
                                    >
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        value={bookData.title}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'title',
                                                event.target.value
                                            )
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="description"
                                        className="text-right"
                                    >
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        value={bookData.description}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'description',
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
                {isViewDetailsSheetOpen && viewDetailsBook && (
                    <Sheet
                        open={isViewDetailsSheetOpen}
                        onOpenChange={() => setViewDetailsSheetOpen(false)}
                    >
                        <SheetTrigger asChild>
                            <Button variant="outline">Open</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>View book</SheetTitle>
                                <SheetDescription>
                                    View details of the selected book here.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="title"
                                        className="text-right"
                                    >
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        value={viewDetailsBook.title}
                                        disabled
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="description"
                                        className="text-right"
                                    >
                                        Description
                                    </Label>
                                    <Input
                                        id="description"
                                        value={viewDetailsBook.description}
                                        disabled
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="rating"
                                        className="text-right"
                                    >
                                        Rating
                                    </Label>
                                    <Input
                                        id="rating"
                                        value={viewDetailsBook.rating}
                                        disabled
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="price"
                                        className="text-right"
                                    >
                                        Price
                                    </Label>
                                    <Input
                                        id="price"
                                        value={viewDetailsBook.price}
                                        disabled
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="author"
                                        className="text-right"
                                    >
                                        Author
                                    </Label>
                                    <Input
                                        id="author"
                                        value={viewDetailsBook.author}
                                        disabled
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="genre"
                                        className="text-right"
                                    >
                                        Genre
                                    </Label>
                                    <Input
                                        id="genre"
                                        value={viewDetailsBook.genre}
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
                {isDeleteDialogOpen && selectedBook && (
                    <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button variant="outline">Open</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Book</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this book?
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
                                            `${API_URL}/api/books/${selectedBook.id}`,
                                            {
                                                headers: {
                                                    session:
                                                        localStorage.getItem(
                                                            'sessionToken'
                                                        ) as string,
                                                },
                                                method: 'DELETE',
                                            }
                                        )

                                        if (!response.ok) {
                                            toast.error(
                                                'Failed to delete book',
                                                {
                                                    theme:
                                                        localStorage.getItem(
                                                            'flowbite-theme-mode'
                                                        ) === 'dark'
                                                            ? 'dark'
                                                            : 'light',
                                                }
                                            )
                                            return
                                        }

                                        toast.success(
                                            'Book deleted successfully',
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
                                                    `${API_URL}/api/books?limit=${pageSize}&offset=${
                                                        page * pageSize
                                                    }`
                                                )
                                                const jsonData =
                                                    await response.json()
                                                setData(jsonData.data)
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
