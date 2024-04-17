import express from "express";

import {
	getInventory,
	getInventoryItem,
	updateInventoryItem,
	createInventoryItem,
	deleteInventoryItem,
	getInventoryByBookId,
	getInventoryByBookTitle,
	getInventoryByBookIds,
	getInventoryByQuantity,
	getInventoryByQuantityRange,
} from "../controller/book/inventory";

export default (router: express.Router) => {
	router.get("/inventory/", getInventory);
	router.post("/inventory/bookIds", getInventoryByBookIds);
	router.get("/inventory/quantity/:quantity", getInventoryByQuantity);
	router.get(
		"/inventory/quantityRange/:min/:max",
		getInventoryByQuantityRange
	);
	router.get("/inventory/book/:bookId", getInventoryByBookId);
	router.get("/inventory/bookTitle/:title", getInventoryByBookTitle);
	router.get("/inventory/:id", getInventoryItem);
	router.put("/inventory/:id", updateInventoryItem);
	router.post("/inventory", createInventoryItem);
	router.delete("/inventory/:id", deleteInventoryItem);
};
