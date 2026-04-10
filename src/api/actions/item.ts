"use server";

import { get, post, del } from "@/api/client";

export async function getAllItems() {
	const data = await get("/item");

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.data;
}

export async function createItem(formData: FormData) {
	const data = await post("/item", formData, { isFormData: true });

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.success;
}

export async function deleteItem(itemId: string) {
	const data = await del(`/item/${itemId}`);

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.success;
}

export async function getCategoriesForItem(itemId: string) {
	const data = await get(`/item/${itemId}/categories`);

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.data;
}

export async function filterItemsByCategories(categories: string[]) {
	const data = await get("/item", { categories: categories.join(",") });

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.data;
}

export async function addItemToCategories(itemId: string, categories: string[]) {
	const data = await post(`/item/${itemId}/categories`, { categories });

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.success;
}

export async function removeItemFromCategories(itemId: string, categories: string[]) {
	const data = await del(`/item/${itemId}/categories`, { categories });

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.success;
}

export async function getRandomItemWithCategories(categories: string[]) {
	const data = await get("/item/random", { categories: categories.join(",") });

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.data;
}
