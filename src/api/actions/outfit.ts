"use server";

import { get, post, del } from "@/api/client";

export async function getAllOutfits() {
	const data = await get("/outfit");

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.data;
}

export async function createOutfit(dateWorn: string, description: string, items: string[]) {
	const data = await post("/outfit", { dateWorn, description, items });

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.success;
}

export async function deleteOutfit(outfitId: string) {
	const data = await del(`/outfit/${outfitId}`);

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.success;
}

export async function searchOutfits(query: string) {
	const data = await get("/outfit/search", { query });

	if (!data.success) {
		throw new Error(data.message);
	}

	return data.data;
}
