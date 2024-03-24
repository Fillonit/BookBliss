import express from "express";

import { authentication, random } from "../../util";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: "Missing fields" });
		}

		let user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const expectedHash = authentication(user.salt, password);

		if (expectedHash !== user.password) {
			return res.status(403).json({ message: "Invalid credentials" });
		}

		const salt = random();
		const sessionToken = authentication(salt, user.id.toString());

		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				sessionToken,
			},
		});

		res.cookie("sessionToken", sessionToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			domain: "localhost",
			path: "/",
		});

		return res
			.status(200)
			.json({ ...user, sessionToken })
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password, name } = req.body;

		if (!email || !password || !name) {
			return res.status(400).json({ message: "Missing fields" });
		}

		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		const salt = random();
		const hashedPassword = authentication(salt, password);

		const user = await prisma.user.create({
			data: {
				email,
				name,
				salt,
				password: hashedPassword,
			},
		});

		return res.status(201).json({ user }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const logout = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params;

		const user = await prisma.user.findUnique({
			where: {
				id: Number(id),
			},
		});

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				sessionToken: "",
			},
		});

		res.clearCookie("sessionToken");

		return res.status(200).json({ message: "User logged out" }).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const refreshSessionToken = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params;

		const user = await prisma.user.findUnique({
			where: {
				id: Number(id),
			},
		});

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const salt = random();
		const sessionToken = authentication(salt, user.id.toString());

		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				sessionToken,
			},
		});

		res.cookie("sessionToken", sessionToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			domain: "localhost",
			path: "/",
		});

		return res
			.status(200)
			.json({
				message: "Session token refreshed",
				sessionToken,
			})
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getUserBySessionToken = async (sessionToken: string) => {
	const user = await prisma.user.findUnique({
		where: {
			sessionToken,
		},
	});
	if (!user) {
		return null;
	}
	return user;
};

export const getUserBySessionTokenEndpoint = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { sessionToken } = req.params;
		const user = await getUserBySessionToken(sessionToken);
		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}
		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
