import express from "express";
import { prisma } from "../../db/client";
import { getUserBySessionToken } from "../user/authentication";

export const createContact = async (
	req: express.Request,
	res: express.Response
) => {
	const { body } = req;
	const { name, email, message, type } = body;
	let ip = Array.isArray(req.headers["x-forwarded-for"])
		? req.headers["x-forwarded-for"][0]
		: req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;

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

export const contactCount = async (
	req: express.Request,
	res: express.Response
) => {
	const { session } = req.headers;
	const user = await getUserBySessionToken(session as string);
    const type = String(req.query.type ?? "");

	if (!user || user.role !== "admin") {
		return res.status(401).json({ message: "Unauthorized" });
	}
    
	const count = type.length ? await prisma.contact.count({
		where: {
			type: type
		}
	}) : await prisma.contact.count();
	res.status(200).json({ message: "Successfully fetched count", data: count });
};

export const getAvgUserContact = async (req: express.Request, res: express.Response) => {
    const { session } = req.headers;
	const user = await getUserBySessionToken(session as string);
	if(!user || user.role !== "admin"){
       return res.status(401).json({ message: "Unauthorized" });
	}

	const feedbacks = await prisma.$queryRaw`
	  SELECT AVG(avg_user_rating) AS avg 
	  FROM (SELECT ip, CAST(COUNT(*) AS FLOAT) AS avg_user_rating
	        FROM Contact
			GROUP BY ip);
	`;
	console.log(feedbacks);
	res.status(200).json({message: "Successfully fetched average contact per user", data: feedbacks });
}

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
