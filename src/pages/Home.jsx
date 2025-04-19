import React from "react";
import styles from "./GenericPageStyles.module.css";

import CreateTemplate from "../components/createTemplate/CreateTemplate";

const Home = () => {
	return (
		<>
			<br />
			<br />
			<div className={styles.pageContainer}>
				<CreateTemplate />
			</div>
		</>
	);
};

export default Home;
