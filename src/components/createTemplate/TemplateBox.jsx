import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./TemplateBox.module.css";

import { getRandomItemWithCategories } from "../../api/Item";

import TemplateBoxContextMenu from "./TemplateBoxContextMenu";
import TemplateItemSelector from "../popupForms/templateBoxContextMenu/TemplateItemSelector";
import TemplateCategoriesSelector from "../popupForms/templateBoxContextMenu/TemplateCategoriesSelector";

const TemplateBox = ({
	boxId,
	imgScale,
	setImgScale,
	currentItem,
	setCurrentItem,
	addBoxBefore,
	addBoxAfter,
	removeBox,
	randomizationFlag,
}) => {
	const { categories } = useSelector((state) => state.categories);

	const [isLocked, setIsLocked] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState(categories);
	const [currItem, setCurrItem] = useState(currentItem);

	const [showItemForm, setShowItemForm] = useState(false);
	const [showCategoriesForm, setShowCategoriesForm] = useState(false);
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

	const handleContextMenu = (e) => {
		e.preventDefault();
		setMenuPosition({ x: e.pageX, y: e.pageY });
		setShowContextMenu(true);
	};

	const handleClick = (e) => {
		e.stopPropagation();
		setMenuPosition({ x: e.pageX, y: e.pageY });
		setShowContextMenu(!showContextMenu);
	};

	const addTemplateBoxBefore = () => {
		addBoxBefore(boxId);
	};

	const addTemplateBoxAfter = () => {
		addBoxAfter(boxId);
	};

	const removeTemplateBox = () => {
		removeBox(boxId);
	};

	const handleRandomization = () => {
		if (isLocked) {
			return;
		}

		const categoryIds = selectedCategories.map(
			(category) => category.categoryId
		);

		getRandomItemWithCategories(categoryIds)
			.then((item) => {
				setCurrItem({
					itemId: item.itemId,
					imagePath: item.imagePath,
				});
				setCurrentItem(boxId, item.itemId, item.imagePath);
			})
			.catch((err) => {
				console.error("Error fetching random item:", err);
			});
	};

	useEffect(() => {
		if (randomizationFlag) {
			handleRandomization();
		}
	}, [randomizationFlag]);

	return (
		<>
			<div
				style={{
					height: `${150 * imgScale}px`,
					...(currItem && { width: `${150 * imgScale}px` }),
				}}
				className={
					currItem && currItem.itemId
						? styles.templateBoxWithItem
						: styles.templateBoxWithoutItem
				}
				onContextMenu={handleContextMenu}
				onClick={handleClick}
			>
				{currItem && currItem.imagePath && (
					<img
						src={`${"http://localhost:5001"}${currItem.imagePath}`}
						alt="Preview"
						id={`${currItem.imagePath}-${currItem.itemId}`}
					/>
				)}
				<TemplateBoxContextMenu
					boxId={boxId}
					setIsLocked={setIsLocked}
					isLocked={isLocked}
					showContextMenu={showContextMenu}
					setShowContextMenu={setShowContextMenu}
					menuPosition={menuPosition}
					setShowItemForm={setShowItemForm}
					setShowCategoriesForm={setShowCategoriesForm}
					selectedCategories={selectedCategories}
					imgScale={imgScale}
					setImgScale={setImgScale}
					addBoxBefore={addTemplateBoxBefore}
					addBoxAfter={addTemplateBoxAfter}
					removeBox={removeTemplateBox}
					handleRandomization={handleRandomization}
				/>
			</div>
			{showItemForm && (
				<div>
					<TemplateItemSelector
						boxId={boxId}
						setCurrentItem={setCurrentItem}
						currentItem={currentItem}
						setShowForm={setShowItemForm}
					/>
				</div>
			)}
			{showCategoriesForm && (
				<div>
					<TemplateCategoriesSelector
						boxId={boxId}
						setCurrentItem={setCurrentItem}
						setSelectedCategories={setSelectedCategories}
						preSelectedCategories={selectedCategories}
						setShowForm={setShowCategoriesForm}
					/>
				</div>
			)}
		</>
	);
};

export default TemplateBox;
