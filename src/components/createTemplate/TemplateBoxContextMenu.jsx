import React, { useState, useEffect } from "react";
import styles from "./TemplateBox.module.css";

import ContextMenuButton from "../buttons/ContextMenuButton";

const TemplateBoxContextMenu = ({
	setIsLocked,
	isLocked,
	showContextMenu,
	setShowContextMenu,
	menuPosition,
	setShowForm,
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
						text="Lock Item In"
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
