import { API_URL } from '@/util/envExport'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { LuFiles } from 'react-icons/lu'

interface AuthorApplicationProps {
    name: string
    surname: string
    email: string
    phone: string
    currentCompany: string
    genre: string
    previousPublications: string
    pfp: File | null
    identification: File | null
    writingSample: File | null
}

const ApplicationForm = () => {
    const [form, setForm] = useState<AuthorApplicationProps>({
        name: '',
        surname: '',
        email: '',
        phone: '',
        currentCompany: '',
        genre: '',
        previousPublications: '',
        pfp: null,
        identification: null,
        writingSample: null,
    })

    const handleTextChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target
        if (files && files.length > 0) {
            setForm({ ...form, [name]: files[0] })
        }
    }

    const submit = async () => {
        try {
            const body = new FormData()
            if (form.pfp) body.append('pfp', form.pfp)
            if (form.identification)
                body.append('identification', form.identification)
            if (form.writingSample)
                body.append('writingSample', form.writingSample)
            body.append('name', form.name)
            body.append('surname', form.surname)
            body.append('email', form.email)
            body.append('phone', form.phone)
            body.append('currentCompany', form.currentCompany)
            body.append('genre', form.genre)
            body.append('previousPublications', form.previousPublications)

            const response = await fetch(`${API_URL}/api/author/apply`, {
                method: 'POST',
                body: body,
                headers: {
                    session: localStorage.getItem('sessionToken') as string,
                },
            })
            if (response.ok) toast.success('Application submitted successfully')
            else toast.error('An error occurred')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-gray-100">
                        Apply to become an Author
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base dark:text-gray-400">
                        By applying to become an author you are able to publish
                        your own books. Fill out the form below to submit your
                        application.
                    </p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <form className="flex flex-wrap -m-2">
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
                                    value={form.name}
                                    onChange={handleTextChange}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:bg-white focus:ring-2  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-800  dark:border-none dark:  dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-2  dark:bg-opacity-50 dark:focus:bg-slate-900 dark:transition-colors dark:duration-200 dark:ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label
                                    htmlFor="surname"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Surname
                                </label>
                                <input
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    value={form.surname}
                                    onChange={handleTextChange}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:bg-white focus:ring-2  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-800  dark:border-none dark:   dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-2  dark:bg-opacity-50 dark:focus:bg-slate-900 dark:transition-colors dark:duration-200 dark:ease-in-out"
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
                                    value={form.email}
                                    onChange={handleTextChange}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:bg-white focus:ring-2  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-800  dark:border-none dark:  dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-2  dark:bg-opacity-50 dark:focus:bg-slate-900 dark:transition-colors dark:duration-200 dark:ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label
                                    htmlFor="phone"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleTextChange}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:bg-white focus:ring-2  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-800  dark:border-none dark:  dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-2  dark:bg-opacity-50 dark:focus:bg-slate-900 dark:transition-colors dark:duration-200 dark:ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label
                                    htmlFor="currentCompany"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Current Company
                                </label>
                                <input
                                    type="text"
                                    id="currentCompany"
                                    name="currentCompany"
                                    value={form.currentCompany}
                                    onChange={handleTextChange}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:bg-white focus:ring-2  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-800  dark:border-none dark:   dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-2  dark:bg-opacity-50 dark:focus:bg-slate-900 dark:transition-colors dark:duration-200 dark:ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label
                                    htmlFor="genre"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Genre
                                </label>
                                <input
                                    type="text"
                                    id="genre"
                                    name="genre"
                                    value={form.genre}
                                    onChange={handleTextChange}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:bg-white focus:ring-2  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-slate-800  dark:border-none dark:   dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-2  dark:bg-opacity-50 dark:focus:bg-slate-900 dark:transition-colors dark:duration-200 dark:ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label
                                    htmlFor="previousPublications"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Previous Publications
                                </label>
                                <textarea
                                    id="previousPublications"
                                    name="previousPublications"
                                    value={form.previousPublications}
                                    onChange={handleTextChange}
                                    placeholder="List your previous works with titles, publication dates, and publishers."
                                    className="w-full placeholder-gray-400 bg-gray-100 bg-opacity-50 rounded border border-gray-300  focus:bg-white focus:ring-2  h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out dark:bg-slate-800  dark:border-none dark:  dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-2  dark:bg-opacity-50 dark:focus:bg-slate-900 dark:transition-colors dark:duration-200 dark:ease-in-out"
                                ></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-full flex">
                            <div className="relative flex-1 mr-2">
                                <label
                                    htmlFor="writingSample"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Writing Sample
                                </label>
                                <input
                                    type="file"
                                    id="writingSample"
                                    name="writingSample"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="identification"
                                    className="flex items-center w-full border-[1px] border-gray-300 text-gray-600 py-2 px-3 rounded cursor-pointer hover:bg-gray-100 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-100 dark:hover:border-gray-400 dark:hover:text-gray-900  dark:hover:transition-colors dark:hover:duration-200 dark:hover:ease-in-out"
                                >
                                    <LuFiles className="text-2xl mr-2" />
                                    Choose file
                                </label>
                            </div>
                            <div className="relative flex-1 mr-2">
                                <label
                                    htmlFor="pfp"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    id="pfp"
                                    name="pfp"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="identification"
                                    className="flex items-center w-full border-[1px] border-gray-300 text-gray-600 py-2 px-3 rounded cursor-pointer hover:bg-gray-100 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-100 dark:hover:border-gray-400 dark:hover:text-gray-900  dark:hover:transition-colors dark:hover:duration-200 dark:hover:ease-in-out"
                                >
                                    <LuFiles className="text-2xl mr-2" />
                                    Choose file
                                </label>
                            </div>
                            <div className="relative flex-1">
                                <label
                                    htmlFor="identification"
                                    className="leading-7 text-sm text-gray-600 dark:text-gray-100"
                                >
                                    Identification
                                </label>
                                <input
                                    type="file"
                                    id="identification"
                                    name="identification"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                <label
                                    htmlFor="identification"
                                    className="flex items-center w-full border-[1px]  border-gray-300 text-gray-600 py-2 px-3 rounded cursor-pointer hover:bg-gray-100 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-100 dark:hover:border-gray-400 dark:hover:text-gray-900  dark:hover:transition-colors dark:hover:duration-200 dark:hover:ease-in-out"
                                >
                                    <LuFiles className="text-2xl mr-2" />
                                    Choose file
                                </label>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button
                                type="button"
                                onClick={submit}
                                className="flex mx-auto text-white bg-amber-600 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded text-lg"
                            >
                                Apply
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ApplicationForm
