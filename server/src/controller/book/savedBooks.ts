import express from "express";
import { prisma } from "../../db/client";
import { getUserBySessionToken } from "../user/authentication";

export const saveBook = async (req: express.Request, res: express.Response) => {
	const { id } = req.params;
    const { session } = req.headers;

    const user = await getUserBySessionToken(session as string);
    if (!user) {
        return res.status(401).json({message: "You must be logged in to save a book"});
    }
	await prisma.savedBook.create({
        data: {
            userId: user.id,
            bookId: Number.parseInt(id)
        }
    });
	res.status(200).json({message: "Successfully saved book"});
};
export const unsaveBook = async (req: express.Request, res: express.Response) => {
	const { id } = req.params;
    const { session } = req.headers;

    const user = await getUserBySessionToken(session as string);
    if (!user) {
        return res.status(401).json({message: "You must be logged in to save a book"});
    }
	await prisma.savedBook.delete({
        where: {
            userId_bookId: {
                userId: user.id,
                bookId: Number.parseInt(id)
            }
        }
    });
	res.status(204);
};