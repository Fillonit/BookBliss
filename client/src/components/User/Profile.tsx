import { API_URL } from '@/util/envExport'
import { useEffect, useState } from 'react'
import SidebarProfile from '../../components/User/SidebarProfile'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface SavedBook {
    id: number
    Book: {
        title: string
        cover: string
    }
}

interface User {
    id: number
    email: string
    avatar: string
    name: string
    role: string
    createdAt: string
    updatedAt: string
    bio: string
    location: string
    savedBooks: SavedBook[]
}

const Profile = () => {
    const [userData, setUserData] = useState<User | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [booksPerPage] = useState<number>(2)
    const [savedBooks, setSavedBooks] = useState<SavedBook[]>([])
    useEffect(() => {
        const fetchUserData = async () => {
            const sessionToken = localStorage.getItem('sessionToken')
            if (sessionToken) {
                try {
                    const response = await fetch(
                        `${API_URL}/api/auth/user/${sessionToken}`
                    )
                    if (!response.ok) {
                        localStorage.removeItem('sessionToken')
                        window.location.href = '/login'
                        throw new Error('Network response was not ok')
                    }
                    const data: User = await response.json()
                    setUserData(data)
                    fetchSavedBooks(data.id)
                } catch (error) {
                    console.error('Error fetching user data:', error)
                    localStorage.removeItem('sessionToken')
                    window.location.href = '/login'
                }
            }
        }

        fetchUserData()
    }, [])

    const fetchSavedBooks = async (id: number) => {
        try {
            const sessionToken = localStorage.getItem('sessionToken')
            if (!sessionToken) {
                throw new Error('Session token not found')
            }

            const response = await fetch(
                `${API_URL}/api/savedBooks/user/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionToken}`,
                    },
                }
            )

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data: SavedBook[] = await response.json()
            setSavedBooks(data)
        } catch (error) {
            console.error('Error fetching saved books:', error)
        }
    }

    const indexOfLastBook = currentPage * booksPerPage
    const indexOfFirstBook = indexOfLastBook - booksPerPage
    const currentBooks = savedBooks.slice(indexOfFirstBook, indexOfLastBook)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    if (!userData) {
        return <div>Loading...</div>
    }

    return (
        <div className="bg-white dark:bg-slate-700 py-5 min-h-screen flex items-center justify-center mt-11">
            <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden w-full max-w-4xl shadow-lg">
                <div
                    className="h-48 flex items-end p-4 bg-black"
                    style={{
                        backgroundImage: `url('https://source.unsplash.com/random/?Books')`,
                    }}
                >
                    <div className="relative flex items-center">
                        <Avatar className="h-36 w-36">
                            <AvatarImage src={userData?.avatar} alt="Avatar" />
                            <AvatarFallback className="uppercase text-4xl">
                                {userData?.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div className=" text-white flex flex-col justify-left">
                            <h5 className="text-2xl ml-6 mt-6">
                                {userData.name}
                            </h5>
                            <p>{userData.location}</p>
                            <SidebarProfile />
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">
                        About
                    </h3>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg dark:text-white shadow-md">
                        <p className="italic mb-2">{userData.bio}</p>
                        <p className="mb-2">
                            <strong>Email:</strong> {userData.email}
                        </p>
                        <p className="mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </p>
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-lg font-semibold dark:text-white">
                                Saved Books
                            </h4>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            {currentBooks.map((book) => (
                                <img
                                    key={book.id}
                                    src={book.Book.cover}
                                    alt={book.Book.title}
                                    className="w-full rounded-lg shadow-md"
                                />
                            ))}
                        </div>
                        <nav className="mt-4" aria-label="Pagination">
                            <ul className="flex justify-center">
                                {[
                                    ...Array(
                                        Math.ceil(
                                            savedBooks.length / booksPerPage
                                        )
                                    ).keys(),
                                ].map((number) => (
                                    <li key={number + 1} className="mx-2">
                                        <button
                                            onClick={() => paginate(number + 1)}
                                            className="px-3 py-1 text-sm font-medium dark:text-slate-200 text-slate-700 hover:bg-gray-300 dark:hover:bg-slate-700 dark:focus:ring-slate-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 rounded-full duration-150 ease-in-out transition-colors"
                                        >
                                            {number + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile