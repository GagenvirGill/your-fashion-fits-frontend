"use client";

import React, { useState } from "react";
import { useSetAtom } from "jotai";
import { addNotificationAtom } from "@/jotai/notifications-atom";
import { createCategory } from "@/api/actions/category";
import { refetchCategoriesAtom } from "@/jotai/categories-atom";

import styles from "./AddCategoryForm.module.css";
import Button from "@/components/buttons/Button";

const AddCategoryForm = () => {
	const addNotification = useSetAtom(addNotificationAtom);
	const refetchCategories = useSetAtom(refetchCategoriesAtom);
	const [name, setName] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const nameToCreate = name;
		setName("");

		const success = await createCategory(nameToCreate);
		await refetchCategories();

		if (success) {
			addNotification(
				`Successfully Created the '${nameToCreate}' Category!`
			);
		} else {
			addNotification(`An Error Occured Trying to Create a Category!`);
		}
	};

	return (
		<div className={styles.formContainer}>
			<p className={styles.formTitle}>Create a new Category</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name" className={styles.formText}>
					Category Name:{" "}
				</label>
				<input
					type="text"
					id="name"
					className={styles.textInput}
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<br />
				<br />
				<Button type="submit" text={"Create"} />
				<br />
				<br />
			</form>
		</div>
	);
};

export default AddCategoryForm;
