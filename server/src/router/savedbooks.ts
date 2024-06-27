import express from "express";
import {
	saveBook,
	unsaveBook,
	getAllSavedBooks,
} from "../controller/book/savedBooks";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.post("/savedBooks/:id", saveBook);
	router.delete("/savedBooks/:id", unsaveBook);
	router.get("/savedBooks/user/:id", getAllSavedBooks);
};
