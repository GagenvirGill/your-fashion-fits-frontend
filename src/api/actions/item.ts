"use server";

import { backendGet, backendPost, backendDelete } from "@/api/backendClient";

export async function getAllItems() {
	const data = await backendGet("/item");
	if (data.success) return data.data;
	throw new Error(data.message);
}

export async function createItem(formData: FormData) {
	const data = await backendPost("/item", formData, { isFormData: true });
	if (data.success === false) throw new Error(data.message);
	return data.success;
}

export async function deleteItem(itemId: string) {
	const data = await backendDelete(`/item/${itemId}`);
	if (data.success === false) throw new Error(data.message);
	return data.success;
}

export async function getCategoriesForItem(itemId: string) {
	const data = await backendGet(`/item/${itemId}/categories`);
	if (data.success) return data.data;
	throw new Error(data.message);
}

export async function filterItemsByCategories(categories: string[]) {
	const data = await backendGet("/item", { categories: categories.join(",") });
	if (data.success) return data.data;
	throw new Error(data.message);
}

export async function addItemToCategories(itemId: string, categories: string[]) {
	const data = await backendPost(`/item/${itemId}/categories`, { categories });
	if (data.success === false) throw new Error(data.message);
	return data.success;
}

export async function removeItemFromCategories(itemId: string, categories: string[]) {
	const data = await backendDelete(`/item/${itemId}/categories`, { categories });
	if (data.success === false) throw new Error(data.message);
	return data.success;
}

export async function getRandomItemWithCategories(categories: string[]) {
	const data = await backendGet("/item/random", { categories: categories.join(",") });
	if (data.success) return data.data;
	throw new Error(data.message);
}
