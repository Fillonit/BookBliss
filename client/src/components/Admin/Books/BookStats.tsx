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

export default function BookStats() {
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [averagePrice, setAveragePrice] = useState<number>(0);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [averageTimeToRead, setAverageTimeToRead] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchData = async (url: string, key: string) =>{
        const response = await fetch(url, {
            headers: {
                session: localStorage.getItem('sessionToken') as string
            }
        });
        const data = await response.json();
        const value = data.data;
        return {key, value};
    }
    useEffect(() => {
        const urls: {key: string, url: string}[] = [
              {key: 'totalBooks', url: `${API_URL}/api/books/count`},
              {key: 'averagePrice', url: `${API_URL}/api/books/average-price`},
              {key: 'averageRating', url: `${API_URL}/api/books/average-rating`},
              {key: 'averageTimeToRead', url: `${API_URL}/api/books/average-time-to-read`}
        ];
        const initialize = async ()=>{
          const promises = await Promise.all(urls.map(({key, url}) => fetchData(url, key)));
          promises.forEach(({key, value}) => {
                switch(key){
                    case 'totalBooks':
                        setTotalBooks(value);
                        break;
                    case 'averagePrice':
                        setAveragePrice(value);
                        break;
                    case 'averageRating':
                        setAverageRating(value);
                        break;
                    case 'averageTimeToRead':
                        setAverageTimeToRead(value);
                        break;
                }
          });
          setIsLoading(false);
        }
        initialize();
    }, [])

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total books</CardTitle>
                    <HiOutlineUserGroup className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalBooks}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Average price
                    </CardTitle>
                    <HiOutlinePencilAlt className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{averagePrice}</div>

                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Average rating
                    </CardTitle>
                    <HiOutlineShieldCheck className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{averageRating}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Average time to read
                    </CardTitle>
                    <HiOutlineCursorClick className="h-6 w-6 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{averageTimeToRead}</div>
                </CardContent>
            </Card>
        </div>
    )
}
