import express from "express";

import { createContact } from "../controller/contact/contact";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.post("/contact", createContact);
};
