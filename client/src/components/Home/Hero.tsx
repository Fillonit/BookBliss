import { HomeBooks } from './HomeBooks'

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-amber-800/20 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40 dark:from-amber-800 dark:via-transparent dark:to-transparent">
            <div className="relative z-10">
                <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden">
                    <svg
                        className="h-[60rem] w-[100rem] flex-none stroke-amber-800 opacity-20 dark:stroke-amber-400 dark:opacity-30"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                                width="200"
                                height="200"
                                x="50%"
                                y="50%"
                                patternUnits="userSpaceOnUse"
                                patternTransform="translate(-100 0)"
                            >
                                <path d="M.5 200V.5H200" fill="none"></path>
                            </pattern>
                        </defs>
                        <svg
                            x="50%"
                            y="50%"
                            className="overflow-visible fill-blue-50 dark:fill-blue-900"
                        >
                            <path
                                d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                                strokeWidth="0"
                            ></path>
                        </svg>
                        <rect
                            width="100%"
                            height="100%"
                            strokeWidth="0"
                            fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
                        ></rect>
                    </svg>
                </div>
            </div>
            <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
                        Dive into the World of Books:
                        <span className="text-amber-800 dark:text-amber-500">
                            Book Bliss
                        </span>
                    </h1>
                    <h2 className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                        Discover, explore and lose yourself in our vast
                        collection of books across multiple genres.
                    </h2>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            className="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl bg-amber-800 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 dark:bg-amber-700 dark:text-white dark:hover:bg-amber-600 dark:focus:ring-amber-500"
                            href="/login"
                        >
                            Shop Now
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-11">
                    <HomeBooks />
                </div>
                {/* <div className="flex justify-center">
                    <div className="mx-4 mt-10 max-w-xs">
                        <img
                            className="w-full rounded-2xl border border-gray-100 shadow dark:border-gray-800 hover:scale-105 transition-transform delay-100"
                            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQPKlQbYym2c7Ja59ztwDCkV7wGBOeNi-71zGf-IK-4lWv205wB"
                            alt=""
                        />
                    </div>
                    <div className="mx-4 mt-10 max-w-xs">
                        <img
                            className="w-full rounded-2xl border border-gray-100 shadow dark:border-gray-800 hover:scale-105 transition-transform delay-100"
                            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQPKlQbYym2c7Ja59ztwDCkV7wGBOeNi-71zGf-IK-4lWv205wB"
                            alt=""
                        />
                    </div>
                    <div className="mx-4 mt-10 max-w-xs">
                        <img
                            className="w-full rounded-2xl border border-gray-100 shadow dark:border-gray-800 hover:scale-105 transition-transform delay-100"
                            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQPKlQbYym2c7Ja59ztwDCkV7wGBOeNi-71zGf-IK-4lWv205wB"
                            alt=""
                        />
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default Hero
