import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./TemplateBox.module.css";

import TemplateBoxContextMenu from "./TemplateBoxContextMenu";
import TemplateBoxForm from "../popupForms/templateBoxContextMenu/TemplateBoxForm";

const TemplateBox = () => {
	const { categories } = useSelector((state) => state.categories);

	const [showForm, setShowForm] = useState(false);
	const [isLocked, setIsLocked] = useState(false);
	const [currentItem, setCurrentItem] = useState({
		itemId: null,
		imagePath: null,
	});
	const [selectedCategories, setSelectedCategories] = useState(categories);
	const [showContextMenu, setShowContextMenu] = useState(false);

	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

	const handleContextMenu = (e) => {
		e.preventDefault();
		setMenuPosition({ x: e.pageX, y: e.pageY });
		setShowContextMenu(true);
	};

	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
	};

	return (
		<>
			<div
				className={styles.templateBox}
				onContextMenu={handleContextMenu}
				onClick={handleClick}
			>
				<p>locked: {`${isLocked}`}</p>
				{selectedCategories.map((category) => (
					<p key={category.categoryId}>{category.name}</p>
				))}
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
				/>
			</div>
			{showForm && (
				<div>
					<TemplateBoxForm
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
