import { useEffect, useState } from 'react'
import { API_URL } from '@/util/envExport'
import { Loader2Icon } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function About() {
    const [totalBooks, setTotalBooks] = useState<number | null>(null)
    const [totalUsers, setTotalUsers] = useState<number | null>(null)
    const [totalAuthors, setTotalAuthors] = useState<number | null>(null)
    const [email, setEmail] = useState('')

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

    useEffect(() => {
        const fetchData = async () => {
            fetch(`${API_URL}/api/books/count`).then(async (responseBooks) => {
                const dataBooks = await responseBooks.json()
                setTotalBooks(dataBooks.data)
            })

            fetch(`${API_URL}/api/users/count`).then(async (responseUsers) => {
                const dataUsers = await responseUsers.json()
                setTotalUsers(dataUsers.data)
            })

            fetch(`${API_URL}/api/users/count?role=author`).then(
                async (response) => {
                    const dataAuthors = await response.json()
                    setTotalAuthors(dataAuthors.data)
                }
            )
        }
        fetchData()
    }, [])

    return (
        <section>
            <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
                <div className="grid items-center grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
                    <div className="md:order-first">
                        <h1 className="text-4xl font-semibold tracking-tighter text-amber-500 text-balance">
                            Welcome to BookBliss, <></>
                            <span className="text-gray-700 dark:text-gray-200">
                                your gateway to literary adventures
                            </span>
                        </h1>

                        <dl className="grid grid-cols-2 gap-4 mt-12 list-none lg:gap-6 text-pretty">
                            <div>
                                <div>❖</div>
                                <dt className="mt-4 font-medium text-amber-500">
                                    Curated Collections
                                </dt>
                                <dd className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                                    At BookBliss, we handpick books from various
                                    genres to inspire and entertain you. Our
                                    curated collections ensure there's something
                                    for every reader.
                                </dd>
                            </div>
                            <div>
                                <div>❖</div>
                                <dt className="mt-4 font-medium text-amber-500">
                                    Exclusive Offers
                                </dt>
                                <dd className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                                    Enjoy special discounts and promotions
                                    available only to our subscribers. We
                                    believe in making great books accessible to
                                    everyone.
                                </dd>
                            </div>
                            <div>
                                <div>❖</div>
                                <dt className="mt-4 font-medium text-amber-500">
                                    Community Events
                                </dt>
                                <dd className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                                    Join our vibrant community through book
                                    clubs and virtual events. Connect with
                                    fellow readers and authors, and share your
                                    love for books.
                                </dd>
                            </div>
                            <div>
                                <div>❖</div>
                                <dt className="mt-4 font-medium text-amber-500">
                                    Personalized Recommendations
                                </dt>
                                <dd className="mt-2 text-sm text-gray-500 dark:text-gray-200">
                                    Our platform provides book suggestions
                                    tailored to your tastes and preferences.
                                    Discover new favorites with our personalized
                                    recommendations.
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div>
                        <div className="h-full  overflow-hidden  shadow-lg bg-gray-50 rounded-3xl">
                            <img
                                alt="BookBliss App"
                                className="relative w-full rounded-2xl drop-shadow-2xl"
                                src="https://i.pinimg.com/564x/5e/da/18/5eda18ec4297253777269507c4117426.jpg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <section className="text-gray-600 body-font">
                <div className="container px-5 mx-auto">
                    <div className="flex flex-col md:flex-row justify-center text-center">
                        <div className="p-4 md:w-1/5 sm:w-1/3 w-full flex-1 flex flex-col">
                            <div className="border-2 border-gray-200 bg-white px-4 py-6 rounded-lg dark:bg-slate-800 dark:border-none flex-grow">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="text-amber-500 w-12 h-12 mb-3 inline-block"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 17l4 4 4-4m-4-5v9"></path>
                                    <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                                </svg>
                                <h2 className="title-font font-medium sm:text-2xl text-3xl text-gray-900 dark:text-white">
                                    {totalBooks !== null ? (
                                        totalBooks
                                    ) : (
                                        <Loader2Icon />
                                    )}
                                </h2>
                                <p className="leading-relaxed dark:text-gray-200">
                                    Books
                                </p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/5 sm:w-1/3 w-full flex-1 flex flex-col">
                            <div className="border-2 border-gray-200 bg-white px-4 py-6 rounded-lg dark:bg-slate-800 dark:border-none flex-grow">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="text-amber-500 w-12 h-12 mb-3 inline-block"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"></path>
                                </svg>
                                <h2 className="title-font font-medium text-3xl text-gray-900 dark:text-white">
                                    {totalUsers !== null ? (
                                        totalUsers
                                    ) : (
                                        <Loader2Icon />
                                    )}
                                </h2>
                                <p className="leading-relaxed dark:text-gray-200">
                                    Users
                                </p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/5 sm:w-1/3 w-full flex-1 flex flex-col">
                            <div className="border-2 border-gray-200 bg-white px-4 py-6 rounded-lg dark:bg-slate-800 dark:border-none flex-grow">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="text-amber-500 w-12 h-12 mb-3 inline-block"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                                    <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"></path>
                                </svg>
                                <h2 className="title-font font-medium text-3xl text-gray-900 dark:text-white">
                                    {totalAuthors !== null ? (
                                        totalAuthors
                                    ) : (
                                        <Loader2Icon />
                                    )}
                                </h2>
                                <p className="leading-relaxed dark:text-gray-200">
                                    Authors
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
        </section>
    )
}
