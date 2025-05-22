import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";

import ContextMenuButton from "../buttons/ContextMenuButton";
import AreYouSureForm from "../popupForms/cardContextMenu/AreYouSureForm";

const Card = ({ id, onDelete, className, children, customConMenu, type }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [showAreYouSureForm, setShowAreYouSureForm] = useState(false);
	const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

	const handleContextMenu = (e) => {
		e.preventDefault();
		setMenuPosition({ x: e.pageX, y: e.pageY });
		setShowMenu(true);
	};

	const startDelete = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowAreYouSureForm(true);
		setShowMenu(false);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowAreYouSureForm(false);
		if (onDelete) {
			onDelete(id);
		}
	};

	const handleClick = (e) => {
		if (type.endsWith("Category")) {
			e.preventDefault();
			e.stopPropagation();
			setShowMenu(false);
		} else {
			e.stopPropagation();
			setMenuPosition({ x: e.pageX, y: e.pageY });
			setShowMenu(!showMenu);
		}
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

	const menuWidth = 200;

	return (
		<>
			<div
				className={`${styles.card} ${className || ""}`}
				onContextMenu={handleContextMenu}
				onClick={handleClick}
			>
				{children}
				{showMenu && (
					<div
						className={styles.contextMenu}
						style={{
							top: menuPosition.y,
							left:
								menuPosition.x + menuWidth > window.innerWidth
									? window.innerWidth - menuWidth
									: menuPosition.x,
						}}
						onClick={handleClick}
					>
						<ContextMenuButton
							onClick={startDelete}
							text={`Delete ${type}`}
						/>
						{customConMenu}
						<ContextMenuButton
							onClick={handleClick}
							text="Close Menu"
						/>
					</div>
				)}
			</div>
			{showAreYouSureForm && (
				<AreYouSureForm
					handleConfirm={handleDelete}
					handleCancel={() => setShowAreYouSureForm(false)}
					type={type}
				>
					{!type.endsWith("Category") ? <>{children}</> : <></>}
				</AreYouSureForm>
			)}
		</>
	);
};

export default Card;
