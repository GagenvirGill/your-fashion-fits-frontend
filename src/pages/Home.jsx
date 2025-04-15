import React from "react";
import styles from "./GenericPageStyles.module.css";

import TemplateBox from "../components/createTemplate/TemplateBox";

const Home = () => {
	return (
		<>
			<br />
			<br />
			<div className={styles.pageContainer}>
				<TemplateBox />
			</div>
		</>
	);
};

export default Home;
