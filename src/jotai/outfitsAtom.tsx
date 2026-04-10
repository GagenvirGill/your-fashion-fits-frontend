"use client";

import type { ReactNode } from "react";
import { atom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import type { Outfit } from "@/types/outfit";

export const outfitsAtom = atom<Outfit[]>([]);

interface HydrateOutfitsProps {
	outfits: Outfit[];
	children: ReactNode;
}

export function HydrateOutfits({ outfits, children }: HydrateOutfitsProps) {
	useHydrateAtoms([[outfitsAtom, outfits]]);
	return children;
}
