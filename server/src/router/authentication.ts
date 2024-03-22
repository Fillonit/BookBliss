import express from "express";

import { register, login, logout } from "../controller/user/authentication";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.post("/register", register);
	router.post("/login", ratelimitMiddleware(3, 30), login);
	router.delete("/logout/:id", ratelimitMiddleware(3, 30), logout);
};
