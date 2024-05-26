import React, { useEffect, useState } from 'react';
import {
  Button,
  FileInput,
  Label,
  Select,
  Textarea,
  TextInput
} from 'flowbite-react';
import GenreGrid, { Genre } from '@/components/Genre/GenreGrid';
import { API_URL } from '@/util/envExport';
import { toast } from 'react-toastify';

const genres = [{id: 1, name: 'Fiction'}, 
                {id: 2, name: 'Non-Fiction'},
                {id: 3, name: 'Science Fiction'}, 
                {id: 4, name: 'Biography'}, 
                {id: 5, name:'Fantasy'}];

interface Publisher {
  id: number;
  name: string;
}
interface CreateBookFormProps {
    title: string;
    price: number | null;
    description: string;
    cover: File | null;
    pdf: File | null;
    genres: {[key: string]: Genre};
    publisher: number | null;
}

export default function CreateBook() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [form, setForm] = useState<CreateBookFormProps>({
    title: '',
    price: null,
    description: '',
    cover: null as File | null,
    pdf: null as File | null,
    genres: {},
    publisher: null
  });

  const setGenres_ = (genres: {[key: string]: Genre})=>{
     setForm(prev=>({...prev, genres}));
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.files) {
      setForm({
        ...form,
        [name]: e.target.files[0]
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };
  
  const handlePublisherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const publisher = e.target.value;
    const publisherId = Number.parseInt(publisher);
    setForm(prev=>({...prev, publisher: publisherId}));
  }
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = e.target.value;
    const priceNumber = Number.parseInt(price);
    setForm(prev=>({...prev, price: priceNumber}));
  }
  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const currentSet = form.genres;
    const id = Number.parseInt(selected);

    if(!(selected in currentSet))
     currentSet[selected] = genres.filter(g=>g.id == id)[0]
    setForm(prev=>({...prev, genres: currentSet}))
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const body = new FormData();
    if(form.cover)
      body.append('cover', form.cover);
    if(form.pdf)
      body.append('pdf', form.pdf);

    if(!form.price) return;
    const rest = {
        title: form.title,
        description: form.description,
        price: form.price,
        genres: form.genres,
        publisher: form.publisher
    }
    body.append('other', JSON.stringify(rest));
    
    const response = await fetch(`${API_URL}/api/books`, {
        method:"POST",
        headers: {
            'session': localStorage.getItem('sessionToken') as string
        },
        body: body
    })
    if(response.ok) toast.success('Book created successfully');
    else toast.error('Failed to create book');
  };
  useEffect(()=>{
    fetch(`${API_URL}/api/publishers`, {
        headers: {
            'session': localStorage.getItem('sessionToken') as string
        }
    }).then(res=>res.json()).then(data=>setPublishers(data.data));

    fetch(`${API_URL}/api/genres`, {
      headers: {
          'session': localStorage.getItem('sessionToken') as string
      }
     }).then(res=>res.json()).then(data=>setGenres(data.data));
  }, [])
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 mt-20">Create Book</h1>
      <form onSubmit={handleSubmit} className="space-y-6 p-11">
        <div className='flex justify-between'>
        <div style={{width: "40%"}}>
        <div>
          <Label htmlFor="title" value="Title" />
          <TextInput
            id="title"
            name="title"
            type="text"
            placeholder="Enter book title"
            value={form.title}
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
            value={form.price ?? ""}
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
            value={form.description}
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
            required
          />
        </div>

        </div>
        <div style={{width: "40%"}}>
        <GenreGrid setGenres={setGenres_} genres={form.genres} />
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
            value={form.publisher ?? -1}
            onChange={handlePublisherChange}
            required
          >
            <option value="" disabled>Select a publisher</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
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
            required
          />
        </div>
        </div>
        </div>
        <Button type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
