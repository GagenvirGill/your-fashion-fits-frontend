"use server";

import { backendGet, backendPost, backendDelete } from "@/api/backendClient";

export async function getAllCategories() {
	const data = await backendGet("/category");
	if (data.success) return data.data;
	throw new Error(data.message);
}

export async function createCategory(name: string) {
	const data = await backendPost("/category", { name });
	if (data.success === false) throw new Error(data.message);
	return data.success;
}

export async function deleteCategory(categoryId: string) {
	const data = await backendDelete(`/category/${categoryId}`);
	if (data.success === false) throw new Error(data.message);
	return data.success;
}

export async function addCategoryToItems(categoryId: string, items: string[]) {
	const data = await backendPost(`/category/${categoryId}/items`, { items });
	if (data.success === false) throw new Error(data.message);
	return data.success;
}

export async function removeCategoryFromItems(categoryId: string, items: string[]) {
	const data = await backendDelete(`/category/${categoryId}/items`, { items });
	if (data.success === false) throw new Error(data.message);
	return data.success;
}

export async function setCategoriesFavItem(categoryId: string, itemId: string) {
	const data = await backendPost(`/category/${categoryId}/fav-item/${itemId}`, {});
	if (data.success === false) throw new Error(data.message);
	return data.success;
}
