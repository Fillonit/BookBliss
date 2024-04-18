import express from "express";
import { prisma } from "../../db/client";
import { authentication, random } from "../../util";

export const getUsers = async (req: express.Request, res: express.Response) => {
	const { limit, offset } = req.query;
	const limitNumber = Number.parseInt(String(limit ?? "5"));
	const query = String(req.query.query ?? "");
	const offsetNumber = Number.parseInt(String(offset ?? "0"));
	const users = await prisma.user.findMany({
		take: limitNumber,
		skip: offsetNumber,
		select: {
			id: true,
			email: true,
			avatar: true,
			googleId: true,
			name: true,
			role: true,
			createdAt: true,
			updatedAt: true,
		},
	});
	res.status(200).json(users);
};

export const getUserById = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const user = await prisma.user.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	res.status(200).json(user);
};

export const createUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { email, name, password, role } = req.body;

		if (!password) {
			return res.status(400).json({ error: "Password is required" });
		}

		console.log(req.body);

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return res
				.status(400)
				.json({ error: "User with this email already exists" });
		}

		const salt = await random();
		const sessionToken = await authentication(password, salt);
		//const pass

		const user = await prisma.user.create({
			data: {
				email,
				name,
				role: role ?? "user",
				password,
				salt,
				sessionToken,
			},
		});
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to create user", msg: error });
	}
};

export const deleteUser = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const user = await prisma.user.delete({
		where: {
			id: parseInt(id),
		},
	});
	res.status(200).json(user);
};

export const updateUser = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const { body } = req;
	const { email, name, password, role } = body;

	const user = await prisma.user.update({
		where: {
			id: parseInt(id),
		},
		data: {
			email,
			name,
			password,
			role,
		},
	});
	res.status(200).json(user);
};

export const getUserByGoogleId = async (
	req: express.Request,
	res: express.Response
) => {
	const { googleId } = req.params;
	const user = await prisma.user.findFirst({
		where: {
			googleId,
		},
	});
	res.status(200).json(user);
};

export const getUsersCount = async (
	req: express.Request,
	res: express.Response
) => {
	const count = await prisma.user.count();
	res.status(200).json({ count });
};
