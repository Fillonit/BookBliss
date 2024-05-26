import express from "express";
import { prisma } from "../../db/client";

export const getPublishers = async (
	req: express.Request,
	res: express.Response
) => {
	const publishers = await prisma.publisher.findMany();
	res.status(200).json({message: "Successfully fetched data", data: publishers});
};