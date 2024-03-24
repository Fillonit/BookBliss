import express from "express";

import { createAuthor, getAuthors, getAuthor, deleteAuthor, updateAuthor } from "../controller/author/author";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.post("/author", createAuthor);
	router.get("/author", getAuthors);
    router.get("/author/:id", getAuthor)
	router.delete("/author/:id", deleteAuthor);
	router.put("/author/:id", updateAuthor);
};