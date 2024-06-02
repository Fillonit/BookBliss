import express from "express";
import { prisma } from "../../db/client";

export const getSubscribers = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const subscribers = await prisma.subscriber.findMany();
		res.status(200).json({
			message: "Successfully fetched data",
			data: subscribers,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error fetching subscribers",
			error: error.message,
		});
	}
};

export const getSubscriberById = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	try {
		const subscriber = await prisma.subscriber.findUnique({
			where: {
				id: parseInt(id),
			},
		});
		if (subscriber) {
			res.status(200).json(subscriber);
		} else {
			res.status(404).json({ message: "Subscriber not found" });
		}
	} catch (error) {
		res.status(500).json({
			message: "Error fetching subscriber",
			error: error.message,
		});
	}
};

export const createSubscriber = async (
	req: express.Request,
	res: express.Response
) => {
	const { email } = req.body;
	try {
		const subscriber = await prisma.subscriber.create({
			data: {
				email,
			},
		});
		res.status(201).json({
			message: "Successfully subscribed",
			data: subscriber,
		});
	} catch (error) {
		console.error("Error creating subscriber:", error);
		res.status(500).json({
			message: "Error creating subscriber",
			error: error.message,
		});
	}
};

export const deleteSubscriber = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	try {
		const subscriber = await prisma.subscriber.delete({
			where: {
				id: parseInt(id),
			},
		});
		res.status(200).json({
			message: "Successfully deleted subscriber",
			data: subscriber,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error deleting subscriber",
			error: error.message,
		});
	}
};

export const updateSubscriber = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const { email } = req.body;
	try {
		const subscriber = await prisma.subscriber.update({
			where: {
				id: parseInt(id),
			},
			data: {
				email,
			},
		});
		res.status(200).json({
			message: "Successfully updated subscriber",
			data: subscriber,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error updating subscriber",
			error: error.message,
		});
	}
};
