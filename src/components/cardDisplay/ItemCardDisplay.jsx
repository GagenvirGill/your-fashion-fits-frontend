import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CardDisplayStyles.module.css";

import { filterItemsByCategories } from "../../api/Item";

import Button from "../buttons/Button";
import ItemCard from "../card/ItemCard";

const ItemCardDisplay = ({ selectedCategories }) => {
	const LOAD_MORE_AMOUNT = 32;
	const dispatch = useDispatch();

	const { items } = useSelector((state) => state.items);

	const [displayItems, setDisplayItems] = useState([]);
	const [visibleCount, setVisibleCount] = useState(LOAD_MORE_AMOUNT);

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

	return (
		<>
			<br />
			<div className={styles.cardDisplay}>
				{displayItems.slice(0, visibleCount).map((item) => (
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
