import { useEffect, useState } from 'react'
import BookCard from './BookCard'
import { BookCardProps } from '@/types/BookCardProps'
import { FetchDataProps } from '@/interfaces/FetchData'

const BookList = () => {
    const [books, setBooks] = useState<BookCardProps[]>([])
    const [bookCount, setBookCount] = useState<number>(0) // This will be used to determine the number of books to show on the page
    const [fetchData, setFetchData] = useState<FetchDataProps>({
        offset: 0,
        limit: 8, // Initially show 8 books
        query: '',
        genre: [],
    })
    const [loading, setLoading] = useState<boolean>(false)

    console.log(bookCount)
    console.log(loading)

    const fetchBooks = async (fetchData: FetchDataProps) => {
        try {
            const response = await fetch(
                `http://localhost:5000/books?offset=${fetchData.offset}&limit=${fetchData.limit}&query=${fetchData.query}&genre=${fetchData.genre}`
            )
            if (response.ok) {
                const json = await response.json()
                const data: BookCardProps[] = json.data
                setBooks(data)
                return
            }
        } catch (e) {
            console.log(e)
        }
    }

    const fetchBookCount = async (fetchData: FetchDataProps) => {
        try {
            const response = await fetch(
                `http://localhost:5000/books?query=${fetchData.query}&genre=${fetchData.genre}`
            )
            if (response.ok) {
                const json = await response.json()
                const data: number = json.data
                setBookCount(data)
                return
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        async function fetchBookData() {
            await Promise.all([
                fetchBooks(fetchData),
                fetchBookCount(fetchData),
            ])
            setLoading(false)
        }
        fetchBookData()
    }, [])

    return (
        <div className="flex flex-col pt-20 bg-gradient-to-r from-yellow-800 to-amber-800">
            <div className="flex justify-center pb-16 mt-10">
                <div className="flex justify-between items-center ms-20 ">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-amber-500"
                        value={fetchData.query}
                        onChange={(e) =>
                            setFetchData({
                                ...fetchData,
                                query: e.target.value,
                            })
                        }
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {books.map((book: BookCardProps) => (
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        description={book.description}
                        cover={book.cover}
                        rating={book.rating}
                        price={book.price}
                        genre={book.genre}
                    />
                ))}
                {/*add some sort of pagination here*/}
            </div>
        </div>
    )
}

export default BookList
