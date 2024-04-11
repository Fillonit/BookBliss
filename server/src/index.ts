import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import session from "express-session";

/* ! Google OAuth packages ! */
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";

dotenv.config();
const { PORT, MONGO_URL, NODE_ENV } = process.env;

import router from "./router";

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(compression());
// app.use(
// 	session({
// 		secret: process.env.SESSION_SECRET!,
// 		resave: false,
// 		saveUninitialized: true,
// 		cookie: { secure: "auto" },
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());

import { authentication, random } from "./util";

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_OAUTH_CLIENT_ID!,
// 			clientSecret: process.env.GOOGLE_OAUTH_SECRET!,
// 			callbackURL: "/auth/google/callback",
// 		},
// 		async (accessToken, refreshToken, profile, done) => {
// 			let sessionToken = await authentication(accessToken, profile.id);
// 			const existingUser = await prisma.user.findFirst({
// 				where: {
// 					OR: [
// 						{ email: profile.emails[0].value },
// 						{ googleId: profile.id },
// 						{ sessionToken: accessToken },
// 					],
// 				},
// 			});

// 			if (!existingUser) {
// 				try {
// 					await prisma.user.create({
// 						data: {
// 							email: profile.emails[0].value,
// 							name: profile.displayName,
// 							role: "user",
// 							avatar: profile.photos[0].value,
// 							password: profile.id,
// 							googleId: profile.id,
// 							salt: random(),
// 							sessionToken: accessToken,
// 						},
// 					});
// 				} catch (error) {
// 					console.error(error);
// 					return done(error, null);
// 				}
// 			}

// 			return done(null, profile);
// 		}
// 	)
// );

// passport.serializeUser((user, done) => {
// 	done(null, user);
// });

// passport.deserializeUser((user, done) => {
// 	done(null, user);
// });

// app.get(
// 	"/auth/google",
// 	passport.authenticate("google", { scope: ["profile", "email"] })
// );

import { prisma } from "./db/client";

// interface GoogleUser {
// 	id: string;
// 	displayName: string;
// 	emails: { value: string; verified: boolean }[];
// 	photos: { value: string }[];
// }

// app.get(
// 	"/auth/google/callback",
// 	passport.authenticate("google", {
// 		failureRedirect: "http://localhost:5173/login",
// 	}),
// 	async (req: express.Request, res: express.Response) => {
// 		try {
// 			const googleUser = req.user as GoogleUser;
// 			// const user = await prisma.user.create({
// 			// 	data: {
// 			// 		email: googleUser.emails[0].value,
// 			// 		name: googleUser.displayName,
// 			// 		role: "user",
// 			// 		avatar: googleUser.photos[0].value,
// 			// 		password: googleUser.id,
// 			// 	},
// 			// });
// 			res.redirect(`http://localhost:5173/login?id=${googleUser.id}`);
// 		} catch (error) {
// 			console.error(error);
// 			if (error.includes("prisma.user.create()")) {
// 				res.status(500).json({ error: "Failed to create user" });
// 			} else {
// 				res.status(500).json({ error: "Failed to authenticate user" });
// 			}
// 		}
// 	}
// );

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

app.use("/api", router());

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
