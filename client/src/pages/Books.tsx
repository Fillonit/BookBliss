// import { Alert, Toast } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import { API_URL } from '@/util/envExport'

import BookCard from '@/components/Book/BookCard'
import { BookCardProps } from '@/types/BookCardProps'

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
// import { ChevronDownIcon } from '@radix-ui/react-icons'

// import {
//     DropdownMenu,
//     DropdownMenuCheckboxItem,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
//     DropdownMenuRadioGroup,
//     DropdownMenuRadioItem,
// } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
// import { ChevronDown } from 'lucide-react'
import {
    HiOutlineCash,
    // HiOutlineSelector,
    HiOutlineViewGrid,
    HiOutlineStar,
    HiOutlineCalendar,
} from 'react-icons/hi'

const BooksPage = () => {
    const [books, setBooks] = useState([])

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${API_URL}/api/books`)
            if (response.ok) {
                const json = await response.json()
                setBooks(json.data)
                return
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        async function fetchBookData() {
            await Promise.all([fetchBooks()])
            toast.success('Books fetched successfully', {
                theme:
                    localStorage.getItem('flowbite-theme-mode') === 'dark'
                        ? 'dark'
                        : 'light',
            })
        }
        fetchBookData()
    }, [])

    const filters = [
        {
            title: 'Genre',
            icon: <HiOutlineViewGrid className="h-6 w-6 mr-2 text-amber-600" />,
            options: [
                {
                    name: 'Fiction',
                    desc: 'A genre that involves imaginative narrative, particularly in literature.',
                },
                {
                    name: 'Non-Fiction',
                    desc: 'A genre that describes factual accounts.',
                },
                {
                    name: 'Mystery',
                    desc: 'A genre that involves suspense and intrigue.',
                },
                {
                    name: 'Romance',
                    desc: 'A genre that focuses on the romantic relationships between characters.',
                },
                {
                    name: 'Sci-Fi',
                    desc: 'A genre that involves speculative science and technology.',
                },
            ],
        },
        {
            title: 'Price',
            icon: <HiOutlineCash className="h-6 w-6 mr-2 text-amber-600" />,
            options: [
                { name: 'Under $10', desc: 'Books that are priced under $10.' },
                {
                    name: '$10 - $20',
                    desc: 'Books that are priced between $10 and $20.',
                },
                {
                    name: '$20 - $30',
                    desc: 'Books that are priced between $20 and $30.',
                },
                {
                    name: '$30 - $40',
                    desc: 'Books that are priced between $30 and $40.',
                },
                { name: 'Over $40', desc: 'Books that are priced over $40.' },
            ],
        },
        {
            title: 'Review',
            icon: <HiOutlineStar className="h-6 w-6 mr-2 text-amber-600" />,
            options: [
                {
                    name: 'Most Popular',
                    desc: 'Books that are the most popular.',
                },
                {
                    name: 'Least Popular',
                    desc: 'Books that are the least popular.',
                },
                { name: 'Hottest', desc: 'Books that are the hottest.' },
                { name: 'Suggested', desc: 'Books that are suggested.' },
            ],
        },
        {
            title: 'Release Date',
            icon: <HiOutlineCalendar className="h-6 w-6 mr-2 text-amber-600" />,
            options: [
                { name: 'Newest', desc: 'Books that are the newest.' },
                { name: 'Oldest', desc: 'Books that are the oldest.' },
                { name: 'Upcoming', desc: 'Books that are upcoming.' },
                {
                    name: 'Recently Released',
                    desc: 'Books that are recently released.',
                },
            ],
        },
    ]

    return (
        <section className="relative bg-cover bg-center bg-white dark:bg-gray-900 mt-12 min-h-screen flex">
            {/* Sidebar */}
            <div className="w-1/6 bg-gray-200 dark:bg-gray-800 p-5">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                    Filter
                </h2>

                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className={'px-[7.6rem]'}>
                            <span className="capitalize float-left">Genre</span>
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        <DropdownMenuRadioGroup
                            value={''}
                            onValueChange={(value) => {
                                console.log(value)
                            }}
                            className="w-[18.5rem]"
                        >
                            <DropdownMenuRadioItem value={'fiction'} >
                                Fiction
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value={'mystery'}>
                                Mystery
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value={'romance'}>
                                Romance
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu> */}
                {filters.map((filter) => (
                    <>
                        {/* <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                        By {filter.title}
                    </h3> */}
                        <Popover key={filter.title}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="ml-auto w-full mb-4 py-5"
                                >
                                    {filter.icon}
                                    <span className="text-lg">
                                        {filter.title}
                                    </span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" align="end">
                                <Command>
                                    <CommandInput
                                        placeholder={`Select new ${filter.title.toLowerCase()}...`}
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            No options found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {filter.options.map((option) => (
                                                <CommandItem
                                                    key={option.name}
                                                    className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                                                >
                                                    <p>{option.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {option.desc}
                                                    </p>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </>
                ))}
            </div>

            {/* Main content */}
            <div className="w-2/3 p-10 flex flex-wrap">
                {books.map((book: BookCardProps) => (
                    <div key={book.id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                        <BookCard {...book} />
                    </div>
                ))}
            </div>

            <ToastContainer />
        </section>
    )
}

export default BooksPage
