const ApplicationForm = () => {
    return (
        <section>
            <div className="pt-20 text-3xl bold font-semibold  flex justify-center">
                Apply to become an Author?
            </div>
            <div className="flex pt-2 justify-center text-gray-400">
                <h3>
                    By applying to become an author you are able to publish your
                    own books.
                </h3>
            </div>
            <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-7 dark:bg-neutral-900">
                    <form>
                        <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                            <div className="sm:col-span-12">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                    Submit your application
                                </h2>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-full-name"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Full name
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <div className="sm:flex">
                                    <input
                                        id="af-submit-application-full-name"
                                        type="text"
                                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    />
                                    <input
                                        type="text"
                                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-email"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Email
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-email"
                                    type="email"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <div className="inline-block">
                                    <label
                                        htmlFor="af-submit-application-phone"
                                        className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                    >
                                        Phone
                                    </label>
                                </div>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-phone"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />

                                <p className="mt-3">
                                    <a
                                        className="inline-flex items-center gap-x-1 text-sm text-amber-500 decoration-2 hover:underline font-medium dark:text-amber-500"
                                        href="../docs/index.html"
                                    >
                                        <svg
                                            className="flex-shrink-0 size-4 text-amber-500" // Added text-amber-500
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M8 12h8" />
                                            <path d="M12 8v8" />
                                        </svg>
                                        Add phone
                                    </a>
                                </p>
                            </div>

                            <div className="sm:col-span-3">
                                <div className="inline-block">
                                    <label
                                        htmlFor="af-submit-application-current-company"
                                        className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                    >
                                        Current Company
                                    </label>
                                </div>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-current-company"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                            <div className="sm:col-span-12">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                    Profile
                                </h2>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-resume-cv"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Resume/CV
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <label
                                    htmlFor="af-submit-application-resume-cv"
                                    className="sr-only"
                                >
                                    Choose file
                                </label>
                                <input
                                    type="file"
                                    name="af-submit-application-resume-cv"
                                    id="af-submit-application-resume-cv"
                                    className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
            file:bg--50 file:border-0
            file:bg-gray-100 file:me-4
            file:py-2 file:px-4
            dark:file:bg-neutral-700 dark:file:text-neutral-400"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <div className="inline-block">
                                    <label
                                        htmlFor="af-submit-application-bio"
                                        className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                    >
                                        Personal summary
                                    </label>
                                </div>
                            </div>

                            <div className="sm:col-span-9">
                                <textarea
                                    id="af-submit-application-bio"
                                    className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    rows={6}
                                    placeholder="Add a cover letter or anything else you want to share."
                                ></textarea>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                            <div className="sm:col-span-12">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                    Links
                                </h2>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-linkedin-url"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    LinkedIn URL
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-linkedin-url"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-twitter-url"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Twitter URL
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-twitter-url"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-github-url"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Github URL
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-github-url"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-portfolio-url"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Portfolio URL
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-portfolio-url"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-other-website"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Other website
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-other-website"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />
                            </div>

                            <div className="sm:col-start-4 sm:col-span-8 ">
                                <a
                                    className="inline-flex items-center gap-x-1 text-sm text-amber-500 decoration-2 hover:underline font-medium dark:text-blue-500 "
                                    href="../docs/index.html"
                                >
                                    <svg
                                        className="flex-shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M8 12h8" />
                                        <path d="M12 8v8" />
                                    </svg>
                                    Add URL
                                </a>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                            <div className="sm:col-span-12">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                    BehtmlFore sending your application, please
                                    let us know...
                                </h2>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-desired-salary"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Desired salary
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-desired-salary"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-available-start-date"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Available start date
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-available-start-date"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />
                            </div>
                        </div>

                        <div className="py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                Submit application
                            </h2>
                            <p className="mt-3 text-sm text-gray-600 dark:text-neutral-400">
                                In order to contact you with future jobs that
                                you may be interested in, we need to store your
                                personal data.
                            </p>
                            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                                If you are happy htmlFor us to do so please
                                click the checkbox below.
                            </p>

                            <div className="mt-5 flex">
                                <input
                                    type="checkbox"
                                    className="shrink-0 mt-0.5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                    id="af-submit-application-privacy-check"
                                />
                                <label
                                    htmlFor="af-submit-application-privacy-check"
                                    className="text-sm text-gray-500 ms-2 dark:text-neutral-400"
                                >
                                    Allow us to process your personal
                                    information.
                                </label>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-amber-600 text-white hover:bg-amber-500 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            Submit application
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ApplicationForm
