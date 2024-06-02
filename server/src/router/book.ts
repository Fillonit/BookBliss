import express from "express";

import {
	getBooks,
	getBook,
	updateBook,
	createBook,
	deleteBook,
	countBooks,
	averagePrice,
	averageRating,
	averageTimeToRead,
	generateTicket,
} from "../controller/book/book";
import upload from "../util/fileSaver";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.get("/books", getBooks);
	router.put("/books/:id", updateBook);
	router.delete("/books/:id", deleteBook);
	router.post(
		"/books",
		upload.fields([
			{ name: "pdf", maxCount: 1 },
			{ name: "cover", maxCount: 1 },
		]),
		createBook
	);
	router.get("/books/count", countBooks);
	router.get("/books/average-price", averagePrice);
	router.get("/books/average-rating", averageRating);
	router.get("/books/average-time-to-read", averageTimeToRead);
	router.get("/books/:id", getBook);
	router.post("/books/:id/discount-tickets", generateTicket);
};
