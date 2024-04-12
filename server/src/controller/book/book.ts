import express from "express";
import { prisma } from "../../db/client";
import { getUserBySessionToken } from "../user/authentication";
import { set } from "lodash";
const validSortings = ["createdAt", "rating", "ratingCount"];
export const getBooks = async (req: express.Request, res: express.Response) => {
	const { limit, offset } = req.query;
	const limitNumber = Number.parseInt(String(limit ?? "16"));
	const query = String(req.query.query ?? "");
	const offsetNumber = Number.parseInt(String(offset ?? "0"));
	const sorting = String(req.query.sorting ?? "createdAt") || "createdAt";
	if (!validSortings.includes(sorting))
		return res.status(400).json({ message: "Invalid sorting value." });

	const books = await prisma.book.findMany({
		take: limitNumber,
		skip: offsetNumber,
		orderBy: {
			[sorting]: "desc",
		},
		select: {
			id: true,
			title: true,
			description: true,
			price: true,
			author: true,
			cover: true,
			rating: true,
			ratingCount: true,
		},
		where: {
			title: {
				contains: query,
			},
		},
	});

	setTimeout(() => {
		res.status(200).json({
			message: "Successfully fetched books.",
			data: books,
		});
	}, 2000);

	// res.status(200).json({
	// 	message: "Successfully fetched books.",
	// 	data: books,
	// });
};

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
			authorId: user.id,
		},
	});
	if (!book && user.role !== "admin") {
		return res
			.status(401)
			.json({ message: "Book does not exist or you do not have access" });
	}
	const { price, description, title } = req.body;

	await prisma.book.update({
		where: {
			id: Number.parseInt(id),
		},
		data: {
			price,
			description,
			title,
			updatedAt: new Date(),
		},
	});
	res.status(200).json({ message: "Successfully updated book" });
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

	const { price, description, title, pages, words, timeToRead } = req.body;

	const coverFile = Array.isArray(req.files)
		? req.files[0].filename
		: req.files["cover"][0].filename;
	const pdfFile = Array.isArray(req.files)
		? req.files[0].filename
		: req.files["cover"][0].filename;

	await prisma.book.create({
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
		},
	});
	res.status(200).json({ message: "Successfully updated book" });
};

export const deleteBook = async (
	req: express.Request,
	res: express.Response
) => {
	const { session } = req.headers;
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
