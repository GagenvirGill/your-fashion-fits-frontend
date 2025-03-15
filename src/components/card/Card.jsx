import React, { useState } from "react";
import styles from "./Card.module.css";

const Card = ({ id, onDelete, className, children }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

	const handleContextMenu = (e) => {
		e.preventDefault();
		setMenuPosition({ x: e.pageX, y: e.pageY });
		setShowMenu(true);
	};

	const handleDelete = () => {
		setShowMenu(false);
		if (onDelete) {
			onDelete(id);
		}
	};

	const handleClickOutside = () => {
		setShowMenu(false);
	};

	return (
		<div 
			className={`${styles.card} ${className || ""}`}
			onContextMenu={handleContextMenu} 
			onClick={handleClickOutside}
		>
			{children}
			{showMenu && (
				<div 
					className={styles.contextMenu} 
					style={{ top: menuPosition.y, left: menuPosition.x }}
				>
					<button onClick={handleDelete}>Delete</button>
				</div>
			)}
		</div>
	);
};

export default Card;
