import React, { useState } from "react";
import styles from "./CreateTemplate.module.css";

import TemplateBox from "./TemplateBox";
import ImgButton from "../buttons/ImgButton";

const CreateTemplate = () => {
	const [templateBoxesList, setTemplateBoxesList] = useState([Date.now()]);
	const [randomizationFlag, setRandomizationFlag] = useState(false);

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

	const handleRandomization = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setRandomizationFlag(true);

		setTimeout(() => {
			setRandomizationFlag(false);
		}, 0);
	};

	return (
		<div className={styles.createTemplateContainer}>
			<div className={styles.inlineButtons}>
				<ImgButton
					buttonId="outfit-template-create-button"
					imgFileName="/checkmark_icon.png"
					onClick={null}
				/>
				<ImgButton
					buttonId="outfit-template-randomize-button"
					imgFileName="/shuffle_icon.png"
					onClick={handleRandomization}
				/>
			</div>

			<br />
			{templateBoxesList.map((boxId) => (
				<TemplateBox
					key={boxId}
					boxId={boxId}
					addBoxBefore={addTemplateBoxBefore}
					addBoxAfter={addTemplateBoxAfter}
					removeBox={removeTemplateBox}
					randomizationFlag={randomizationFlag}
				/>
			))}
		</div>
	);
};

export default CreateTemplate;
