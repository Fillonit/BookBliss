import express from "express";

import {
	exportJSON,
	exportCSV,
	exportXML,
	exportYAML,
	exportAll,
	getExportFormats,
} from "../controller/export/exports";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.get("/export", getExportFormats);
	router.post("/export", ratelimitMiddleware(1, 180), exportJSON);
	router.post("/export/json", ratelimitMiddleware(1, 180), exportJSON);
	router.post("/export/csv", ratelimitMiddleware(1, 180), exportCSV);
	router.post("/export/xml", ratelimitMiddleware(1, 180), exportXML);
	router.post("/export/yaml", ratelimitMiddleware(1, 180), exportYAML);
	router.post("/export/all", ratelimitMiddleware(1, 360), exportAll);
};
