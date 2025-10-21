import React from "react";
import styles from "./TemplateRow.module.css";
import { useSelector } from "react-redux";

import TemplateBox from "./TemplateBox";

const TemplateRow = ({ rowIndex, handleRandomizationOne, ratiosMatrix }) => {
	const { templateRows } = useSelector((state) => state.outfitTemplate);
	const templateBoxes = templateRows[rowIndex];

	return (
		<div className={styles.templateRow}>
			{templateBoxes.map((templateBox, boxIndex) => (
				<TemplateBox
					key={templateBox.boxId}
					rowIndex={rowIndex}
					boxIndex={boxIndex}
					handleRandomization={handleRandomizationOne}
					ratiosMatrix={ratiosMatrix}
				/>
			))}
		</div>
	);
};

export default TemplateRow;
