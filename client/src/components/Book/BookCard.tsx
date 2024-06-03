'use client'

import { useEffect, useState } from 'react'
import { BookCardProps } from '@/types/BookCardProps'
import { CardTitle, CardContent, Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    HiStar,
    HiHeart,
    HiOutlineShoppingCart,
    HiOutlineHeart,
} from 'react-icons/hi'
import { API_URL } from '@/util/envExport'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function BookCard(book: BookCardProps) {
    const [isFavourite, setIsFavourite] = useState<boolean>(() => {
        const favourites = JSON.parse(
            localStorage.getItem('favourites') || '[]'
        )
        return favourites.some((fav: BookCardProps) => fav.id === book.id)
    })

    useEffect(() => {
        const favourites = JSON.parse(
            localStorage.getItem('favourites') || '[]'
        )
        if (isFavourite) {
            if (!favourites.some((fav: BookCardProps) => fav.id === book.id)) {
                favourites.push(book)
            }
        } else {
            const index = favourites.findIndex(
                (fav: BookCardProps) => fav.id === book.id
            )
            if (index !== -1) {
                favourites.splice(index, 1)
            }
        }
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [isFavourite, book])

    const toggleFavourite = async () => {
        setIsFavourite(!isFavourite)
        if (!isFavourite) {
            try {
                const sessionToken = localStorage.getItem('sessionToken')
                if (!sessionToken) {
                    throw new Error('Session token not found')
                }

                const response = await fetch(
                    `${API_URL}/api/savedBooks/${book.id}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            session: `${sessionToken}`,
                        },
                    }
                )

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                toast.success('Added to favourites')
            } catch (error) {
                console.error('Error adding book to saved books:', error)
            }
        } else {
            toast.warn('Removed from favourites')
        }
    }

    return (
        <Link to={`/books/${book.id}`}>
            <Card className="flex flex-col w-full max-w-xs mx-2 bg-white rounded-lg overflow-hidden dark:bg-slate-950 shadow-md mb-2 transition-transform duration-500 ease-in-out transform hover:scale-105">
                <div className="relative">
                    <img
                        alt="Book cover"
                        className="w-full h-64 object-cover"
                        src={`${book.cover}`}
                    />
                    <span className="absolute bottom-0 left-0 bg-amber-500 text-white px-2 py-1 m-2 rounded inline-flex items-center">
                        <HiStar className="text-xl" />{' '}
                        {!book.rating && !book.rating
                            ? 'N/A'
                            : `${book.rating}`}
                    </span>
                    <span className="absolute bottom-0 right-0 bg-white text-amber-600 px-2 py-1 m-2 rounded dark:bg-slate-900 dark:text-white">
                        {(book.BookGenre && book.BookGenre[0]?.Genre.name) ??
                            'None'}
                    </span>
                </div>
                <CardContent className="p-2 flex-grow mt-2">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold mb-2 dark:text-white">
                            {book.title}
                        </CardTitle>
                        {isFavourite ? (
                            <HiHeart
                                className="text-2xl text-amber-600 cursor-pointer"
                                onClick={toggleFavourite}
                            />
                        ) : (
                            <HiOutlineHeart
                                className="text-2xl text-amber-600 cursor-pointer"
                                onClick={toggleFavourite}
                            />
                        )}
                    </div>
                    <Link to={`/profile/${book.authorId}`}>
                        <p className="text-sm mb-2">
                            {book.author || book.authorId
                                ? book.author || `Author No.${book.authorId}`
                                : 'Unknown Author'}
                        </p>
                    </Link>
                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-medium bg-amber-600 p-2 rounded-md text-white">
                            {book?.price?.toFixed(2)} €
                        </span>
                        <Button
                            size="sm"
                            className="dark:bg-amber-600 dark:text-white"
                        >
                            <HiOutlineShoppingCart className="" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
