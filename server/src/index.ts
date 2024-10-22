import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import session from "express-session";
/* ! Google OAuth packages ! */
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import serveFilesWithCondition from "./middleware/pdfPermission";
import { prisma } from "./db/client";
import { ratelimitMiddleware } from "./middleware/ratelimit";
import { implementationPass } from "./middleware/implement";
import { Prisma } from "@prisma/client";

dotenv.config();
const { PORT, MONGO_URL, NODE_ENV } = process.env;

import router from "./router";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(
	session({
		secret: process.env.SESSION_SECRET!,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: "auto" },
	})
);

const APP_URL = process.env.APP_URL || "http://localhost:5173";
const API_URL = process.env.API_URL || "http://localhost:5000";

app.use(passport.initialize());
app.use(passport.session());

import { authentication, random } from "./util";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_OAUTH_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
			callbackURL: `${API_URL}/auth/google/callback`,
		},
		async (accessToken, refreshToken, profile, done) => {
			//let sessionToken = await authentication(accessToken, profile.id);
			const existingUser = await prisma.user.findFirst({
				where: {
					OR: [
						{ email: profile.emails[0].value },
						{ googleId: profile.id },
						{ sessionToken: accessToken },
					],
				},
			});

			if (!existingUser) {
				try {
					await prisma.user.create({
						data: {
							email: profile.emails[0].value,
							name: profile.displayName,
							role: "user",
							avatar: profile.photos[0].value,
							password: profile.id,
							googleId: profile.id,
							salt: random(),
							sessionToken: accessToken,
						},
					});
				} catch (error) {
					console.error(error);
					return done(error, null);
				}
			}

			return done(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

const attachmentsPath = path.join(__dirname, "./attachments");
console.log(attachmentsPath);
app.use("/files", express.static(attachmentsPath));
app.use("/pdfs", serveFilesWithCondition);

app.use(express.static(__dirname));

interface GoogleUser {
	id: string;
	displayName: string;
	emails: { value: string; verified: boolean }[];
	photos: { value: string }[];
}

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: `${APP_URL}/login`,
	}),
	async (req: express.Request, res: express.Response) => {
		try {
			const googleUser = req.user as GoogleUser;
			const existingUser = await prisma.user.findFirst({
				where: { email: googleUser.emails[0].value },
			});

			if (!existingUser) {
				await prisma.user.create({
					data: {
						email: googleUser.emails[0].value,
						name: googleUser.displayName,
						role: "user",
						avatar: googleUser.photos[0].value,
						password: googleUser.id,
					},
				});
			}

			res.redirect(`${APP_URL}/login?id=${googleUser.id}`);
		} catch (error) {
			console.error(error);
			if (
				error instanceof Prisma.PrismaClientKnownRequestError &&
				error.code === "P2002"
			) {
				res.status(500).json({ error: "Failed to create user" });
			} else {
				res.status(500).json({ error: "Failed to authenticate user" });
			}
		}
	}
);

app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(morgan("dev"));
app.set("trust proxy", true);
app.set("x-powered-by", false);

const server = http.createServer(app);

server.listen(PORT || 8080, () => {
	console.log(`Server is running on ${API_URL}/`);
});
// app.use(ratelimitMiddleware);

app.use("/api", router());

//app.use(implementationPass);

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
