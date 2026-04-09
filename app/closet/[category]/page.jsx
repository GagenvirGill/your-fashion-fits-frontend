"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import CategoryView from "../../../src/views/CategoryView";

export default function CategoryPage() {
	const { category } = useParams();
	const { status } = useSession();
	const isAuthenticated = status === "authenticated";
	const { categories } = useSelector((state) => state.categories);

	const matchedCategory = categories.find(
		(cat) => cat.name.toLowerCase().replace(/\s+/g, "") === category
	);

	useEffect(() => {
		if (matchedCategory) {
			document.title = `${matchedCategory.name} | Your Fashion Fits`;
		}
	}, [matchedCategory]);

	if (!isAuthenticated) {
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
