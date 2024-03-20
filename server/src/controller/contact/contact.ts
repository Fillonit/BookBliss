import express from "express";
import { prisma } from "../../db/client";

export const createContact = async (
	req: express.Request,
	res: express.Response
) => {
	const { body, ip } = req;
	const { name, email, message } = body;

	const contact = await prisma.contact.create({
		data: {
			name: name,
			email: email,
			message: message,
			ip: ip,
		},
	});
	res.status(200).json(contact);
};
