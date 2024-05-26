export interface BookCardProps {
    id: number
    title: string
    author: string
    description: string
    cover: string
    rating: number
    price: number
    genre: string
    hasPermission: boolean
    ratingCount: number
    BookGenre?: [
        {
            Genre: {
                description: any
                name: string
            }
        }
    ]
}
