import React from "react";
import styles from "./GenericPageStyles.module.css";

import CategoryCardDisplay from "../components/cardDisplay/CategoryCardDisplay";

const Closet = () => {
	return (
		<div className={styles.pageContainer}>
			<br />
			<CategoryCardDisplay />
		</div>
	);
};

export default Closet;
