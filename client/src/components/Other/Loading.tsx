import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '../ui/card'
import { ReactNode } from 'react'

interface SkeletonCardProps {
    count: number
}

export default function SkeletonCardBook({ count }: SkeletonCardProps) {
    const cards: ReactNode[] = []
    for (let i = 0; i < count; i++) {
        cards.push(
            <Card
                key={i}
                className="flex flex-col w-full max-w-xs mx-2 bg-white shadow-lg rounded-lg overflow-hidden dark:bg-slate-950"
            >
                <div className="relative">
                    <Skeleton className="w-full h-64" />
                    <span className="absolute bottom-0 left-0 bg-amber-500 text-white px-2 py-1 m-2 rounded inline-flex items-center">
                        <Skeleton className="text-xl" />
                    </span>
                    <span className="absolute bottom-0 right-0 bg-white text-amber-600 px-2 py-1 m-2 rounded dark:bg-slate-900 dark:text-white">
                        <Skeleton className="w-20" />
                    </span>
                </div>
                <CardContent className="p-4 flex-grow">
                    <Skeleton className="text-lg font-semibold mb-2 h-4 w-full" />
                    <Skeleton className="text-sm text-gray-500 mb-1 h-4 w-3/4" />
                    <Skeleton className="text-sm text-gray-700 mb-4 h-4 w-full" />
                </CardContent>
                <div className="p-4 pt-0 flex items-center justify-between">
                    <Skeleton className="text-sm font-medium bg-amber-600 p-2 rounded-md h-4 w-16" />
                    <Skeleton className="h-6 w-24" />
                </div>
            </Card>
        )
    }

    return (
        <div className="flex h-full justify-center items-center my-6">
            {cards}
        </div>
    )
}
