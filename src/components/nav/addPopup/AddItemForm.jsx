import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createItem } from "../../../api/Item";
import { refreshState } from "../../../store/reducers/itemsReducer";
import styles from "./AddItemForm.module.css";

const AddItemForm = ({ handleClose }) => {
	const [images, setImages] = useState([]);
	const dispatch = useDispatch();

	const handleImage = async (event) => {
		const files = Array.from(event.target.files);
		setImages(files);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		handleClose();
		await Promise.all(images.map((image) => createItem(image)));
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
					multiple
					required
				/>
				<br />
				<button type="submit">Create</button>
				<br />
				<div className={styles.imagesDisplay}>
					{images.map((image, index) => (
						<img
							key={index}
							src={URL.createObjectURL(image)}
							alt={`Preview ${index}`}
							style={{ maxWidth: "100px" }}
						/>
					))}
				</div>
			</form>
		</div>
	);
};

export default AddItemForm;
