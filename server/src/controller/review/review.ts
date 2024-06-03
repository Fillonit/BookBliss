import express from "express";
import { prisma } from "../../db/client";
import { getUserBySessionToken } from "../user/authentication";

export const createReview = async (
	req: express.Request,
	res: express.Response
) => {
    const { session } = req.headers;
    const user = await getUserBySessionToken(session as string);
    if(!user) return res.status(403).json({ message: "You must be logged in to leave a review." });
    const { rating, comment, bookId } = req.body;
    if(rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be between 1 and 5." });
    
    const existingReview = await prisma.review.findFirst({
        where: {
            bookId: bookId,
            userId: user.id,
        },
    });
    if(existingReview) return res.status(409).json({ message: "You have already left a review for this book." });
    
    const book = await prisma.book.findFirst({
        where: {
            id: bookId,
        },
    });
    if(!book) return res.status(404).json({ message: "Book not found." });

    const currentRating = book.rating;
    const currentRatingCount = book.ratingCount;

    const newRating = (currentRating*currentRatingCount + rating)/(currentRatingCount + 1);

    await prisma.book.update({
        where: {
            id: bookId,
        },
        data: {
            rating: newRating,
            ratingCount: currentRatingCount + 1,
        },
    });

    const review = await prisma.review.create({
        data: {
           rating: rating, 
           comment: comment,
           bookId: bookId,
           userId: user.id
        },
     });
     res.status(200).json(review);
};

export const getReviews = async (
    req: express.Request,
    res: express.Response
) => {
    const reviews = await prisma.review.findMany({
        include: {
            book:{
                select: {
                    title: true,
                    author: true,
                    id:true,
                    cover: true,
                },
            },
            user: {
                select: {
                    name: true,
                    email: true,
                    id: true,
                },
            },
        },
    });
    res.status(200).json(reviews);
};

export const getReview = async (
    req: express.Request,
    res: express.Response
) => {
    const { id } = req.params;
    const review = await prisma.review.findFirst({
        where: {
            id: parseInt(id),

        },
        include: {
            book:{
                select: {
                    title: true,
                    author: true,
                    id:true,
                    cover: true,
                },
            },
            user: {
                select: {
                    name: true,
                    email: true,
                    id: true,
                    avatar: true,
                },
            },
        },
    });
    res.status(200).json(review);
};

export const deleteReview = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const review = await prisma.review.delete({
		where: {
			id: parseInt(id),
		},
	});
	res.status(200).json(review);
};
export const reviewCount = async (
    req: express.Request,
    res: express.Response
) => {
    const q = String(req.query.query ?? "");

    const count = q ? await prisma.review.count({
        where: {
            OR: [
            {
             user: {
                name: {
                    contains: q,
                },
              }
            },
            {
             comment: {
                contains: q
             }
            }
            ]
        }
    }) : await prisma.review.count();

    res.status(200).json({ message: "Successfully fetched count", data: count });
}
export const updateReview = async (
    req: express.Request,
    res: express.Response
) => {
    const { id } = req.params;
    const user = await getUserBySessionToken(req.headers.session as string);
    if(!user) return res.status(403).json({ message: "You must be logged in to update a review." });

    const { rating, comment, bookId } = req.body;
    if(!rating || rating < 1 || rating > 5) return res.status(400).json({ message: "Rating must be between 1 and 5." });

    const existingReview = await prisma.review.findFirst({
        where: {
            id: parseInt(id),
        },
    });
    if(!existingReview) return res.status(404).json({ message: "Review not found." });
    if(existingReview.userId !== user.id) return res.status(401).json({ message: "You are not authorized to update this review." });
    
    const book = await prisma.book.findFirst({
        where: {
            id: bookId
        },
    });

    if(!book) return res.status(404).json({ message: "Book not found." });

    const currentRating = book.rating;
    const currentRatingCount = book.ratingCount;
    const existingRating = existingReview.rating;
    
    const newRating = (currentRating*currentRatingCount - existingRating + rating)/currentRatingCount;
    
    await prisma.book.update({
        where: {
            id: bookId,
        },
        data: {
            rating: newRating,
        },
    });

    await prisma.review.update({
        where: {
            id: parseInt(id),
        },
        data: {
            rating: rating,
            comment: comment,
        },
    });

    res.status(200).json({message: "Successfully updated review"});
};