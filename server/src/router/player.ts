import express from "express";

import {
	getPlayers,
	getPlayerById,
	createPlayer,
	deletePlayer,
	updatePlayer,
	getPlayerByBirthYear,
} from "../controller/player/player";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.get("/players", getPlayers);
	router.get("/player/:id", getPlayerById);
	router.post("/player", createPlayer);
	router.delete("/player/:id", deletePlayer);
	router.put("/player/:id", updatePlayer);
	router.get("/players/year/:year", getPlayerByBirthYear);
};
