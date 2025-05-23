import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardDisplayStyles.module.css";

import { filterItemsByCategories } from "../../api/Item";

import Button from "../buttons/Button";
import ItemCard from "../card/ItemCard";
import ItemSortByForm from "../popupForms/itemsPage/ItemSortByForm";

import { sortItems } from "../../util/Item";

const calculateLoadAmount = () => {
	const baseAmount = Math.floor((window.innerWidth * 0.9) / 160) * 4;
	return baseAmount > 40 ? baseAmount / 2 : baseAmount;
};

const ItemCardDisplay = ({ selectedCategories }) => {
	const dispatch = useDispatch();

	const { items } = useSelector((state) => state.items);
	const { outfits } = useSelector((state) => state.outfits);

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
	}, [dispatch, selectedCategories, items]);

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
