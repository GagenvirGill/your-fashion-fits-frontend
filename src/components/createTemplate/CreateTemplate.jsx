import React, { useState } from "react";
import styles from "./CreateTemplate.module.css";
import { useDispatch, useSelector } from "react-redux";
import { refreshState } from "../../store/reducers/outfitsReducer";
import { createOutfit } from "../../api/Outfit";
import { getRandomItemWithCategories } from "../../api/Item";

import TemplateBox from "./TemplateBox";
import ImgButton from "../buttons/ImgButton";

const CreateTemplate = () => {
	const dispatch = useDispatch();
	const { categories } = useSelector((state) => state.categories);

	const [templateBoxIds, setTemplateBoxIds] = useState([Date.now()]);
	const [templateBoxScales, setTemplateBoxScales] = useState([1]);
	const [templateBoxIsLocked, setTemplateBoxIsLocked] = useState([false]);
	const [templateBoxCategories, setTemplateBoxCategories] = useState([
		categories,
	]);
	const [templateBoxItems, setTemplateBoxItems] = useState([
		{
			itemId: null,
			imagePath: null,
		},
	]);

	const handleScaleChange = (boxId, newScale) => {
		const index = templateBoxIds.indexOf(boxId);

		if (index !== -1) {
			const newBoxScales = [...templateBoxScales];
			newBoxScales[index] = newScale;
			setTemplateBoxScales(newBoxScales);
		}
	};

	const handleSelectedCategoriesChange = (boxId, newSelectedCategories) => {
		const index = templateBoxIds.indexOf(boxId);
		if (index !== -1) {
			const newBoxCategories = [...templateBoxCategories];
			newBoxCategories[index] = newSelectedCategories;
			setTemplateBoxCategories(newBoxCategories);
		}
	};

	const handleIsLockedChange = (boxId, newIsLocked) => {
		const index = templateBoxIds.indexOf(boxId);
		if (index !== -1) {
			const newBoxIsLockeds = [...templateBoxIsLocked];
			newBoxIsLockeds[index] = newIsLocked;
			setTemplateBoxIsLocked(newBoxIsLockeds);
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
		const newBoxIsLockeds = [...templateBoxIsLocked];
		const newBoxCategories = [...templateBoxCategories];
		const newBoxItems = [...templateBoxItems];
		const index = newBoxIds.indexOf(boxId);

		if (index !== -1) {
			newBoxIds.splice(index, 0, Date.now());
			newBoxScales.splice(index, 0, 1);
			newBoxIsLockeds.splice(index, 0, false);
			newBoxCategories.splice(index, 0, categories);
			newBoxItems.splice(index, 0, {
				itemId: null,
				imagePath: null,
			});
		}

		setTemplateBoxIds(newBoxIds);
		setTemplateBoxScales(newBoxScales);
		setTemplateBoxIsLocked(newBoxIsLockeds);
		setTemplateBoxCategories(newBoxCategories);
		setTemplateBoxItems(newBoxItems);
	};

	const addTemplateBoxAfter = (boxId) => {
		const newBoxIds = [...templateBoxIds];
		const newBoxScales = [...templateBoxScales];
		const newBoxIsLockeds = [...templateBoxIsLocked];
		const newBoxCategories = [...templateBoxCategories];
		const newBoxItems = [...templateBoxItems];
		const index = newBoxIds.indexOf(boxId);

		if (index !== -1) {
			newBoxIds.splice(index + 1, 0, Date.now());
			newBoxScales.splice(index + 1, 0, 1);
			newBoxIsLockeds.splice(index + 1, 0, false);
			newBoxCategories.splice(index + 1, 0, categories);
			newBoxItems.splice(index + 1, 0, {
				itemId: null,
				imagePath: null,
			});
		}

		setTemplateBoxIds(newBoxIds);
		setTemplateBoxScales(newBoxScales);
		setTemplateBoxIsLocked(newBoxIsLockeds);
		setTemplateBoxCategories(newBoxCategories);
		setTemplateBoxItems(newBoxItems);
	};

	const removeTemplateBox = (boxId) => {
		if (templateBoxIds.length === 1) {
			setTemplateBoxIds([Date.now()]);
			setTemplateBoxScales([1]);
			setTemplateBoxIsLocked(false);
			setTemplateBoxCategories([categories]);
			setTemplateBoxItems([
				{
					itemId: null,
					imagePath: null,
				},
			]);
		} else {
			const newBoxIds = [...templateBoxIds];
			const newBoxScales = [...templateBoxScales];
			const newBoxIsLockeds = [...templateBoxIsLocked];
			const newBoxCategories = [...templateBoxCategories];
			const newBoxItems = [...templateBoxItems];
			const index = newBoxIds.indexOf(boxId);

			if (index !== -1) {
				newBoxIds.splice(index, 1);
				newBoxScales.splice(index, 1);
				newBoxIsLockeds.splice(index, 1);
				newBoxCategories.splice(index, 1);
				newBoxItems.splice(index, 1);
			}

			setTemplateBoxIds(newBoxIds);
			setTemplateBoxScales(newBoxScales);
			setTemplateBoxIsLocked(newBoxIsLockeds);
			setTemplateBoxCategories(newBoxCategories);
			setTemplateBoxItems(newBoxItems);
		}
	};

	const handleRandomization = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		const promises = templateBoxIds.map((_, index) =>
			handleTemplateBoxRandomization(index)
		);

		const results = await Promise.all(promises);

		const newBoxItems = [...templateBoxItems];

		results.forEach((map, index) => {
			if (map && map.itemId) {
				newBoxItems[index] = {
					itemId: map.itemId,
					imagePath: map.imagePath,
				};
			}
		});

		setTemplateBoxItems(newBoxItems);
	};

	const handleTemplateBoxRandomization = async (index) => {
		if (index !== -1 && templateBoxIsLocked[index] === false) {
			try {
				const item = await getRandomItemWithCategories(
					templateBoxCategories[index].map(
						(category) => category.categoryId
					)
				);
				return {
					index: index,
					itemId: item.itemId,
					imagePath: item.imagePath,
				};
			} catch (err) {
				console.error("Error fetching random item:", err);
			}
		}
	};

	const handleSingleRandomization = async (boxId) => {
		const index = templateBoxIds.indexOf(boxId);

		if (index !== -1) {
			const result = await handleTemplateBoxRandomization(index);

			if (result && result.itemId) {
				const newBoxItems = [...templateBoxItems];

				newBoxItems[result.index] = {
					itemId: result.itemId,
					imagePath: result.imagePath,
				};

				setTemplateBoxItems(newBoxItems);
			}
		}
	};

	const handleCreateOutfit = async (e) => {
		e.preventDefault();
		e.stopPropagation();

		const items = [];

		templateBoxScales.map((scale, index) => {
			const item = templateBoxItems[index];

			if (item.itemId) {
				items.push({
					itemId: item.itemId,
					orderNum: index,
					itemWeight: scale * 10,
				});
			}
		});

		if (items.length === 0) {
			alert("Please select at least one item to create an outfit.");
			return;
		}
		if (items.length > 10) {
			alert("You can only select up to 10 items.");
			return;
		}

		await createOutfit(new Date(), "Created from template", items);
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
					isLocked={templateBoxIsLocked[index]}
					setIsLocked={handleIsLockedChange}
					selectedCategories={templateBoxCategories[index]}
					setSelectedCategories={handleSelectedCategoriesChange}
					addBoxBefore={addTemplateBoxBefore}
					addBoxAfter={addTemplateBoxAfter}
					removeBox={removeTemplateBox}
					handleRandomization={handleSingleRandomization}
				/>
			))}
		</div>
	);
};

export default CreateTemplate;
