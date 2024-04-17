import express from "express";

import { getReview, updateReview, createReview, deleteReview,getReviews } from "../controller/review/review";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.post("/review", createReview);
	router.get("/reviews", getReview);
	router.delete("/review/:id", deleteReview);
	router.put("/review/:id", updateReview);
	router.get("/review/:id", getReviews);
};
