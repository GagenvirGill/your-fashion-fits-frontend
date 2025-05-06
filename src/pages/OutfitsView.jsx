import React from "react";
import styles from "./GenericPageStyles.module.css";

import OutfitCardDisplay from "../components/cardDisplay/OutfitCardDisplay";

const OutfitsView = () => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.pageTitle}>All Outfits</div>
			<OutfitCardDisplay />
		</div>
	);
};

export default OutfitsView;
