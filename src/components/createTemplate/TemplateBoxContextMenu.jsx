import React, { useEffect } from "react";
import styles from "./TemplateBox.module.css";

import ContextMenuButton from "../buttons/ContextMenuButton";

const TemplateBoxContextMenu = ({
	setIsLocked,
	isLocked,
	showContextMenu,
	setShowContextMenu,
	menuPosition,
	setShowItemForm,
	setShowCategoriesForm,
	selectedCategories,
	imgScale,
	setImgScale,
	addBoxBefore,
	addBoxAfter,
	removeBox,
	handleRandomization,
}) => {
	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
	};

	const handleTemplateItemForm = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
		setShowItemForm(true);
	};

	const handleTemplateCategoriesForm = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
		setShowCategoriesForm(true);
	};

	const handleLocked = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
		setIsLocked(!isLocked);
	};

	useEffect(() => {
		if (showContextMenu) {
			document.addEventListener("click", handleClick);
		} else {
			document.removeEventListener("click", handleClick);
		}

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, [showContextMenu]);

	return (
		<>
			{showContextMenu && (
				<div
					className={styles.contextMenu}
					style={{ top: menuPosition.y, left: menuPosition.x }}
					onClick={handleClick}
				>
					<ContextMenuButton
						onClick={handleTemplateItemForm}
						text="Select an Item"
					/>
					<ContextMenuButton
						onClick={handleTemplateCategoriesForm}
						text="Select Categories for Randomization"
					/>
					<ContextMenuButton
						onClick={handleRandomization}
						text="Randomize Item from Current Categories:"
						moreContent={
							<>
								<br />
								{selectedCategories.map((category) => (
									<span key={category.categoryId}>
										{category.name}
										<br />
									</span>
								))}
							</>
						}
						disabled={isLocked}
					/>
					<ContextMenuButton
						onClick={handleLocked}
						text={
							isLocked
								? "Unlock Item to allow Randomization"
								: "Lock Item in"
						}
					/>
					<ContextMenuButton
						onClick={handleClick}
						text={`Change Image Scale (Current: ${imgScale.toFixed(
							1
						)})`}
						moreContent={
							<>
								<br />
								<input
									id="scaleSlider"
									type="range"
									min="0.5"
									max="3.0"
									step="0.1"
									value={imgScale}
									onChange={(e) =>
										setImgScale(parseFloat(e.target.value))
									}
									className={styles.slider}
								/>
							</>
						}
					/>
					<ContextMenuButton
						onClick={addBoxBefore}
						text="Above this, add an Item/Box"
					/>
					<ContextMenuButton
						onClick={addBoxAfter}
						text="Below this, add an Item/Box"
					/>
					<ContextMenuButton
						onClick={removeBox}
						text="Remove this Item/Box from Outfit"
					/>
					<ContextMenuButton
						onClick={handleClick}
						text="Close Menu"
					/>
				</div>
			)}
		</>
	);
};

export default TemplateBoxContextMenu;
