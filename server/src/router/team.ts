import express from "express";

import {
    getTeams,
    getTeamById,
    createTeam,
    deleteTeam,
    updateTeam,
} from "../controller/team/team";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
    router.get("/teams", getTeams);
    router.get("/team/:id", getTeamById);
    router.post("/team", createTeam);
    router.delete("/team/:id", deleteTeam);
    router.put("/team/:id", updateTeam);
};