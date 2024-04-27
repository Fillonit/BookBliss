import {
    CardHeader,
    CardTitle,
    CardContent,
    // CardDescription,
    Card,
} from '@/components/ui/card'

import {
    HiOutlineUserGroup,
    HiOutlinePencilAlt,
    HiOutlineCursorClick,
    HiOutlineShieldCheck,
} from 'react-icons/hi'

import { API_URL } from '@/util/envExport'
import { useEffect, useState } from 'react'
import { Review } from '@/types/ReviewType'
import { User } from '@/types/UserType'
export default function ReviewsStats() {
    const [userCount, setUserCount] = useState(0)
    const [users, setUsers] = useState<Review[]>([])
    const [reviews, setReviews] = useState<Review[]>([])
    const [books, setBooks] = useState<Review[]>([])
    const [avgRating, setAvgRating] = useState(5.7)

    useEffect(() => {
        fetch(`${API_URL}/api/reviews`)
            .then((response) => response.json())
            .then((data) => setReviews(data))
    }, [])

    useEffect(() => {
        if (reviews.length > 0) {
            const books = reviews.filter((review) => review.book !== null)
            setBooks(books)
            
            const users = reviews.filter((review) => review.user !== null)
            setUsers(users)
            setUserCount(users.length)

            const totalAvgRating = reviews.reduce((acc, review) => acc + review.rating, 0)
            setAvgRating(totalAvgRating / reviews.length)
        }
    }, [reviews])

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Users</CardTitle>
                    <HiOutlineUserGroup className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{userCount}</div>
                    <p className="text-xs text-muted-foreground">
                        {userCount} left reviews.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Reviews
                    </CardTitle>
                    <HiOutlinePencilAlt className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{reviews.length}</div>
                    <p className="text-xs text-muted-foreground">
                        {reviews.length} in total
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Books
                    </CardTitle>
                    <HiOutlineShieldCheck className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{books.length}</div>
                    <p className="text-xs text-muted-foreground">
                        {books.length} total books.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Avarage Ratings
                    </CardTitle>
                    <HiOutlineCursorClick className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{avgRating}</div>
                    <p className="text-xs text-muted-foreground">
                        Average ratings of reviews.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
