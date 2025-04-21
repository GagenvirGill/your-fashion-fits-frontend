import React from "react";
import styles from "./CreateTemplate.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshState } from "../../store/reducers/outfitsReducer";
import { setAllBoxes } from "../../store/reducers/outfitTemplateReducer";
import { createOutfit } from "../../api/Outfit";
import { getRandomItemWithCategories } from "../../api/Item";

import TemplateBox from "./TemplateBox";
import ImgButton from "../buttons/ImgButton";

const CreateTemplate = () => {
	const dispatch = useDispatch();
	const { templateBoxes } = useSelector((state) => state.outfitTemplate);

	const handleRandomizationAll = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		const promises = templateBoxes.map((templateBox) =>
			handleTemplateBoxRandomization(
				templateBox.isLocked,
				templateBox.categories
			)
		);

		const results = await Promise.all(promises);

		const newBoxes = [...templateBoxes];

		templateBoxes.map((box, index) => {
			if (results && results[index]) {
				newBoxes[index] = {
					boxId: box.boxId,
					itemId: results[index].itemId,
					imagePath: results[index].imagePath,
					scale: box.scale,
					isLocked: box.isLocked,
					categories: box.categories,
				};
			}
			return box;
		});

		dispatch(setAllBoxes({ newBoxes: newBoxes }));
	};

	const handleRandomizationOne = async (index) => {
		const box = templateBoxes[index];

		const result = await handleTemplateBoxRandomization(
			box.isLocked,
			box.categories
		);

		if (result && result.itemId) {
			const newBoxes = [...templateBoxes];
			const box = newBoxes[index];

			newBoxes[index] = {
				boxId: box.boxId,
				itemId: result.itemId,
				imagePath: result.imagePath,
				scale: box.scale,
				isLocked: box.isLocked,
				categories: box.categories,
			};

			dispatch(setAllBoxes({ newBoxes: newBoxes }));
		}
	};

	const handleTemplateBoxRandomization = async (isLocked, categories) => {
		try {
			if (isLocked) {
				return;
			}

			const item = await getRandomItemWithCategories(categories);
			return {
				itemId: item.itemId,
				imagePath: item.imagePath,
			};
		} catch (err) {
			console.error("Error fetching random item:", err);
		}
	};

	const handleCreateOutfit = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		let errorFlag = false;
		const outfitsItems = templateBoxes.map((box, index) => {
			if (!box.itemId) {
				errorFlag = true;
				return;
			}

			return {
				itemId: box.itemId,
				orderNum: index,
				itemWeight: box.scale * 10,
			};
		});

		if (errorFlag) {
			alert("Please select items for the empty boxes or remove them.");
			return;
		}
		if (outfitsItems.length === 0) {
			alert("Please select at least one item to create an outfit.");
			return;
		}
		if (outfitsItems.length > 10) {
			alert("You can only select up to 10 items.");
			return;
		}

		await createOutfit(new Date(), "Created from template", outfitsItems);
		dispatch(refreshState());
	};

	return (
		<div className={styles.createTemplateContainer}>
			<div className={styles.inlineButtons}>
				<ImgButton
					buttonId="outfit-template-create-button"
					imgFileName="/checkmark_icon.png"
					onClick={handleCreateOutfit}
				/>
				<ImgButton
					buttonId="outfit-template-randomize-button"
					imgFileName="/shuffle_icon.png"
					onClick={handleRandomizationAll}
				/>
			</div>

			<br />
			{templateBoxes.map((templateBox, index) => (
				<TemplateBox
					key={templateBox.boxId}
					gsIndex={index}
					handleRandomization={handleRandomizationOne}
				/>
			))}
		</div>
	);
};

export default CreateTemplate;
