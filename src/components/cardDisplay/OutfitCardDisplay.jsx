import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./CardDisplayStyles.module.css";

import OutfitCard from "../card/OutfitCard";
import Button from "../buttons/Button";
import FilterOutfitsByItemForm from "../popupForms/outfitsPage/FilterOufitsByItemForm";

const calculateNumOutfitsPerRow = () => {
	return Math.floor((window.innerWidth * 0.9) / 300);
};

const OutfitCardDisplay = () => {
	const { outfits } = useSelector((state) => state.outfits);

	const [displayedOutfits, setDisplayedOutfits] = useState(outfits);
	const [showFilterForm, setShowFilterForm] = useState(false);
	const [outfitPage, setOutfitPage] = useState(0);
	const [visibleCount, setVisibleCount] = useState(
		calculateNumOutfitsPerRow()
	);

	const handleClose = () => {
		setShowFilterForm(false);
	};

	const handleOpen = () => {
		setShowFilterForm(true);
	};

	const handleReset = () => {
		setDisplayedOutfits(outfits);
	};

	const handleCarouselLeft = () => {
		if (outfitPage > 0) {
			setOutfitPage(outfitPage - 1);
		}
	};

	const handleCarouselRight = () => {
		if (
			outfitPage <
			Math.ceil(displayedOutfits.length / visibleCount) - 1
		) {
			setOutfitPage(outfitPage + 1);
		}
	};

	useEffect(() => {
		setOutfitPage(0);
	}, [displayedOutfits]);

	useEffect(() => {
		setDisplayedOutfits(outfits);
	}, [outfits]);

	useEffect(() => {
		const updateVisibleCount = () => {
			setVisibleCount(calculateNumOutfitsPerRow());
		};

		window.addEventListener("resize", updateVisibleCount);
		return () => window.removeEventListener("resize", updateVisibleCount);
	}, []);

	return (
		<div className={styles.cardDisplay}>
			<br />
			<div>
				{displayedOutfits
					.slice(
						outfitPage * visibleCount,
						outfitPage * visibleCount + visibleCount
					)
					.map((outfit) => {
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
				<div className={styles.carouselButtons}>
					<div
						className={styles.carouselArrowButton}
						onClick={handleCarouselLeft}
					>
						<img src="left_arrow.png" />
					</div>
					<div className={styles.carouselButton} onClick={null}>
						<img src="filter_icon.png" />
					</div>
					<div
						className={styles.carouselArrowButton}
						onClick={handleCarouselRight}
					>
						<img src="right_arrow.png" />
					</div>
				</div>
			</div>
			<br />
			<Button type="submit" text="Reset Filters" onClick={handleReset} />
			<Button type="submit" text="Filter" onClick={handleOpen} />
			<br />
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
