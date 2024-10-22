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
    // HiOutlineCheck,
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

import { API_URL } from '@/util/envExport'
export type Contact = {
    id: number
    email: string
    type: string
    name: string
    message: string
    createdAt: string
    updatedAt: string
}

export default function ContactTable() {
    const [isSheetOpen, setSheetOpen] = useState(false)
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        type: '',
        message: '',
    })
    const [isViewDetailsSheetOpen, setViewDetailsSheetOpen] = useState(false)
    const [viewDetailsContact, setViewDetailsContact] = useState({
        name: '',
        email: '',
        type: '',
        message: '',
    })
    const [data, setData] = useState<Contact[]>([])
    // const [isCopied, setIsCopied] = useState(false)
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/contacts?limit=${pageSize}&offset=${page * pageSize
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

    useEffect(() => {
        if (selectedContact) {
            setContactData({
                ...selectedContact,
            })
        }
    }, [selectedContact])

    const handleInputChange = (name: string, value: string) => {
        setContactData({
            ...contactData,
            [name]: value,
        })
    }

    const handleSaveChanges = async () => {
        if (selectedContact) {
            console.log(setContactData)
            const response = await fetch(
                `${API_URL}/api/contact/${selectedContact.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contactData),
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
                        `${API_URL}/api/contacts?limit=${pageSize}&offset=${page * pageSize
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
    const columns: ColumnDef<Contact>[] = [
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
            accessorKey: 'email',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="lowercase hover:text-amber-600">
                    <a href={`mailto:${row.getValue('email')}`}>
                        {row.getValue('email')}
                    </a>
                </div>
            ),
        },
        {
            accessorKey: 'type',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Type
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="lowercase hover:text-amber-600">
                        {row.getValue('type')}
                </div>
            ),
        },
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue('name')}</div>,
        },
        {
            accessorKey: 'message',
            header: 'Message',
            cell: ({ row }) => <div>{row.getValue('message')}</div>,
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
                return (
                    <div>{new Intl.DateTimeFormat('en-US').format(date)}</div>
                )
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
                return (
                    <div>{new Intl.DateTimeFormat('en-US').format(date)}</div>
                )
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const contact = row.original
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
                                        contact.id.toString()
                                    )
                                }
                            >
                                <HiOutlineClipboardCopy className="mr-2 h-4 w-4" />
                                Copy Contact ID
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        contact.email.toString()
                                    )
                                }
                            >
                                <HiOutlineClipboardCopy className="mr-2 h-4 w-4" />
                                Copy Contact Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    setViewDetailsContact(contact)
                                    setViewDetailsSheetOpen(true)
                                }}
                            >
                                <HiOutlineEye className="mr-2 h-4 w-4" />
                                View Contact Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedContact(contact)
                                    setSheetOpen(true)
                                }}
                            >
                                <HiOutlinePencil className="mr-2 h-4 w-4" />
                                Edit Contact Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setDeleteDialogOpen(true)
                                    setSelectedContact(contact)
                                }}
                                className="text-red-500 font-bold hover:text-red-700 hover:bg-red-700"
                            >
                                <HiOutlineTrash className="mr-2 h-4 w-4" />
                                Delete Contact
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
                            onValueChange={(value: string) =>
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
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
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
                                                className="text-white font-bold bg-amber-600 hover:bg-amber-700"
                                            >
                                                Export as {format.toUpperCase()}
                                            </Button>
                                        )
                                    )}
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
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
                {isSheetOpen && selectedContact && (
                    <Sheet
                        open={isSheetOpen}
                        onOpenChange={() => setSheetOpen(false)}
                    >
                        <SheetTrigger asChild>
                            <Button variant="outline">Open</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Edit Contact</SheetTitle>
                                <SheetDescription>
                                    Make changes to your Contact here. Click
                                    save when you're done.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={contactData.name}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'name',
                                                event.target.value
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
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        value={contactData.email}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'email',
                                                event.target.value
                                            )
                                        }
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="type" className="text-right">
                                        Type
                                    </Label>
                                    <select
                                        id="type"
                                        value={contactData.type}
                                        onChange={(event) =>
                                            handleInputChange('type', event.target.value)
                                        }
                                        className="col-span-3 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-amber-400 dark:focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                    >
                                        <option value="feedback">Feedback</option>
                                        <option value="report">Report</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="message"
                                        className="text-right"
                                    >
                                        Message
                                    </Label>
                                    <Input
                                        id="message"
                                        value={contactData.message}
                                        onChange={(event) =>
                                            handleInputChange(
                                                'message',
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
                {isViewDetailsSheetOpen && viewDetailsContact && (
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
                                    View details of the selected contact here.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={viewDetailsContact.name}
                                        disabled
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="email"
                                        className="text-right"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        value={viewDetailsContact.email}
                                        disabled
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">
                                    Type
                                </Label>
                                <Input
                                    id="type"
                                    value={viewDetailsContact.type}
                                    disabled
                                    className="col-span-3"
                                />
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
                {isDeleteDialogOpen && selectedContact && (
                    <Dialog
                        open={isDeleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                    >
                        <DialogTrigger asChild>
                            <Button variant="outline">Open</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Contact</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete this
                                    contact?
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
                                            `${API_URL}/api/contact/${selectedContact.id}`,
                                            {
                                                method: 'DELETE',
                                            }
                                        )

                                        if (!response.ok) {
                                            toast.error(
                                                'Failed to delete contact',
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
                                            'contact deleted successfully',
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
                                                    `${API_URL}/api/contacts?limit=${pageSize}&offset=${page * pageSize
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
