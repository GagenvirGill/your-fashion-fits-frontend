import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./CardDisplayStyles.module.css";

import OutfitCard from "../card/OutfitCard";
import Button from "../buttons/Button";
import FilterOutfitsByItemForm from "../popupForms/outfitsPage/FilterOufitsByItemForm";

const OutfitCardDisplay = () => {
	const { outfits } = useSelector((state) => state.outfits);

	const [displayedOutfits, setDisplayedOutfits] = useState(outfits);
	const [showFilterForm, setShowFilterForm] = useState(false);

	const handleClose = () => {
		setShowFilterForm(false);
	};

	const handleOpen = () => {
		setShowFilterForm(true);
	};

	const handleReset = () => {
		setDisplayedOutfits(outfits);
	};

	useEffect(() => {
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
				{displayedOutfits.map((outfit) => {
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
