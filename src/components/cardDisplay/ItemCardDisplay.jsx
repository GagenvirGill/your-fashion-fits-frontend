import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardDisplayStyles.module.css";

import { filterItemsByCategories } from "../../api/Item";

import Button from "../buttons/Button";
import ItemCard from "../card/ItemCard";
import ItemSortByForm from "../popupForms/itemsPage/ItemSortByForm";

import { sortItems } from "../../util/Item";

const ItemCardDisplay = ({ selectedCategories }) => {
	const LOAD_MORE_AMOUNT = 32;
	const dispatch = useDispatch();

	const { items } = useSelector((state) => state.items);
	const { outfits } = useSelector((state) => state.outfits);

	const [displayItems, setDisplayItems] = useState([]);
	const [sortedDisplayItems, setSortedDisplayItems] = useState([]);
	const [visibleCount, setVisibleCount] = useState(LOAD_MORE_AMOUNT);
	const [sortOption, setSortOption] = useState("none");

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + LOAD_MORE_AMOUNT);
	};

	useEffect(() => {
		if (selectedCategories && selectedCategories.length > 0) {
			filterItemsByCategories(selectedCategories)
				.then((fetchedItems) => {
					setVisibleCount(LOAD_MORE_AMOUNT);
					setDisplayItems(fetchedItems);
				})
				.catch((err) => {
					console.log(`Error loading items: ${err}`);
				});
		} else {
			setVisibleCount(LOAD_MORE_AMOUNT);
			setDisplayItems(items);
		}
	}, [dispatch, selectedCategories, items]);

	useEffect(() => {
		const sortedItems = sortItems(outfits, displayItems, sortOption);
		setSortedDisplayItems(sortedItems);
	}, [displayItems, sortOption]);

	return (
		<>
			<ItemSortByForm
				sortOption={sortOption}
				setSortOption={setSortOption}
			/>
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
		</>
	);
};

export default ItemCardDisplay;
