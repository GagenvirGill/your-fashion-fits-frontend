import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./TemplateBox.module.css";

import { getRandomItemWithCategories } from "../../api/Item";

import TemplateBoxContextMenu from "./TemplateBoxContextMenu";
import TemplateBoxSelectForm from "../popupForms/templateBoxContextMenu/TemplateBoxSelectForm";

const TemplateBox = ({ boxId, addBoxBefore, addBoxAfter, removeBox }) => {
	const { categories } = useSelector((state) => state.categories);

	const [imgScale, setImgScale] = useState(1);
	const [isLocked, setIsLocked] = useState(false);
	const [selectedCategories, setSelectedCategories] = useState(categories);
	const [currentItem, setCurrentItem] = useState({
		itemId: null,
		imagePath: null,
	});

	const [showForm, setShowForm] = useState(false);
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
			alert("Box is locked. Unlock to randomize.");
			return;
		}

		const categoryIds = selectedCategories.map(
			(category) => category.categoryId
		);

		getRandomItemWithCategories(categoryIds)
			.then((item) => {
				setCurrentItem({
					itemId: item.itemId,
					imagePath: item.imagePath,
				});
			})
			.catch((err) => {
				console.error("Error fetching random item:", err);
			});
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
					setIsLocked={setIsLocked}
					isLocked={isLocked}
					showContextMenu={showContextMenu}
					setShowContextMenu={setShowContextMenu}
					menuPosition={menuPosition}
					setShowForm={setShowForm}
					selectedCategories={selectedCategories}
					imgScale={imgScale}
					setImgScale={setImgScale}
					addBoxBefore={addTemplateBoxBefore}
					addBoxAfter={addTemplateBoxAfter}
					removeBox={removeTemplateBox}
					handleRandomization={handleRandomization}
				/>
			</div>
			{showForm && (
				<div>
					<TemplateBoxSelectForm
						setCurrentItem={setCurrentItem}
						setSelectedCategories={setSelectedCategories}
						preSelectedCategories={selectedCategories}
						setShowForm={setShowForm}
					/>
				</div>
			)}
		</>
	);
};

export default TemplateBox;
