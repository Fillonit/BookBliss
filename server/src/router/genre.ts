import express from "express";

import {
	getGenreById,
	createGenre,
	deleteGenre,
	updateGenre,
	getBooksByGenre,
	getGenres,
} from "../controller/genre/genre";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.get("/genres", getGenres);
	router.get("/genre/:id", getGenreById);
	router.post("/genre", createGenre);
	router.delete("/genre/:id", deleteGenre);
	router.put("/genre/:id", updateGenre);
	router.get("/genre/:id/books", getBooksByGenre);
};
