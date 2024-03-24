import multer from "multer";
import express from "express";
import path from "path";

const storage = multer.diskStorage({
    destination: (req: express.Request, file: Express.Multer.File , cb) => {
        cb(null, '../attachments');
    },
    filename: (req: express.Request, file: Express.Multer.File, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;