"use client";

import type { ReactNode } from "react";
import { atom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import type { Category } from "@/types/category";

export const categoriesAtom = atom<Category[]>([]);

interface HydrateCategoriesProps {
	categories: Category[];
	children: ReactNode;
}

export function HydrateCategories({ categories, children }: HydrateCategoriesProps) {
	useHydrateAtoms([[categoriesAtom, categories]]);
	return children;
}
