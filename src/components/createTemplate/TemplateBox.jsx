import React, { useState } from "react";
import styles from "./TemplateBox.module.css";
import { useSelector } from "react-redux";

import TemplateBoxContextMenu from "./TemplateBoxContextMenu";
import TemplateItemSelector from "../popupForms/templatePopups/TemplateItemSelector";
import TemplateCategoriesSelector from "../popupForms/templatePopups/TemplateCategoriesSelector";

const TemplateBox = ({ gsIndex, handleRandomization }) => {
	const { templateBoxes } = useSelector((state) => state.outfitTemplate);
	const { itemId, imagePath, scale } = templateBoxes[gsIndex];

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

	return (
		<>
			<div
				style={{
					height: `${150 * scale}px`,
					...(!itemId && { width: `${150 * scale}px` }),
				}}
				className={
					itemId
						? styles.templateBoxWithItem
						: styles.templateBoxWithoutItem
				}
				onContextMenu={handleContextMenu}
				onClick={handleClick}
			>
				{itemId && imagePath && (
					<img
						src={`${"http://localhost:5001"}${imagePath}`}
						alt="Preview"
						id={`${imagePath}-${itemId}`}
					/>
				)}
				<TemplateBoxContextMenu
					gsIndex={gsIndex}
					showContextMenu={showContextMenu}
					setShowContextMenu={setShowContextMenu}
					menuPosition={menuPosition}
					setShowItemForm={setShowItemForm}
					setShowCategoriesForm={setShowCategoriesForm}
					handleRandomization={handleRandomization}
				/>
			</div>
			{showItemForm && (
				<div>
					<TemplateItemSelector
						gsIndex={gsIndex}
						setShowForm={setShowItemForm}
					/>
				</div>
			)}
			{showCategoriesForm && (
				<div>
					<TemplateCategoriesSelector
						gsIndex={gsIndex}
						setShowForm={setShowCategoriesForm}
					/>
				</div>
			)}
		</>
	);
};

export default TemplateBox;
