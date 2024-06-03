import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '@/util/envExport'
// import SkeletonCardBook from '../Other/Loading'
import { BookCardProps } from '@/types/BookCardProps'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

import BookCard from '@/components/Book/BookCard'

import { HiStar, HiOutlineStar, HiOutlineShoppingCart } from 'react-icons/hi'
const SingleCard = () => {
    const { id } = useParams<{ id: string }>()
    const [books, setBooks] = useState<BookCardProps[] | null>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [cover, setCover] = useState<string>('')
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

    console.log(books, loading)

    useEffect(() => {
        setBooks([
            {
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
            },
        ])

        setLoading(false)
    }, [])

    useEffect(() => {
        const fetchBookCover = async (bookId: number) => {
            const response = await fetch(`${API_URL}/api/books/${bookId}`)
            const bookData = await response.json()
            setBook(bookData)

            const cover = bookData.cover

            setCover(cover)
        }

        fetchBookCover(Number(id))
    }, [id])

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-10 py-32 mx-auto">
                <div className="lg:w-3/4 mx-auto flex flex-wrap">
                    <img
                        src={book.cover ? book.cover : cover}
                        alt="Book cover"
                        className="w-1/3 object-cover object-center rounded"
                    />
                    <div className="lg:w-2/3 w-full lg:pl-20 lg:py-10 mt-10 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            {book.author ? book.author : 'Loading...'}
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
                                        : 'Loading...'}{' '}
                                    reviews)
                                </span>
                            </span>
                        </div>
                        <p className="leading-relaxed dark:text-gray-100">
                            {book.description ? book.description : 'Loading...'}
                        </p>
                        <div className="flex mt-10 items-center pb-8 border-b-2 border-gray-100 mb-10"></div>
                        <div className="flex">
                            <span className="title-font font-medium text-3xl text-gray-900 dark:text-gray-100">
                                € {book.price ? book.price : 'Loading...'}
                            </span>
                            <button className="flex ml-auto text-white bg-yellow-500 border-0 py-3 px-8 focus:outline-none hover:bg-yellow-600 rounded">
                                Add To Cart
                            </button>
                            <button className="rounded-full w-12 h-12 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                <HiOutlineShoppingCart className="w-8 h-8" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b-2 border-gray-100 mb-10 w-full mr-96 max-w-[65rem] ml-[32rem]" />
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
