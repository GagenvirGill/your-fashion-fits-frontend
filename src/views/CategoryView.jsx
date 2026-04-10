"use client";

import React, { useEffect } from "react";
import { useAtomValue } from "jotai";
import { categoriesAtom, categoriesLoadingAtom } from "@/jotai/categories-atom";
import styles from "./GenericPageStyles.module.css";

import ItemCardDisplay from "../components/cardDisplay/ItemCardDisplay";

const CategoryView = ({ slug }) => {
	const categories = useAtomValue(categoriesAtom);
	const loading = useAtomValue(categoriesLoadingAtom);

	const matchedCategory = categories.find(
		(cat) => cat.name.toLowerCase().replace(/\s+/g, "") === slug
	);

	useEffect(() => {
		if (matchedCategory) {
			document.title = `${matchedCategory.name} | Your Fashion Fits`;
		}
	}, [matchedCategory]);

	if (loading) return null;
	if (!matchedCategory) return null;

	return (
		<div className={styles.pageContainer}>
			<div className={styles.pageTitle}>{`'${matchedCategory.name}' Items`}</div>
			<br />
			<ItemCardDisplay selectedCategories={[matchedCategory.categoryId]} />
		</div>
	);
};

export default CategoryView;
