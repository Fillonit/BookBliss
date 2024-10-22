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
		console.log(email);
		let user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		console.log(user);
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
		const sessionToken = authentication(salt, email);
		const hashedPassword = authentication(salt, password);

		const user = await prisma.user.create({
			data: {
				email,
				name,
				salt,
				sessionToken,
				password: hashedPassword,
			},
		});

		return res.status(201).json({ user }).end();
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Internal server error", err: error.message });
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
		const { oldSessionToken } = req.params;

		const user = await prisma.user.findUnique({
			where: {
				sessionToken: oldSessionToken,
			},
		});

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const salt = random();
		const newSessionToken = authentication(salt, user.id.toString());

		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				sessionToken: newSessionToken,
			},
		});

		res.cookie("sessionToken", newSessionToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			domain: "localhost",
			path: "/",
		});

		return res
			.status(200)
			.json({
				message: "Session token refreshed",
				sessionToken: newSessionToken,
			})
			.end();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const getUserBySessionToken = async (sessionToken: string) => {
	if (!sessionToken) return null;
	const user = await prisma.user.findUnique({
		select: {
			id: true,
			email: true,
			name: true,
			role: true,
			avatar: true,
			googleId: true,
			createdAt: true,
			updatedAt: true,
			salt: true,
			password: true,
		},
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

export const updatePassword = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { session } = req.headers;
		const { currentPassword, newPassword } = req.body;

		console.log(session);

		if (!currentPassword || !newPassword) {
			return res.status(400).json({ message: "Missing fields" });
		}

		const user = await getUserBySessionToken(session as string);

		if (!user) {
			return res.status(400).json({ message: "User not found" });
		}

		const expectedHash = authentication(user.salt, currentPassword);

		if (expectedHash !== user.password) {
			return res
				.status(403)
				.json({ message: "Invalid current password" });
		}

		// const salt = random();
		const hashedNewPassword = authentication(user.salt, newPassword);

		await prisma.user.update({
			where: { id: user.id },
			data: {
				// salt,
				password: hashedNewPassword,
			},
		});

		return res
			.status(200)
			.json({ message: "Password updated successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
