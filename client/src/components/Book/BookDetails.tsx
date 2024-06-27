import { API_URL } from '@/util/envExport'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { HiStar, HiOutlineStar } from 'react-icons/hi'

interface Review {
    id: number
    rating: number
    comment: string
    bookId: number
    userId: number
    createdAt: Date
    updatedAt: Date
}

interface Book {
    id: number
    title: string
    author: string
    rating: number
    ratingCount: number
    reviews: Review[]
}

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [book, setBook] = useState<Book | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookData = async (bookId: number) => {
            setLoading(true)
            try {
                const response = await fetch(`${API_URL}/api/books/${bookId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch book')
                }
                const bookData = await response.json()
                setBook(bookData)
            } catch (error) {
                console.error('Error fetching book:', error)
            } finally {
                setLoading(false)
            }
        }
        if (id) {
            fetchBookData(Number(id))
        }
    }, [id])

    const renderStars = (rating: number) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ? (
                    <HiStar key={i} className="w-7 h-7 text-yellow-500" />
                ) : (
                    <HiOutlineStar
                        key={i}
                        className="w-7 h-7 text-yellow-500"
                    />
                )
            )
        }
        return stars
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (!book) {
        return <p>Book not found</p>
    }

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-10 py-32 mx-auto">
                <div className="lg:w-3/4 mx-auto flex flex-wrap">
                    <div className="lg:w-2/3 w-full lg:pl-20 lg:py-10 mt-10 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            {book.author}
                        </h2>
                        <h1 className="text-gray-900 text-4xl title-font font-medium mb-1 dark:text-gray-100">
                            {book.title}
                        </h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {renderStars(book.rating)}
                                <span className="text-gray-600 ml-3 dark:text-gray-100">
                                    {book.rating
                                        ? book.rating.toFixed(2)
                                        : 'N/A'}{' '}
                                    ({book.ratingCount ?? '0'} reviews)
                                </span>
                            </span>
                        </div>
                        <div className="mt-10">
                            <h2 className="text-2xl font-bold mb-5">Reviews</h2>
                            {book.reviews &&
                                book.reviews.map((review) => (
                                    <div key={review.id} className="mb-8">
                                        <div className="flex items-center mb-1">
                                            {renderStars(review.rating)}
                                            <span className="text-gray-600 ml-3 dark:text-gray-100">
                                                {review.rating}
                                            </span>
                                        </div>
                                        <p className="text-gray-900 dark:text-gray-100">
                                            {review.comment}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Reviewed by user {review.userId} on{' '}
                                            {new Date(
                                                review.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {book.ratingCount} global ratings
                        </p>
                        <div className="flex items-center mt-4">
                            <a
                                href="#"
                                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                5 star
                            </a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div
                                    className="h-5 bg-yellow-300 rounded"
                                    style={{ width: '70%' }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                70%
                            </span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a
                                href="#"
                                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                4 star
                            </a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div
                                    className="h-5 bg-yellow-300 rounded"
                                    style={{ width: '60%' }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                60%
                            </span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a
                                href="#"
                                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                3 star
                            </a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div
                                    className="h-5 bg-yellow-300 rounded"
                                    style={{ width: '50%' }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                50%
                            </span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a
                                href="#"
                                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                2 star
                            </a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div
                                    className="h-5 bg-yellow-300 rounded"
                                    style={{ width: '40%' }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                40%
                            </span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a
                                href="#"
                                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                1 star
                            </a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div
                                    className="h-5 bg-yellow-300 rounded"
                                    style={{ width: '30%' }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                30%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookDetails
