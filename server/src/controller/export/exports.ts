import express from "express";
import { prisma } from "../../db/client";
import { parse as json2csv } from "json2csv";
import xmlbuilder from "xmlbuilder";
import yaml from "js-yaml";
import { Document } from "pdfkit";

export const exportJSON = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const data = req.body;
		if (!data) {
			return res.status(400).json({ message: "No data found" });
		}

		if (typeof data !== "object") {
			return res.status(400).json({ message: "Data must be an object" });
		}

		const processedData = JSON.stringify(data);

		res.setHeader(
			"Content-disposition",
			`attachment; filename=${new Date().toISOString()}.json`
		);
		res.setHeader("Content-type", "application/json");

		res.send(processedData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to export JSON",
			message: error.message,
		});
	}
};

export const exportCSV = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const data = req.body;
		if (!data) {
			return res.status(400).json({ message: "No data found" });
		}

		const csv = json2csv(data);

		res.setHeader(
			"Content-disposition",
			`attachment; filename=${new Date().toISOString()}.csv`
		);
		res.setHeader("Content-type", "text/csv");

		res.send(csv);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to export CSV",
			message: error.message,
		});
	}
};

export const exportXML = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const data = req.body;
		if (!data) {
			return res.status(400).json({ message: "No data found" });
		}

		const xml = xmlbuilder.create({ data }).end({ pretty: true });

		res.setHeader(
			"Content-disposition",
			`attachment; filename=${new Date().toISOString()}.xml`
		);
		res.setHeader("Content-type", "application/xml");

		res.send(xml);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to export XML",
			message: error.message,
		});
	}
};

export const exportYAML = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const data = req.body;
		if (!data) {
			return res.status(400).json({ message: "No data found" });
		}

		const yamlData = yaml.dump(data);

		res.setHeader(
			"Content-disposition",
			`attachment; filename=${new Date().toISOString()}.yaml`
		);
		res.setHeader("Content-type", "application/x-yaml");

		res.send(yamlData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to export YAML",
			message: error.message,
		});
	}
};
export const exportAll = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const data = req.body;
		if (!data) {
			return res.status(400).json({ message: "No data found" });
		}

		const json = JSON.stringify(data);
		const csv = json2csv(data);
		const xml = xmlbuilder.create({ data }).end({ pretty: true });
		const yamlData = yaml.dump(data);

		res.setHeader(
			"Content-disposition",
			`attachment; filename=${new Date().toISOString()}.zip`
		);
		res.setHeader("Content-type", "application/zip");

		res.send({ json, csv, xml, yamlData });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to export all formats",
			message: error.message,
		});
	}
};

export const getExportFormats = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const formats = [
			{
				name: "JSON",
				type: "application/json",
				endpoint: "/export/json",
			},
			{
				name: "CSV",
				type: "text/csv",
				endpoint: "/export/csv",
			},
			{
				name: "XML",
				type: "application/xml",
				endpoint: "/export/xml",
			},
			{
				name: "YAML",
				type: "application/x-yaml",
				endpoint: "/export/yaml",
			},
			{
				name: "All",
				type: "application/zip",
				endpoint: "/export/all",
			},
		];

		res.json(formats);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to get export formats",
			message: error.message,
		});
	}
};

export const exportPDF = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const data = req.body;
		if (!data) {
			return res.status(400).json({ message: "No data found" });
		}

		const pdf = new PDFDocument();
		pdf.pipe(res);

		pdf.fontSize(25).text("Exported Data", {
			align: "center",
		});

		pdf.moveDown();
		pdf.fontSize(15).text(JSON.stringify(data, null, 4));

		pdf.end();
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "Failed to export PDF",
			message: error.message,
		});
	}
};
