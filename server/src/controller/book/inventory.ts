/* 
 model Inventory {
  id       Int  @id @default(autoincrement())
  bookId   Int
  quantity Int
  Book     Book @relation(fields: [bookId], references: [id])
}
*/
import express from "express";
import { prisma } from "../../db/client";
import { getUserBySessionToken } from "../user/authentication";

export const getInventory = async (
	req: express.Request,
	res: express.Response
) => {
	const { limit, offset } = req.query;
	const limitNumber = Number.parseInt(String(limit));
	const offsetNumber = Number.parseInt(String(offset));
	const inventory = await prisma.inventory.findMany({
		take: limitNumber,
		skip: offsetNumber,
	});

	res.status(200).json(inventory);
};

export const getInventoryItem = async (
	req: express.Request,
	res: express.Response
) => {
	const { id } = req.params;

	const inventoryItem = await prisma.inventory.findFirst({
		where: {
			id: Number.parseInt(id),
		},
	});
	res.status(200).json(inventoryItem);
};

export const updateInventoryItem = async (
	req: express.Request,
	res: express.Response
) => {
	const { session } = req.headers;
	const { id } = req.params;
	const user = await getUserBySessionToken(session as string);
	if (!user || user.role !== "admin") {
		return res.status(401).json({ message: "Unauthorized" });
	}
	const inventoryItem = await prisma.inventory.findFirst({
		where: {
			id: Number.parseInt(id),
		},
	});
	if (!inventoryItem) {
		return res
			.status(401)
			.json({ message: "Inventory item does not exist" });
	}
	const { quantity } = req.body;

	await prisma.inventory.update({
		where: {
			id: Number.parseInt(id),
		},
		data: {
			quantity,
		},
	});

	res.status(200).json({ message: "Successfully updated inventory item" });
};

export const createInventoryItem = async (
	req: express.Request,
	res: express.Response
) => {
	const { session } = req.headers;
	const user = await getUserBySessionToken(session as string);
	if (!user || user.role !== "admin") {
		return res.status(401).json({ message: "Unauthorized" });
	}
	const { bookId, quantity } = req.body;

	const inventoryItem = await prisma.inventory.create({
		data: {
			bookId,
			quantity,
		},
	});

	res.status(201).json({ inventoryItem });
};

export const deleteInventoryItem = async (
	req: express.Request,
	res: express.Response
) => {
	const { session } = req.headers;
	const { id } = req.params;
	const user = await getUserBySessionToken(session as string);
	if (!user || user.role !== "admin") {
		return res.status(401).json({ message: "Unauthorized" });
	}
	const inventoryItem = await prisma.inventory.findFirst({
		where: {
			id: Number.parseInt(id),
		},
	});
	if (!inventoryItem) {
		return res
			.status(401)
			.json({ message: "Inventory item does not exist" });
	}

	await prisma.inventory.delete({
		where: {
			id: Number.parseInt(id),
		},
	});

	res.status(200).json({ message: "Successfully deleted inventory item" });
};

export const getInventoryByBookId = async (
	req: express.Request,
	res: express.Response
) => {
	const { bookId } = req.params;

	const inventory = await prisma.inventory.findFirst({
		where: {
			bookId: Number.parseInt(bookId),
		},
	});
	res.status(200).json(inventory);
};

export const getInventoryByBookIds = async (
	req: express.Request,
	res: express.Response
) => {
	const { bookIds } = req.body;

	const inventory = await prisma.inventory.findMany({
		where: {
			bookId: {
				in: bookIds,
			},
		},
	});
	res.status(200).json(inventory);
};

export const getInventoryByQuantity = async (
	req: express.Request,
	res: express.Response
) => {
	const { quantity } = req.params;

	const inventory = await prisma.inventory.findMany({
		where: {
			quantity: Number.parseInt(quantity),
		},
	});
	res.status(200).json(inventory);
};

export const getInventoryByQuantityRange = async (
	req: express.Request,
	res: express.Response
) => {
	const { min, max } = req.params;

	const inventory = await prisma.inventory.findMany({
		where: {
			quantity: {
				gte: Number.parseInt(min),
				lte: Number.parseInt(max),
			},
		},
	});
	res.status(200).json(inventory);
};

export const getInventoryByBookTitle = async (
	req: express.Request,
	res: express.Response
) => {
	const { title } = req.params;

	const inventory = await prisma.inventory.findMany({
		where: {
			Book: {
				title: {
					contains: title,
				},
			},
		},
	});
	res.status(200).json(inventory);
};
