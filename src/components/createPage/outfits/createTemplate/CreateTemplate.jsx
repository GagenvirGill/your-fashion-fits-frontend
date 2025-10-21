import React, { useState, useMemo } from "react";
import styles from "./CreateTemplate.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setWholeTemplate } from "../../../../store/reducers/outfitTemplateReducer";
import { getRandomItemWithCategories } from "../../../../api/Item";
import {
	createAdjacencyMatrix,
	updateTemplateWithScales,
} from "../../../../util/itemRatios";

import TemplateRow from "./TemplateRow";
import ImgButton from "../../../buttons/ImgButton";
import CreateOutfitForm from "../../../popupForms/templatePopups/CreateOutfitForm";

const CreateTemplate = () => {
	const dispatch = useDispatch();
	const { outfits } = useSelector((state) => state.outfits);
	const ratiosMatrix = useMemo(() => {
		return createAdjacencyMatrix(outfits);
	}, [outfits]);
	const { templateRows } = useSelector((state) => state.outfitTemplate);
	const [showCreateOutfitForm, setShowCreateOutfitForm] = useState(false);

	const handleRandomizationAll = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		const promises = templateRows.map((row) =>
			Promise.all(
				row.map((templateBox) =>
					handleTemplateBoxRandomization(
						templateBox.isLocked,
						templateBox.categories
					)
				)
			)
		);

		const results = await Promise.all(promises);

		const newRows = updateTemplateWithScales(
			templateRows,
			ratiosMatrix,
			results
		);

		dispatch(setWholeTemplate({ newTemplate: newRows }));
	};

	const handleRandomizationOne = async (rowIndex, boxIndex) => {
		const box = templateRows[rowIndex][boxIndex];

		const result = await handleTemplateBoxRandomization(
			box.isLocked,
			box.categories
		);

		if (result && result.itemId) {
			const newRows = templateRows.map((row) => [...row]);

			newRows[rowIndex][boxIndex] = {
				...newRows[rowIndex][boxIndex],
				itemId: result.itemId,
				imagePath: result.imagePath,
			};

			const updatedRows = updateTemplateWithScales(
				newRows,
				ratiosMatrix,
				newRows
			);

			dispatch(setWholeTemplate({ newTemplate: updatedRows }));
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

	const handleClearTemplate = (e) => {
		e.preventDefault();
		e.stopPropagation();

		dispatch(setWholeTemplate({ newTemplate: [] }));
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
					<ImgButton
						buttonId="outfit-template-clear-button"
						imgFileName="/trash_icon.png"
						onClick={handleClearTemplate}
					/>
				</div>

				<br />
				{templateRows.map((_, rowIndex) => (
					<TemplateRow
						key={`templaterow-${rowIndex}`}
						rowIndex={rowIndex}
						handleRandomizationOne={handleRandomizationOne}
						ratiosMatrix={ratiosMatrix}
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
