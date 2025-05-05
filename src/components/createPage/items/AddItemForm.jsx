import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createItem } from "../../../api/Item";
import { refreshState } from "../../../store/reducers/itemsReducer";

import styles from "./AddItemForm.module.css";
import Button from "../../buttons/Button";

const AddItemForm = () => {
	const [images, setImages] = useState([]);
	const dispatch = useDispatch();

	const handleImage = async (event) => {
		const files = Array.from(event.target.files);
		setImages(files);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		images.forEach((image) => {
			createItem(image)
				.then(() => {
					dispatch(refreshState());
				})
				.catch((error) => {
					console.error(error);
				});
		});
	};

	return (
		<div>
			<p className={styles.formTitle}>Create a new Closet Item</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="image" className={styles.addFileLabel}>
					<div className={styles.addFile}>Select Item Image(s)</div>
					<input
						type="file"
						id="image"
						accept="image/*"
						onChange={handleImage}
						multiple
						required
					/>
				</label>
				<br />
				<br />
				<Button type="submit" text={"Create"} />
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
				<br />
			</form>
		</div>
	);
};

export default AddItemForm;
