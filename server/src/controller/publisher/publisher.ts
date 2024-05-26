import express from "express";
import { prisma } from "../../db/client";

export const getPublishers = async (
	req: express.Request,
	res: express.Response
) => {
	const publishers = await prisma.publisher.findMany();
	res.status(200).json({
		message: "Successfully fetched data",
		data: publishers,
	});
};

export const getPublisherById = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const publisher = await prisma.publisher.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	res.status(200).json({
		message: "Successfully fetched data",
		data: publisher,
	});
};

export const createPublisher = async (
	req: express.Request,
	res: express.Response
) => {
	const { name } = req.body;
	const publisher = await prisma.publisher.create({
		data: {
			name,
		},
	});
	res.status(200).json({
		message: "Successfully created publisher",
		data: publisher,
	});
};

export const updatePublisher = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const { name } = req.body;
	const publisher = await prisma.publisher.update({
		where: {
			id: parseInt(id),
		},
		data: {
			name,
		},
	});
	res.status(200).json({
		message: "Successfully updated publisher",
		data: publisher,
	});
};

export const deletePublisher = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const publisher = await prisma.publisher.delete({
		where: {
			id: parseInt(id),
		},
	});
	res.status(200).json({
		message: "Successfully deleted publisher",
		data: publisher,
	});
};
