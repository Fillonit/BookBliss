import express from "express";

import { createAuthor, getAuthors, getAuthor, deleteAuthor, updateAuthor, applyForAuthor } from "../controller/author/author";

import { ratelimitMiddleware } from "../middleware/ratelimit";
import upload from "../util/fileSaver";

export default (router: express.Router) => {
	router.post("/author", createAuthor);
	router.get("/author", getAuthors);
    router.get("/author/:id", getAuthor)
	router.delete("/author/:id", deleteAuthor);
	router.put("/author/:id", updateAuthor);
    router.post("/author/apply",
	 upload.fields([{name: 'identification', maxCount: 1}, {name: 'pfp', maxCount: 1}, {name: 'writingSample', maxCount: 1}]), 
	 applyForAuthor);
};