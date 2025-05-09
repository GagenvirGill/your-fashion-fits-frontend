import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createItem } from "../../../api/Item";
import { refreshState } from "../../../store/reducers/itemsReducer";
import { addNotification } from "../../../store/reducers/notificationsReducer";

import styles from "./AddItemForm.module.css";
import Button from "../../buttons/Button";

const AddItemForm = () => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleImage = async (event) => {
		const files = Array.from(event.target.files);
		setImages(files);
	};

	useEffect(() => {
		// just re render the page
	}, [loading]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const imagesToCreate = images;

		setImages([]);
		setLoading(true);

		let successCount = 0;
		let failCount = 0;

		for (const image of imagesToCreate) {
			try {
				const success = await createItem(image);
				dispatch(refreshState());

				if (success) {
					successCount++;
				} else {
					failCount++;
				}
			} catch (error) {
				failCount++;
			}
		}

		if (successCount > 0) {
			dispatch(
				addNotification(`${successCount} item(s) created successfully.`)
			);
		}

		if (failCount > 0) {
			dispatch(addNotification(`${failCount} item(s) failed to create.`));
		}

		setLoading(false);
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
			{loading && (
				<>
					<div className={styles.formText}>
						Processing your Item(s)...
					</div>
					<div className={styles.formText}>
						(Note: if you uploaded multiple images it may take a
						while, please be patient)
					</div>
				</>
			)}
		</div>
	);
};

export default AddItemForm;
