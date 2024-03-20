import express from "express";
import user from "./user";
import book from "./book";
import contact from "./contact";
import authentication from "./authentication";

const router = express.Router();

export default (): express.Router => {
	user(router);
	book(router);
	contact(router);
	authentication(router);
	return router;
};
