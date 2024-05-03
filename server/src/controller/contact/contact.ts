import express from "express";
import { prisma } from "../../db/client";

export const createContact = async (
	req: express.Request,
	res: express.Response
) => {
	const { body } = req;
	const { name, email, message, type } = body;
	const ip = req.headers["x-forwarded-for"]?.toString() ?? req.ip.toString();

	const contact = await prisma.contact.create({
		data: {
			name: name,
			email: email,
			message: message,
			type: type,
			ip: ip,
		},
	});
	res.status(200).json(contact);
};

export const getContacts = async (
	req: express.Request,
	res: express.Response
) => {
	const contacts = await prisma.contact.findMany();
	res.status(200).json(contacts);
};

export const getContact = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const contact = await prisma.contact.findFirst({
		where: {
			id: parseInt(id),
		},
	});
	res.status(200).json(contact);
};

export const deleteContact = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const contact = await prisma.contact.delete({
		where: {
			id: parseInt(id),
		},
	});
	res.status(200).json(contact);
};

export const updateContact = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;
	const { name, email, message } = req.body;

	const contact = await prisma.contact.update({
		where: {
			id: parseInt(id),
		},
		data: {
			name: name,
			email: email,
			message: message,
		},
	});
	res.status(200).json(contact);
};
