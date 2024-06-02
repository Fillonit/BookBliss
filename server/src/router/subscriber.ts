import express from "express";

import {
	getSubscribers,
	getSubscriberById,
	deleteSubscriber,
	createSubscriber,
	updateSubscriber,
} from "../controller/subscriber/subscriber";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.get("/subscribers", getSubscribers);
	router.get("/subscriber/:id", getSubscriberById);
	router.post("/subscriber", createSubscriber);
	router.delete("/subscriber/:id", deleteSubscriber);
	router.put("/subscriber/:id", updateSubscriber);
};
