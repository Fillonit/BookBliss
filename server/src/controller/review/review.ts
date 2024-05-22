import express from "express";
import { prisma } from "../../db/client";

export const createReview = async (
	req: express.Request,
	res: express.Response
) => {
    const { body } = req;
    const { rating, comment, bookId, userId } = body;

    const review = await prisma.review.create({
    data: {
        rating: rating, 
        comment: comment,
        book: {
            connect: {
                id: bookId
            }
        },
        user: {
            connect: {
                id: userId
            }
        },
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
    const { rating, comment, bookId, userId } = req.body;

    const review = await prisma.review.update({
        where: {
            id: parseInt(id),
        },
        data: {
            rating: rating, 
            comment: comment,
            book: {
                connect: {
                    id: bookId
                }
            },
            user: {
                connect: {
                    id: userId
                }
            },
        },
    });
    res.status(200).json(review);
};