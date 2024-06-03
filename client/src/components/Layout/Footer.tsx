'use client'

import { FaGithub } from 'react-icons/fa'
import { TbDeviceDesktopDown } from 'react-icons/tb'
import { TbMailShare } from 'react-icons/tb'

const footer = () => {
    return (
        <footer className="text-gray-600 body-font">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a
                    className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
                    href="/"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://www.freeiconspng.com/thumbs/book-icon/description-book-icon-orange-28.png"
                        alt=""
                        className="mr-3 h-6 sm:h-9"
                    />
                    <span className="ml-3 text-xl dark:text-gray-100">
                        BookBliss
                    </span>
                </a>
                <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4 dark:text-gray-100">
                    <a
                        href="https://github.com/Magnolia-DevKs"
                        className="text-gray-600 ml-1"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        © 2024{' '}
                        <span className="underline text-md hover:text-amber-500 transition duation-300 ease-in-out">
                            Magnolia
                        </span>
                    </a>
                </p>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    <a
                        className="text-gray-500 hover:text-amber-500 transition duration-300 ease-in-out"
                        href="https://github.com/Fillonit/BookBliss"
                        target="_blank"
                    >
                        <FaGithub className="text-xl" />
                    </a>
                    <a
                        className="ml-3 text-gray-500 hover:text-amber-500 transition duration-300 ease-in-out"
                        href="mailto:info@logic-nest.me"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <TbMailShare className="text-xl" />
                    </a>
                    <a
                        className="ml-3 text-gray-500 hover:text-amber-500 transition duration-300 ease-in-out"
                        href="https://github.com/Fillonit/BookBliss/releases/latest"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <TbDeviceDesktopDown className="text-xl" />
                    </a>
                </span>
            </div>
        </footer>
    )
}
export default footer
