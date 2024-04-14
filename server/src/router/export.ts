import express from "express";

import {
	exportJSON,
	exportCSV,
	exportXML,
	exportYAML,
	exportAll,
	getExportFormats,
	getExportTest,
} from "../controller/export/exports";

import { ratelimitMiddleware } from "../middleware/ratelimit";

export default (router: express.Router) => {
	router.get("/export", getExportFormats);
	router.get("/export/test", getExportTest);
	router.post("/export", exportJSON);
	router.post("/export/json", exportJSON);
	router.post("/export/csv", exportCSV);
	router.post("/export/xml", exportXML);
	router.post("/export/yaml", exportYAML);
	router.post("/export/zip", exportAll);
};
