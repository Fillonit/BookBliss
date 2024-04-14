import express from "express";
import user from "./user";
import book from "./book";
import contact from "./contact";
import author from "./author";
import authentication from "./authentication";
import exportData from "./export";

const router = express.Router();

export default (): express.Router => {
	user(router);
	book(router);
	contact(router);
	authentication(router);
	author(router);
	exportData(router);
	return router;
};
