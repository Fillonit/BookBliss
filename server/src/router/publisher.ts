import express from "express";

import {
    getPublishers
} from "../controller/publisher/publisher";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
     router.get("/publishers", getPublishers)
};