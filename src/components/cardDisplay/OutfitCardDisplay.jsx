import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./CardDisplayStyles.module.css";

import OutfitCard from "../card/OutfitCard";
import Button from "../buttons/Button";
import FilterOutfitsByItemForm from "../popupForms/outfitsPage/FilterOufitsByItemForm";

const OutfitCardDisplay = () => {
	const LOAD_MORE_AMOUNT = 8;
	const { outfits } = useSelector((state) => state.outfits);

	const [displayedOutfits, setDisplayedOutfits] = useState(outfits);
	const [showFilterForm, setShowFilterForm] = useState(false);

	const [visibleCount, setVisibleCount] = useState(LOAD_MORE_AMOUNT);

	const handleClose = () => {
		setVisibleCount(LOAD_MORE_AMOUNT);
		setShowFilterForm(false);
	};

	const handleOpen = () => {
		setShowFilterForm(true);
	};

	const handleReset = () => {
		setVisibleCount(LOAD_MORE_AMOUNT);
		setDisplayedOutfits(outfits);
	};

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + LOAD_MORE_AMOUNT);
	};

	useEffect(() => {
		setVisibleCount(LOAD_MORE_AMOUNT);
		setDisplayedOutfits(outfits);
	}, [outfits]);

	return (
		<>
			<br />
			<Button type="submit" text="Reset Filters" onClick={handleReset} />
			<Button type="submit" text="Filter" onClick={handleOpen} />
			<br />
			<br />
			<div className={styles.cardDisplay}>
				{displayedOutfits.slice(0, visibleCount).map((outfit) => {
					return (
						<OutfitCard
							key={`${outfit.outfitId}.card`}
							outfitId={outfit.outfitId}
							dateWorn={outfit.dateWorn}
							desc={outfit.description}
							items={outfit.OutfitTemplate.TemplateRows}
							totalWeight={outfit.OutfitTemplate.totalWeight}
						/>
					);
				})}
			</div>
			<br />
			{visibleCount < displayedOutfits.length && (
				<Button
					type="submit"
					text="Load More"
					onClick={handleLoadMore}
				/>
			)}
			{showFilterForm && (
				<FilterOutfitsByItemForm
					handleClose={handleClose}
					setDisplayedOutfits={setDisplayedOutfits}
				/>
			)}
		</>
	);
};

export default OutfitCardDisplay;
