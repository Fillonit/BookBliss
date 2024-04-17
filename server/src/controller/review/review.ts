import express from "express";
import { prisma } from "../../db/client";
import { getUserBySessionToken } from "../user/authentication";

export const getReview = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const review = await prisma.review.findFirst({
            where: {
                id: Number.parseInt(id)
            }
        })
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({message: "An error occurred while fetching the review"});
    }
};

export const getReviews = async (req: express.Request, res: express.Response) => {
    try {
        const reviews = await prisma.review.findMany();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: "An error occurred while fetching the reviews"});
    }
};

export const updateReview = async (req: express.Request, res: express.Response) => {
    try {
        const { session } = req.headers;
        const { id } = req.params;
        const user = await getUserBySessionToken(session as string);
        if (!user) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const review = await prisma.review.findFirst({
            where: {
                id: Number.parseInt(id),
                userId: user.id
            }
        });
        if(!review){
            return res.status(401).json({message: "Review does not exist or you do not have access"});
        }
        const { rating, description } = req.body;

        await prisma.review.update({
            where: {
                id: Number.parseInt(id)
            },
            data: {
                rating,
                comment: description,
                updatedAt: new Date()
            }
        });
        const book = await prisma.book.findFirst({
            where: {
                id: review.bookId
            }
        });
        if(!book) return res.status(404).json({message: "Book not found"});
        const currentRating = ((book.rating * book.ratingCount) - review.rating + rating) / book.ratingCount;
        await prisma.book.update({
            where: {
                id: review.bookId
            },
            data: {
                rating: currentRating
            }
        });

        res.status(200).json({message: "Successfully updated review"});
    } catch (error) {
        res.status(500).json({message: "An error occurred while updating the review"});
    }
};

export const createReview = async (req: express.Request, res: express.Response) => {
    try {
        const { session } = req.headers;
        const user = await getUserBySessionToken(session as string);
        if (!user) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const { rating, description, bookId } = req.body;
        const book = await prisma.book.findFirst({
            where: {
                id: bookId
            }
        });
        if(!book) return res.status(404).json({message: "Book not found"});
        await prisma.review.create({
            data: {
                rating:rating,
                comment:description,
                bookId:bookId,
                userId:user.id,
            }
        });
        const currentRating = ((book.rating * book.ratingCount)+rating)/(book.ratingCount+1);
        await prisma.book.update({
            where: {
                id: bookId
            },
            data: {
                rating: currentRating,
                ratingCount: book.ratingCount+1 
            }
        });
        res.status(200).json({message: "Successfully created review"});
    } catch (error) {
        res.status(500).json({message: "An error occurred while creating the review"});
    }
};

export const deleteReview = async (req: express.Request, res: express.Response) => {
    try {
        const { session } = req.headers;
        const { id } = req.params;
        const user = await getUserBySessionToken(session as string);
        if (!user) {
            return res.status(401).json({message: "Unauthorized"});
        }
        const review = await prisma.review.findFirst({
            where: {
                id: Number.parseInt(id),
            }
        });
        if(review.userId !== user.id && user.role !== "admin"){
            return res.status(401).json({message: "You do not have access to delete this review"});
        }
        const book = await prisma.book.findFirst({
            where: {
                id: review.bookId
            }
        });
        if(!book) return res.status(404).json({message: "Book not found"});
        const currentRating = ((book.rating * book.ratingCount) - review.rating) / (book.ratingCount - 1);
        await prisma.book.update({
            where: {
                id: review.bookId
            },
            data: {
                rating: currentRating,
                ratingCount: book.ratingCount - 1
            }
        });
        await prisma.review.delete({
            where:{
                id: Number.parseInt(id),
            }
        })
        res.status(200).json({message: "Successfully deleted review"});
    } catch (error) {
        res.status(500).json({message: "An error occurred while deleting the review"});
    }
};