import multer from "multer";
import express from "express";
import path from "path";

const destinationDirectory = path.join(__dirname, '../attachments');

const storage = multer.diskStorage({
    destination: (req: express.Request, file: Express.Multer.File , cb) => {
        cb(null, destinationDirectory);
    },
    filename: (req: express.Request, file: Express.Multer.File, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;