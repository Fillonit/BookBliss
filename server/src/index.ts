import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config();
const { PORT, MONGO_URL, NODE_ENV } = process.env;

import router from "./router";

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(compression());

app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(morgan("dev"));

app.set("x-powered-by", false);

const server = http.createServer(app);

server.listen(PORT || 8080, () => {
	console.log(`Server is running on http://localhost:${PORT}/`);
});

import { ratelimitMiddleware } from "./middleware/ratelimit";
// app.use(ratelimitMiddleware);

app.use("/", router());

let pkg = require("../package.json");
app.get("/", (req: express.Request, res: express.Response) => {
	res.status(200).json({
		[pkg.name]: {
			_desc: pkg.description,
			_repo: pkg.repo,
			_author: pkg.author,
			_version: pkg.version,
			_license: pkg.license,
		},
	});
});
