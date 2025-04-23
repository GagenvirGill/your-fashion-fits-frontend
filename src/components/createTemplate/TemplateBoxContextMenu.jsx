import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TemplateBox.module.css";

import {
	setBoxLockedStatus,
	removeTemplateBox,
	addTemplateBoxBefore,
	addTemplateRowBefore,
	addTemplateBoxAfter,
	addTemplateRowAfter,
	setBoxScale,
} from "../../store/reducers/outfitTemplateReducer";

import ContextMenuButton from "../buttons/ContextMenuButton";
import InlineContextMenuButton from "../buttons/InlineContextMenuButton";

const TemplateBoxContextMenu = ({
	rowIndex,
	boxIndex,
	showContextMenu,
	setShowContextMenu,
	menuPosition,
	setShowItemForm,
	setShowCategoriesForm,
	handleRandomization,
}) => {
	const dispatch = useDispatch();
	const { templateRows } = useSelector((state) => state.outfitTemplate);
	const {
		scale,
		isLocked,
		categories: templateCategories,
	} = templateRows[rowIndex][boxIndex];

	const { categories } = useSelector((state) => state.categories);
	const categoryNames = categories
		.filter((category) => templateCategories.includes(category.categoryId))
		.map((category) => category.name);

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

	const handleRemoveBox = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
		dispatch(removeTemplateBox({ rowIndex: rowIndex, boxIndex: boxIndex }));
	};

	const handleLocked = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
		dispatch(
			setBoxLockedStatus({
				rowIndex: rowIndex,
				boxIndex: boxIndex,
				isLocked: !isLocked,
			})
		);
	};

	const handleAddBoxBefore = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
		dispatch(
			addTemplateBoxBefore({ rowIndex: rowIndex, boxIndex: boxIndex })
		);
	};

	const handleAddBoxAfter = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
		dispatch(
			addTemplateBoxAfter({ rowIndex: rowIndex, boxIndex: boxIndex })
		);
	};

	const handleAddRowBefore = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
		dispatch(addTemplateRowBefore({ rowIndex: rowIndex }));
	};

	const handleAddRowAfter = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setShowContextMenu(false);
		dispatch(addTemplateRowAfter({ rowIndex: rowIndex }));
	};

	const handleImageScale = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(
			setBoxScale({
				rowIndex: rowIndex,
				boxIndex: boxIndex,
				scale: parseFloat(e.target.value),
			})
		);
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
					<InlineContextMenuButton
						texts={[
							"Remove this Item/Box",
							isLocked
								? "Unlock Item to allow Randomization"
								: "Lock Item in",
						]}
						onClicks={[handleRemoveBox, handleLocked]}
					/>
					<InlineContextMenuButton
						texts={[
							"Add Above",
							"Add Below",
							"Add Left",
							"Add Right",
						]}
						onClicks={[
							handleAddRowBefore,
							handleAddRowAfter,
							handleAddBoxBefore,
							handleAddBoxAfter,
						]}
					/>
					<ContextMenuButton
						onClick={() => {
							handleRandomization(rowIndex, boxIndex);
						}}
						text="Randomize Item from Current Categories:"
						moreContent={
							<>
								<br />
								{categoryNames.length === 0
									? "All Categories"
									: categoryNames.join(", ")}
							</>
						}
						disabled={isLocked}
					/>
					<ContextMenuButton
						onClick={handleClick}
						text={`Change Image Scale (Current: ${scale.toFixed(
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
									value={scale}
									onChange={handleImageScale}
									style={{ width: "100%" }}
								/>
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
