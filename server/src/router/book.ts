import express from "express";

import { getBooks } from "../controller/book/book";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.get("/books", getBooks);
};
