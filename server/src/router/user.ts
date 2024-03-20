import express from "express";

import { getUsers } from "../controller/user/user";
import { createContact } from "../controller/user/contact";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.get("/users", getUsers);
	router.post("/contact", createContact)
};
