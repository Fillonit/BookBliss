import { Author } from "@prisma/client";
import { prisma } from "../../db/client";
import express from 'express';
import { getUserBySessionToken } from "../user/authentication";


export const getAuthors = async (
    req: express.Request,
    res: express.Response
) => {
    const authors = await prisma.author.findMany();
    res.status(200).json(authors);
};

export const getAuthor = async (
    req: express.Request,
    res: express.Response
) => {
    const { id } = req.params;
    const author = await prisma.author.findUnique({
        where: { id: parseInt(id) },
    });
    res.status(200).json(author);
};

export const createAuthor = async (
    req: express.Request,
    res: express.Response
) => {
    const { name, id }: Author = req.body;
    const newAuthor = await prisma.author.create({
        data: { name, id },
    });
    res.status(201).json(newAuthor);
};

export const updateAuthor = async (
    req: express.Request,
    res: express.Response
) => {
    const { authorId } = req.params;
    const { name, id }: Author = req.body;
    const updatedAuthor = await prisma.author.update({
        where: { id: parseInt(authorId) },
        data: { name, id },
    });
    res.status(200).json(updatedAuthor);
};

export const deleteAuthor = async (
    req: express.Request,
    res: express.Response
) => {
    const { id } = req.params;
    const deletedAuthor = await prisma.author.delete({
        where: { id: parseInt(id) },
    });
    res.status(200).json(deletedAuthor);
};

export const applyForAuthor = async (
    req: express.Request,
    res: express.Response
) => {
    const { session } = req.headers;
    const user = await getUserBySessionToken(session as string);
    if (!user) {
        return res
            .status(401)
            .json({ message: "You must be logged in to apply for author" });
    }
    if(user.role !== 'user') return res.status(400).json({message: "You must be a user to apply for author"})
    if(Array.isArray(req.files)){
        return res.status(400).json({message: "Files were not in the correct format"})
    }

    const {fullName, email, phone, currentCompany, genre, previousPublications} = req.body;

    const pfpName = req.files["pfp"][0].filename;
    const writingSampleName = req.files["writingSample"][0].filename;
    const identificationName = req.files["identification"][0].filename;
    const applicationCount = await prisma.authorApplication.count({
        where: {
            userId: user.id,
        },
    });
    if (applicationCount > 0) {
        return res
            .status(400)
            .json({ message: "You have already applied for author" });
    }
    
    await prisma.authorApplication.create({
        data: {
            userId: user.id,
            identification: identificationName,
            writingSample: writingSampleName,
            pfpLink: pfpName,
            fullName: fullName,
            email: email,
            phone: phone,
            currentCompany: currentCompany,
            genre: genre,
            previousPublications: previousPublications,
        },
    });
    res.status(200).json({ message: "Successfully applied for author" });
}
