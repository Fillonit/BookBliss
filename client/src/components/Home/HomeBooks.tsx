import * as React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import BookCard from '../Book/BookCard'
import { BookCardProps } from '@/types/BookCardProps'
import SkeletonCardBook from '../Other/Loading'
import NoResults from '../Other/Exceptions/NoResults'
import { API_URL } from '@/util/envExport'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const HomeBooks = () => {
    const [booksByRecent, setBooksByRecent] = useState<BookCardProps[] | null>(
        []
    )
    const [booksByPopular, setBooksByPopular] = useState<
        BookCardProps[] | null
    >([])
    const [booksByRated, setBooksByRated] = useState<BookCardProps[] | null>([])
    const [loading, setLoading] = useState({
        recent: true,
        popular: true,
        rated: true,
    })
    const [email, setEmail] = useState('')

    const fetchBooks = async (
        sorting: string,
        setter: React.Dispatch<React.SetStateAction<BookCardProps[] | null>>,
        loadingKey: keyof typeof loading
    ) => {
        try {
            const response = await fetch(
                `${API_URL}/api/books?limit=5&offset=0&sorting=${sorting}`
            )
            if (response.ok) {
                const json = await response.json()
                const data: BookCardProps[] = json.data
                console.log(`Fetched books with sorting ${sorting}:`, data)
                setter(data)
            } else {
                console.error('Failed to fetch books')
            }
        } catch (error) {
            console.error('Error fetching books:', error)
        } finally {
            setLoading((prev) => ({ ...prev, [loadingKey]: false }))
        }
    }

    useEffect(() => {
        fetchBooks('createdAt', setBooksByRecent, 'recent')
        fetchBooks('ratingCount', setBooksByPopular, 'popular')
        fetchBooks('rating', setBooksByRated, 'rated')
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) {
            toast.error('Please enter a valid email address.')
            return
        }

        try {
            const response = await fetch(`${API_URL}/api/subscriber`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })
            if (response.ok) {
                toast.success('Thank you for subscribing!')
                setEmail('')
            } else {
                const errorData = await response.json()
                toast.error(
                    errorData.message ||
                        'Subscription failed. Please try again.'
                )
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        }
    }

    const renderCarousel = (
        books: BookCardProps[] | null,
        loading: boolean,
        sorting: string
    ) => (
        <div className="w-full mb-8">
            <Carousel
                opts={{ align: 'start' }}
                className="w-full min-w-96 mt-4"
            >
                {loading && <SkeletonCardBook count={4} />}
                {!loading && books && books.length > 0 && (
                    <CarouselContent>
                        {books.map((book, index) => (
                            <CarouselItem key={index} className="basis-1/4">
                                <div className="p-1">
                                    <BookCard {...book} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                )}
                {books && books.length === 0 && !loading && <NoResults />}
                {(loading || (books && books.length > 0)) && (
                    <>
                        <CarouselPrevious />
                        <CarouselNext />
                    </>
                )}
            </Carousel>
            <div className="mt-2 w-full flex justify-end">
                <a
                    href={`http://localhost:5173/books?sorting=${sorting}`}
                    className="text-amber-500 hover:underline flex items-center font-semibold"
                >
                    More
                    <AiOutlineArrowRight className="ml-1 font-semibold" />
                </a>
            </div>
        </div>
    )

    return (
        <div className="flex flex-col items-start w-full">
            <h2 className="text-xl font-bold mt-2">Most Recent</h2>
            {renderCarousel(booksByRecent, loading.recent, 'createdAt')}
            <h2 className="text-xl font-bold mt-2">Most Popular</h2>
            {renderCarousel(booksByPopular, loading.popular, 'ratingCount')}
            <h2 className="text-xl font-bold mt-2">Highest Rated</h2>
            {renderCarousel(booksByRated, loading.rated, 'rating')}

            <section>
                <div className="px-8 py-12 mx-auto md:px-12 lg:px-32 max-w-7xl">
                    <div className="p-10 text-center bg-white border shadow-lg md:p-20 rounded-3xl dark:bg-slate-800">
                        <p className="mt-8 text-4xl font-semibold tracking-tighter text-black dark:text-white">
                            Want to get notified when new books come out?
                        </p>
                        <p className="mx-auto mt-4 text-base font-medium text-gray-500 text-balance">
                            Subscribe to our newsletter and be the first to know
                            about the latest arrivals and exclusive offers.
                            Enter your email below to stay updated!
                        </p>

                        <form
                            className="w-full max-w-xs mx-auto mt-8"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col w-full gap-2 lg:flex-row">
                                <label
                                    htmlFor="email-address"
                                    className="sr-only"
                                >
                                    Email address
                                </label>
                                <input
                                    name="email"
                                    id="email-address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    aria-describedby="emailHelp"
                                    className="block w-full h-12 px-4 py-2 text-blue-500 duration-200 border rounded-lg appearance-none bg-chalk border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm mb-2" // Added mb-2 for margin-bottom: 0.5rem;
                                />
                                <span id="emailHelp" className="sr-only">
                                    Please enter your email address to
                                    subscribe.
                                </span>
                                <button
                                    type="submit"
                                    aria-label="Primary action"
                                    className="inline-flex items-center justify-center w-full h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-amber-500 md:w-auto rounded-xl hover:bg-amber-600 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default HomeBooks
