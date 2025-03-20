import React, { useState } from "react";

import { createCategory } from "../../../api/Category";

const AddCategoryForm = () => {
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);
		await createCategory(name);
		setLoading(false);
	};

	return (
		<div>
			<p>Create a new Category</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name: </label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<br />
				<button type="submit" disabled={loading}>
					Create
				</button>
			</form>
		</div>
	);
};

export default AddCategoryForm;
