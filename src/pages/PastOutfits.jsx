import React from "react";
import styles from "./GenericPageStyles.module.css";

import OutfitCardDisplay from "../components/cardDisplay/OutfitCardDisplay";

const PastOutfits = () => {
	return (
		<div className={styles.pageContainer}>
			<OutfitCardDisplay />
		</div>
	);
};

export default PastOutfits;
