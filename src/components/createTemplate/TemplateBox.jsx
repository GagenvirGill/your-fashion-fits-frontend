import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./TemplateBox.module.css";

import ContextMenuButton from "../buttons/ContextMenuButton";
import SelectItemForm from "../popupForms/templateBoxContextMenu/SelectItemForm";

const TemplateBox = () => {
	const { categories } = useSelector((state) => state.categories);

	const [currentItem, setCurrentItem] = useState({
		itemId: null,
		imagePath: null,
	});
	const [showItemForm, setShowItemForm] = useState(false);

	const [selectedCategories, setSelectedCategories] = useState(categories);
	const [isLocked, setIsLocked] = useState(false);

	const [showMenu, setShowMenu] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

	const handleContextMenu = (e) => {
		e.preventDefault();
		setMenuPosition({ x: e.pageX, y: e.pageY });
		setShowMenu(true);
	};

	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowMenu(false);
	};

	const handleLocked = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowMenu(false);
		setIsLocked(!isLocked);
	};

	const handleSelectItem = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowMenu(false);
		setShowItemForm(true);
	};

	useEffect(() => {
		if (showMenu) {
			document.addEventListener("click", handleClick);
		} else {
			document.removeEventListener("click", handleClick);
		}

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [showMenu]);

	return (
		<>
			<div
				className={styles.templateBox}
				onContextMenu={handleContextMenu}
				onClick={handleClick}
			>
				<p>hello there</p>
				<p>locked: {`${isLocked}`}</p>
				<p>select item form: {`${showItemForm}`}</p>
				{currentItem && <p>{currentItem.itemId}</p>}
				{currentItem.imagePath && (
					<img
						src={`${"http://localhost:5001"}${
							currentItem.imagePath
						}`}
						alt="Preview"
						id={`${currentItem.imagePath}-${currentItem.itemId}`}
					/>
				)}
				{showMenu && (
					<div
						className={styles.contextMenu}
						style={{ top: menuPosition.y, left: menuPosition.x }}
						onClick={handleClick}
					>
						<ContextMenuButton
							onClick={handleSelectItem}
							text="Select Item"
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
			{showItemForm && (
				<div>
					<SelectItemForm
						setCurrentItem={setCurrentItem}
						setShowItemForm={setShowItemForm}
					/>
				</div>
			)}
		</>
	);
};

export default TemplateBox;
