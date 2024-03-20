import express from "express";
import { prisma } from "../../db/client";

export const createContact = async (req: express.Request, res: express.Response) => {
	const body = req.body;
    const ip= req.ip;
    const name = body.name;
    const email = body.email;
    const message = body.message;

    const contact = await prisma.contact.create({
        data:{
        name : name,
        email: email,
        message: message,
        ip: ip,
        }
    })
	res.status(200).json(contact);
};
