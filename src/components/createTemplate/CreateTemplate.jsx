import React, { useState } from "react";
import styles from "./CreateTemplate.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAllBoxes } from "../../store/reducers/outfitTemplateReducer";
import { getRandomItemWithCategories } from "../../api/Item";

import TemplateBox from "./TemplateBox";
import ImgButton from "../buttons/ImgButton";
import CreateOutfitForm from "../popupForms/templatePopups/CreateOutfitForm";

const CreateTemplate = () => {
	const dispatch = useDispatch();
	const { templateBoxes } = useSelector((state) => state.outfitTemplate);

	const [showCreateOutfitForm, setShowCreateOutfitForm] = useState(false);

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

		setShowCreateOutfitForm(true);
	};

	return (
		<>
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

			{showCreateOutfitForm && (
				<CreateOutfitForm
					setShowCreateOutfitForm={setShowCreateOutfitForm}
				/>
			)}
		</>
	);
};

export default CreateTemplate;
