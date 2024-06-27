export interface BookCardProps {
    id: number
    title: string
    author: string
    authorId: number
    description: string
    cover: string
    rating: number
    price: number
    pages: number
    genre: string
    hasPermission: boolean
    ratingCount: number
    BookGenre?: [
        {
            Genre: {
                description: string
                name: string
            }
        }
    ]
}
