import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '@/util/envExport'
// import SkeletonCardBook from '../Other/Loading'
// import { BookCardProps } from '@/types/BookCardProps'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

import BookCard from '@/components/Book/BookCard'

import { HiStar, HiOutlineStar, HiOutlineShoppingCart } from 'react-icons/hi'
import { FaAmazon, FaGoodreads } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'
import CreateReview from '../Admin/Reviews/CreateReview'

interface DukagjiniBook {
    dukagjiniBooksData: {
        data: {
            data: Array<{
                id: number
                // other properties...
            }>
        }
    }
}

function secondsToHms(d: number) {
    d = Number(d)
    const h = Math.floor(d / 3600)
    const m = Math.floor((d % 3600) / 60)
    const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : ''
    const mDisplay = m > 0 ? m + (m == 1 ? ' minute' : ' minutes') : ''
    return hDisplay + mDisplay
}

const SingleCard = () => {
    const { id } = useParams<{ id: string }>()
    // const [books, setBooks] = useState<BookCardProps[] | null>([])
    const [loading, setLoading] = useState<boolean>(true)

    const [reviews, setReviews] = useState<
        {
            id: number
            comment: string
            rating: number
            user: { name: string }
        }[]
    >([])
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
    const [book, setBook] = useState({
        id: 0,
        title: '',
        cover: '',
        rating: 0,
        author: '',
        description: '',
        price: 0,
        ratingCount: 0,
        genre: '',
        authorId: 0,
        pages: 0,
        hasPermission: false,
    })
    const [bookOnDukagjini, setBookOnDukagjini] =
        useState<DukagjiniBook | null>(null)

    const [hltrBook, setHltrBook] = useState({
        timeToRead: 0,
        words: 0,
        goodreadsId: 0,
        averageReadingTime: 0,
        human: '',
        numPages: 0,
    })

    const [wpm, setWpm] = useState(200)
    const fetchReviews = async () => {
        fetch(`${API_URL}/api/reviews-user/${id}`, {
            headers: {
                session: localStorage.getItem('sessionToken') as string,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setReviews(data.data)
            })
    }
    const fetchBookCover = async (bookId: number) => {
        setLoading(true)
        const response = await fetch(`${API_URL}/api/books/${bookId}`)
        if (!response.ok) {
            toast.error('Failed to fetch book')
            return
        }
        const bookData = await response.json()
        setBook(bookData.book)

        const dukagjiniResponse = await fetch(
            `${API_URL}/api/books/${bookId}/dukagjini`
        )
        if (!dukagjiniResponse.ok) {
            toast.error('Failed to fetch book from dukagjini')
            return
        }
        const dukagjiniData = await dukagjiniResponse.json()
        console.log(dukagjiniData)
        setBookOnDukagjini(dukagjiniData)

        const htlrResponse = await fetch(
            `${API_URL}/api/books/${bookData.book.id}/hltr`
        )
        if (!htlrResponse.ok) {
            toast.error('Failed to fetch book from htlr')
            return
        }

        const htlrData = await htlrResponse.json()
        console.log(htlrData)
        setHltrBook(htlrData)

        setLoading(false)
    }
    useEffect(() => {
        fetchReviews()
        fetchBookCover(Number(id))
    }, [id])

    const nextReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        )
    }

    const prevReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        )
    }

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-10 py-32 mx-auto">
                <div className="lg:w-3/4 mx-auto flex flex-wrap">
                    <img
                        src={book.cover}
                        alt="Book cover"
                        className="w-1/3 object-contain object-center rounded"
                    />
                    <div className="lg:w-2/3 w-full lg:pl-20 lg:py-10 mt-10 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            {loading ? 'Loading...' : book.author || 'None'}
                        </h2>
                        <h1 className="text-gray-900 text-4xl title-font font-medium mb-1 dark:text-gray-100">
                            {book.title ? book.title : 'Loading...'}
                        </h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {renderStars(book.rating ? book.rating : 0)}
                                <span className="text-gray-600 ml-3 dark:text-gray-100">
                                    {book.rating ? book.rating : 'Loading...'} (
                                    {book.ratingCount
                                        ? book.ratingCount
                                        : loading
                                        ? 'Loading...'
                                        : ''}{' '}
                                    reviews)
                                </span>
                            </span>
                        </div>
                        <p className="leading-relaxed dark:text-gray-100">
                            {book.description ? book.description : 'Loading...'}
                        </p>
                        <p className="text-gray-400 text-lg py-2">
                            <label htmlFor="wpm">
                                Your reading speed (words per minute):{' '}
                            </label>
                            <Input
                                type="number"
                                placeholder="Your reading speed (words per minute)"
                                id="wpm"
                                value={wpm}
                                onChange={(e) => setWpm(Number(e.target.value))}
                                className="w-1/3 p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                            />
                            {/* <input
                                type="number"
                                id="wpm"
                                value={wpm}
                                onChange={(e) => setWpm(Number(e.target.value))}
                            /> */}
                        </p>
                        <p className="text-gray-400 text-lg py-2">
                            {hltrBook.words
                                ? `Time to read: ${secondsToHms(
                                      Math.floor(hltrBook.words / wpm) * 60
                                  )}`
                                : 'Loading...'}
                        </p>
                        <p className="text-gray-400 text-lg py-2">
                            {hltrBook.numPages
                                ? `Pages: ${hltrBook.numPages}`
                                : 'Loading...'}
                            {',  '}
                            {hltrBook.words
                                ? `Words: ${hltrBook.words}`
                                : 'Loading...'}
                        </p>
                        <div className="flex mt-10 items-center pb-8 border-b-2 border-gray-100 mb-10"></div>
                        <div className="flex flex-row items-center justify-center gap-2">
                            <span className="title-font font-medium text-3xl text-gray-900 dark:text-gray-100 mr-4">
                                € {book.price ? book.price : 'Loading...'}
                            </span>
                            <Link
                                to={`https://dukagjinibooks.com/books/${bookOnDukagjini?.dukagjiniBooksData?.data?.data[0]?.id}`}
                                target="_blank"
                            >
                                <button className="flex items-center text-amber-600 font-bold bg-white border-0 py-2 px-4 focus:outline-none hover:bg-white rounded">
                                    <img
                                        src="https://play-lh.googleusercontent.com/pTsD075SAfNdWftp06Gfd22KGy8TmoMcL9JbZBvyYSAg1uFjv9MhDIQQSoSZmvO4VXM"
                                        alt="Dukagjini logo"
                                        className="w-6 h-6"
                                    />
                                    {/* Dukagjini Books */}
                                </button>
                            </Link>
                            <Link
                                to={`https://www.amazon.com/s?k=${book.title}+by+${book.author}`}
                                target="_blank"
                            >
                                <button className="flex items-center text-amber-600 font-bold bg-white border-0 py-2 px-4 focus:outline-none hover:bg-white rounded">
                                    <FaAmazon className="w-6 h-6 text-amber-600" />
                                </button>
                            </Link>
                            <Link
                                to={`https://goodreads.com/book/show/${hltrBook.goodreadsId}`}
                                target="_blank"
                            >
                                <button className="flex items-center text-amber-600 font-bold bg-white border-0 py-2 px-4 focus:outline-none hover:bg-white rounded">
                                    <FaGoodreads className="w-6 h-6 text-amber-600" />
                                </button>
                            </Link>
                            <button className="rounded-sm bg-amber-500 px-4 py-2 border-0 inline-flex items-center justify-center text-white ml-4 font-bold">
                                <HiOutlineShoppingCart className="w-6 h-6 mr-2" />
                                Add to cart
                            </button>
                        </div>
                        <CreateReview
                            bookId={Number.parseInt(String(id))}
                            onSubmit={() => {
                                fetchBookCover(Number(id))
                                fetchReviews()
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="border-b-2 border-gray-100 mb-10 w-full mr-96 max-w-[65rem] ml-[32rem]" />
            {reviews && reviews.length > 0 && (
                <div className="flex justify-center mt-4 pb-6">
                    <Carousel className="w-1/2">
                        <CarouselContent>
                            <CarouselItem style={{ width: '100%' }}>
                                <div style={{ width: '100%' }}>
                                    <div className="bg-zinc-100 p-6 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Review by @
                                            {
                                                reviews[currentReviewIndex].user
                                                    .name
                                            }
                                        </h3>
                                        <p className="text-gray-600 mb-2">
                                            {
                                                reviews[currentReviewIndex]
                                                    .comment
                                            }
                                        </p>
                                        <div className="flex items-center">
                                            {renderStars(
                                                reviews[currentReviewIndex]
                                                    .rating
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                        <>
                            <CarouselPrevious onClick={prevReview} />
                            <CarouselNext onClick={nextReview} />
                        </>
                    </Carousel>
                </div>
            )}
            <div className="flex justify-center mt-4 pb-6">
                <Carousel
                    // opts={{
                    //     align: 'start',
                    // }}
                    className="w-1/2"
                >
                    <CarouselContent className="mr-2">
                        <BookCard {...book} hasPermission={false} />
                        <CarouselItem className="basis-1/4 ">
                            <div className="p-1">
                                <BookCard {...book} hasPermission={false} />
                            </div>
                        </CarouselItem>
                        <BookCard {...book} hasPermission={false} />
                        <CarouselItem className="basis-1/4 ">
                            <div className="p-1">
                                <BookCard {...book} hasPermission={false} />
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <>
                        <CarouselPrevious />
                        <CarouselNext />
                    </>
                </Carousel>
            </div>
        </section>
    )
}
const renderStars = (ratingCount: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
        if (i < ratingCount) {
            stars.push(<HiStar key={i} className="w-7 h-7 text-yellow-500" />)
        } else {
            stars.push(
                <HiOutlineStar key={i} className="w-6 h-6 text-yellow-500" />
            )
        }
    }
    return stars
}

export default SingleCard
