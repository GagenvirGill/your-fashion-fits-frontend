"use client";

import React from "react";
import styles from "./TemplateRow.module.css";
import { useAtomValue } from "jotai";
import { templateRowsAtom } from "@/jotai/outfitTemplateAtom";

import TemplateBox from "./TemplateBox";

const TemplateRow = ({ rowIndex, handleRandomizationOne, ratiosMatrix }) => {
	const templateRows = useAtomValue(templateRowsAtom);
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
