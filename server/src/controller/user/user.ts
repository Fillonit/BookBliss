import express from "express";
import { prisma } from "../../db/client";

export const getUsers = async (req: express.Request, res: express.Response) => {
	const { limit, offset } = req.query;
	const limitNumber = Number.parseInt(String(limit ?? "3"));
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
	const { email, name, password } = req.body;

	const user = await prisma.user.create({
		data: {
			email,
			name,
			role: "user",
			password,
		},
	});
	res.status(201).json(user);
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
	const { email, name, password } = body;

	const user = await prisma.user.update({
		where: {
			id: parseInt(id),
		},
		data: {
			email,
			name,
			password,
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
