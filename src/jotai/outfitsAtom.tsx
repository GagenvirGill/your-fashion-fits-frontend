import { atom } from "jotai";
import type { Outfit } from "@/types/outfit";
import { getAllOutfits } from "@/api/actions/outfit";

export const outfitsAtom = atom<Outfit[]>([]);
export const outfitsLoadingAtom = atom<boolean>(true);

export const refetchOutfitsAtom = atom(null, async (get, set) => {
	try {
		const data = await getAllOutfits();
		set(outfitsAtom, data);
	} catch (err) {
		console.error("Error fetching outfits:", err);
	}
});
