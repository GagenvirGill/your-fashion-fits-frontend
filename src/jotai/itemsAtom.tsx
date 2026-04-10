import { atom } from "jotai";
import type { Item } from "@/types/item";
import { getAllItems } from "@/api/actions/item";

export const itemsAtom = atom<Item[]>([]);
export const itemsLoadingAtom = atom<boolean>(true);

export const refetchItemsAtom = atom(null, async (get, set) => {
	try {
		const data = await getAllItems();
		set(itemsAtom, data);
	} catch (err) {
		console.error("Error fetching items:", err);
	}
});
