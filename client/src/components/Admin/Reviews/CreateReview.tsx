import { API_URL } from '../../../util/envExport';
import React, { useEffect, useState } from 'react';
import { HiStar } from 'react-icons/hi';
import { toast } from 'react-toastify';

const CreateReview: React.FC<{ bookId: number }> = ({ bookId }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState<number | null>(null);
    const [exists, setExists] = useState<boolean | null>(null);

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch(`${API_URL}/api/review-user/${bookId}`, {
                headers: {
                    session: localStorage.getItem('sessionToken') as string,
                },
            });
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    setExists(false);
                    return;
                }
                setExists(true);
                setRating(data.data.rating);
                setComment(data.data.comment);
            }
        }
        fetchData();
    })

    // Handler for submitting the review
    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        
        console.log('Submitted Review:', { bookId, comment, rating });
        const url = exists ? `${API_URL}/api/review/${bookId}` : `${API_URL}/api/review`;
        const method = exists ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                session: localStorage.getItem('sessionToken') as string,
            },
            body: JSON.stringify({ bookId, comment, rating }),
        });
        if(response.ok){
            toast.success('Review submitted successfully');
        }
        else{
            toast.error('Failed to submit review');
        }
    };

    // Handler for rating selection
    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            {/* Comment input */}
            <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                    Comment
                </label>
                <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Leave your comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </div>

            {/* Rating input */}
            <div className="flex items-center">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mr-2">
                    Rating
                </label>
                {/* Star icons for rating */}
                <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <HiStar
                            key={star}
                            className={`h-6 w-6 cursor-pointer ${rating && rating >= star ? 'text-yellow-500' : 'text-yellow-200'}`}
                            onClick={() => handleRatingChange(star)}
                        />
                    ))}
                </div>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Submit Review
            </button>
        </form>
    );
};

export default CreateReview;
