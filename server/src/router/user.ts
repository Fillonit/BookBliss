import express from "express";

import {
	getUsers,
	getUserById,
	createUser,
	deleteUser,
	updateUser,
	getUserByGoogleId,
} from "../controller/user/user";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.get("/users", getUsers);
	router.get("/user/:id", getUserById);
	router.post("/user", createUser);
	router.delete("/user/:id", deleteUser);
	router.put("/user/:id", updateUser);
	router.get("/user/getByGoogleId/:googleId", getUserByGoogleId);
};
