'use client'

import { BookCardProps } from '@/types/BookCardProps'

import {
    CardTitle,
    CardDescription,
    CardContent,
    Card,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function BookCard(book: BookCardProps) {
    return (
        <Card className="w-full max-w-xs mx-2">
            <div className="grid w-full">
                <div className="relative w-full">
                    <img
                        alt="Book cover"
                        className="w-full object-cover"
                        height={400}
                        src={book.cover}
                        style={{
                            aspectRatio: '400/400',
                            objectFit: 'cover',
                        }}
                        width={400}
                    />
                </div>
            </div>
            <CardContent className="p-4">
                <CardTitle className="text-base font-semibold">
                    {book.title}
                </CardTitle>
                <CardDescription className="mb-4 text-sm truncate">
                    {book.description.slice(0, 100)}...
                </CardDescription>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium bg-amber-600 p-2 rounded-md">
                        {book.price.toFixed(2)} €
                    </span>
                    <Button size="sm">Add to Cart</Button>
                </div>
            </CardContent>
        </Card>
    )
}
