"use client";

import React, { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { itemsAtom } from "@/jotai/itemsAtom";
import { outfitsAtom } from "@/jotai/outfitsAtom";
import styles from "./CardDisplayStyles.module.css";

import { filterItemsByCategories } from "@/api/actions/item";

import Button from "../buttons/Button";
import ItemCard from "../card/ItemCard";
import ItemSortByForm from "../popupForms/itemsPage/ItemSortByForm";

import { sortItems } from "@/lib/item-utils";

const calculateLoadAmount = () => {
	if (typeof window === "undefined") return 20;
	const baseAmount = Math.floor((window.innerWidth * 0.9) / 160) * 4;
	return baseAmount > 40 ? baseAmount / 2 : baseAmount;
};

const ItemCardDisplay = ({ selectedCategories }) => {
	const items = useAtomValue(itemsAtom);
	const outfits = useAtomValue(outfitsAtom);

	const [displayItems, setDisplayItems] = useState([]);
	const [sortedDisplayItems, setSortedDisplayItems] = useState([]);
	const [visibleCount, setVisibleCount] = useState(calculateLoadAmount());
	const [sortOption, setSortOption] = useState("none");

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + calculateLoadAmount());
	};

	useEffect(() => {
		if (selectedCategories && selectedCategories.length > 0) {
			filterItemsByCategories(selectedCategories)
				.then((fetchedItems) => {
					setDisplayItems(fetchedItems);
				})
				.catch((err) => {
					console.log(`Error loading items: ${err}`);
				});
		} else {
			setDisplayItems(items);
		}
	}, [selectedCategories, items]);

	useEffect(() => {
		const sortedItems = sortItems(outfits, displayItems, sortOption);
		setVisibleCount(calculateLoadAmount());
		setSortedDisplayItems(sortedItems);
	}, [displayItems, sortOption]);

	useEffect(() => {
		const handleUpdateLoadAmount = () => {
			const newAmount = calculateLoadAmount();
			setVisibleCount(newAmount);
		};

		window.addEventListener("resize", handleUpdateLoadAmount);
		return () =>
			window.removeEventListener("resize", handleUpdateLoadAmount);
	}, []);

	return (
		<>
			<ItemSortByForm setSortOption={setSortOption} />
			<br />
			<br />
			<div className={styles.cardDisplay}>
				{sortedDisplayItems.slice(0, visibleCount).map((item) => (
					<ItemCard
						key={`${item.itemId}-${selectedCategories}`}
						itemId={item.itemId}
						imagePath={item.imagePath}
					/>
				))}
			</div>
			<br />
			{visibleCount < displayItems.length && (
				<Button
					type="submit"
					text="Load More"
					onClick={handleLoadMore}
				/>
			)}
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
};

export default ItemCardDisplay;
