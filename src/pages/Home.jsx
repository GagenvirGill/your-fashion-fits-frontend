import React from "react";
import styles from "./Home.module.css";

import OutfitCardDisplay from "../components/cardDisplay/OutfitCardDisplay";

const Home = () => {
	return (
		<div className={styles.homePage}>
			<OutfitCardDisplay />
		</div>
	);
};

export default Home;
