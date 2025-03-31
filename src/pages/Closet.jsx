import React from "react";
import styles from "./Closet.module.css";

import CategoryCardDisplay from "../components/cardDisplay/CategoryCardDisplay";

const Closet = () => {
	return (
		<div className={styles.closetPage}>
			<CategoryCardDisplay />
		</div>
	);
};

export default Closet;
