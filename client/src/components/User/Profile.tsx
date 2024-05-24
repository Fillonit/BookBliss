import { API_URL } from '@/util/envExport'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import SidebarProfile from '../../components/User/SidebarProfile'

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
        <div className="bg-slate-400 dark:bg-gray-700 py-5 min-h-screen flex items-center justify-center">
            <div className="bg-gray-200 dark:bg-gray-500 shadow-md rounded-lg overflow-hidden w-full max-w-md">
                <div
                    className="h-48 flex items-end p-4 bg-black"
                    style={{
                        backgroundImage: `url('https://source.unsplash.com/random/?Books')`,
                    }}
                >
                    <div className="relative flex items-center">
                        <img
                            src={
                                userData.avatar ||
                                'https://via.placeholder.com/150'
                            }
                            alt="Profile"
                            className="w-36 h-36 rounded-full border-4 border-white"
                        />
                        <button className="absolute bottom-2 right-2 bg-white text-black rounded-full p-1 shadow-md">
                            <FaEdit />
                        </button>
                    </div>
                    <div className="ml-4 text-white">
                        <h5 className="text-2xl">{userData.name}</h5>
                        <p>{userData.location}</p>
                    </div>
                </div>
                <div className="p-4">
                    <SidebarProfile />
                    <h3 className="text-lg font-semibold mb-3 dark:text-gray-800">
                        About
                    </h3>
                    <div className="bg-gray-100 dark:bg-gray-400 p-4 rounded-lg dark:text-gray-800">
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
                            <h4 className="text-lg font-semibold dark:text-gray-800">
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
                        <nav className="mt-4 " aria-label="Pagination">
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
                                            className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-full"
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
