import express from "express";

import { createContact, getContacts, deleteContact, updateContact } from "../controller/contact/contact";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.post("/contact", createContact);
	router.get("/contacts", getContacts);
	router.delete("/contact/:id", deleteContact);
	router.put("/contact/:id", updateContact);
};
