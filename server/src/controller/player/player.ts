import express from "express";
import { prisma } from "../../db/client";
import { authentication, random } from "../../util";

export const getPlayers = async (
	req: express.Request,
	res: express.Response
) => {
	const players = await prisma.player.findMany();
	res.status(200).json(players);
};

export const getPlayerById = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;

	const player = await prisma.player.findUnique({
		where: {
			PlayerId: id,
		},
	});
	res.status(200).json(player);
};

export const createPlayer = async (
	req: express.Request,
	res: express.Response
) => {
	const { Name, TeamId, Number, BirthYear } = req.body;

	try {
		const player = await prisma.player.create({
			data: {
				Name,
				TeamId,
				Number,
				BirthYear,
			},
		});
		res.status(200).json(player);
	} catch (error) {
		console.error("Failed to create player:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deletePlayer = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const player = await prisma.player.delete({
		where: {
			PlayerId: id,
		},
	});
	res.status(200).json(player);
};

export const updatePlayer = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const { body } = req;
	const { Name, TeamId, Number, BirthYear } = body;

	const player = await prisma.player.update({
		where: {
			PlayerId: id,
		},
		data: {
			Name,
			TeamId,
			Number,
			BirthYear,
		},
	});
	res.status(200).json(player);
};

export const getPlayerByBirthYear = async (
	req: express.Request,
	res: express.Response
) => {
	const { year } = req.params;
	const players = await prisma.player.findMany({
		where: {
			BirthYear: parseInt(year),
		},
	});
	res.status(200).json(players);
};
