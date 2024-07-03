import express from "express";
import user from "./user";
import book from "./book";
import contact from "./contact";
import author from "./author";
import authentication from "./authentication";
import exportData from "./export";
import inventory from "./inventory";
import review from "./review";
import genre from "./genre";
import savedbooks from "./savedbooks";
import publisher from "./publisher";
import subscriber from "./subscriber";
import team from "./team";
import player from "./player";

const router = express.Router();

export default (): express.Router => {
	user(router);
	book(router);
	contact(router);
	authentication(router);
	author(router);
	exportData(router);
	inventory(router);
	review(router);
	genre(router);
	savedbooks(router);
	publisher(router);
	subscriber(router);
	team(router);
	player(router);
	return router;
};
