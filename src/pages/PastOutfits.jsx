import React from "react";
import styles from "./PastOutfits.module.css";

import OutfitCardDisplay from "../components/cardDisplay/OutfitCardDisplay";

const PastOutfits = () => {
	return (
		<div className={styles.outfitsView}>
			<OutfitCardDisplay />
		</div>
	);
};

export default PastOutfits;
