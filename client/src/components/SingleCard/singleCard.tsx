import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '@/util/envExport';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

import BookCard from '@/components/Book/BookCard';

import { HiStar, HiOutlineStar, HiOutlineShoppingCart } from 'react-icons/hi';
import { toast } from 'react-toastify';
import CreateReview from '../Admin/Reviews/CreateReview';

const SingleCard = () => {
    const { id } = useParams<{ id: string }>();
    // const [books, setBooks] = useState<BookCardProps[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [reviews, setReviews] = useState<{ id: number, comment: string, rating: number, user: {name: string} }[]>([]);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    const [book, setBook] = useState({
        id: 0,
        title: '',
        cover: '',
        rating: 0,
        author: '',
        description: '',
        price: 0,
        ratingCount: 0,
        genre: '',
        authorId: 0,
        pages: 0,
        hasPermission: false,
    });

    useEffect(() => {
        const fetchBookCover = async (bookId: number) => {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/books/${bookId}`);
            if (!response.ok) {
                toast.error('Failed to fetch book');
                return;
            }
            const bookData = await response.json();
            setBook(bookData.book);
            setLoading(false);
        };

        fetch(`${API_URL}/api/reviews-user/${id}`, {
            headers: {
                session: localStorage.getItem('sessionToken') as string,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setReviews(data.data);
            });

        fetchBookCover(Number(id));
    }, [id]);

    const bookCover = `${API_URL}/files/${book.cover}`;

    const nextReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevReview = () => {
        setCurrentReviewIndex((prevIndex) =>
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-10 py-32 mx-auto">
                <div className="lg:w-3/4 mx-auto flex flex-wrap">
                    <img
                        src={bookCover}
                        alt="Book cover"
                        className="w-1/3 object-cover object-center rounded"
                    />
                    <div className="lg:w-2/3 w-full lg:pl-20 lg:py-10 mt-10 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            {book.author ? book.author : loading ? 'Loading...' : 'None'}
                        </h2>
                        <h1 className="text-gray-900 text-4xl title-font font-medium mb-1 dark:text-gray-100">
                            {book.title ? book.title : 'Loading...'}
                        </h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {renderStars(book.rating ? book.rating : 0)}
                                <span className="text-gray-600 ml-3 dark:text-gray-100">
                                    {book.rating ? book.rating : 'Loading...'} (
                                    {book.ratingCount
                                        ? book.ratingCount
                                        : loading ? 'Loading...' : ''}{' '}
                                    reviews)
                                </span>
                            </span>
                        </div>
                        <p className="leading-relaxed dark:text-gray-100">
                            {book.description ? book.description : 'Loading...'}
                        </p>
                        <div className="flex mt-10 items-center pb-8 border-b-2 border-gray-100 mb-10"></div>
                        <div className="flex">
                            <span className="title-font font-medium text-3xl text-gray-900 dark:text-gray-100">
                                € {book.price ? book.price : 'Loading...'}
                            </span>
                            <button className="flex ml-auto text-white bg-yellow-500 border-0 py-3 px-8 focus:outline-none hover:bg-yellow-600 rounded">
                                Add To Cart
                            </button>
                            <button className="rounded-full w-12 h-12 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                <HiOutlineShoppingCart className="w-8 h-8" />
                            </button>
                        </div>
                        <CreateReview bookId={Number.parseInt(String(id))} />
                    </div>
                </div>
            </div>
            <div className="border-b-2 border-gray-100 mb-10 w-full max-w-[65rem]" />
            {reviews && reviews.length > 0 && (
                <div className="flex justify-center mt-4 pb-6">
                    <Carousel className="w-1/2">
                        <CarouselContent>
                            <CarouselItem style={{width: "100%"}}>
                                <div style={{width: "100%"}}>
                                    <div className="bg-zinc-100 p-6 rounded-lg shadow-md">
                                        <h3 className="text-lg font-semibold mb-2">
                                            Review by @{reviews[currentReviewIndex].user.name}
                                        </h3>
                                        <p className="text-gray-600 mb-2">
                                            {reviews[currentReviewIndex].comment}
                                        </p>
                                        <div className="flex items-center">
                                            {renderStars(reviews[currentReviewIndex].rating)}
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        </CarouselContent>
                        <>
                            <CarouselPrevious onClick={prevReview} />
                            <CarouselNext onClick={nextReview} />
                        </>
                    </Carousel>
                </div>
            )}
            <div className="flex justify-center mt-4 pb-6">
                <Carousel className="w-1/2">
                    <CarouselContent className="mr-2">
                        <BookCard {...book} hasPermission={false} />
                        <CarouselItem className="basis-1/4">
                            <div className="p-1">
                                <BookCard {...book} hasPermission={false} />
                            </div>
                        </CarouselItem>
                        <BookCard {...book} hasPermission={false} />
                        <CarouselItem className="basis-1/4">
                            <div className="p-1">
                                <BookCard {...book} hasPermission={false} />
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <>
                        <CarouselPrevious />
                        <CarouselNext />
                    </>
                </Carousel>
            </div>
        </section>
    );
};

const renderStars = (ratingCount: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < ratingCount) {
            stars.push(<HiStar key={i} className="w-7 h-7 text-yellow-500" />);
        } else {
            stars.push(<HiOutlineStar key={i} className="w-6 h-6 text-yellow-500" />);
        }
    }
    return stars;
};

export default SingleCard;
