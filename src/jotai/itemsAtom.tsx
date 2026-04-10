"use client";

import type { ReactNode } from "react";
import { atom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import type { Item } from "@/types/item";

export const itemsAtom = atom<Item[]>([]);

interface HydrateItemsProps {
	items: Item[];
	children: ReactNode;
}

export function HydrateItems({ items, children }: HydrateItemsProps) {
	useHydrateAtoms([[itemsAtom, items]]);
	return children;
}
