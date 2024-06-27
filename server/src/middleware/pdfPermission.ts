import { NextFunction, Request, Response } from "express";
import path from "path"
import fs from "fs";
import { prisma } from "../db/client"
import { getUserBySessionToken } from "../controller/user/authentication";

const pdfPath = path.join(__dirname, '../pdfs');
const serveFilesWithCondition = async (req: Request, res: Response, next: NextFunction) => {
    const filePath = path.join(pdfPath, req.path);
    const fileExists = fs.existsSync(filePath);

    if(!fileExists) return res.status(404).json({ message: 'File not found' });
    
    const book = await prisma.book.findFirst({
        where: {
            pdfLink: {
                equals: req.path
            }
        }
    });
    if(!book) return res.status(404).json({ message: 'Book not found with that link' });
    
    if(book.price === 0) return res.sendFile(filePath);

    const {session} = req.headers;
    if(!session) return res.status(401).json({ message: 'Unauthorized' });
    const user = await getUserBySessionToken(session as string);
    if(!user) return res.status(401).json({ message: 'Unauthorized' });

    const order = await prisma.orderItem.findFirst({
        where: {
            bookId: book.id,
            Order: {
                userId: user.id
            }
        }
    })
    if(!order) return res.status(401).json({ message: "Unauthorized, you haven't purchased this book." });

    res.sendFile(filePath);
};
export default serveFilesWithCondition;