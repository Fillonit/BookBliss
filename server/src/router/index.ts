import express from "express";
import user from "./user";
import book from "./book";

const router = express.Router();

export default (): express.Router => {
	user(router);
	book(router);
	return router;
};
