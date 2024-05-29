import express from "express";
import { prisma } from "../../db/client";
import { getUserBySessionToken } from "../user/authentication";
import crypto from "crypto";

const VALID_SORTINGS = ["createdAt", "rating", "ratingCount"];
const DISCOUNT_CODE_LENGTH = 36;

export const getBooks = async (req: express.Request, res: express.Response) => {
	const { limit, offset } = req.query;
	const { session } = req.headers;
	const user = await getUserBySessionToken(session as string);
 
	const limitNumber = Number.parseInt(String(limit ?? "16"));
	const query = String(req.query.query ?? "");
	const offsetNumber = Number.parseInt(String(offset ?? "0"));

	const sorting = String(req.query.sorting ?? "createdAt") || "createdAt";
	const genres = String(req.query.genres ?? "").split(",").map(Number).filter(id => id > 0);
    
	const minPrice = Number.parseFloat(String(req.query.minPrice ?? "0"));
	const maxPrice = Number.parseFloat(String(req.query.maxPrice ?? "1000"));

	const books = await prisma.book.findMany({
		take: limitNumber,
		skip: offsetNumber,
		orderBy: VALID_SORTINGS.includes(sorting) ? {
			 [sorting]: "desc"
		} : undefined,
		select: {
			id: true,
			title: true,
			description: true,
			price: true,
			author: true,
			cover: true,
			rating: true,
			ratingCount: true,
			authorId: true,
			BookGenre: {
				select: {
					Genre: true,
				},
			},
		},
		where: {
			AND: [
				{
					title: {
						contains: query,
					},
				},
				{
					OR: genres.length === 0
						? [] // No additional genre filter if genres array is empty
						: [
							{
								BookGenre: {
									some: {
										genreId: {
											in: genres,
										},
									},
								},
							},
						],
				},
				{
					price: {
						gte: minPrice,
						lte: maxPrice,
					}
				}
			],
		},
	});
	
   
    const booksWithPermissions = books.map(book => ({
		...book,
		hasPermission: user && book.authorId === user.id,
	}));

	res.status(200).json({
		message: "Successfully fetched books.",
		data: booksWithPermissions,
	});
};

export const generateTicket = async (
	req: express.Request,
	res: express.Response
) => {
	const { session } = req.headers;
	const { id } = req.params;
	const user = await getUserBySessionToken(session as string);
	console.log(id);

	if(!user) return res.status(401).json({ message: "Unauthorized" });
    
	console.log(user);
	const {duration, discount} = req.body;
    if(discount < 0 || discount > 100) return res.status(400).json({ message: "Invalid discount value" });

	const book = await prisma.book.findFirst({
		where: {
			id: Number.parseInt(id),
		},
	});

    if(book.authorId != user.id) return res.status(401).json({ message: "Unauthorized" });

	const code = crypto.randomBytes(DISCOUNT_CODE_LENGTH).toString('hex').slice(0, DISCOUNT_CODE_LENGTH);

	await prisma.discountTicket.create({
		data: {
			bookId: Number.parseInt(id.toString()),
			validUntil: new Date(new Date().getTime() + 1000 * 60 * 60 * duration),
			discountPercentage: Number.parseFloat(discount.toString()),
            discountCode: code
		},
	});
	res.status(200).json({ message: "Successfully created ticket", data: code });
}

export const getBook = async (req: express.Request, res: express.Response) => {
	const { id } = req.params;
	const book = await prisma.book.findFirst({
		where: {
			id: Number.parseInt(id),
		},
	});
	res.status(200).json(book);
};

