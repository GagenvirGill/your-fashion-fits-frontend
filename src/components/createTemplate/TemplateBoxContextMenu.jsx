import React, { useEffect } from "react";
import styles from "./TemplateBox.module.css";

import ContextMenuButton from "../buttons/ContextMenuButton";

const TemplateBoxContextMenu = ({
	setIsLocked,
	isLocked,
	showContextMenu,
	setShowContextMenu,
	menuPosition,
	setShowForm,
	selectedCategories,
	imgScale,
	setImgScale,
}) => {
	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
	};

	const handleTemplateSelectForm = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
		setShowForm(true);
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
						onClick={handleTemplateSelectForm}
						text="Select an Item or Categories"
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
						onClick={handleClick}
						text="Current Categories:"
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
