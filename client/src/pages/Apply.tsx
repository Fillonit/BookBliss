const ApplicationForm = () => {
    return (
        <section>
            <div className="pt-20 text-3xl bold font-semibold flex justify-center">
                Apply to become an Author?
            </div>
            <div className="flex pt-2 justify-center text-gray-400">
                <h3>
                    By applying to become an author you are able to publish your
                    own books.
                </h3>
            </div>
            <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-7 dark:bg-background">
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
                                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-600 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-slate-800 dark:focus:ring-neutral-600"
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
                                <label
                                    htmlFor="af-submit-application-phone"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Phone
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-phone"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-current-company"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Current Company
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-current-company"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-genre"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Genre/Specialization
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    id="af-submit-application-genre"
                                    type="text"
                                    className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    placeholder="e.g., Fiction, Non-fiction, Romance"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-previous-publications"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Previous Publications
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <textarea
                                    id="af-submit-application-previous-publications"
                                    className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    rows={4}
                                    placeholder="List your previous works with titles, publication dates, and publishers."
                                ></textarea>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-writing-sample"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Writing Sample
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <input
                                    type="file"
                                    name="af-submit-application-writing-sample"
                                    id="af-submit-application-writing-sample"
                                    className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                        file:bg--50 file:border-0
                                        file:bg-gray-100 file:me-4
                                        file:py-2 file:px-4
                                        dark:file:bg-neutral-700 dark:file:text-neutral-400"
                                />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-12 gap-2 sm:gap-4 py-8 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                            <div className="sm:col-span-12">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                    Identification
                                </h2>
                            </div>

                            <div className="sm:col-span-3">
                                <label
                                    htmlFor="af-submit-application-resume-cv"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Passport or ID
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
                                <label
                                    htmlFor="af-submit-application-profile-picture"
                                    className="inline-block text-sm font-medium text-gray-500 mt-2.5 dark:text-neutral-500"
                                >
                                    Profile Picture
                                </label>
                            </div>

                            <div className="sm:col-span-9">
                                <label
                                    htmlFor="af-submit-application-profile-picture"
                                    className="sr-only"
                                >
                                    Choose file
                                </label>
                                <input
                                    type="file"
                                    name="af-submit-application-profile-picture"
                                    id="af-submit-application-profile-picture"
                                    className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                        file:bg--50 file:border-0
                                        file:bg-gray-100 file:me-4
                                        file:py-2 file:px-4
                                        dark:file:bg-neutral-700 dark:file:text-neutral-400"
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-x-2">
                            <input
                                type="checkbox"
                                id="terms-and-conditions"
                                name="terms-and-conditions"
                                className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700"
                                required
                            />
                            <label
                                htmlFor="terms-and-conditions"
                                className="text-sm font-medium text-gray-500 dark:text-neutral-400"
                            >
                                I agree to the
                                <a
                                    href="/terms-and-conditions"
                                    className="text-amber-600 hover:underline dark:text-slate-700"
                                >
                                    {' '}
                                    terms and conditions
                                </a>
                                .
                            </label>
                        </div>

                        <div className="flex justify-end gap-x-2 mt-4">
                            <button
                                type="submit"
                                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-semibold bg-amber-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-neutral-900"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-semibold bg-white text-gray-900 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all text-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:focus:ring-offset-neutral-900"
                            >
                                Cancel
                            </button>
                        </div>

                        <div className="mt-4 text-sm text-gray-500 dark:text-neutral-400">
                            <a
                                href="/privacy-policy"
                                className="text-amber-600 hover:underline dark:text-slate-700"
                            >
                                Privacy Policy
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default ApplicationForm
