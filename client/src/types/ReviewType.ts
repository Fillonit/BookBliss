export type Review = {
    id: number
    rating: number
    comment: string
    book: {
        title: string
    }
    bookId: number
    user: {
        name: string
    }
    userId: number
    createdAt: string
    updatedAt: string
}