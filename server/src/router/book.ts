import express from "express";

import { getBooks, getBook, updateBook, createBook } from "../controller/book/book";
import upload from "@/util/fileSaver";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.get("/books", getBooks);
	router.get("/books/:id", getBook);
	router.put("/books/:id", updateBook);
	router.post("/books", upload.fields([{name: 'pdf', maxCount: 1}, {name: 'cover', maxCount: 1}]), createBook);
};
