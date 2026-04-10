"use server";

import { get, post, del } from "@/api/client";

export async function getAllCategories() {
	const data = await get("/category");

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.data;
}

export async function createCategory(name: string) {
	const data = await post("/category", { name });

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.success;
}

export async function deleteCategory(categoryId: string) {
	const data = await del(`/category/${categoryId}`);

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.success;
}

export async function addCategoryToItems(categoryId: string, items: string[]) {
	const data = await post(`/category/${categoryId}/items`, { items });

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.success;
}

export async function removeCategoryFromItems(categoryId: string, items: string[]) {
	const data = await del(`/category/${categoryId}/items`, { items });

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.success;
}

export async function setCategoriesFavItem(categoryId: string, itemId: string) {
	const data = await post(`/category/${categoryId}/fav-item/${itemId}`, {});

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.success;
}
