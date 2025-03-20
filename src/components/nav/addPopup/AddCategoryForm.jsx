import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../../store/reducers/categoriesReducer";
import { createCategory } from "../../../api/Category";

const AddCategoryForm = ({ handleClose }) => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setLoading(true);
		await createCategory(name);
		dispatch(refreshState());
		setLoading(false);
		handleClose();
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
