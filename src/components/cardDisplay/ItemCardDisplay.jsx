import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ItemCardDisplay.module.css";

import { filterItemsByCategories } from "../../api/Item";

import ItemCard from "../card/ItemCard";

const ItemCardDisplay = ({ selectedCategories }) => {
	const dispatch = useDispatch();
	const { items } = useSelector((state) => state.items);
	const [displayItems, setDisplayItems] = useState([]);

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

	return (
		<>
			<div className={styles.itemCardDisplay}>
				{displayItems.map((item) => (
					<ItemCard
						key={`${item.itemId}-${selectedCategories}`}
						itemId={item.itemId}
						imagePath={item.imagePath}
					/>
				))}
			</div>
		</>
	);
};

export default ItemCardDisplay;
