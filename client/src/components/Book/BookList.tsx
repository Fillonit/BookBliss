import React, { useState } from "react";
import book1Image from "../../assets/book1.jpg";
import book2Image from "../../assets/book2.jpg";
import filterLogo from "../../assets/filterLogo.png"; // Import the filter logo image

type FilterOption = "rating" | "popularity" | "price";

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    image: string;
    rating: number; // New property for rating
    popularity: number; // New property for popularity
    price: number; // New property for price
    genre: string; // New property for genre
}

const books: Book[] = [];

for (let i = 1; i <= 250; i++) {
    books.push({
        id: i,
        title: `Book ${i} Title`,
        author: "Author Name",
        description:
            "Description of the book goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod lorem non posuere commodo.",
        image: `${i % 2 === 0 ? book2Image : book1Image}`, // Use imported images
        rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
        popularity: Math.floor(Math.random() * 1000), // Random popularity value
        price: Math.floor(Math.random() * 100) + 1, // Random price between 1 and 100
        genre: i % 2 === 0 ? "Fantasy" : "Adventure", // Assigning genres alternatively
    });
}

const BookList: React.FC = () => {
    const [visibleBooks, setVisibleBooks] = useState(8); // Initially show 20 books
    const totalBooksToShow = 2 * 4; // 5 rows with 4 columns each
    const [filter, setFilter] = useState<FilterOption | null>(null);
    const [ascendingOrder, setAscendingOrder] = useState<boolean>(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false); // State for dropdown visibility
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null); // State for selected genre

    // Define filter options
    const genres: string[] = [
        "Action",
        "Animated",
        "Adventure",
        "Asian",
        "Biography",
        "Nordic",
        "Documentary",
        "Drama",
        "Erotic +18",
        "Family",
        "Fantasy",
        "Science Fiction",
    ]; // Translated genres

    // Function to filter books by genre
    const filterByGenre = (books: Book[]) => {
        if (!selectedGenre) return books;
        return books.filter((book) => book.genre === selectedGenre);
    };

    // Function to sort books based on the selected filter and order
    const sortBooks = (books: Book[]) => {
        if (!filter) return books;

        // Create a copy of the original array
        const sortedBooks = [...books];

        // Sort the array based on the selected filter
        sortedBooks.sort((a, b) => {
            const aValue = a[filter as keyof Book];
            const bValue = b[filter as keyof Book];

            if (typeof aValue === "number" && typeof bValue === "number") {
                // If the values are numbers, compare them directly
                return ascendingOrder ? aValue - bValue : bValue - aValue;
            } else if (
                typeof aValue === "string" &&
                typeof bValue === "string"
            ) {
                // If the values are strings, compare them alphabetically
                return ascendingOrder
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else {
                // If the values are of different types, consider them equal
                return 0;
            }
        });

        return sortedBooks;
    };

    // Function to apply filters and sorting to the list of books
    const applyFilters = (books: Book[]) => {
        let filteredBooks = books;

        // Apply genre filter
        filteredBooks = filterByGenre(filteredBooks);

        // Apply sorting
        filteredBooks = sortBooks(filteredBooks);

        return filteredBooks;
    };

    const handleShowMore = () => {
        setVisibleBooks((prevVisibleBooks) => prevVisibleBooks + 20); // Increase by 20 books
    };

    const handleFilterChange = (option: FilterOption) => {
        setFilter(option);
        setIsDropdownOpen(false); // Close dropdown after selecting an option
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
    };

    const handleSearchInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchQuery(event.target.value);
    };

    const handleGenreSelect = (genre: string) => {
        setSelectedGenre(genre === selectedGenre ? null : genre); // Toggle selected genre
    };

    return (
        <div className="flex flex-col pt-20 bg-gradient-to-r from-yellow-500 to-amber-900">
            <div className="flex justify-left mx-3 ">
                <div className="flex justify-between items-center ">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-12 border-1.5 border-amber-800 px-4 rounded bg-white text-amber-700 shadow-lg text-white placeholder-amber-800/90 font-bold outline-none focus:outline-none focus:border-none"
                        style={{ width: "380px" }}
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />

                    <div className="relative inline justify-self-end">
                        <button
                            className="text-amber-500 font-bold py-2 px-3 rounded inline-flex items-center"
                            onClick={toggleDropdown}
                        >
                            <img
                                src={filterLogo}
                                alt="Filter Logo"
                                className="h-11 w-auto"
                            />
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute bg-white border rounded shadow-lg mt-2 w-32 z-20 rounded-xl">
                                <li>
                                    <button
                                        className="block text-left px-4 py-2 text-sm hover:text-white text-black hover:bg-amber-900 w-full hover:rounded-t-xl"
                                        onClick={() =>
                                            handleFilterChange("rating")
                                        }
                                    >
                                        Rating
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block text-left px-4 py-2 text-sm hover:text-white text-black hover:bg-amber-900 w-full hover:rounded-none"
                                        onClick={() =>
                                            handleFilterChange("popularity")
                                        }
                                    >
                                        Popularity
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block text-left px-4 py-2 text-sm hover:text-white text-black hover:bg-amber-900 w-full hover:rounded-b-xl"
                                        onClick={() =>
                                            handleFilterChange("price")
                                        }
                                    >
                                        Price
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/5 p-3 ">

                    <div
                        className="bg-white border-amber-800/100 shadow-slate-700/60 p-4 rounded-md shadow-md border-none m-12"
                        style={{ marginTop: "80px" }}
                    >
                        <div className="flex flex-col">
                            {" "}
                            {/* Added flex-wrap for genre buttons */}
                            {genres.map((genre) => (
                                <button
                                    key={genre}
                                    className={`text-left text-amber-600 hover:bg-amber-900 hover:text-white rounded-t-lg rounded-br-lg text-lg font-bold pl-4 hover:border-l-4 hover:border-amber-700 hover:rounded-l-xl py-2 ${
                                        genre === selectedGenre
                                            ? "bg-blue-500 text-white"
                                            : ""
                                    }`}
                                    onClick={() => handleGenreSelect(genre)}
                                >
                                    {genre}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-4/5 p-5  rounded ">
                    <h1 className="text-5xl font-bold text-white text-center mb-6 ">
                        Book Listing
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {applyFilters(books)
                            .filter((book) =>
                                book.title
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                            ) // Filter books based on search query
                            .slice(0, visibleBooks)
                            .map((book) => (
                                <div
                                    key={book.id}
                                    className="relative rounded overflow-hidden shadow-lg"
                                >
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-100 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black bg-opacity-80 opacity-0 transition-opacity duration-300 hover:opacity-100">
                                        <h2 className="text-xl font-semibold mb-2">
                                            {book.title}
                                        </h2>
                                        <p className="text-white-600 mb-2">
                                            {book.author}
                                        </p>
                                        <p className="text-white-700">
                                            {book.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {visibleBooks < books.length && (   
                        <div className="flex justify-center my-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleShowMore}
                            >
                                Show More
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookList;
