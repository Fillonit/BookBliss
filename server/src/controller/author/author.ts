import { Author } from "@prisma/client";
import { prisma } from "../../db/client";
import express from 'express';


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