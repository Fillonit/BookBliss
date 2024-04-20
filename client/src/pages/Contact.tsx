// import { Alert, Toast } from 'flowbite-react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { API_URL } from '@/util/envExport'

const Contact = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: fullName, email, message }),
            })
            if (response.ok) {
                setFullName('')
                setEmail('')
                setMessage('')
                toast.success('Message sent successfully', {
                    theme:
                        localStorage.getItem('flowbite-theme-mode') === 'dark'
                            ? 'dark'
                            : 'light',
                })
            }
        } catch (error) {
            console.error(error)
            toast.error('An error occurred')
        }
    }

    return (
        <section
            className="relative bg-cover bg-center bg-white dark:bg-gray-900 mt-12 min-h-screen"
            style={{
                backgroundImage:
                    "url('https://source.unsplash.com/random/?Books,dark')",
            }}
        >
            <div className="container px-6 py-12 mx-auto">
                <div>
                    <p className="font-medium text-amber-500 dark:text-amber-400">
                        Contact us
                    </p>

                    <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl dark:text-white">
                        Chat to our friendly team
                    </h1>

                    <p className="mt-3 text-gray-200 dark:text-gray-400">
                        We’d love to hear from you. Please fill out this form or
                        shoot us an email.
                    </p>
                </div>

                <div className="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8 mt-5">
                    <form onSubmit={handleSubmit}>
                        <div className="-mx-2 md:items-center md:flex">
                            <div className="flex-1 px-2">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="John"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-amber-400 dark:focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="johndoe@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-amber-400 dark:focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="w-full mt-4">
                            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                                Message
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-amber-400 dark:focus:border-amber-400 focus:ring-amber-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Message"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-amber-800 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-600 focus:ring-opacity-50"
                        >
                            Send message
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Contact
