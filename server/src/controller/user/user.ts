import express from "express";
import { prisma } from "../../db/client";

export const getUsers = async (req: express.Request, res: express.Response) => {
	const users = await prisma.user.findMany();
	res.status(200).json(users);
};
