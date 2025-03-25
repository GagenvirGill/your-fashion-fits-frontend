import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../store/reducers/categoriesReducer";
import { Link } from "react-router-dom";

import styles from "./CategoryCard.module.css";
import { deleteCategory } from "../../api/Category";

import Card from "./Card";
import CategoryContextMenuForms from "../popupForms/categoryContextMenu/CategoryContextMenuForms";

const CategoryCard = ({ categoryId, imagePath, categoryName, urlRoute }) => {
	const dispatch = useDispatch();
	const [showForm, setShowForm] = useState(false);

	const onDelete = () => {
		deleteCategory(categoryId).then(() => {
			dispatch(refreshState());
		});
	};

	const handleShowForm = () => {
		setShowForm(true);
	};

	const handleCloseForm = () => {
		setShowForm(false);
	};

	return (
		<>
			<Card
				id={categoryId}
				onDelete={onDelete}
				className={styles.categoryCard}
				customContextMenu={
					categoryId !== null && (
						<button onClick={handleShowForm}>
							Manage Categories Item's
						</button>
					)
				}
			>
				<Link key={`${categoryId}-link`} to={urlRoute}>
					<img
						src={`${"http://localhost:5001"}${imagePath}`}
						alt="Preview"
						id={categoryId}
					/>
					<p className={styles.categoryCardText}>{categoryName}</p>
				</Link>
			</Card>
			{showForm && (
				<CategoryContextMenuForms
					categoryId={categoryId}
					categoryName={categoryName}
					handleClose={handleCloseForm}
				/>
			)}
		</>
	);
};

export default CategoryCard;
