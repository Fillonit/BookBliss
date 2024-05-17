// import { Alert, Toast } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import { API_URL } from '@/util/envExport'

import BookCard from '@/components/Book/BookCard'
import { BookCardProps } from '@/types/BookCardProps'

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

    return (
        <section className="relative bg-cover bg-center bg-white dark:bg-gray-900 mt-12 min-h-screen">
            <p>test</p>
            {books.map((book: BookCardProps) => (
                <BookCard key={book.id} {...book} />
            ))}
            <ToastContainer />
        </section>
    )
}

export default BooksPage
