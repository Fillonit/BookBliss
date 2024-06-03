import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { API_URL } from '@/util/envExport'

const Contact = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [type, setType] = useState('feedback')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: fullName, email, message, type }),
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
            } else {
                toast.error('An error occurred while sending the message')
            }
        } catch (error) {
            console.error(error)
            toast.error('An error occurred')
        }
    }

    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-gray-100">
                        Contact Us
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base dark:text-gray-400">
                        We value your feedback and inquiries. Whether you have a
                        question, a suggestion, or just want to share your
                        thoughts, we’d love to hear from you. Please fill out
                        the form below or send us an email.
                    </p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-wrap -m-2"
                    >
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label
                                    htmlFor="name"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2
                                     focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-800 dark:text-gray-100 dark:border-none dark:focus:border-yellow-500 dark:focus:bg-slate-900 dark:focus:ring-yellow-500 dark:placeholder-gray-400 dark:focus:ring-2 dark:bg-opacity-50 dark:transition-colors dark:duration-200 dark:ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-800
                                     dark:text-gray-100 dark:border-none dark:focus:border-yellow-500 dark:focus:bg-slate-900 dark:focus:ring-yellow-500 dark:placeholder-gray-400 dark:focus:ring-2 dark:bg-opacity-50 dark:transition-colors dark:duration-200 dark:ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label
                                    htmlFor="type"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Type
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-800 dark:text-gray-100 dark:border-none dark:focus:border-yellow-500 dark:focus:bg-slate-900 dark:focus:ring-yellow-500 dark:placeholder-gray-400 dark:focus:ring-2 dark:bg-opacity-50 dark:transition-colors dark:duration-200 dark:ease-in-out"
                                >
                                    <option value="feedback">Feedback</option>
                                    <option value="report">Report</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label
                                    htmlFor="message"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-white focus:ring-2 focus:ring-yellow-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out dark:bg-slate-800 dark:text-gray-100 dark:border-none dark:focus:border-yellow-500 dark:focus:bg-slate-900 dark:focus:ring-yellow-500 dark:placeholder-gray-400 dark:focus:ring-2 dark:bg-opacity-50 dark:transition-colors dark:duration-200 dark:ease-in-out"
                                ></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button
                                type="submit"
                                className="flex mx-auto text-white bg-yellow-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
                            >
                                Send
                            </button>
                        </div>
                        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                            <a className="text-yellow-500">example@email.com</a>
                            <p className="leading-normal my-5">
                                49 Smith St.
                                <br />
                                Saint Cloud, MN 56301
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Contact
