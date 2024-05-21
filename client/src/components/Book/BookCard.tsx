'use client'

import { BookCardProps } from '@/types/BookCardProps'

import {
    CardTitle,
    CardDescription,
    CardContent,
    Card,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HiStar } from 'react-icons/hi'

export default function BookCard(book: BookCardProps) {
    return (
        <Card className="flex flex-col w-full max-w-xs mx-2 bg-white shadow-lg rounded-lg overflow-hidden dark:bg-slate-950">
            <div className="relative">
                <img
                    alt="Book cover"
                    className="w-full h-64 object-cover"
                    src={book.cover}
                />
                <span className="absolute bottom-0 left-0 bg-amber-500 text-white px-2 py-1 m-2 rounded inline-flex items-center">
                    <HiStar className="text-xl" /> {book.rating}
                </span>
                <span className="absolute bottom-0 right-0 bg-white text-amber-600 px-2 py-1 m-2 rounded dark:bg-slate-900 dark:text-white">
                    {(book.BookGenre && book.BookGenre[0]?.Genre.name) ??
                        'None'}
                </span>
            </div>
            <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-semibold mb-2 dark:text-white">
                    {book.title}
                </CardTitle>
                <p className="text-sm text-gray-500 mb-1">
                    Author: {book.author}
                </p>
                <CardDescription className="text-sm text-gray-700 mb-4 truncate">
                    {book.description.slice(0, 100)}...
                </CardDescription>
            </CardContent>
            <div className="p-4 pt-0 flex items-center justify-between">
                <span className="text-sm font-medium bg-amber-600 p-2 rounded-md text-white">
                    {book.price.toFixed(2)} €
                </span>
                <Button size="sm">Add to Cart</Button>
            </div>
        </Card>
    )
}