export const updateBook = async (
	req: express.Request,
	res: express.Response
) => {
	const { session } = req.headers;
	const { id } = req.params;
	const user = await getUserBySessionToken(session as string);
	if (!user || (user.role !== "admin" && user.role !== "author")) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	const book = await prisma.book.findFirst({
		where: {
			id: Number.parseInt(id),
		},
	});
	if (!book || (book.authorId !== user.id && user.role !== "admin")) {
		return res
			.status(401)
			.json({ message: "Book does not exist or you do not have access" });
	}
	const { description, title } = req.body;

	await prisma.book.update({
		where: {
			id: Number.parseInt(id),
		},
		data: {
			description,
			title,
			updatedAt: new Date(),
		},
	});
	res.status(200).json({ message: "Successfully updated book" });
};
export const countBooks = async (
	req: express.Request,
	res: express.Response
) => {
	const query = String(req.query.query ?? "");
    
	const count = await prisma.book.count({
		where: {
			title: {
				contains: query,
			}
		}
	})
	res.status(200).json({ message: "Successfully fetched count", data: count});
};
export const averagePrice = async (
	req: express.Request,
	res: express.Response
) => {
	const { session } = req.headers;

	const user = await getUserBySessionToken(session as string);
	if (!user || user.role !== "admin") {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const avgPrice = await prisma.book.aggregate({
		_avg: {
			price: true
		}
	})
	res.status(200).json({ message: "Successfully fetched price", data: avgPrice._avg.price});
};
export const averageRating = async (
	req: express.Request,
	res: express.Response
) => {
	const { session } = req.headers;

	const user = await getUserBySessionToken(session as string);
	if (!user || user.role !== "admin") {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const avgRating = await prisma.book.aggregate({
		_avg: {
			rating: true
		}
	});
	res.status(200).json({ message: "Successfully fetched rating", data: avgRating._avg.rating });
};

export const averageTimeToRead = async (
	req: express.Request,
	res: express.Response
) => {
	const { session } = req.headers;

	const user = await getUserBySessionToken(session as string);
	if (!user || user.role !== "admin") {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const avgTimeToRead = await prisma.book.aggregate({
		_avg: {
			timeToRead: true
		}
	});
	res.status(200).json({ message: "Successfully fetched time to read", data: avgTimeToRead._avg.timeToRead });
};

export const createBook = async (
	req: express.Request,
	res: express.Response
) => {
	const { session } = req.headers;
	const user = await getUserBySessionToken(session as string);
	if (!user || user.role !== "author") {
		return res.status(401).json({ message: "Unauthorized" });
	}
    const data = JSON.parse(req.body.other);
	const { price, description, title, pages, words, timeToRead, publisher, genres } = data;
	console.log(data);

	const coverFile = Array.isArray(req.files)
		? req.files[0].filename
		: req.files["cover"][0].filename;

	const pdfFile = Array.isArray(req.files)
		? req.files[0].filename
		: req.files["cover"][0].filename;

	const createdBook = await prisma.book.create({
		data: {
			price: price as number,
			description: description as string,
			title: title as string,
			author: user.name,
			pdfLink: pdfFile ?? "default.pdf",
			cover: coverFile ?? "default.png",
			isbn: (
				Math.floor(Math.random() * 9000000000000) + 1000000000000
			).toString(),
			pages: pages as number,
			words: words as number,
			timeToRead: timeToRead as number,
			authorId: user.id,
			createdAt: new Date(),
			updatedAt: new Date(),
			publisherId: publisher
		},
	});
	await prisma.bookGenre.createMany({
		data: Object.keys(genres).map(key=>({
           bookId: createdBook.id,
		   genreId: genres[key].id
		}))
	})
	res.status(200).json({ message: "Successfully created book" });
};

export const deleteBook = async (
	req: express.Request,
	res: express.Response
) => {
	const session = req.headers['session'];
	const { id } = req.params;

	const user = await getUserBySessionToken(session as string);
	if (!user || user.role === "user") {
		return res.status(401).json({ message: "Unauthorized" });
	}
	const book = await prisma.book.findFirst({
		where: {
			id: Number.parseInt(id),
		},
	});

	if (book.authorId !== user.id && user.role !== "admin") {
		return res
			.status(401)
			.json({ message: "You do not have access to delete this book" });
	}
	await prisma.book.delete({
		where: {
			id: Number.parseInt(id),
		},
	});
	res.status(200).json({ message: "Successfully updated book" });
};
