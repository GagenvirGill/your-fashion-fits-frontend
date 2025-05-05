import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../../store/reducers/categoriesReducer";
import { createCategory } from "../../../api/Category";

import styles from "./AddCategoryForm.module.css";
import Button from "../../buttons/Button";

const AddCategoryForm = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		await createCategory(name);
		dispatch(refreshState());
	};

	return (
		<div>
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
