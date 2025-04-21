import React, { useState } from "react";
import styles from "./TemplateBox.module.css";

import TemplateBoxContextMenu from "./TemplateBoxContextMenu";
import TemplateItemSelector from "../popupForms/templateBoxContextMenu/TemplateItemSelector";
import TemplateCategoriesSelector from "../popupForms/templateBoxContextMenu/TemplateCategoriesSelector";

const TemplateBox = ({
	boxId,
	imgScale,
	setImgScale,
	currentItem,
	setCurrentItem,
	isLocked,
	setIsLocked,
	selectedCategories,
	setSelectedCategories,
	addBoxBefore,
	addBoxAfter,
	removeBox,
	handleRandomization,
}) => {
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

	return (
		<>
			<div
				style={{
					height: `${150 * imgScale}px`,
					...(currentItem && { width: `${150 * imgScale}px` }),
				}}
				className={
					currentItem && currentItem.itemId
						? styles.templateBoxWithItem
						: styles.templateBoxWithoutItem
				}
				onContextMenu={handleContextMenu}
				onClick={handleClick}
			>
				{currentItem && currentItem.imagePath && (
					<img
						src={`${"http://localhost:5001"}${
							currentItem.imagePath
						}`}
						alt="Preview"
						id={`${currentItem.imagePath}-${currentItem.itemId}`}
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
