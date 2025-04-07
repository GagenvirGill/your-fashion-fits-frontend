import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { refreshState } from "../../../store/reducers/outfitsReducer";
import { createOutfit } from "../../../api/Outfit";

import styles from "./AddOutfitForm.module.css";
import Button from "../../buttons/Button";

const AddOutfitForm = ({ handleClose }) => {
	const dispatch = useDispatch();
	const [dateWorn, setDateWorn] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState();

	const handleImage = async (event) => {
		const file = event.target.files[0];
		setImage(file);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		handleClose();

		createOutfit(dateWorn, description, [], image)
			.then(() => {
				dispatch(refreshState());
			})
			.catch(() => {
				console.error(error);
			});
	};

	return (
		<div>
			<p className={styles.formTitle}>Create a new Outfit</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="dateWorn" className={styles.formText}>
					Date Worn:{" "}
				</label>
				<input
					type="date"
					id="date"
					value={dateWorn}
					onChange={(e) => setDateWorn(e.target.value)}
					required
				/>
				<br />
				<br />
				<label htmlFor="description" className={styles.formText}>
					Outfit Description:{" "}
				</label>
				<input
					type="text"
					id="description"
					className={styles.textInput}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<br />
				<br />
				<label htmlFor="image" className={styles.addFileLabel}>
					{image ? (
						<div className={styles.addFile}>
							Selected Image:
							<div className={styles.imageDisplay}>
								<img
									key={`${image.imageId}-addOutfitImage`}
									src={URL.createObjectURL(image)}
									alt={"Preview"}
									style={{ width: "100%" }}
								/>
							</div>
						</div>
					) : (
						<div className={styles.addFile}>
							Select a Full Outfit Image
						</div>
					)}
					<input
						type="file"
						id="image"
						accept="image/*"
						onChange={handleImage}
					/>
				</label>
				<br />
				<br />
				<Button type="submit" text={"Create"} />
				<br />
				<br />
			</form>
		</div>
	);
};

export default AddOutfitForm;
