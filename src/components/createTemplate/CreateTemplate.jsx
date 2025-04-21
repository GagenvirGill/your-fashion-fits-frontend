import React, { useState } from "react";
import styles from "./CreateTemplate.module.css";

import TemplateBox from "./TemplateBox";
import ImgButton from "../buttons/ImgButton";

const CreateTemplate = () => {
	const [templateBoxIds, setTemplateBoxIds] = useState([Date.now()]);
	const [templateBoxScales, setTemplateBoxScales] = useState([1]);
	const [templateBoxItems, setTemplateBoxItems] = useState([
		{
			itemId: null,
			imagePath: null,
		},
	]);
	const [randomizationFlag, setRandomizationFlag] = useState(false);

	const handleScaleChange = (boxId, newScale) => {
		const index = templateBoxIds.indexOf(boxId);

		if (index !== -1) {
			const newBoxScales = [...templateBoxScales];
			newBoxScales[index] = newScale;
			setTemplateBoxScales(newBoxScales);
		}
	};

	const handleItemChange = (boxId, itemId, imagePath) => {
		const index = templateBoxIds.indexOf(boxId);

		if (index !== -1) {
			const newBoxItems = [...templateBoxItems];
			newBoxItems[index] = {
				itemId: itemId,
				imagePath: imagePath,
			};
			setTemplateBoxItems(newBoxItems);
		}
	};

	const addTemplateBoxBefore = (boxId) => {
		const newBoxIds = [...templateBoxIds];
		const newBoxScales = [...templateBoxScales];
		const newBoxItems = [...templateBoxItems];
		const index = newBoxIds.indexOf(boxId);

		if (index !== -1) {
			newBoxIds.splice(index, 0, Date.now());
			newBoxScales.splice(index, 0, 1);
			newBoxItems.splice(index, 0, {
				itemId: null,
				imagePath: null,
			});
		}

		setTemplateBoxIds(newBoxIds);
		setTemplateBoxScales(newBoxScales);
		setTemplateBoxItems(newBoxItems);
	};

	const addTemplateBoxAfter = (boxId) => {
		const newBoxIds = [...templateBoxIds];
		const newBoxScales = [...templateBoxScales];
		const newBoxItems = [...templateBoxItems];
		const index = newBoxIds.indexOf(boxId);

		if (index !== -1) {
			newBoxIds.splice(index + 1, 0, Date.now());
			newBoxScales.splice(index + 1, 0, 1);
			newBoxItems.splice(index + 1, 0, {
				itemId: null,
				imagePath: null,
			});
		}

		setTemplateBoxIds(newBoxIds);
		setTemplateBoxScales(newBoxScales);
		setTemplateBoxItems(newBoxItems);
	};

	const removeTemplateBox = (boxId) => {
		if (templateBoxIds.length === 1) {
			setTemplateBoxIds([Date.now()]);
			setTemplateBoxScales([1]);
			setTemplateBoxItems([
				{
					itemId: null,
					imagePath: null,
				},
			]);
		} else {
			const newBoxIds = [...templateBoxIds];
			const newBoxScales = [...templateBoxScales];
			const newBoxItems = [...templateBoxItems];
			const index = newBoxIds.indexOf(boxId);

			if (index !== -1) {
				newBoxIds.splice(index, 1);
				newBoxScales.splice(index, 1);
				newBoxItems.splice(index, 1);
			}

			setTemplateBoxIds(newBoxIds);
			setTemplateBoxScales(newBoxScales);
			setTemplateBoxItems(newBoxItems);
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
			{templateBoxIds.map((boxId, index) => (
				<TemplateBox
					key={boxId}
					boxId={boxId}
					imgScale={templateBoxScales[index]}
					setImgScale={handleScaleChange}
					currentItem={templateBoxItems[index]}
					setCurrentItem={handleItemChange}
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
