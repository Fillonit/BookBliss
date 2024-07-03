import express from "express";
import { prisma } from "../../db/client";
import { authentication, random } from "../../util";
import { getPlayers } from "../player/player";

export const getTeams = async (req: express.Request, res: express.Response) => {
	const teams = await prisma.team.findMany();
	res.status(200).json(teams);
};

export const getTeamById = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;

	const team = await prisma.team.findUnique({
		where: {
			TeamId: id,
		},
	});
	res.status(200).json(team);
};

export const createTeam = async (
	req: express.Request,
	res: express.Response
) => {
	const { Name } = req.body;

	try {
		const team = await prisma.team.create({
			data: {
				Name,
			},
		});
		res.status(200).json(team);
	} catch (error) {
		console.error("Failed to create team:", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const deleteTeam = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const existingTeam = await prisma.team.findUnique({
		where: {
			TeamId: id,
		},
	});

	if (!existingTeam) {
		return res.status(404).json({ error: "Team not found" });
	}

	const team = await prisma.team.delete({
		where: {
			TeamId: id,
		},
	});
	res.status(200).json(team);
};

export const updateTeam = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const { body } = req;
	const { Name } = body;

	const team = await prisma.team.update({
		where: {
			TeamId: id,
		},
		data: {
			Name,
		},
	});
	res.status(200).json(team);
};

export const getPlayersByTeamId = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const players = await prisma.player.findMany({
		where: {
			TeamId: id,
		},
	});
	res.status(200).json(players);
};

export const addPlayerToTeam = async (
	req: express.Request,
	res: express.Response
) => {
	const { TeamId, PlayerId } = req.body;

	const team = await prisma.team.update({
		where: {
			TeamId,
		},
		data: {
			Player: {
				connect: {
					PlayerId,
				},
			},
		},
	});
	res.status(200).json(team);
};
