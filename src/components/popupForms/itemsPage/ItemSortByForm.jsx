import React, { useState } from "react";
import styles from "./ItemSortByForm.module.css";

import Button from "../../buttons/Button";
import ContextMenuButton from "../../buttons/ContextMenuButton";

const ItemSortByForm = ({ sortOption, setSortOption }) => {
	const [isPopupVisible, setPopupVisibility] = useState(false);

	const handleButtonChange = () => {
		setPopupVisibility(!isPopupVisible);
	};

	const handleSortChange = (sortType) => {
		setSortOption(sortType);
		setPopupVisibility(false);
	};

	return (
		<div className={styles.popupContainer}>
			<Button type="submit" text="Sort By" onClick={handleButtonChange} />

			{isPopupVisible && (
				<div className={styles.popupContent}>
					<ContextMenuButton
						text="Least to Most Recently Worn"
						onClick={() => handleSortChange("lastWornDateAsc")}
					/>
					<ContextMenuButton
						text="Most to Least Recently Worn"
						onClick={() => handleSortChange("lastWornDateDesc")}
					/>
					<ContextMenuButton
						text="Least to Most Worn"
						onClick={() => handleSortChange("amountWornAsc")}
					/>
					<ContextMenuButton
						text="Most to Least Worn"
						onClick={() => handleSortChange("amountWornDesc")}
					/>
					<ContextMenuButton
						text="No Sort"
						onClick={() => handleSortChange("none")}
					/>
				</div>
			)}
		</div>
	);
};

export default ItemSortByForm;
