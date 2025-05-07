import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/categoriesReducer";
import { addNotification } from "../../store/reducers/notificationsReducer";
import { Link } from "react-router-dom";

import styles from "./CategoryCard.module.css";
import { deleteCategory } from "../../api/Category";

import Card from "./Card";
import CategoryContextMenuForms from "../popupForms/categoryContextMenu/CategoryContextMenuForms";
import SetCategoriesFavItemForm from "../popupForms/categoryContextMenu/SetCategoriesFavItemForm";
import ContextMenuButton from "../buttons/ContextMenuButton";

const CategoryCard = ({
	categoryId,
	imagePath,
	categoryName,
	urlRoute,
	favItemId,
}) => {
	const dispatch = useDispatch();
	const [showCategoryItemsForm, setShowCategoryItemsForm] = useState(false);
	const [showCategFavItemForm, setShowCategoryFavItemForm] = useState(false);

	const onDelete = () => {
		deleteCategory(categoryId).then(() => {
			dispatch(refreshState());
			dispatch(
				addNotification(
					`Successfully Deleted the '${categoryName}' Category!`
				)
			);
		});
	};

	const handleShowCategoryItemsForm = () => {
		setShowCategoryItemsForm(true);
	};

	const handleShowCategoryFavItemForm = () => {
		setShowCategoryFavItemForm(true);
	};

	const handleCloseForm = () => {
		setShowCategoryItemsForm(false);
		setShowCategoryFavItemForm(false);
	};

	return (
		<>
			<Card
				id={categoryId}
				onDelete={onDelete}
				className={styles.categoryCard}
				customConMenu={
					categoryId !== null && (
						<>
							<ContextMenuButton
								onClick={handleShowCategoryItemsForm}
								text={`Manage '${categoryName}' Item's`}
							/>
							<ContextMenuButton
								onClick={handleShowCategoryFavItemForm}
								text={`Edit '${categoryName}' Favourite Item`}
							/>
						</>
					)
				}
				type={`'${categoryName}' Category`}
			>
				<Link key={`${categoryId}-link`} to={urlRoute}>
					<img src={imagePath} alt="Preview" id={categoryId} />
				</Link>
				<div className={styles.categoryCardDiv}>
					<div className={styles.categoryCardText}>
						{categoryName}
					</div>
				</div>
			</Card>
			{showCategoryItemsForm && (
				<CategoryContextMenuForms
					categoryId={categoryId}
					categoryName={categoryName}
					handleClose={handleCloseForm}
				/>
			)}
			{showCategFavItemForm && (
				<SetCategoriesFavItemForm
					categoryId={categoryId}
					categoryName={categoryName}
					handleClose={handleCloseForm}
					currFavItem={favItemId}
				/>
			)}
		</>
	);
};

export default CategoryCard;
