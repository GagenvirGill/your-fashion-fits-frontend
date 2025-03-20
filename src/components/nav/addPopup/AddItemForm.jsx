import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createItem } from "../../../api/Item";
import { refreshState } from "../../../store/reducers/itemsReducer";

const AddItemForm = () => {
	const [image, setImage] = useState(null);
	const dispatch = useDispatch();

	const handleImage = async (event) => {
		const file = event.target.files[0];

		if (file) {
			setImage(file);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		await createItem(image);
		dispatch(refreshState());
	};

	return (
		<div>
			<p>Create a new Closet Item</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="image">Image: </label>
				<input
					type="file"
					id="image"
					accept="image/*"
					onChange={handleImage}
					required
				/>
				<br />
				<button type="submit">Create</button>
				<br />
				{image && (
					<img
						src={URL.createObjectURL(image)}
						alt="Preview"
						style={{ maxWidth: "200px", marginTop: "10px" }}
					/>
				)}
			</form>
		</div>
	);
};

export default AddItemForm;
