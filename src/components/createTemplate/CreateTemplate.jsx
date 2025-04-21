import React, { useState, useEffect } from "react";
import styles from "./CreateTemplate.module.css";

import TemplateBox from "./TemplateBox";
import Button from "../buttons/Button";

const CreateTemplate = () => {
	const [templateBoxesList, setTemplateBoxesList] = useState([Date.now()]);

	const addTemplateBoxBefore = (boxId) => {
		const newBoxList = [...templateBoxesList];
		const index = newBoxList.indexOf(boxId);

		if (index !== -1) {
			newBoxList.splice(index, 0, Date.now());
		}

		setTemplateBoxesList(newBoxList);
	};

	const addTemplateBoxAfter = (boxId) => {
		const newBoxList = [...templateBoxesList];
		const index = newBoxList.indexOf(boxId);

		if (index !== -1) {
			newBoxList.splice(index + 1, 0, Date.now());
		}

		setTemplateBoxesList(newBoxList);
	};

	const removeTemplateBox = (boxId) => {
		if (templateBoxesList.length === 1) {
			setTemplateBoxesList([Date.now()]);
		} else {
			const newBoxList = [...templateBoxesList];
			const index = newBoxList.indexOf(boxId);

			if (index !== -1) {
				newBoxList.splice(index, 1);
			}

			setTemplateBoxesList(newBoxList);
		}
	};

	return (
		<div className={styles.createTemplateContainer}>
			<div className={styles.inlineButtons}>
				<Button type="submit" text="Create Outfit" onClick={null} />
				<Button type="submit" text="Randomize Items" onClick={null} />
			</div>

			<br />
			{templateBoxesList.map((boxId) => (
				<TemplateBox
					key={boxId}
					boxId={boxId}
					addBoxBefore={addTemplateBoxBefore}
					addBoxAfter={addTemplateBoxAfter}
					removeBox={removeTemplateBox}
				/>
			))}
		</div>
	);
};

export default CreateTemplate;
