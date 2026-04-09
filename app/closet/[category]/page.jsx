"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import CategoryView from "../../../src/views/CategoryView";
import { useAuth } from "../../AuthContext";

export default function CategoryPage() {
	const { category } = useParams();
	const { isAuthenticated, initialCategState } = useAuth();
	const { categories } = useSelector((state) => state.categories);

	const matchedCategory = categories.find(
		(cat) => cat.name.toLowerCase().replace(/\s+/g, "") === category
	);

	useEffect(() => {
		if (matchedCategory) {
			document.title = `${matchedCategory.name} | Your Fashion Fits`;
		}
	}, [matchedCategory]);

	if (!isAuthenticated || !initialCategState) {
		return null;
	}

	if (!matchedCategory) {
		return null;
	}

	return (
		<CategoryView
			categoryId={matchedCategory.categoryId}
			categoryName={matchedCategory.name}
		/>
	);
}
