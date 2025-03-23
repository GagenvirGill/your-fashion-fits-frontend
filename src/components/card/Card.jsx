import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";

const Card = ({ id, onDelete, className, children, customContextMenu }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

	const handleContextMenu = (e) => {
		e.preventDefault();
		setMenuPosition({ x: e.pageX, y: e.pageY });
		setShowMenu(true);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowMenu(false);
		if (onDelete) {
			onDelete(id);
		}
	};

	const handleClickOutside = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (showMenu) {
			setShowMenu(false);
		}
	};

	useEffect(() => {
		if (showMenu) {
			document.addEventListener("click", handleClickOutside);
		} else {
			document.removeEventListener("click", handleClickOutside);
		}

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [showMenu]);

	return (
		<div
			className={`${styles.card} ${className || ""}`}
			onContextMenu={handleContextMenu}
			onClick={(e) => e.stopPropagation()}
		>
			{children}
			{showMenu && (
				<div
					className={styles.contextMenu}
					style={{ top: menuPosition.y, left: menuPosition.x }}
					onClick={(e) => e.stopPropagation()}
				>
					<button onClick={handleDelete}>Delete</button>
					{customContextMenu}
					<br />
					<br />
					<button onClick={handleClickOutside}>Close</button>
				</div>
			)}
		</div>
	);
};

export default Card;
