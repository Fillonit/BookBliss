import { useEffect, useState } from 'react';
import { API_URL } from '@/util/envExport';
import { Range } from 'react-range';

import BookCard from '@/components/Book/BookCard';
import { BookCardProps } from '@/types/BookCardProps';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button, Label, Select } from 'flowbite-react';
import {
    HiOutlineCash,
    HiOutlineViewGrid,
    HiOutlineStar,
    HiOutlineCalendar,
} from 'react-icons/hi';
import GenreGrid from '@/components/Genre/GenreGrid';
import { Dropdown, DropdownProps } from '@/components/Other/Dropdown';

type Genre = {
    id: number;
    name: string;
    description?: string;
};

interface BookFilter {
    query: string;
    genres: { [key: string]: Genre };
    minPrice: number;
    maxPrice: number;
    sorting?: string;
}

const BooksPage = () => {
    const [books, setBooks] = useState<BookCardProps[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [currentFilters, setCurrentFilters] = useState<BookFilter>({
        query: '',
        genres: {},
        minPrice: 0,
        maxPrice: 1000, // Set an initial max value for the slider
    });

    const fetchGenres = async () => {
        try {
            const response = await fetch(`${API_URL}/api/genres`);
            if (response.ok) {
                const json: { message: string; data: Genre[] } = await response.json();
                setGenres(json.data);
            } else {
                console.error(
                    'Failed to fetch genres:',
                    response.status,
                    response.statusText
                );
            }
        } catch (e) {
            console.error('Error fetching genres:', e);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchBooks = async (filters: BookFilter) => {
        try {
            const response = await fetch(
                `${API_URL}/api/books?query=${filters.query}&genres=${Object.keys(
                    filters.genres
                ).join(',')}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&sorting=${filters.sorting}`
            );
            if (response.ok) {
                const json = await response.json();
                setBooks(json.data);
                return;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const searchBooks = () => {
        fetchBooks(currentFilters);
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        const currentSet = { ...currentFilters.genres };
        const id = Number.parseInt(selected);

        if (!(selected in currentSet)) {
            currentSet[selected] = genres.find((g) => g.id === id)!;
        }
        setCurrentFilters((prev) => ({ ...prev, genres: currentSet }));
    };

    const setGenres_ = (genres: { [key: string]: Genre }) => {
        setCurrentFilters((prev) => ({ ...prev, genres }));
    };

    const handlePriceChange = (values: number[]) => {
        setCurrentFilters((prev) => ({
            ...prev,
            minPrice: values[0],
            maxPrice: values[1],
        }));
    };
    
    const resetFilters = () => {
        setCurrentFilters({
            query: '',
            genres: {},
            minPrice: 0,
            maxPrice: 1000
        });
    }
    const setSorting = (value: string) => {
        setCurrentFilters((prev) => ({ ...prev, sorting: value }));
    }
    const sortingFilters: DropdownProps['dropdownOptions'] = [
        { label: 'Most recent', value: 'createdAt' },
        { label: 'Most popular', value: 'ratingCount' },
        { label: 'Highest rated', value: 'rating' },
    ]
    return (
        <section className="relative bg-cover bg-center bg-white dark:bg-gray-900 mt-12 min-h-screen flex">
            {/* Sidebar */}
            <div className="w-1/6 bg-gray-200 dark:bg-gray-800 p-5">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                    Filter
                </h2>
                <div>
                    <Label htmlFor="genres" value="Genres" />
                    <Select id="genres" name="genres" onChange={handleGenreChange} required>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <GenreGrid columns={2} style={{maxHeight: "80px", overflowY: "auto"}} genres={currentFilters.genres} setGenres={setGenres_} />
                <div className="mt-6">
                    <Label htmlFor="price-range" value="Price Range" />
                    <Range
                        step={1}
                        min={0}
                        max={1000}
                        values={[currentFilters.minPrice, currentFilters.maxPrice]}
                        onChange={handlePriceChange}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    marginTop: '20px',
                                    height: '6px',
                                    width: '100%',
                                    background: `linear-gradient(to right, #ccc ${100 * currentFilters.minPrice / 1000}%, green ${100 * currentFilters.minPrice / 1000}%, green ${100 * currentFilters.maxPrice / 1000}%, #ccc ${100 * currentFilters.maxPrice / 1000}%)`,
                                }}
                            >
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '18px',
                                    width: '18px',
                                    backgroundColor: '#FFF',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                                }}
                            />
                        )}
                    />
                    <div className="flex justify-between mt-2">
                        <span>${currentFilters.minPrice}</span>
                        <span>${currentFilters.maxPrice}</span>
                    </div>
                </div>
                <Dropdown
                style={{ marginTop: '1rem' }}
                dropdownOptions={sortingFilters}
                defaultValue="createdAt"
                buttonTitle={
                    sortingFilters.find((filter) => filter.value === currentFilters.sorting)
                        ?.label ?? 'None'
                }
                onChange={(value: string) => setSorting(value)}
            />
                <div className='flex mt-6 justify-between'>
                  <Button onClick={searchBooks}>Apply</Button>
                  <Button onClick={resetFilters}>Reset</Button>
                </div>
            </div>
            <div className="w-5/6 p-10 flex flex-col">
                <div className="mb-6 flex items-center">
                    <input
                        type="text"
                        value={currentFilters.query}
                        onChange={(e) => setCurrentFilters((prev) => ({ ...prev, query: e.target.value }))}
                        placeholder="Search for books..."
                        className="p-2 border border-gray-300 rounded mr-4 flex-grow"
                    />
                    <Button onClick={searchBooks}>Search</Button>
                </div>
                <div className="flex flex-wrap">
                    {books.map((book: BookCardProps) => (
                        <div key={book.id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                            <BookCard {...book} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BooksPage;
