import React from "react";
import styles from "./GenericPageStyles.module.css";

import OutfitCardDisplay from "../components/cardDisplay/OutfitCardDisplay";
import CreateTemplate from "../components/createTemplate/CreateTemplate";

const OutfitsView = () => {
	return (
		<div className={styles.pageContainer}>
			<div className={styles.pageTitle}>Outfit Creation Sandbox</div>
			<CreateTemplate />

			<div className={styles.spacer}></div>

			<div className={styles.pageTitle}>Old Outfits</div>
			<OutfitCardDisplay />
		</div>
	);
};

export default OutfitsView;
