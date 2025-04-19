import React from "react";
import styles from "./CreateTemplate.module.css";

import TemplateBox from "./TemplateBox";

const CreateTemplate = () => {
	return (
		<div className={styles.createTemplateContainer}>
			<TemplateBox />
			<TemplateBox />
			<TemplateBox />
			<TemplateBox />
		</div>
	);
};

export default CreateTemplate;
