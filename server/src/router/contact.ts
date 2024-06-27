import express from "express";

import { createContact, getContacts, deleteContact, updateContact, getContact, contactCount, getAvgUserContact} from "../controller/contact/contact";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.post("/contact", createContact);
	router.get("/contacts", getContacts);
	router.delete("/contact/:id", deleteContact);
	router.put("/contact/:id", updateContact);
	router.get("/contact/count", contactCount);
	router.get("/contact/average-user-contact", getAvgUserContact);
	router.get("/contact/:id", getContact);
};
