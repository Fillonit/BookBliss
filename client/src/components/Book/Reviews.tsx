import { API_URL } from '@/util/envExport'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Review {
    id: number
    rating: number
    comment: string
    bookId: number
    userId: number
    createdAt: Date
    updatedAt: Date
    book: {
        title: string
        author: string
        id: number
        cover: string
    }
    user: {
        name: string
        email: string
        id: number
        avatar: string
    }
}

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    interface RouteParams {
        id: string
        [key: string]: string | undefined
    }

    const { id } = useParams<RouteParams>()

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${API_URL}/api/reviews`)
                if (!response.ok) {
                    throw new Error('Error fetching reviews')
                }
                const data = await response.json()
                // console.log(data)
                // if (!Array.isArray(data)) {
                //     throw new Error('Invalid data format')
                // }
                setReviews(data)
                console.log(reviews)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching reviews:', error)
                setError('Failed to fetch reviews')
                setLoading(false)
            }
        }

        fetchReviews()
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="space-y-8">
            {reviews.map((review) => (
                <article key={review.id} className="mb-8 bg-white shadow  p-4">
                    <div className="flex items-center mb-4">
                        {review.user && (
                            <img
                                className="w-10 h-10 mr-4 rounded-full"
                                src={review.user.avatar}
                                alt={review.user.name}
                            />
                        )}
                        <div className="font-medium text-black">
                            <p>
                                {review.user
                                    ? review.user.name
                                    : 'Unknown User'}{' '}
                                <time
                                    dateTime={new Date(
                                        review.createdAt
                                    ).toISOString()}
                                    className="block text-sm text-black"
                                >
                                    Joined on{' '}
                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString()}
                                </time>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                        {[...Array(review.rating)].map((_, index) => (
                            <svg
                                key={index}
                                className="w-4 h-4 text-yellow-300"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 22 20"
                            >
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                        ))}
                        <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                            {review.book.title}
                        </h3>
                    </div>
                    <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                            Reviewed on{' '}
                            <time
                                dateTime={new Date(
                                    review.createdAt
                                ).toISOString()}
                            >
                                {new Date(
                                    review.createdAt
                                ).toLocaleDateString()}
                            </time>
                        </p>
                    </footer>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                        {review.comment}
                    </p>
                    <a
                        href="#"
                        className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                        Read more
                    </a>
                    <aside>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {review.rating} people found this helpful
                        </p>
                    </aside>
                </article>
            ))}
        </div>
    )
}

export default Reviews
