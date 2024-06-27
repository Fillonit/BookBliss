import multer from "multer";
import express from "express";
import path from "path";

const destinationDirectory = path.join(__dirname, "../attachments");
const pdfDirectory = path.join(__dirname, "../pdfs");
const privateDirectory = path.join(__dirname, "../private");

const storage = multer.diskStorage({
	destination: (req: express.Request, file: Express.Multer.File, cb) => {
		if (file.fieldname === "pdf") cb(null, pdfDirectory);
		else if (file.fieldname === "cover") cb(null, destinationDirectory);
		else cb(null, privateDirectory);
	},
	filename: (req: express.Request, file: Express.Multer.File, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const upload = multer({ storage: storage });

export default upload;
