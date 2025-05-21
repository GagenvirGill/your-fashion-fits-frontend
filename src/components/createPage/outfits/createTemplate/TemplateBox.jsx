import React, { useState, useEffect } from "react";
import styles from "./TemplateBox.module.css";
import { useSelector } from "react-redux";

import TemplateBoxContextMenu from "./TemplateBoxContextMenu";
import TemplateItemSelector from "../../../popupForms/templatePopups/TemplateItemSelector";
import TemplateCategoriesSelector from "../../../popupForms/templatePopups/TemplateCategoriesSelector";

const TemplateBox = ({ rowIndex, boxIndex, handleRandomization }) => {
	const { templateRows } = useSelector((state) => state.outfitTemplate);
	const { itemId, imagePath, scale } = templateRows[rowIndex][boxIndex];

	const [showItemForm, setShowItemForm] = useState(false);
	const [showCategoriesForm, setShowCategoriesForm] = useState(false);
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

	const [boxWidth, setBoxWidth] = useState(150);

	useEffect(() => {
		const updateBoxWidth = () => {
			setBoxWidth(Math.min(150, (window.innerWidth * 0.95) / 5));
		};

		updateBoxWidth();
		window.addEventListener("resize", updateBoxWidth);

		return () => window.removeEventListener("resize", updateBoxWidth);
	}, []);

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
				style={
					itemId
						? {
								height: `${boxWidth * scale}px`,
								...(!itemId && {
									width: `${boxWidth * scale}px`,
								}),
						  }
						: {
								height: `${boxWidth * scale - 10}px`,
								...(!itemId && {
									width: `${boxWidth * scale - 10}px`,
								}),
						  }
				}
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
						src={imagePath}
						alt="Preview"
						id={`${imagePath}-${itemId}`}
					/>
				)}
				<TemplateBoxContextMenu
					rowIndex={rowIndex}
					boxIndex={boxIndex}
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
						rowIndex={rowIndex}
						boxIndex={boxIndex}
						setShowForm={setShowItemForm}
					/>
				</div>
			)}
			{showCategoriesForm && (
				<div>
					<TemplateCategoriesSelector
						rowIndex={rowIndex}
						boxIndex={boxIndex}
						setShowForm={setShowCategoriesForm}
					/>
				</div>
			)}
		</>
	);
};

export default TemplateBox;
