import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    Button,
    FileInput,
    Label,
    Select,
    Textarea,
    TextInput,
} from 'flowbite-react'
import GenreGrid, { Genre } from '@/components/Genre/GenreGrid'
import { API_URL } from '@/util/envExport'
import { toast } from 'react-toastify'

import NoResults from '../components/Other/Exceptions/NoResults'
import Unauthorized from '@/components/Other/Exceptions/Unauthorized'

// const genres = [{id: 1, name: 'Fiction'},
//                 {id: 2, name: 'Non-Fiction'},
//                 {id: 3, name: 'Science Fiction'},
//                 {id: 4, name: 'Biography'},
//                 {id: 5, name:'Fantasy'}];

interface Publisher {
    id: number
    name: string
}
interface CreateBookFormProps {
    hasPermission: boolean
    title: string
    price: number | null
    description: string
    cover: File | null
    pdf?: File | null
    genres: { [key: string]: Genre }
    publisher: number | null
}

type PageStatus = 'loading' | 'not found' | 'network error' | 'success' | 'unauthorized'

export default function EditBook() {
    const { id } = useParams<{id: string}>()
    const [genres, setGenres] = useState<Genre[]>([])
    const [publishers, setPublishers] = useState<Publisher[]>([])
    const [form, setForm] = useState<CreateBookFormProps | null>(null)
    const [status, setStatus] = useState<PageStatus>('loading')


    const setGenres_ = (genres: { [key: string]: Genre }) => {
        if(form)
        setForm({ ...form, genres })
    }

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target

        if (e.target instanceof HTMLInputElement && e.target.files && form) {
            setForm({
                ...form,
                [name]: e.target.files[0],
            })
        } else if(form){
            setForm({
                ...form,
                [name]: value,
            })
        }
    }

    const handlePublisherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const publisher = e.target.value
        const publisherId = Number.parseInt(publisher)
        if(form)
        setForm(({ ...form, publisher: publisherId }))
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const price = e.target.value
        const priceNumber = Number(price)
        if(form)
        setForm({ ...form, price: priceNumber })
    }
    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(!form) return
        const selected = e.target.value
        const currentSet = form.genres
        const id = Number.parseInt(selected)

        if (!(selected in currentSet))
            currentSet[selected] = genres.filter((g) => g.id == id)[0]
        setForm(({ ...form, genres: currentSet }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        if(!form) return;
        e.preventDefault()
        const body = new FormData()
        if (form.cover) body.append('cover', form.cover)
        if (form.pdf) body.append('pdf', form.pdf)

        if (!form.price) return
        const rest = {
            title: form.title,
            description: form.description,
            price: form.price,
            genres: form.genres,
            publisher: form.publisher,
        }
        body.append('other', JSON.stringify(rest))

        const response = await fetch(`${API_URL}/api/books/${id}`, {
            method: 'PUT',
            headers: {
                session: localStorage.getItem('sessionToken') as string,
            },
            body: body,
        })
        if (response.ok) toast.success('Book updated successfully')
        else toast.error('Failed to update book')
    }
    useEffect(() => {
        async function fetchAll(){
          await Promise.all([fetch(`${API_URL}/api/publishers`, {
            headers: {
                session: localStorage.getItem('sessionToken') as string,
            },
          })
            .then((res) => res.json())
            .then((data) => setPublishers(data.data)),

          fetch(`${API_URL}/api/genres`, {
            headers: {
                session: localStorage.getItem('sessionToken') as string,
            },
          })
            .then((res) => res.json())
            .then((data) => setGenres(data.data))])
          fetch(`${API_URL}/api/books/${id}`, {
            headers:{
                session: localStorage.getItem('sessionToken') as string
            }
          }).then(res => {
            if(!res.ok) {
                setStatus('network error');
                return null;
            }
            return res.json()
          }).then(data => {
            if(!data) return;
            const book = data.book;
            if(!book) return setStatus('not found');
            if(!book.hasPermission) return setStatus('unauthorized');
            setStatus('success');
             
            const bookState: CreateBookFormProps = {
                hasPermission: book.hasPermission,
                title: book.title,
                price: book.price,
                description: book.description,
                cover: null,
                publisher: book.publisherId,
                genres: {}
            }
            const genres = book.BookGenre.reduce((acc: {[key: string]: Genre}, curr: {Genre: {id: number, name: string}}) => {
                acc[curr.Genre.id] = curr.Genre;
                return acc;
            }, {})
            bookState.genres = genres;
            setForm(bookState);
        }).catch(err => console.error(err))
        }
        fetchAll();
    }, [])
    return (
        <>
        {status === 'loading' && <div>Loading...</div>}
        {status === 'not found' && <NoResults style={{marginTop:"400px", marginBottom: "200px"}}/>}
        {status === 'network error' && <div>Network Error</div>}
        {status === 'unauthorized' && <Unauthorized style={{marginTop: "400px", marginBottom: "200px"}}/>}

        {status === 'success' && 
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6 mt-20">Edit Book</h1>
            <form onSubmit={handleSubmit} className="space-y-6 p-11">
                <div className="flex justify-between">
                    <div style={{ width: '40%' }}>
                        <div>
                            <Label htmlFor="title" value="Title" />
                            <TextInput
                                id="title"
                                name="title"
                                type="text"
                                placeholder="Enter book title"
                                value={form?.title ?? 'Loading...'}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="price" value="Price" />
                            <TextInput
                                id="price"
                                name="price"
                                type="number"
                                placeholder="Enter book price"
                                value={form?.price ?? 'Loading...'}
                                onChange={handlePriceChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="description" value="Description" />
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Enter book description"
                                value={form?.description ?? 'Loading...'}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="cover" value="Cover Image" />
                            <FileInput
                                id="cover"
                                name="cover"
                                accept="image/*"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div style={{ width: '40%' }}>
                        <GenreGrid
                            setGenres={setGenres_}
                            genres={form?.genres ?? {}}
                        />
                        <div>
                            <Label htmlFor="genres" value="Genres" />
                            <Select
                                id="genres"
                                name="genres"
                                onChange={handleGenreChange}
                                required
                            >
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="publisher" value="Publisher" />
                            <Select
                                id="publisher"
                                name="publisher"
                                value={form?.publisher ?? -1}
                                onChange={handlePublisherChange}
                                required
                            >
                                <option value="" disabled>
                                    Select a publisher
                                </option>
                                {publishers.map((publisher) => (
                                    <option
                                        key={publisher.id}
                                        value={publisher.id}
                                    >
                                        {publisher.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="pdf" value="PDF of the Book" />
                            <FileInput
                                id="pdf"
                                name="pdf"
                                accept="application/pdf"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <Button type="submit">Confirm</Button>
            </form>
        </div>}
        </>
    )
}
