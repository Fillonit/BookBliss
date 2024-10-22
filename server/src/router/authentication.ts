import express from "express";

import {
	register,
	login,
	logout,
	getUserBySessionTokenEndpoint,
	refreshSessionToken,
	updatePassword,
} from "../controller/user/authentication";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.post("/register", register);
	router.post("/login", login);
	router.delete("/logout/:id", logout);
	router.get("/auth/user/:sessionToken", getUserBySessionTokenEndpoint);
	router.patch("/auth/refreshToken/:oldSessionToken", refreshSessionToken);
	router.put("/profile/update", updatePassword);
};
