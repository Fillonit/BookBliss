import express from "express";
import { prisma } from "../../db/client";

export const getBooks = async (req: express.Request, res: express.Response) => {
	const books = await prisma.book.findMany();
	res.status(200).json(books);
};
