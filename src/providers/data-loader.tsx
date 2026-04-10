"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { itemsAtom, itemsLoadingAtom, refetchItemsAtom } from "@/jotai/items-atom";
import { categoriesAtom, categoriesLoadingAtom, refetchCategoriesAtom } from "@/jotai/categories-atom";
import { outfitsAtom, outfitsLoadingAtom, refetchOutfitsAtom } from "@/jotai/outfits-atom";

interface DataLoaderProps {
	children: ReactNode;
}

export default function DataLoader({ children }: DataLoaderProps) {
	const { status } = useSession();
	const isAuthenticated = status === "authenticated";

	const setItems = useSetAtom(itemsAtom);
	const setItemsLoading = useSetAtom(itemsLoadingAtom);
	const setCategories = useSetAtom(categoriesAtom);
	const setCategoriesLoading = useSetAtom(categoriesLoadingAtom);
	const setOutfits = useSetAtom(outfitsAtom);
	const setOutfitsLoading = useSetAtom(outfitsLoadingAtom);

	const refetchItems = useSetAtom(refetchItemsAtom);
	const refetchCategories = useSetAtom(refetchCategoriesAtom);
	const refetchOutfits = useSetAtom(refetchOutfitsAtom);

	useEffect(() => {
		if (!isAuthenticated) {
			setItems([]);
			setCategories([]);
			setOutfits([]);
			setItemsLoading(false);
			setCategoriesLoading(false);
			setOutfitsLoading(false);
			return;
		}

		Promise.all([
			refetchItems(),
			refetchCategories(),
			refetchOutfits(),
		]).finally(() => {
			setItemsLoading(false);
			setCategoriesLoading(false);
			setOutfitsLoading(false);
		});
	}, [isAuthenticated]);

	return children;
}
