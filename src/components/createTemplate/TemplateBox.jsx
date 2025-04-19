import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./TemplateBox.module.css";

import ContextMenuButton from "../buttons/ContextMenuButton";
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
	const [showContextForm, setShowContextForm] = useState(false);

	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

	const handleContextMenu = (e) => {
		e.preventDefault();
		setMenuPosition({ x: e.pageX, y: e.pageY });
		setShowContextForm(true);
	};

	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextForm(false);
	};

	const handleLocked = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextForm(false);
		setIsLocked(!isLocked);
	};

	const handleTemplateSelect = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextForm(false);
		setShowForm(true);
	};

	useEffect(() => {
		if (showContextForm) {
			document.addEventListener("click", handleClick);
		} else {
			document.removeEventListener("click", handleClick);
		}

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [showContextForm]);

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
				{showContextForm && (
					<div
						className={styles.contextMenu}
						style={{ top: menuPosition.y, left: menuPosition.x }}
						onClick={handleClick}
					>
						<ContextMenuButton
							onClick={handleTemplateSelect}
							text="Select an Item or Categories"
						/>
						<ContextMenuButton
							onClick={handleLocked}
							text="Lock Item In"
						/>
						<ContextMenuButton
							onClick={handleClick}
							text="Close Menu"
						/>
					</div>
				)}
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
