"use client";

import React from "react";
import styles from "./GenericPageStyles.module.css";

import OutfitCardDisplay from "../components/cardDisplay/OutfitCardDisplay";

const OutfitsView = ({ outfits }) => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.pageTitle}>Your Past Outfits</div>
			<OutfitCardDisplay outfits={outfits} />
		</div>
	);
};

export default OutfitsView;
