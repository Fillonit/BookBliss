import * as React from 'react'
// import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Dropdown } from '../Other/Dropdown'
import { DropdownProps } from '../Other/Dropdown'
import { useEffect, useState } from 'react'
import BookCard from '../Book/BookCard'
import { BookCardProps } from '@/types/BookCardProps'
import SkeletonCardBook from '../Other/Loading'
import NoResults from '../Other/Exceptions/NoResults'
import { API_URL } from '@/util/envExport'

export function HomeBooks() {
    const [books, setBooks] = useState<BookCardProps[] | null>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedSorting, setSelectedSorting] = useState<string>('createdAt')

    const fetchBooks = async (sorting: string) => {
        try {
            const response = await fetch(
                `${API_URL}/api/books?limit=5&offset=0&sorting=${sorting}`
            )
            if (response.ok) {
                const json = await response.json()
                const data: BookCardProps[] = json.data
                setBooks(data)
                return
            }
            alert('Failed to fetch books')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            await Promise.all([fetchBooks(selectedSorting)])
            setLoading(false)
        }
        fetch()
    }, [selectedSorting])
    const filters: DropdownProps['dropdownOptions'] = [
        { label: 'Most recent', value: 'createdAt' },
        { label: 'Most popular', value: 'ratingCount' },
        { label: 'Highest rated', value: 'rating' },
    ]
    return (
        <div className="flex flex-col items-center w-full">
            <Dropdown
                dropdownOptions={filters}
                defaultValue="createdAt"
                buttonTitle={
                    filters.find((filter) => filter.value === selectedSorting)
                        ?.label ?? 'None'
                }
                onChange={(value: string) => setSelectedSorting(value)}
            />
            <Carousel
                opts={{
                    align: 'start',
                }}
                className="w-full min-w-96 mt-4 "
            >
                {loading && <SkeletonCardBook count={4} />}
                {!loading && books && books.length > 0 && (
                    <CarouselContent>
                        {books.map((book, index) => (
                            <CarouselItem key={index} className="basis-1/4">
                                <div className="p-1">
                                    {/* <Card> */}
                                    {/* <CardContent className="flex aspect-square items-center justify-center p-6"> */}
                                    <BookCard {...book} />
                                    {/* </CardContent> */}
                                    {/* </Card> */}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                )}
                {books && books.length === 0 && !loading && <NoResults />}
                {(loading || (books && books.length > 0)) && (
                    <>
                        <CarouselPrevious />
                        <CarouselNext />
                    </>
                )}
            </Carousel>
        </div>
    )
}
