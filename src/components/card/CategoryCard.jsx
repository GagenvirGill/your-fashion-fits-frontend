"use client";

import React, { useState } from "react";
import { useSetAtom } from "jotai";
import { addNotificationAtom } from "@/jotai/notifications-atom";
import Link from "next/link";

import styles from "./CategoryCard.module.css";
import { deleteCategory } from "@/api/actions/category";
import { refetchCategoriesAtom } from "@/jotai/categories-atom";

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
	const addNotification = useSetAtom(addNotificationAtom);
	const refetchCategories = useSetAtom(refetchCategoriesAtom);
	const [showCategoryItemsForm, setShowCategoryItemsForm] = useState(false);
	const [showCategFavItemForm, setShowCategoryFavItemForm] = useState(false);

	const onDelete = async () => {
		const success = await deleteCategory(categoryId);
		await refetchCategories();

		if (success) {
			addNotification(
				`Successfully Deleted the '${categoryName}' Category!`
			);
		} else {
			addNotification(`An Error Occured Trying to Delete a Category!`);
		}
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
				<Link key={`${categoryId}-link`} href={urlRoute}>
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
