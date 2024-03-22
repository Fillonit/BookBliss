import express from "express";
import { prisma } from "../../db/client";

export const getGenres = async (
	req: express.Request,
	res: express.Response
) => {
	const genres = await prisma.genre.findMany();
	res.status(200).json(genres);
};

export const getGenreById = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const genre = await prisma.genre.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	res.status(200).json(genre);
};

export const createGenre = async (
	req: express.Request,
	res: express.Response
) => {
	const { name } = req.body;

	const genre = await prisma.genre.create({
		data: {
			name,
		},
	});
	res.status(201).json(genre);
};

export const deleteGenre = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const genre = await prisma.genre.delete({
		where: {
			id: parseInt(id),
		},
	});
	res.status(200).json(genre);
};

export const updateGenre = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const { body } = req;
	const { name } = body;

	const genre = await prisma.genre.update({
		where: {
			id: parseInt(id),
		},
		data: {
			name,
		},
	});
	res.status(200).json(genre);
};

export const getBooksByGenre = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const bookGenres = await prisma.bookGenre.findMany({
		where: {
			genreId: parseInt(id),
		},
	});

	const bookIds = bookGenres.map((bg) => bg.bookId);

	const books = await prisma.book.findMany({
		where: {
			id: {
				in: bookIds,
			},
		},
	});

	res.status(200).json(books);
};
