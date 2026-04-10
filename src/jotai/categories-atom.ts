import { atom } from "jotai";
import type { Category } from "@/types/category";
import { getAllCategories } from "@/api/actions/category";

export const categoriesAtom = atom<Category[]>([]);
export const categoriesLoadingAtom = atom<boolean>(true);

export const refetchCategoriesAtom = atom(null, async (get, set) => {
	try {
		const data = await getAllCategories();
		set(categoriesAtom, data);
	} catch (err) {
		console.error("Error fetching categories:", err);
	}
});
