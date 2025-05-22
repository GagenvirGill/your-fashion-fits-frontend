import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./CardDisplayStyles.module.css";

import OutfitCard from "../card/OutfitCard";
import Button from "../buttons/Button";
import FilterOutfitsByItemForm from "../popupForms/outfitsPage/FilterOufitsByItemForm";

const calculateLoadAmount = () => {
	const baseAmount = Math.floor((window.innerWidth * 0.9) / 300) * 2;
	return baseAmount < 4 ? baseAmount * 2 : baseAmount;
};

const OutfitCardDisplay = () => {
	const { outfits } = useSelector((state) => state.outfits);

	const [displayedOutfits, setDisplayedOutfits] = useState(outfits);
	const [showFilterForm, setShowFilterForm] = useState(false);

	const [visibleCount, setVisibleCount] = useState(calculateLoadAmount());

	const handleClose = () => {
		setVisibleCount(calculateLoadAmount());
		setShowFilterForm(false);
	};

	const handleOpen = () => {
		setShowFilterForm(true);
	};

	const handleReset = () => {
		setVisibleCount(calculateLoadAmount());
		setDisplayedOutfits(outfits);
	};

	const handleLoadMore = () => {
		setVisibleCount((prev) => prev + calculateLoadAmount());
	};

	useEffect(() => {
		setVisibleCount(calculateLoadAmount());
		setDisplayedOutfits(outfits);
	}, [outfits]);

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
		<div className={styles.cardDisplay}>
			<br />
			<Button type="submit" text="Reset Filters" onClick={handleReset} />
			<Button type="submit" text="Filter" onClick={handleOpen} />
			<br />
			<br />
			<div>
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
		</div>
	);
};

export default OutfitCardDisplay;
