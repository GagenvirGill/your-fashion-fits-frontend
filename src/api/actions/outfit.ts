"use server";

import { backendGet, backendPost, backendDelete } from "@/api/backendClient";

export async function getAllOutfits() {
	const data = await backendGet("/outfit");
	if (data.success) return data.data;
	throw new Error(data.message);
}

export async function createOutfit(dateWorn: string, description: string, items: string[]) {
	const data = await backendPost("/outfit", { dateWorn, description, items });
	if (data.success === false) throw new Error(data.message);
	return data.success;
}

export async function deleteOutfit(outfitId: string) {
	const data = await backendDelete(`/outfit/${outfitId}`);
	if (data.success === false) throw new Error(data.message);
	return data.success;
}

export async function searchOutfits(query: string) {
	const data = await backendGet("/outfit/search", { query });
	if (data.success) return data.data;
	throw new Error(data.message);
}
